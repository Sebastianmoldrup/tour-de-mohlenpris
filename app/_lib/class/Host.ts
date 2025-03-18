import { Guest } from "@/app/_lib/class/Guest";
interface HostType {
  appetizer: string;
  appetizer_allergy: string | null;
  dinner: string;
  dinner_allergy: string | null;
  dessert: string;
  dessert_allergy: string | null;
  id: number;
  name: string;
  seats: number;
  guests: Guest[];
}

export class Host {
  id: number;
  name: string;
  seats: number;
  guests: Guest[];
  appetizer: string;
  appetizer_allergy: string | null;
  dinner: string;
  dinner_allergy: string | null;
  dessert: string;
  dessert_allergy: string | null;

  constructor(host: HostType) {
    this.id = host.id;
    this.name = host.name;
    this.seats = host.seats;
    this.guests = [];
    this.appetizer = host.appetizer;
    this.appetizer_allergy = host.appetizer_allergy;
    this.dinner = host.dinner;
    this.dinner_allergy = host.dinner_allergy;
    this.dessert = host.dessert;
    this.dessert_allergy = host.dessert_allergy;
  }

  setGuest(guest: Guest) {
    return this.guests.push(guest);
  }

  getGuests(): Guest[] {
    return this.guests;
  }
}
