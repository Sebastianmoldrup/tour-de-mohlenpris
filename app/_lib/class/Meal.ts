import { Host } from "@/app/_lib/class/Host";
import { Guest } from "@/app/_lib/class/Guest";

export class Meal {
  host: Host;
  hostName: string;
  name: string;
  allergies: string[];
  vegeterian: boolean;
  seats: number;
  guests: Guest[];

  constructor(host: Host, name: string) {
    this.host = host;
    this.hostName = host.name;
    this.name = name;
    this.seats = host.seats;
    this.guests = [];

    // const mealAllergyKey = `${name}_allergy` as keyof Host;
    this.allergies =
      (host[`${name}_allergy` as keyof Host] as string)
        ?.split(",")
        .map((letter: string): string => {
          return letter.trim();
        }) || [];

    this.vegeterian = this.allergies.includes("vegetar");
  }

  getHost(): Host {
    return this.host;
  }

  available(count: number): boolean {
    return this.seats - this.guests.length >= count;
  }

  setGuest(guest: Guest) {
    return this.guests.push(guest);
  }

  hasVisited(name: string): boolean {
    return this.guests.some((guest: Guest): boolean => {
      return guest.visited.includes(name);
    });
  }

  getCount() {
    return this.guests.reduce((count: number, guest: Guest): number => {
      if (guest.co_guest) {
        return count + guest.count + 1;
      }
      return count + 1;
    }, 0);
  }
}
