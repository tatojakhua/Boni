import { NextResponse } from "next/server";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import cookie from "cookie";

export async function POST(req: Request) {
  const cookies = req.headers.get("Cookie") || "";
  const parsedCookies = cookie.parse(cookies);
  const token = parsedCookies.refreshToken;

  if (!token) {
    return NextResponse.json("You Are Signed Out", { status: 400 });
  }

  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const newToken = sign(
      { user: decoded.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30m",
        algorithm: "HS256",
      }
    );
    const headers = {
      "Set-Cookie": `accessToken=${newToken}; Path=/; Max-Age=${
        30 * 60
      }; HttpOnly`,
    };
    return NextResponse.json(
      { accessToken: newToken },
      { status: 202, headers }
    );
  } catch (error) {
    return NextResponse.json("Invalid Token", { status: 400 });
  }
}
