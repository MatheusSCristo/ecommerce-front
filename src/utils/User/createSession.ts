"use server"
import { cookies } from "next/headers";

export async function createSession(accessToken: string) {
  const expiresAt = new Date(Date.now() + 24 *60 * 60 * 1000);
  cookies().set("accessToken", accessToken, {
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
