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

  available(count: number): boolean {
    return this.seats - this.guests.length >= count;
  }

  setGuest(guest: Guest) {
    // Add this guest to existing guests' met list
    for (const existingGuest of this.guests) {
      existingGuest.addMetGuest(guest);
      guest.addMetGuest(existingGuest);
    }

    this.guests.push(guest);
    guest.setVisited(this.host);
    return this.host.setGuest(guest);
  }

  hasVisited(value: string): boolean {
    return this.host.getGuests().some((guest: Guest): boolean => {
      return guest.name === value;
    });
  }

  // hasConflictingAllergy(guest: Guest): boolean {
  //   // If guest has no allergies, there's no conflict
  //   if (!guest.allergy || guest.allergy.length === 0) {
  //     return false;
  //   }
  //
  //   // Check if any of the guest's allergies match any of the meal's allergies
  //   // Note: Skip "vegetar" as it's not an allergy but a dietary preference
  //   return guest.allergy.some((allergy) =>
  //     this.allergies.some(
  //       (mealAllergy) =>
  //         mealAllergy !== "vegetar" && mealAllergy === allergy.trim(),
  //     ),
  //   );
  // }
}
