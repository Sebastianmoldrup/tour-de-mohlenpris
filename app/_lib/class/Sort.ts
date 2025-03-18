import { Hosts } from "@/app/_lib/class/Hosts";
import { Guests } from "@/app/_lib/class/Guests";
import { Guest } from "@/app/_lib/class/Guest";
import { GuestType, HostType } from "@/app/_lib/types";
import { Meals } from "@/app/_lib/class/Meals";
import { Meal } from "@/app/_lib/class/Meal";

export class Sort {
  hosts: Hosts;
  guests: Guests;
  meals: Meals;

  constructor(hosts: HostType[], guests: GuestType[]) {
    this.hosts = new Hosts(hosts);
    this.guests = new Guests(guests);
    this.meals = new Meals(hosts);
    // console.log(this.meals);
  }

  sortPriority() {
    // console.log(this.guests.getPriority());
    this.guests.getPriority().forEach((guest: Guest) => {
      // console.log(this.meals.getPriority());
      this.meals.getPriority().forEach((meal: Meal) => {
        const host = meal.host;
        const mealName = meal.name;
        const visitedHost = host.visited(guest.name);
        const visitedMeal = guest.hasVisited(mealName);

        if (
          meal.conflictingAllergies(guest.allergy) ||
          (guest.isVegetarian() && !meal.vegeterian)
        ) {
          return;
        }

        // if (!visitedHost && !visitedMeal) {
        //   host.visit(guest.name);
        //   guest.visit(meal);
        // }
      });
    });
  }
}
