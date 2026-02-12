"use client";

import { ProcessQualityType } from "@/types/samsung-somos/process-quality-types";
import { ColumnDef } from "@tanstack/react-table";

export const processQualityColumns: ColumnDef<ProcessQualityType>[] = [
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
	{ accessorKey: "lot_no", header: "Lot No" },
	{ accessorKey: "product_date", header: "Product Date" },
	{ accessorKey: "product_code", header: "Product Code" },
	{ accessorKey: "po_no", header: "PO No" },
	{
		accessorKey: "product_quantity",
		header: "Product Quantity",
		cell: ({ row }) => <div className="text-center">{String(row.getValue("product_quantity"))}</div>,
	},
	{
		accessorKey: "defect_quantity",
		header: "Defect Quantity",
		cell: ({ row }) => <div className="text-center">{String(row.getValue("defect_quantity"))}</div>,
	},
	{ accessorKey: "inspection_process_description", header: "Inspection Process" },
	{ accessorKey: "defect_symptom_description", header: "Defect Symptom" },
	{ accessorKey: "defect_cause_description", header: "Defect Cause" },
	{ accessorKey: "defect_policy_description", header: "Defect Policy" },
	{ accessorKey: "defect_set_serial_number", header: "Serial Number" },
	{ accessorKey: "defect_material_name", header: "Material Name" },
	{ accessorKey: "repair_detail_description", header: "Repair Detail" },
	{ accessorKey: "repair_date", header: "Repair Date" },
	{ accessorKey: "repair_result_code", header: "Repair Result" },
];
