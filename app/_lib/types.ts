export interface GuestType {
  allergy: string | null;
  co_guest: string | null;
  id: number;
  last_name: string;
  name: string;
  vegeterian: string | null;
}

export interface HostType {
  appetizer: string;
  appetizer_allergy: string | null;
  dinner: string;
  dinner_allergy: string | null;
  dessert: string;
  dessert_allergy: string | null;
  id: number;
  name: string;
  seats: number;
}
