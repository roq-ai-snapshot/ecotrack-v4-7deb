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
import { getEmployeeFeedbackById, updateEmployeeFeedbackById } from 'apiSdk/employee-feedbacks';
import { Error } from 'components/error';
import { employeeFeedbackValidationSchema } from 'validationSchema/employee-feedbacks';
import { EmployeeFeedbackInterface } from 'interfaces/employee-feedback';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { BusinessOrganizationInterface } from 'interfaces/business-organization';
import { getUsers } from 'apiSdk/users';
import { getBusinessOrganizations } from 'apiSdk/business-organizations';

function EmployeeFeedbackEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<EmployeeFeedbackInterface>(
    () => (id ? `/employee-feedbacks/${id}` : null),
    () => getEmployeeFeedbackById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: EmployeeFeedbackInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateEmployeeFeedbackById(id, values);
      mutate(updated);
      resetForm();
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<EmployeeFeedbackInterface>({
    initialValues: data,
    validationSchema: employeeFeedbackValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Employee Feedback
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="feedback" mb="4" isInvalid={!!formik.errors?.feedback}>
              <FormLabel>Feedback</FormLabel>
              <Input type="text" name="feedback" value={formik.values?.feedback} onChange={formik.handleChange} />
              {formik.errors.feedback && <FormErrorMessage>{formik.errors?.feedback}</FormErrorMessage>}
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
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
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
  entity: 'employee_feedback',
  operation: AccessOperationEnum.UPDATE,
})(EmployeeFeedbackEditPage);
