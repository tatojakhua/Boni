/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import GoogleAuth from "../../ApiAuth";

export async function GET() {
  try {
    const gsapi = await GoogleAuth();

    const opt: any = {
      spreadsheetId: process.env.SPREADSHEET_ID,
      includeGridData: true,
      ranges: [
        "restaurants!A2:A",
        "restaurants!B2:B",
        "restaurants!C2:C",
        "restaurants!D2:D",
      ],
    };
    const response = await gsapi.spreadsheets.get(opt);
    if (
      response &&
      response.data &&
      response.data.sheets &&
      response.data.sheets.length > 0
    ) {
      const sheetData: any = response.data.sheets[0].data;
      const extractedValuesA = sheetData[0].rowData
        .map((row: any, index: number) => {
          if (row.values && row.values[0].formattedValue) {
            return {
              id: index + 2, // Line number as ID (index + 1 because line numbers usually start from 1)
              restaurantName: row.values[0].formattedValue,
            };
          }
          return null;
        })
        .filter((value: any) => value !== null);

      const extractedValuesB = sheetData[1].rowData
        .map((row: any) => {
          if (row.values && row.values[0].formattedValue) {
            return row.values[0].formattedValue;
          }
          return null;
        })
        .filter((value: any) => value !== null);

      const extractedValuesC = sheetData[2].rowData
        .map((row: any) => {
          if (row.values && row.values[0].formattedValue) {
            return row.values[0].formattedValue;
          }
          return null;
        })
        .filter((value: any) => value !== null);
      const extractedValuesD = sheetData[3].rowData
        .map((row: any) => {
          if (row.values && row.values[0].formattedValue) {
            return row.values[0].formattedValue;
          }
          return null;
        })
        .filter((value: any) => value !== null);
      // Combine the values into an array of objects with IDs
      const combinedValues = extractedValuesA.map(
        (value: any, index: number) => ({
          id: value.id,
          restaurantName: value.restaurantName,
          ltdName: extractedValuesB[index],
          city: extractedValuesC[index],
          numberOfBoxes: parseInt(extractedValuesD[index]),
        })
      );

      return NextResponse.json(combinedValues, { status: 200 });
    } else {
      // Handle the case where the expected properties are not available
      return NextResponse.json("Invalid data structure", { status: 400 });
    }
  } catch (error) {
    return NextResponse.json("Something Went Wrong", { status: 400 });
  }
}
