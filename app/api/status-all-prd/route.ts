import { checkServer } from "@/lib/utils/check-server-status";
import { prd_servers } from "@/lib/utils/server-list";
import { NextResponse } from "next/server";
import pLimit from "p-limit";
import { requireApiSession } from "@/lib/auth-guard";

const limit = pLimit(5); // 🔒 max 5 concurrent SSH connections

export async function GET(request: Request) {
  const authResult = await requireApiSession(request);
  if (authResult.response) return authResult.response;

  try {
    const nginxConfig = prd_servers["NGINX_PRD_SERVER_2"];

    const servers = await Promise.all(
      Object.entries(prd_servers).map(([serverName, config]) =>
        limit(() =>
          checkServer(serverName, config, nginxConfig)
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
