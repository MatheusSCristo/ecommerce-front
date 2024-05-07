import { NextRequest, NextResponse } from "next/server";
import getAuth from "./utils/Admin/getAuth";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");
  const signinUrl = new URL("/auth/login", req.url);
  if (!accessToken) return NextResponse.redirect(signinUrl);
  const userIsAuthenticated = await getAuth();
  if ((req.url.includes("/cart") || req.url.includes("/orders"))&& userIsAuthenticated === null) {
    if (!accessToken) return NextResponse.redirect(signinUrl);
  }
  else if (!userIsAuthenticated.authorized) {
  const notAuthUrl = new URL("/not-authorized", req.url);
    return NextResponse.redirect(notAuthUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/cart/:path*","/orders"],
};
