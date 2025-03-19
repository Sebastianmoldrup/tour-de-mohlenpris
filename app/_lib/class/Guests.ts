import { Guest } from "@/app/_lib/class/Guest";
import { GuestType } from "@/app/_lib/types";

export class Guests {
  guests: Guest[] = [];

  constructor(guests: GuestType[]) {
    guests.forEach((guest: GuestType) => {
      this.guests.push(new Guest(guest));
    });
  }

  sort(): Guest[] {
    this.guests.sort((a: Guest, b: Guest) => {
      // High priority - allergy
      if (a.allergies.length > 0 && b.allergies.length === 0) return -3;
      if (a.allergies.length === 0 && b.allergies.length > 0) return 3;
      // Moderate priority - vegeterian
      if (a.vegeterian && !b.vegeterian) return -2;
      if (a.vegeterian && b.vegeterian) return 2;
      // Low priority - coguest
      if (a.size > b.size) return -1;
      if (a.size < b.size) return 1;
    });
  }
}
