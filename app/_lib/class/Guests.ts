import { Guest } from "@/app/_lib/class/Guest";
import { GuestType } from "@/app/_lib/types";

export class Guests {
  guests: Guest[];

  constructor(guests: GuestType[]) {
    this.guests = guests.map((guest: GuestType) => {
      return new Guest(guest);
    });
  }

  getPriorityGuests(): Guest[] | [] {
    return this.guests.filter((guest: Guest): boolean => {
      return guest.vegeterian || guest.isAllergic();
    });
  }
}
