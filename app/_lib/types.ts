export interface GuestType {
  name: string;
  last_name: string;
  allergy?: string | null;
  co_guest?: string | null;
  vegeterian?: string | null;
  phone?: number;
}
export type GuestsArray = GuestType[];

export interface HostJsonType {
  name: string;
  seats: number;
  appetizer: string;
  appetizer_allergy?: string | null;
  dinner: string;
  dinner_allergy?: string | null;
  dessert: string;
  dessert_allergy?: string | null;
}

export interface HostType extends HostJsonType {
  menu: {
    appetizer: string;
    dinner: string;
    dessert: string;
  };
  dietary: {
    allergy: {
      app: string | null;
      dinner: string | null;
      dessert: string | null;
    };
    veg: {
      app: boolean;
      dinner: boolean;
      dessert: boolean;
    };
  };
  guests: {
    appetizer: string[];
    dinner: string[];
    dessert: string[];
  };
}
export type HostsArray = HostType[];
