import { checkServer } from "@/lib/utils/check-server-status";
import { prd_servers } from "@/lib/utils/server-list";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const servers = await Promise.all(
      Object.entries(prd_servers).map(([serverName, config]) =>
        checkServer(serverName, config)
      )
    );

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      servers,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected server failure" },
      { status: 500 }
    );
  }
}
