/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import GoogleAuth from "../../../ApiAuth";

export async function DELETE(req: Request, res: any) {
  const { id } = res.params;
  try {
    const gsapi = await GoogleAuth();

    // Specify the range to clear
    const restaurantRange = `restaurants!A${id}:D${id}`;
    const range = `restaurant_details!A1:E`;
    const response = await gsapi.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range,
    });
    const values = response.data.values || [];
    const rowsToDelete = values
      .map((row, index) => ({ row: index + 1, value: row[4] })) // Assuming restaurant ID is in column E
      .filter((cell) => cell.value === id);

    // Clear values in the identified rows
    for (const { row } of rowsToDelete) {
      const detailsRange = `restaurant_details!A${row}:E${row}`;

      await gsapi.spreadsheets.values.clear({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: detailsRange,
      });
    }
    await gsapi.spreadsheets.values.clear({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: restaurantRange,
    });

    return NextResponse.json("Delete", { status: 201 });
  } catch (error) {
    return NextResponse.json("Something wrong", { status: 400 });
  }
}
