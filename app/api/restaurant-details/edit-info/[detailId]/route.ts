/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import GoogleAuth from "@/app/api/ApiAuth";
import dayjs from "dayjs";

export async function PUT(req: Request, res: any) {
  const { values } = await req.json();
  const { detailId } = res.params;
  try {
    const gsapi = await GoogleAuth();
    const rangeToUpdate = `restaurant_details!A${detailId}:D${detailId}`;

    await gsapi.spreadsheets.values.update({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: rangeToUpdate,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            values.driverName,
            values.typeOfBottle,
            values.quantity,
            dayjs(values.date).format("YYYY-DD-MM"),
          ],
        ],
      },
    });
    return NextResponse.json("Updated", { status: 202 });
  } catch (error) {
    return NextResponse.json("Something Went Wrong", { status: 400 });
  }
}
