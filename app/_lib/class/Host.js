import { Meals } from "./Meals.js";

export class Host {
  name = "";
  #meals = null;
  seats = 0;

  constructor(host) {
    this.name = host.name;
    this.seats = host.seats;
    this.#meals = new Meals(this, host);
  }

  addGuest(guest) {
    if (this.guests.length >= seats) return false;

    this.guests.push(guest);
    return true;
  }

  get guests() {
    return this.#meals.flatMap((meal) => meal.guest);
  }

  get meals() {
    return this.#meals.meals;
  }

  get appetizer() {
    return this.#meals.appetizer;
  }

  get dinner() {
    return this.#meals.dinner;
  }

  get dessert() {
    return this.#meals.dessert;
  }

  get allergies() {
    return new Set(this.meals.flatMap((meal) => meal.allergies));
  }
}
