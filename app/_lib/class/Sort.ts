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
    console.log(this.meals);
  }

  sortVegeterian() {
    const meals = this.meals.getVegetarianMeals();
    const guests = this.guests.getVegetarianGuests();
    console.log(meals);
    console.log(guests);

    guests.forEach((guest: Guest) => {
      this.meals.getRandomMeal(meals).addGuest(guest);
    });
  }
}
