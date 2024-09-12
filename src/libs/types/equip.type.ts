export interface EquipmentType {
  id?: number;
  name: string;
  serialNumber?: string;
  description?: string;
  manufacturer?: string;
  model?: string;
  status: any;
  labId?: string;
  comment?: string;
}

export interface StatusType {
  status: string;
}
