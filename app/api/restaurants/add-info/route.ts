import { NextResponse } from "next/server";
import GoogleAuth from "../../ApiAuth";

export async function POST(req: Request, res: any) {
  const { values } = await req.json();
  try {
    const gsapi = await GoogleAuth();
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = "restaurants!A:C"; // Modify the sheet name accordingly

    const response = await gsapi.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[values.restaurantName, values.ltdName, values.city]],
      },
    });

    if (response.status === 200) {
      return NextResponse.json("Created", { status: 201 });
    } else {
      console.log(response.statusText);
      return NextResponse.json("Something went wrong", { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong", { status: 400 });
  }
}
