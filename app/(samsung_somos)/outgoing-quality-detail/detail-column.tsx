"use client";

import { OutgoingQualityDetailType } from "@/types/samsung-somos/outgoing-quality-types";
import { ColumnDef } from "@tanstack/react-table";

export const detailColumns: ColumnDef<OutgoingQualityDetailType>[] = [
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
    header: () => <div className="text-blue-600">Quality Master Key</div>,
  },
  {
    accessorKey: "inspection_item_code",
    header: () => <div className="text-blue-600">Inspection Item Code</div>,
  },
  {
    accessorKey: "inspection_element_code",
    header: () => <div className="text-blue-600">Inspection Element Code</div>,
  },
  {
    accessorKey: "inspection_sorting_order",
    header: "Inspection Sorting Item",
  },
  {
    accessorKey: "inspection_value",
    header: "Inspection Value",
  },
];
