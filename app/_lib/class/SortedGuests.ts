import { GuestType } from "@/app/_lib/types";

export class SortedGuests {
  guests: GuestType[];

  constructor(guests: GuestType[]) {
    this.guests = guests;
    // console.log(guests);
  }

  sortByVegeterian(): GuestType[] {
    return this.guests.filter(
      (g: GuestType) => g.vegeterian && g.vegeterian.toLowerCase() !== "nei",
    );
  }

  sortByAllergic(): GuestType[] {
    return this.guests.filter(
      (g) =>
        g.allergy &&
        (Array.isArray(g.allergy) || g.allergy.toLowerCase() !== "nei"),
    );
  }

  sortByNormal(): GuestType[] {
    return this.guests.filter(
      (g) =>
        !g.allergy ||
        (g.allergy?.toLowerCase() === "nei" && !g.vegeterian) ||
        g.vegeterian === "nei",
    );
  }
}
