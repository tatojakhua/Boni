import { NextResponse } from "next/server";
import GoogleAuth from "../../ApiAuth";

export async function POST(req: Request) {
  const { values } = await req.json();
  try {
    const gsapi = await GoogleAuth();
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = "restaurants!A:C";

    const response = await gsapi.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            values.restaurantName,
            values.ltdName,
            values.city,
            values.numberOfBoxes,
          ],
        ],
      },
    });

    if (response.status === 200) {
      return NextResponse.json("Created", { status: 201 });
    } else {
      return NextResponse.json("Something went wrong", { status: 400 });
    }
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 400 });
  }
}
