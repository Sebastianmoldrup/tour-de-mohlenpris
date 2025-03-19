import { Meals } from "@/app/_lib/class/Meals";
import { Guest } from "@/app/_lib/class/Guest";
import { Meal } from "./Meal";

interface HostType {
  name: string;
  seats: number;
}

export class Host {
  name: string = "";
  seats: number = 0;
  #meals: Meals;

  constructor(host: HostType) {
    this.name = host.name;
    this.seats = host.seats;
    this.#meals = new Meals(this, host);
  }

  addGuest(guest: Guest): boolean {
    if (this.guests.length < this.seats) return false;

    this.guests.push(guest);
    return true;
  }

  get guests(): Guest[] {
    return this.#meals.flatMap((meal) => meal.guest);
  }

  get meals() {
    return this.#meals.meals;
  }

  get appetizer(): Meal {
    return this.#meals.appetizer;
  }

  get dinner(): Meal {
    return this.#meals.dinner;
  }

  get dessert(): Meal {
    return this.#meals.dessert;
  }

  get allergies() {
    return new Set(this.#meals.flatMap((meal) => meal.allergies));
  }
}
