"use client";

import { ProductInfoType } from "@/types/samsung-somos/product-info-types";
import { ColumnDef } from "@tanstack/react-table";

export const productInfoColumns: ColumnDef<ProductInfoType>[] = [
  { accessorKey: "transaction_id", header: "Transaction ID" },
  {
    accessorKey: "if_status",
    header: "Status",
    cell: ({ row }) => {
      const val = row.getValue("if_status") as string | null;
      const bgColor = val === "SC" || val === "PASS" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
      return <div className={`text-center text-sm ${bgColor} rounded-md font-semibold`}>{val}</div>;
    },
  },
  { accessorKey: "api_id", header: "API ID" },
  { accessorKey: "if_send_date", header: "Send Date" },
  { accessorKey: "if_send_time", header: "Send Time" },
  { accessorKey: "customer_code", header: "Customer Code" },
  { accessorKey: "site_code", header: "Site Code" },
  { accessorKey: "model_name", header: "Model Name" },
  { accessorKey: "serial_number", header: "Serial Number" },
  { accessorKey: "esn_ime", header: "ESN/IME" },
  { accessorKey: "product_date", header: "Product Date" },
  { accessorKey: "product_time", header: "Product Time" },
  { accessorKey: "lot_no", header: "Lot No" },
  { accessorKey: "product_line", header: "Product Line" },
  { accessorKey: "po_no", header: "PO No" },
  { accessorKey: "delivery_date", header: "Delivery Date" },
  { accessorKey: "delivery_order", header: "Delivery Order" },
  { accessorKey: "delivery_destination", header: "Delivery Destination" },
  { accessorKey: "e_pass1", header: "E-Pass 1" },
  { accessorKey: "e_pass2", header: "E-Pass 2" },
  { accessorKey: "e_pass3", header: "E-Pass 3" },
  { accessorKey: "e_pass4", header: "E-Pass 4" },
  { accessorKey: "e_pass5", header: "E-Pass 5" },
  { accessorKey: "e_pass6", header: "E-Pass 6" },
  { accessorKey: "e_pass7", header: "E-Pass 7" },
  { accessorKey: "e_pass8", header: "E-Pass 8" },
  { accessorKey: "e_pass9", header: "E-Pass 9" },
  { accessorKey: "e_pass10", header: "E-Pass 10" },
  { accessorKey: "sw_version", header: "SW Version" },
  { accessorKey: "hw_version", header: "HW Version" },
  { accessorKey: "bom_version", header: "BOM Version" },
  { accessorKey: "process_data1", header: "Process Data 1" },
  { accessorKey: "process_data2", header: "Process Data 2" },
  { accessorKey: "process_data3", header: "Process Data 3" },
  { accessorKey: "process_data4", header: "Process Data 4" },
  { accessorKey: "process_data5", header: "Process Data 5" },
  { accessorKey: "process_data6", header: "Process Data 6" },
  { accessorKey: "process_data7", header: "Process Data 7" },
  { accessorKey: "process_data8", header: "Process Data 8" },
  { accessorKey: "process_data9", header: "Process Data 9" },
  { accessorKey: "process_data10", header: "Process Data 10" },
];
