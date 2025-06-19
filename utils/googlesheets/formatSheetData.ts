import { SheetRow } from "@/types";

export const formatSheet = (data: string[][]): SheetRow[] => {
  // If data is empty, return an empty array
  if (!data.length) return [];

  // Destructure and get the first row as headers, and the rest as rows
  const [headersRaw, ...rows] = data;

  // Map over headers to format them
  const headers = headersRaw.map((h) =>
    h.trim().toLowerCase().replace(/\s+/g, "_"),
  );

  // Map over rows to create an array of objects with formatted headers and values
  return rows.map((row) => {
    const obj: SheetRow = {};
    headers.forEach((header, index) => {
      const formattedHeader = formatHeader(header);
      const formattedValue = formatValue(row[index]);
      obj[formattedHeader] = formattedValue ?? "";
    });
    return obj;
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
