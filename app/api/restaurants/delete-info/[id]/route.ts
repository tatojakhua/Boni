import { NextResponse } from "next/server";
import GoogleAuth from "../../../ApiAuth";

export async function DELETE(req: Request, res: any) {
  const { id } = res.params;
  try {
    const gsapi = await GoogleAuth();

    // Specify the range to clear
    const rangeToClear = `restaurants!A${id}:B${id}`;
    // Clear values in the specified range
    const response = await gsapi.spreadsheets.values.clear({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: rangeToClear,
    });

    return NextResponse.json("Deleted", { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json("Something wrong", { status: 400 });
  }
}