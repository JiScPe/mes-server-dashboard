import { checkQASServer } from "@/lib/utils/check-server-status-qas";
import { qas_servers } from "@/lib/utils/server-list";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const servers = await Promise.all(
      Object.entries(qas_servers).map(([serverName, config]) =>
        checkQASServer(serverName, config)
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
