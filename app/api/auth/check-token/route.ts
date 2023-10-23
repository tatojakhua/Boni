/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import cookie from "cookie";
import { verify } from "jsonwebtoken";

export async function POST(req: Request) {
  const cookies = req.headers.get("Cookie") || "";
  const parsedCookies = cookie.parse(cookies);
  const verifyToken: any = verify(
    parsedCookies.accessToken,
    process.env.JWT_SECRET as string
  );
  if (verifyToken === null || verifyToken === "" || verifyToken === undefined) {
    return NextResponse.json("Not Valid", { status: 400 });
  }
  return NextResponse.json("Valid", { status: 200 });
}
