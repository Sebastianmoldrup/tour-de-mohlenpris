import { Guest } from "@/app/_lib/class/Guest";

export class SortedGuests {
  guests: Guest[];

  constructor(guests: Guest[]) {
    this.guests = guests;
    // console.log(guests);
  }

  sortByVegeterian(): Guest[] {
    return this.guests.filter(
      (g: Guest) => g.vegeterian && g.vegeterian.toLowerCase() !== "nei",
    );
  }

  sortByAllergic(): Guest[] {
    return this.guests.filter(
      (g: Guest) =>
        g.allergy &&
        (Array.isArray(g.allergy) || g.allergy.toLowerCase() !== "nei"),
    );
  }

  sortByNormal(): Guest[] {
    return this.guests.filter(
      (g: Guest) =>
        !g.allergy ||
        (g.allergy?.toLowerCase() === "nei" && !g.vegeterian) ||
        g.vegeterian === "nei",
    );
  }
}
