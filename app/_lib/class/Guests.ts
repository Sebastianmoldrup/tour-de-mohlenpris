import { Guest } from "@/app/_lib/class/Guest";
import { GuestType } from "@/app/_lib/types";

export class Guests {
  guests: Guest[];

  constructor(guests: GuestType[]) {
    this.guests = guests.map((guest: GuestType) => {
      return new Guest(guest);
    });
  }

  getPriority(): Guest[] {
    const vegeterians = this.guests.filter((guest) => guest.isVegetarian());
    const allergic = this.guests.filter((guest) => guest.isAllergic());

    return [...new Set(vegeterians.concat(allergic))];
  }
}
