import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 10);

  const skip = (page - 1) * pageSize;

  const [data, total] = await Promise.all([
    prisma.ti_agent_test_process_quality_if.findMany({
      skip,
      take: pageSize,
      orderBy: [{ if_send_date: "desc" }, { if_send_time: "desc" }],
    }),
    prisma.ti_agent_test_process_quality_if.count(),
  ]);

  return NextResponse.json({
    data,
    pageCount: Math.ceil(total / pageSize),
    total,
  });
}
