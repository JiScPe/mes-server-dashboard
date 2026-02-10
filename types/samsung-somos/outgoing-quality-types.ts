import { Decimal } from "@prisma/client/runtime/client";

export type OutgoingQualityCounterMeasureType = {
  transaction_id: string | null;
  api_id: string | null;
  if_status: string | null;
  if_send_date: string | null;
  if_send_time: string | null;
  out_quality_master_key: string;
  countermeasure_seq: string;
  defect_symptom_description: string | null;
  serial_number: string;
  causes_description: string | null;
  action_description: string | null;
  action_user_name: string | null;
  action_date: string | null;
  action_status_code: string | null;
  improvement_description: string | null;
  improvement_user_name: string | null;
  improvement_date: string | null;
  improvement_status_code: string | null;
  inspection_item_code: string | null;
  defect_count: Decimal | null;
  symptom_code: string | null;
  defect_type_code: string | null;
  judgement_code: string | null;
  inspection_type_code: string | null;
};

export type OutgoingQualityDetailType = {
  transaction_id: string | null;
  api_id: string | null;
  if_status: string | null;
  if_send_date: string | null;
  if_send_time: string | null;
  out_quality_master_key: string;
  inspection_item_code: string;
  inspection_element_code: string;
  inspection_sorting_order: number;
  inspection_value: string | null;
};

export type OutgoingQualityMasterType = {
  transaction_id: string | null;
  api_id: string | null;
  if_status: string | null;
  if_send_date: string | null;
  if_send_time: string | null;
  customer_code: string | null;
  site_code: string | null;
  model_name: string | null;
  out_quality_master_key: string;
  product_date: string;
  lot_no: string;
  inspection_type_code: string;
  inspection_step_code: string;
  po_no: string | null;
  product_type_code: string | null;
  change_code: string | null;
  change_description: string | null;
  production_quantity: number | null;
  serial_number_range_from: string | null;
  serial_number_range_to: string | null;
  product_code: string | null;
  sample_quantity: number | null;
  inspection_date: string | null;
};
