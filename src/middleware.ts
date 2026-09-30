import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");

  const isProtected = request.nextUrl.pathname.startsWith("/patients");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/landing", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/patients/:path*"],
};