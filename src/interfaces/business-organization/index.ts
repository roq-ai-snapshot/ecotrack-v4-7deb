import { EmployeeFeedbackInterface } from 'interfaces/employee-feedback';
import { EnvironmentalDataInterface } from 'interfaces/environmental-data';
import { SustainabilityGoalInterface } from 'interfaces/sustainability-goal';
import { UserInterface } from 'interfaces/user';

export interface BusinessOrganizationInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  employee_feedback?: EmployeeFeedbackInterface[];
  environmental_data?: EnvironmentalDataInterface[];
  sustainability_goal?: SustainabilityGoalInterface[];
  user?: UserInterface;
  _count?: {
    employee_feedback?: number;
    environmental_data?: number;
    sustainability_goal?: number;
  };
}
