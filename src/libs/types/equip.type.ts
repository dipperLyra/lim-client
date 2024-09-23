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

export interface LabEquipmentStatusType {
  laboratory: string;
  totalEquipments: number;
  functionalEquipments: number;
  nonFunctionalEquipments: number;
}
