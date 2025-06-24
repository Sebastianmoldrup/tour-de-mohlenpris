// Google Sheets API types
export type SheetRow = Record<string, string | string[]>;

// Google Sheets format data
export interface HostData {
  name: string;
  seats: string;
  appetizer: string;
  allergies_appetizer: string | string[];
  dinner: string;
  allergies_dinner: string | string[];
  dessert: string;
  allergies_dessert: string | string[];
}

export interface GuestData {
  name: string;
  surname: string;
  coguest: string;
  allergies: string | string[];
  vegetarian: string;
}

// Print page data types
export interface PrintMeal {
  name: string;
  host: string;
  allergies?: string[] | string;
}

export interface PrintGuest {
  name: string;
  coguest?: string;
  allergies?: string | string[];
  meals: PrintMeal[];
}
