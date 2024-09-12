export interface EquipmentType {
  id: number;
  name: string;
  serialNumber: string;
  description: string;
  manufacturer: string;
  model?: string;
  status?: Status;
}

type Status = {
  status: "functional" | "non-functional";
};
