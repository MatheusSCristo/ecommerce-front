import { NextRequest, NextResponse } from "next/server";
import getAuth from "./utils/Admin/getAuth";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");
  const signinUrl = new URL("/not-authorized", req.url);
  if (!accessToken) return NextResponse.redirect(signinUrl);
  const userIsAuthenticated = await getAuth();
  if (!userIsAuthenticated.authorized) {
    return NextResponse.redirect(signinUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
