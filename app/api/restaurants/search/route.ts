/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import GoogleAuth from "../../ApiAuth";
import dayjs from "dayjs";

export async function POST(req: Request) {
  try {
    const gsapi = await GoogleAuth();
    const { values } = await req.json();
    const uniqueRestaurantIds = new Set<number>();

    if (values.dateRange) {
      const dateAfter = dayjs(values.dateRange[0]).format("YYYY-DD-MM");
      const dateBefore = dayjs(values.dateRange[1]).format("YYYY-DD-MM");
      const detailsOpt: any = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        includeGridData: true,
        ranges: ["restaurant_details!D2:D", "restaurant_details!E2:E"],
      };
      const detailsResponse: any = await gsapi.spreadsheets.get(detailsOpt);
      const detailsData: any = detailsResponse.data.sheets[0].data;

      detailsData[0].rowData.forEach((row: any, index: number) => {
        if (row.values && row.values[0].formattedValue) {
          const date = row.values[0]?.formattedValue;
          const restaurantId =
            detailsData[1].rowData[index].values[0]?.formattedValue;
          if (date && restaurantId && date >= dateAfter && date <= dateBefore) {
            uniqueRestaurantIds.add(Number(restaurantId));
          }
        }
      });
    }

    const opt: any = {
      spreadsheetId: process.env.SPREADSHEET_ID,
      includeGridData: true,
      ranges: ["restaurants!A2:A", "restaurants!B2:B", "restaurants!C2:C"],
    };
    const response: any = await gsapi.spreadsheets.get(opt);
    const sheetData: any = response.data.sheets[0].data;
    const extractedValuesA = sheetData[0].rowData
      .map((row: any, index: number) => {
        if (row.values && row.values[0].formattedValue) {
          return {
            id: index + 2,
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

    const combinedValues = extractedValuesA.map(
      (value: any, index: number) => ({
        id: value.id,
        restaurantName: value.restaurantName,
        ltdName: extractedValuesB[index],
        city: extractedValuesC[index],
      })
    );
    const filteredValues = combinedValues.filter((item: any) => {
      // Check if searchValue matches restaurantName or ltdName
      const matchesSearchValue =
        !values.searchValue ||
        item.restaurantName.includes(values.searchValue) ||
        item.ltdName.includes(values.searchValue);

      // Check if dateRange is provided
      if (values.dateRange) {
        // If dateRange is provided, check if the item's id is in uniqueRestaurantIds
        const isIdInDateRange = uniqueRestaurantIds.has(item.id);
        return matchesSearchValue && isIdInDateRange;
      }

      // If dateRange is not provided, only check if searchValue matches
      return matchesSearchValue;
    });

    return NextResponse.json(filteredValues, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 400 });
  }
}
