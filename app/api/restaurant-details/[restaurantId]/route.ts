import { NextResponse } from "next/server";
import GoogleAuth from "../../ApiAuth";
import dayjs from "dayjs";

export async function GET(req: Request, res: any) {
  const { restaurantId } = res.params;
  try {
    const gsapi = await GoogleAuth();
    const opt: any = {
      spreadsheetId: process.env.SPREADSHEET_ID,
      includeGridData: true,
      ranges: [
        "restaurant_details!A2:A",
        "restaurant_details!B2:B",
        "restaurant_details!C2:C",
        "restaurant_details!D2:D",
        "restaurant_details!E2:E",
      ],
    };
    const response: any = await gsapi.spreadsheets.get(opt);
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
              id: index + 2,
              driverName: row.values[0].formattedValue,
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
      const extractedValuesE = sheetData[4].rowData
        .map((row: any) => {
          if (row.values && row.values[0].formattedValue) {
            return row.values[0].formattedValue;
          }
          return null;
        })
        .filter((value: any) => value !== null);

      const combinedValues = extractedValuesA.map(
        (value: any, index: number) => ({
          id: value.id,
          driverName: value.driverName,
          bottleType: extractedValuesB[index],
          quantity: parseInt(extractedValuesC[index]),
          date: extractedValuesD[index],
          restaurantId: parseInt(extractedValuesE[index]),
        })
      );
      const filteredValues = combinedValues.filter(
        (item: any) => item.restaurantId === parseInt(restaurantId)
      );

      return NextResponse.json(filteredValues, { status: 200 });
    } else {
      // Handle the case where the expected properties are not available
      return NextResponse.json("Invalid data structure", { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something Wrong", { status: 400 });
  }
}

export async function POST(req: Request, res: any) {
  const { values } = await req.json();
  const { restaurantId } = res.params;
  try {
    const gsapi = await GoogleAuth();
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = "restaurant_details!A:E";
    await gsapi.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            values.driverName,
            values.bottleType,
            values.quantity,
            dayjs(values.date).format("YYYY-DD-MM"),
            restaurantId,
          ],
        ],
      },
    });
    return NextResponse.json("Detail Added", { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something Went Wrong", { status: 400 });
  }
}
