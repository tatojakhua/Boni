/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import GoogleAuth from "../../../ApiAuth";

export async function DELETE(req: Request, res: any) {
  const { id } = res.params;
  try {
    const gsapi = await GoogleAuth();

    // Specify the range to clear
    const rangeToClear = `restaurants!A${id}:C${id}`;
    // Clear values in the specified range
    await gsapi.spreadsheets.values.clear({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: rangeToClear,
    });

    return NextResponse.json("Deleted", { status: 201 });
  } catch (error) {
    return NextResponse.json("Something wrong", { status: 400 });
  }
}
