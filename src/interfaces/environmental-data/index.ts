import { BusinessOrganizationInterface } from 'interfaces/business-organization';

export interface EnvironmentalDataInterface {
  id?: string;
  business_organization_id: string;
  carbon_emissions: number;
  energy_consumption: number;
  waste_production: number;
  recycling_rate: number;
  created_at?: Date;
  updated_at?: Date;

  business_organization?: BusinessOrganizationInterface;
  _count?: {};
}
