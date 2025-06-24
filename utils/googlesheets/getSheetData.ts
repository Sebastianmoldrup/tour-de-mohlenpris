// Import google api dependencies
import { google, sheets_v4 } from "googleapis";
// Import JWT type for Google authentication
import { JWT } from "google-auth-library";
// Import types
import { GuestData, HostData } from "@/types";

// Import formatting for google sheets data
import { formatSheet } from "@/utils/googlesheets/formatSheetData";

// Function to get data from Google Sheets
export const getSheetsData = async (): Promise<{
  hostsData: HostData[];
  guestsData: GuestData[];
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

    // Structure the data into HostData and GuestData using the formatSheet function
    const hostData = formatSheet<HostData>(hostsResponse.data.values || []);
    const guestData = formatSheet<GuestData>(guestsResponse.data.values || []);

    // Return the structured data
    return {
      hostsData: hostData,
      guestsData: guestData,
    };
  } catch (error) {
    // Log error and return empty data on failure
    console.error("Error fetching sheet data:", error);
    return { hostsData: [], guestsData: [] };
  }
};
