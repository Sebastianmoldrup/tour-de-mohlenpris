// Import google api dependencies
import { google, sheets_v4 } from "googleapis";
// Import JWT type for Google authentication
import { JWT } from "google-auth-library";
// Import types
import { SheetRow } from "@/types";

// Import formatting for google sheets data
import { formatSheet } from "@/utils/googlesheets/formatSheetData";

export const getSheetsData = async (): Promise<{
  hosts: SheetRow[];
  guests: SheetRow[];
}> => {
  // Set up Google authentication with credentials and read-only scope
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Format Google private key correctly
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  // Get the auth client (JWT type)
  const client = (await auth.getClient()) as JWT;

  // Create a sheets client with the authorized client
  const sheets: sheets_v4.Sheets = google.sheets({
    version: "v4",
    auth: client,
  });

  // Get spreadsheet ID from environment variables
  const spreadsheetId = process.env.GOOGLE_SHEET_ID as string;

  try {
    // Fetch both ranges at the same time
    const [hostsResponse, guestsResponse] = await Promise.all([
      sheets.spreadsheets.values.get({ spreadsheetId, range: "verter!A:Z" }),
      sheets.spreadsheets.values.get({ spreadsheetId, range: "deltakere!A:Z" }),
    ]);

    const hostData = formatSheet(hostsResponse.data.values || []);
    const guestData = formatSheet(guestsResponse.data.values || []);

    // Return the values or empty arrays if no data
    return {
      hosts: hostData,
      guests: guestData,
    };
  } catch (error) {
    // Log error and return empty data on failure
    console.error("Error fetching sheet data:", error);
    return { hosts: [], guests: [] };
  }
};
