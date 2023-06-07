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
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createSustainabilityGoal } from 'apiSdk/sustainability-goals';
import { Error } from 'components/error';
import { sustainabilityGoalValidationSchema } from 'validationSchema/sustainability-goals';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { BusinessOrganizationInterface } from 'interfaces/business-organization';
import { getBusinessOrganizations } from 'apiSdk/business-organizations';
import { SustainabilityGoalInterface } from 'interfaces/sustainability-goal';

function SustainabilityGoalCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SustainabilityGoalInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSustainabilityGoal(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SustainabilityGoalInterface>({
    initialValues: {
      target_carbon_emissions: 0,
      target_energy_consumption: 0,
      target_waste_reduction: 0,
      created_at: new Date(new Date().toDateString()),
      updated_at: new Date(new Date().toDateString()),
      business_organization_id: (router.query.business_organization_id as string) ?? null,
    },
    validationSchema: sustainabilityGoalValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Sustainability Goal
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'sustainability_goal',
  operation: AccessOperationEnum.CREATE,
})(SustainabilityGoalCreatePage);
