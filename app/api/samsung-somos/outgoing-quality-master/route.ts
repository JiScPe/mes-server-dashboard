import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireApiSession } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const authResult = await requireApiSession(req);
  if (authResult.response) return authResult.response;

  try {
    const { searchParams } = new URL(req.url);
  
    const page = Number(searchParams.get("page") ?? 1);
    const pageSize = Number(searchParams.get("pageSize") ?? 10);
    const searchText = searchParams.get("searchText") || ""; // Use empty string if null
  
    const skip = (page - 1) * pageSize;
  
    const searchFields = [
      "product_date",
      "lot_no",
      "inspection_type_code",
      "inspection_step_code",
    ];
    // 1. Define the dynamic 'where' clause
    const where = searchText
      ? {
          OR: searchFields.map((field) => ({
            [field]: { contains: searchText, mode: "insensitive" },
          })),
        }
      : {};
  
    const [data, total] = await Promise.all([
      prisma.ti_agent_test_outgoing_quality_master.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ if_send_date: "desc" }, { if_send_time: "desc" }],
      }),
      prisma.ti_agent_test_outgoing_quality_master.count({
          where
      }),
    ]);
  
    return NextResponse.json({
      data,
      pageCount: Math.ceil(total / pageSize),
      total,
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
