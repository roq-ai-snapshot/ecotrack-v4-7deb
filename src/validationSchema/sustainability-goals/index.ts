import * as yup from 'yup';

export const sustainabilityGoalValidationSchema = yup.object().shape({
  target_carbon_emissions: yup.number().integer().required(),
  target_energy_consumption: yup.number().integer().required(),
  target_waste_reduction: yup.number().integer().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  business_organization_id: yup.string().nullable().required(),
});
