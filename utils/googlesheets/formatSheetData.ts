// Function to format Google Sheets data into a structured array of objects
export const formatSheet = <T>(data: string[][]): T[] => {
  // Safety check: if data is empty, return an empty array
  if (!data.length) return [];

  // Destructure the first row for headers and the rest for rows
  const [headersRaw, ...rows] = data;

  // Format headers by trimming, converting to lowercase, and replacing spaces with underscores
  const headers = headersRaw.map((h) =>
    h.trim().toLowerCase().replace(/\s+/g, "_")
  );

  // Return an array of objects where each object corresponds to a row
  // Each object has keys from formatted headers and values from the row, formatted accordingly
  return rows.map((row) => {
    const obj: Record<string, any> = {};
    headers.forEach((header, index) => {
      const formattedHeader = formatHeader(header);
      const formattedValue = formatValue(row[index]);
      obj[formattedHeader] = formattedValue ?? "";
    });
    return obj as T;
  });
};

// Function to format headers from Norwegian to English
const formatHeader = (header: string): string => {
  // English translation object
  const engHeader: Record<string, string> = {
    navn: "name",
    plasser: "seats",
    forret: "appetizer",
    middag: "dinner",
    dessert: "dessert",
    allergi_forret: "allergies_appetizer",
    allergi_middag: "allergies_dinner",
    allergi_dessert: "allergies_dessert",
    fornavn: "name",
    etternavn: "surname",
    allergi: "allergies",
    medgjest: "coguest",
    vegeterianer: "vegeterian",
  };

  return engHeader[header] || header;
};

// Function to format values, handling commas and empty values
const formatValue = (value: string) => {
  // Return empty string if value is falsy
  if (!value) return "";
  // If value contains commas, split it into an array and return trimmed values
  if (value.includes(",")) {
    return value.split(",").map((v) => v.trim());
  }
  // Default case: return the trimmed value
  return value.trim();
};
