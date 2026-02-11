"use client";

import { OutgoingQualityMasterType } from "@/types/samsung-somos/outgoing-quality-types";
import { ColumnDef } from "@tanstack/react-table";

export const masterColumns: ColumnDef<OutgoingQualityMasterType>[] = [
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
    accessorKey: "customer_code",
    header: "Customer Code",
  },
  {
    accessorKey: "site_code",
    header: "Site Code",
  },
  {
    accessorKey: "model_name",
    header: "Model Name",
  },
  {
    accessorKey: "out_quality_master_key",
    header: "Quality Master Key",
  },
  {
    accessorKey: "product_date",
    header: "Product Date",
  },
  {
    accessorKey: "lot_no",
    header: "Lot No",
  },
  {
    accessorKey: "inspection_type_code",
    header: "Inspection Type Code",
  },
  {
    accessorKey: "inspection_step_code",
    header: "Inspection Step Code",
  },
  {
    accessorKey: "po_no",
    header: "PO No",
  },
  {
    accessorKey: "product_type_code",
    header: "Product Type Code",
  },
  {
    accessorKey: "change_code",
    header: "Change Code",
  },
  {
    accessorKey: "change_description",
    header: "Change Description",
  },
  {
    accessorKey: "production_quantity",
    header: "Production Quantity",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("production_quantity")}</div>
    ),
  },
  {
    accessorKey: "serial_number_range_from",
    header: "Serial From",
  },
  {
    accessorKey: "serial_number_range_to",
    header: "Serial To",
  },
  {
    accessorKey: "product_code",
    header: "Product Code",
  },
  {
    accessorKey: "sample_quantity",
    header: "Sample Quantity",
    cell: ({ row }) => <div className="text-center">{row.getValue("sample_quantity")}</div>,
  },
  {
    accessorKey: "inspection_date",
    header: "Inspection Date",
  },
];
