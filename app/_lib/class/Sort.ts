import { Hosts } from "@/app/_lib/class/Hosts";
import { Guests } from "@/app/_lib/class/Guests";

export class Sort {
  #hosts: Hosts;
  #guests: Guests;

  constructor(hosts: Hosts, guests: Guests) {
    console.log(hosts, guests);
    this.#hosts = new Hosts(hosts);
    this.#guests = new Guests(guests);
  }
}
