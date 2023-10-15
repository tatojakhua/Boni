import { NextResponse } from "next/server";
import GoogleAuth from "../../ApiAuth";

export async function POST(req: Request, res: any) {
  const { values } = await req.json();
  try {
    const gsapi = await GoogleAuth();


    // Specify the range to clear
    const rangeToUpdate = `restaurants!A${values.id}:C${values.id}`;

    // Clear values in the specified range
    await gsapi.spreadsheets.values.update({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: rangeToUpdate,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[values.restaurantName, values.ltdName, values.city]],
      },
    });
    return NextResponse.json("Edited", { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json("Something wrong", { status: 400 });
  }
}
