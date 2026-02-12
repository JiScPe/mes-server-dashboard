import { Decimal } from "@prisma/client/runtime/client";

export type ProcessQualityType = {
  transaction_id: string | null;
  api_id: string | null;
  if_status: string | null;
  if_send_date: string | null;
  if_send_time: string | null;
  customer_code: string | null;
  product_code: string | null;
  product_date: string;
  site_code: string;
  model_name: string;
  lot_no: string;
  po_no: string | null;
  product_quantity: Decimal | null;
  defect_quantity: Decimal | null;
  inspection_process_description: string | null;
  defect_symptom_description: string | null;
  defect_cause_description: string | null;
  defect_policy_description: string | null;
  defect_set_serial_number: string;
  defect_material_name: string | null;
  repair_detail_description: string | null;
  repair_date: string | null;
  repair_result_code: string | null;
};

export type CreateProcessQualityInput = Partial<ProcessQualityType>;
export type UpdateProcessQualityInput = Partial<CreateProcessQualityInput>;