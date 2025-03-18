import { Hosts } from "@/app/_lib/class/Hosts";
import { Guests } from "@/app/_lib/class/Guests";
import { Guest } from "@/app/_lib/class/Guest";
import { GuestType, HostType } from "@/app/_lib/types";
import { Meals } from "@/app/_lib/class/Meals";
import { Meal } from "@/app/_lib/class/Meal";

export class Sort {
  hosts: Hosts;
  guests: Guests;

  constructor(hosts: HostType[], guests: GuestType[]) {
    this.hosts = new Hosts(hosts);
    this.guests = new Guests(guests);

    const meals = new Meals(this.hosts.hosts);

    this.guests.getVegGuests().forEach((guest: Guest) => {
      const appetizer = meals.getVegMeals("appetizer");
      const dinner = meals.getVegMeals("dinner");
      const dessert = meals.getVegMeals("dessert");

      meals.getRandomMeal(appetizer, guest);
      meals.getRandomMeal(dinner, guest);
      meals.getRandomMeal(dessert, guest);

      // for (const meal of appetizer) {
      //   if (!guest.hasVisited(meal.hostName) && meal.available(guest.count)) {
      //     meal.setGuest(guest);
      //     break;
      //   }
      // }
      //
      // for (const meal of dinner) {
      //   if (!guest.hasVisited(meal.hostName) && meal.available(guest.count)) {
      //     meal.setGuest(guest);
      //     break;
      //   }
      // }
    });

    this.guests.getAllergyGuests().forEach((guest: Guest) => {});
    console.log("meal", meals);
  }
}
