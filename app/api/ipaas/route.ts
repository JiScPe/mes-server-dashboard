import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const ipass = await prisma.ipaas.findMany();
  return NextResponse.json(ipass);
}
