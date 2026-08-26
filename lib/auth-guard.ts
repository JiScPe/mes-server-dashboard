import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

type Session = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;
type Role = "user" | "operator" | "admin";
type AuthUserClaims = { role?: string | null; banned?: boolean | null };

const elevatedRoles: Role[] = ["operator", "admin"];

export async function getSessionFromHeaders(requestHeaders: Headers) {
  return auth.api.getSession({ headers: requestHeaders });
}

export async function requireApiSession(request: Request) {
  const session = await getSessionFromHeaders(request.headers);

  if (!session) {
    return {
      session: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    } as const;
  }

  const userClaims = session.user as AuthUserClaims;
  if (userClaims.banned) {
    return {
      session: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    } as const;
  }

  return { session, response: null } as const;
}

export async function requireElevatedApiSession(request: Request) {
  const result = await requireApiSession(request);

  if (result.response) return result;

  const userClaims = result.session.user as AuthUserClaims;
  if (!elevatedRoles.includes((userClaims.role || "user") as Role)) {
    return {
      session: null,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    } as const;
  }

  return result;
}

export async function requirePageSession(): Promise<Session> {
  const session = await getSessionFromHeaders(await headers());

  if (!session) {
    redirect("/login");
  }

  const userClaims = session.user as AuthUserClaims;
  if (userClaims.banned) {
    redirect("/login");
  }

  return session;
}
