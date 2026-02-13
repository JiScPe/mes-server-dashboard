import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 10);
  const searchText = searchParams.get("searchText") || ""; // Use empty string if null

  const skip = (page - 1) * pageSize;
  const searchFields = ["serial_number"];
  // 1. Define the dynamic 'where' clause
  const where = searchText
    ? {
        OR: searchFields.map((field) => ({
          [field]: { contains: searchText, mode: "insensitive" },
        })),
      }
    : {};

  // 2. Pass 'where' to both the data fetch and the count
  const [data, total] = await Promise.all([
    prisma.ti_agent_test_prd_mng_product_info_if.findMany({
      where, // Added here
      skip,
      take: pageSize,
      orderBy: [{ if_send_date: "desc" }, { if_send_time: "desc" }],
    }),
    prisma.ti_agent_test_prd_mng_product_info_if.count({
      where, // Added here to ensure pagination math is correct
    }),
  ]);

  return NextResponse.json({
    data,
    pageCount: Math.ceil(total / pageSize),
    total,
  });
}
