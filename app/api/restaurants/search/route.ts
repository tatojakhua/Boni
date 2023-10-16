/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import GoogleAuth from "../../ApiAuth";

export async function POST(req: Request) {
  try {
    const gsapi = await GoogleAuth();
    const { searchValue } = await req.json();

    const opt: any = {
      spreadsheetId: process.env.SPREADSHEET_ID,
      includeGridData: true,
      ranges: ["restaurants!A2:A", "restaurants!B1:B", "restaurants!C2:C"],
    };
    const response: any = await gsapi.spreadsheets.get(opt);
    const sheetData: any = response.data.sheets[0].data;
    const extractedValuesA = sheetData[0].rowData
      .map((row: any, index: number) => {
        if (row.values && row.values[0].userEnteredValue?.stringValue) {
          return {
            id: index + 2,
            restaurantName: row.values[0].userEnteredValue.stringValue,
          };
        }
        return null;
      })
      .filter((value: any) => value !== null);

    const extractedValuesB = sheetData[1].rowData
      .map((row: any) => {
        if (row.values && row.values[0].userEnteredValue?.stringValue) {
          return row.values[0].userEnteredValue.stringValue;
        }
        return null;
      })
      .filter((value: any) => value !== null);
    const extractedValuesC = sheetData[2].rowData
      .map((row: any) => {
        if (row.values && row.values[0].userEnteredValue?.stringValue) {
          return row.values[0].userEnteredValue.stringValue;
        }
        return null;
      })
      .filter((value: any) => value !== null);

    const combinedValues = extractedValuesA.map(
      (value: any, index: number) => ({
        id: value.id,
        restaurantName: value.restaurantName,
        ltdName: extractedValuesB[index],
        city: extractedValuesC[index],
      })
    );
    const filteredValues = combinedValues.filter(
      (item: any) =>
        item.restaurantName.includes(searchValue) ||
        item.ltdName.includes(searchValue)
    );
    return NextResponse.json(filteredValues, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 400 });
  }
}
