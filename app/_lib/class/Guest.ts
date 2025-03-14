import { GuestType } from "@/app/_lib/types";

export class Guest {
  guest: GuestType;
  allergy: string | null | undefined;
  vegeterian: string | null | undefined;
  name: string;
  last_name: string;
  co_guest: string | null | undefined;
  phone: number | undefined;
  count: number;

  constructor(guest: GuestType) {
    this.guest = guest;
    this.allergy = guest.allergy;
    this.vegeterian = guest.vegeterian;
    this.name = guest.name;
    this.last_name = guest.last_name;
    this.phone = guest.phone;
    this.co_guest = guest.co_guest;
    this.count = this.getGuestCount();
  }

  getGuestCount() {
    if (this.co_guest) {
      return this.co_guest.split(",").length + 1;
    } else {
      return 1;
    }
  }
}
