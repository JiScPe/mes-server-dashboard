"use client";

import { OutgoingQualityCounterMeasureType } from "@/types/samsung-somos/outgoing-quality-types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<OutgoingQualityCounterMeasureType>[] = [
  {
    accessorKey: "transaction_id",
    header: "Transaction ID",
  },
  {
    accessorKey: "if_status",
    header: "Status",
    cell: ({ row }) => {
      const val = row.getValue("if_status") as string;
      const bgColor =
        val === "SC"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800";
      return (
        <div
          className={`text-center text-sm ${bgColor} rounded-md font-semibold`}
        >
          {val}
        </div>
      );
    },
  },
  {
    accessorKey: "api_id",
    header: "API ID",
  },
  {
    accessorKey: "if_send_date",
    header: "Send Date",
  },
  {
    accessorKey: "if_send_time",
    header: "Send Time",
  },
  {
    accessorKey: "out_quality_master_key",
    header: "Quality Master Key",
  },
  {
    accessorKey: "countermeasure_seq",
    header: "Countermeasure Seq",
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue("countermeasure_seq")}</div>
      );
    },
  },
  {
    accessorKey: "defect_symptom_description",
    header: "Defect Symptom Description",
  },
  {
    accessorKey: "serial_number",
    header: "Serial Number",
  },
  {
    accessorKey: "causes_description",
    header: "Causes Description",
  },
  {
    accessorKey: "action_description",
    header: "Action Description",
  },
  {
    accessorKey: "action_user_name",
    header: "Action User Name",
  },
  {
    accessorKey: "action_date",
    header: "Action Date",
  },
  {
    accessorKey: "action_status_code",
    header: "Action Status Code",
  },
  {
    accessorKey: "improvement_description",
    header: "Improvement Description",
  },
  {
    accessorKey: "improvement_user_name",
    header: "Improvement User Name",
  },
  {
    accessorKey: "improvement_date",
    header: "Improvement Date",
  },
  {
    accessorKey: "improvement_status_code",
    header: "Improvement Status Code",
  },
  {
    accessorKey: "inspection_item_code",
    header: "Inspection Item Code",
  },
  {
    accessorKey: "defect_count",
    header: "Defect Count",
  },
  {
    accessorKey: "symptom_code",
    header: "Symptom Code",
  },
  {
    accessorKey: "defect_type_code",
    header: "Defect Type Code",
  },
  {
    accessorKey: "judgement_code",
    header: "Judgement Code",
  },
  {
    accessorKey: "inspection_type_code",
    header: "Inspection Type Code",
  },
];
