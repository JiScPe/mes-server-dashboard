import { checkQASServer } from "@/lib/utils/check-server-status-qas";
import { qas_servers } from "@/lib/utils/server-list";
import { NextResponse } from "next/server";
import pLimit from "p-limit";

const limit = pLimit(5); // 🔒 max 5 concurrent SSH connections

export async function GET() {
  try {
    const nginxConfig = qas_servers["MES_QAS_APP1"];

    const servers = await Promise.all(
      Object.entries(qas_servers).map(([serverName, config]) =>
        limit(() =>
          checkQASServer(serverName, config, nginxConfig)
        )
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
