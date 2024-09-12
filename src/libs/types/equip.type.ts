export interface EquipmentType {
  id?: number;
  name: string;
  serialNumber?: string;
  description?: string;
  manufacturer?: string;
  model?: string;
  status: any;
}

export interface StatusType {
  status: string;
}
