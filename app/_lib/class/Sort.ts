import { GuestsArray, HostsArray } from "@/app/_lib/types";
import { Host } from "@/app/_lib/class/Host";
import { SortedGuests } from "./SortedGuests";

export class Sort {
  hosts: Host[];
  guests: SortedGuests;

  constructor(hosts: Host[], guests: GuestsArray) {
    this.hosts = hosts;
    this.guests = new SortedGuests(guests);
  }

  asssignGuestsToHosts() {
    const sortedGuests = {
      veg: this.guests.sortByVegeterian(),
      allergic: this.guests.sortByAllergic(),
      normal: this.guests.sortByNormal(),
    };

    const x = this.hosts.filter((host) => {
      return host.isVegeterian();
    });
    console.log(x);

    for (const guest of sortedGuests.veg) {
    }

    // console.log(sortedGuests);
  }
}
