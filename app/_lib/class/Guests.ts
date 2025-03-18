import { Guest } from "@/app/_lib/class/Guest";
import { GuestType } from "@/app/_lib/types";

export class Guests {
  guests: Guest[];

  constructor(guests: GuestType[]) {
    this.guests = guests.map((guest: GuestType) => {
      return new Guest(guest);
    });
  }

  getGuests(value: string): Guest[] {
    console.log("val", value);
    return this.guests.filter((guest: Guest) => {
      console.log("guest", guest);
      return guest.name === value;
    });
  }
}
