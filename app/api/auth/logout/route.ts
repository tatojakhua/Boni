import { NextResponse } from "next/server";

export async function GET() {
  const headers: [string, string][] = [
    ["Set-Cookie", `accessToken=""; expires=${new Date(0)}; Path=/; HttpOnly`],
    ["Set-Cookie", `refreshToken=""; expires=${new Date(0)}; Path=/; HttpOnly`],
  ];

  return NextResponse.json("Logout", { headers });
}
