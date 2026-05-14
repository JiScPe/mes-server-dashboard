import { NextRequest, NextResponse } from "next/server";
import { getCookieCache } from "better-auth/cookies";

export default async function proxy(request: NextRequest) {
  const session = await getCookieCache(request);
  
  if (!session && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  if (session && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};