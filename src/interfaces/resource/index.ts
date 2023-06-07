export interface ResourceInterface {
  id?: string;
  title: string;
  description: string;
  url: string;
  resource_type: string;
  created_at?: Date;
  updated_at?: Date;

  _count?: {};
}
