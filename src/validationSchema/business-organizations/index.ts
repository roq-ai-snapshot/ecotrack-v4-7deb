import * as yup from 'yup';
import { employeeFeedbackValidationSchema } from 'validationSchema/employee-feedbacks';
import { environmentalDataValidationSchema } from 'validationSchema/environmental-data';
import { sustainabilityGoalValidationSchema } from 'validationSchema/sustainability-goals';

export const businessOrganizationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  employee_feedback: yup.array().of(employeeFeedbackValidationSchema),
  environmental_data: yup.array().of(environmentalDataValidationSchema),
  sustainability_goal: yup.array().of(sustainabilityGoalValidationSchema),
});
