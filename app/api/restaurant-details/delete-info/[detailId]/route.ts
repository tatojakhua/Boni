/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleAuth from "@/app/api/ApiAuth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, res: any) {
  const { detailId } = res.params;
  try {
    const rangeToClear = `restaurant_details!A${detailId}:E${detailId}`;
    const gsapi = await GoogleAuth();
    await gsapi.spreadsheets.values.clear({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: rangeToClear,
    });
    return NextResponse.json("Deleted", { status: 202 });
  } catch (error) {
    return NextResponse.json("Something Wrong", { status: 400 });
  }
}
