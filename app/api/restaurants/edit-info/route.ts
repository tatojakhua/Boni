import { NextResponse } from "next/server";
import GoogleAuth from "../../ApiAuth";

export async function POST(req: Request) {
  const { updatedValues } = await req.json();
  try {
    const gsapi = await GoogleAuth();

    // Specify the range to clear
    const rangeToUpdate = `restaurants!A${updatedValues.id}:D${updatedValues.id}`;

    // Clear values in the specified range
    await gsapi.spreadsheets.values.update({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: rangeToUpdate,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            updatedValues.restaurantName,
            updatedValues.ltdName,
            updatedValues.city,
            updatedValues.numberOfBoxes,
          ],
        ],
      },
    });
    return NextResponse.json("Edited", { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something wrong", { status: 400 });
  }
}
