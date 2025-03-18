import { GuestType } from "@/app/_lib/types";
import { Host } from "@/app/_lib/class/Host";
import { Meal } from "@/app/_lib/class/Meal";

export class Guest {
  id: number;
  name: string;
  last_name: string;
  allergy: string[] | null;
  vegeterian: boolean;
  co_guest: string | null;
  count: number;
  visited: Host[];
  metGuests: Guest[];
  constructor(guest: GuestType) {
    this.id = guest.id;
    this.name = guest.name;
    this.last_name = guest.last_name;
    this.allergy =
      guest.allergy && guest.allergy !== "nei"
        ? guest.allergy
            .toLowerCase()
            .split(",")
            .map((letter: string): string => {
              return letter.trim();
            })
        : null;
    this.vegeterian =
      guest.vegeterian && guest.vegeterian.toLowerCase() === "ja"
        ? true
        : false;
    this.co_guest = guest.co_guest;
    this.count = !guest.co_guest
      ? 1
      : guest.co_guest.split(",").map((letter: string): string => {
          return letter.trim();
        }).length + 1;
    this.visited = [];
    this.metGuests = [];
  }

  hasVisited(name: string): boolean {
    if (this.visited.length === 0) {
      return false;
    }

    return this.visited.some((host: Host): boolean => {
      return host.name === name;
    });
  }

  setVisited(host: Host) {
    this.visited.push(host);
  }

  hasMet(guest: Guest) {
    return this.metGuests?.some((met: Guest): boolean => {
      return met.name === guest.name;
    });
  }

  setMet(guest: Guest) {
    return this.metGuests.push(guest);
  }
}
