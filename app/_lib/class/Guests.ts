import { Guest } from "@/app/_lib/class/Guest";

// interface GuestType {
//   allergy: string | null;
//   co_guest: string | null;
//   id: number;
//   last_name: string;
//   name: string;
//   vegeterian: string | null;
// }

export class Guests {
  #guests: Guest[];
  constructor(guests: Guest[]) {
    this.#guests = guests.map((guest: Guest) => {
      return new Guest(guest);
    });
  }
}
