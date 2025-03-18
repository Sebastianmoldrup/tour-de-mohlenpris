import { Hosts } from "@/app/_lib/class/Hosts";
import { Guests } from "@/app/_lib/class/Guests";
import { Guest } from "@/app/_lib/class/Guest";
import { GuestType, HostType } from "@/app/_lib/types";
import { Meals } from "@/app/_lib/class/Meals";

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

  sortVegeterian() {
    const vegMeals = this.meals.getVegetarianMeals();
    const vegGuests = this.guests.getVegetarianGuests();

    // Check if vegMeals is properly returning an array
    if (vegMeals && vegMeals.length > 0) {
      vegGuests.forEach((guest: Guest) => {
        // Make sure we're passing the array to getRandomMeal
        const randomMeal = this.meals.getRandomMeal(vegMeals);
        // Check if randomMeal is actually a Meal object
        if (randomMeal) {
          randomMeal.addGuest(guest);
        }
      });
    }
  }
}
