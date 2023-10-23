/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import GoogleAuth from "../../ApiAuth";
import { sign } from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { values } = await req.json();
  try {
    const gsapi = await GoogleAuth();
    const opt: any = {
      spreadsheetId: process.env.SPREADSHEET_ID,
      includeGridData: true,
      ranges: ["users!A2:A", "users!B2:B"],
    };
    const response: any = await gsapi.spreadsheets.get(opt);
    const sheetData: any = response.data.sheets[0].data;
    const extractedPasswords = sheetData[1].rowData
      .map((row: any) => {
        if (row.values && row.values[0].formattedValue) {
          return row.values[0].formattedValue;
        }
        return null;
      })
      .filter((value: any) => value !== null);
    const extractedValues = sheetData[0].rowData
      .map((row: any, index: number) => {
        if (row.values && row.values[0].formattedValue) {
          return {
            id: index + 2, // Line number as ID (index + 1 because line numbers usually start from 1)
            userName: row.values[0].formattedValue,
            password: extractedPasswords[index], // Assuming the password is in the corresponding row of column B
          };
        }
        return null;
      })
      .filter(
        (value: any) => value !== null && value.userName === values.username
      );
    if (
      extractedValues.length === 0 ||
      !(await bcrypt.compare(values.password, extractedValues[0].password))
    ) {
      return NextResponse.json("Password Is Incorrect", { status: 403 });
    }

    const accessToken = sign(
      {
        user: extractedValues.userName,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "30m", algorithm: "HS256" }
    );
    const refreshToken = sign(
      {
        user: extractedValues.userName,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "3d", algorithm: "HS256" }
    );
    const headers: any = [
      [
        "Set-Cookie",
        `accessToken=${accessToken}; Path=/; Max-Age=${30 * 60}; HttpOnly`,
      ],
      [
        "Set-Cookie",
        `refreshToken=${refreshToken}; Path=/; Max-Age=${
          60 * 60 * 24 * 3
        }; HttpOnly`,
      ],
    ];

    return NextResponse.json(
      { accessToken, refreshToken },
      { status: 201, headers }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("Password or User Incorrect", { status: 409 });
  }
}
