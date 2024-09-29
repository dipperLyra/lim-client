import { LabType } from "./lab.type";
import { MetricType } from "./metric.type";

export interface ReagentType {
  id?: number;
  name: string;
  manufacturer: string;
  labId: number;
  laboratory?: LabType;
}

export enum ReagentStatus {
  InStock = "in_stock",
  OutOfStock = "out_of_stock",
  Expired = "expired",
  Ordered = "ordered",
}

export interface ReagentReportType {
  quantity: number;
  comment?: string;
  purchaseDate?: string;
  expiryDate?: string;
  status?: ReagentStatus;
  metricId: number;
  reagentId: number;
}

export interface ReagentReportTableType {
  name: string;
  status: string;
  expiryDate: Date;
  quantity?: number;
  metric?: MetricType;
  laboratory?: string;
}
