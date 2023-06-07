import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getSustainabilityGoalById, updateSustainabilityGoalById } from 'apiSdk/sustainability-goals';
import { Error } from 'components/error';
import { sustainabilityGoalValidationSchema } from 'validationSchema/sustainability-goals';
import { SustainabilityGoalInterface } from 'interfaces/sustainability-goal';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { BusinessOrganizationInterface } from 'interfaces/business-organization';
import { getBusinessOrganizations } from 'apiSdk/business-organizations';

function SustainabilityGoalEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<SustainabilityGoalInterface>(
    () => (id ? `/sustainability-goals/${id}` : null),
    () => getSustainabilityGoalById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SustainabilityGoalInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSustainabilityGoalById(id, values);
      mutate(updated);
      resetForm();
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<SustainabilityGoalInterface>({
    initialValues: data,
    validationSchema: sustainabilityGoalValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Sustainability Goal
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="target_carbon_emissions" mb="4" isInvalid={!!formik.errors?.target_carbon_emissions}>
              <FormLabel>Target Carbon Emissions</FormLabel>
              <NumberInput
                name="target_carbon_emissions"
                value={formik.values?.target_carbon_emissions}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('target_carbon_emissions', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.target_carbon_emissions && (
                <FormErrorMessage>{formik.errors?.target_carbon_emissions}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="target_energy_consumption" mb="4" isInvalid={!!formik.errors?.target_energy_consumption}>
              <FormLabel>Target Energy Consumption</FormLabel>
              <NumberInput
                name="target_energy_consumption"
                value={formik.values?.target_energy_consumption}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('target_energy_consumption', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.target_energy_consumption && (
                <FormErrorMessage>{formik.errors?.target_energy_consumption}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="target_waste_reduction" mb="4" isInvalid={!!formik.errors?.target_waste_reduction}>
              <FormLabel>Target Waste Reduction</FormLabel>
              <NumberInput
                name="target_waste_reduction"
                value={formik.values?.target_waste_reduction}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('target_waste_reduction', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.target_waste_reduction && (
                <FormErrorMessage>{formik.errors?.target_waste_reduction}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="created_at" mb="4">
              <FormLabel>Created At</FormLabel>
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.created_at}
                onChange={(value: Date) => formik.setFieldValue('created_at', value)}
              />
            </FormControl>
            <FormControl id="updated_at" mb="4">
              <FormLabel>Updated At</FormLabel>
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.updated_at}
                onChange={(value: Date) => formik.setFieldValue('updated_at', value)}
              />
            </FormControl>
            <AsyncSelect<BusinessOrganizationInterface>
              formik={formik}
              name={'business_organization_id'}
              label={'Select Business Organization'}
              placeholder={'Select Business Organization'}
              fetcher={getBusinessOrganizations}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'sustainability_goal',
  operation: AccessOperationEnum.UPDATE,
})(SustainabilityGoalEditPage);
