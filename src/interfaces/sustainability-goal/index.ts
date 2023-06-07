import { BusinessOrganizationInterface } from 'interfaces/business-organization';

export interface SustainabilityGoalInterface {
  id?: string;
  business_organization_id: string;
  target_carbon_emissions: number;
  target_energy_consumption: number;
  target_waste_reduction: number;
  created_at?: Date;
  updated_at?: Date;

  business_organization?: BusinessOrganizationInterface;
  _count?: {};
}
