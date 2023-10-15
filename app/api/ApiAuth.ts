import { NextResponse } from "next/server";
import { google } from "googleapis";
import keys from "../../boni-test-1.json";

const GoogleAuth = async () => {
  const client = new google.auth.JWT(process.env.client_email, "", process.env.private_key, [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ]);

  client.authorize(async function (err, tokens) {
    if (err) {
      return NextResponse.json("Error In Auth", { status: 403 });
    }
  });

  const gsapi = google.sheets({
    version: "v4",
    auth: client,
  });
  return gsapi;
};

export default GoogleAuth;
