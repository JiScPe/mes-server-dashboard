import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 10);
  const master_key = searchParams.get("out_quality_master_key") ?? "";

  const skip = (page - 1) * pageSize;

   // 🔹 build where conditionally
  const where = master_key
    ? { out_quality_master_key: master_key }
    : undefined;

  const [data, total] = await Promise.all([
    prisma.ti_agent_test_outgoing_quality_master.findMany({
      skip,
      take: pageSize,
      orderBy: [{ if_send_date: "desc" }, { if_send_time: "desc" }],
      where,
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
}
