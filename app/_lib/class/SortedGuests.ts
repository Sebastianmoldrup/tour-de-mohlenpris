import { GuestsArray } from "@/app/_lib/types";

export class SortedGuests {
  guests: GuestsArray;

  constructor(guests: GuestsArray) {
    this.guests = guests;
    // console.log(guests);
  }

  sortByVegeterian() {
    return this.guests.filter(
      (g) => g.vegeterian && g.vegeterian.toLowerCase() !== "nei",
    );
  }

  sortByAllergic() {
    return this.guests.filter(
      (g) =>
        g.allergy &&
        (Array.isArray(g.allergy) || g.allergy.toLowerCase() !== "nei"),
    );
  }

  sortByNormal() {
    return this.guests.filter(
      (g) =>
        !g.allergy ||
        (g.allergy?.toLowerCase() === "nei" && !g.vegeterian) ||
        g.vegeterian === "nei",
    );
  }
}
