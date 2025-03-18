import { Hosts } from "@/app/_lib/class/Hosts";
import { Guests } from "@/app/_lib/class/Guests";
import { Guest } from "@/app/_lib/class/Guest";
import { GuestType, HostType } from "@/app/_lib/types";
import { Meals } from "@/app/_lib/class/Meals";

export class Sort {
  hosts: Hosts;
  guests: Guests;

  constructor(hosts: HostType[], guests: GuestType[]) {
    this.hosts = new Hosts(hosts);
    this.guests = new Guests(guests);

    console.log(this.guests.getGuests("appetizer"));
  }
}
