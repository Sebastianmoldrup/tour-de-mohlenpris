import { Guest } from "@/app/_lib/class/Guest";
import { GuestType } from "@/app/_lib/types";
import { Meal } from "./Meal";
import { Meals } from "./Meals";

export class Guests {
  guests: Guest[];

  constructor(guests: GuestType[]) {
    this.guests = guests.map((guest: GuestType) => {
      return new Guest(guest);
    });
  }

  getVegGuests(): Guest[] | [] {
    return (this.guests = this.guests.filter((guest: Guest): boolean => {
      return guest.vegeterian;
    }));
  }

  getAllergyGuests(): Guest[] | [] {
    return this.guests.filter((guest: Guest): boolean => {
      return guest.allergy && guest.allergy.length > 0 ? true : false;
    });
  }

  sortVegGuests(meals: Meals) {
    this.getVegGuests().forEach((guest: Guest) => {
      if (guest.hasVisited(guest.name)) {
        return;
      }

      meals.getRandomMeal(meals.getVegMeals("appetizer")).setGuest(guest);
    });
  }
}
