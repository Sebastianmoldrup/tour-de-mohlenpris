import { Meal } from "./Meal.js";

/*
 * @Class: Host
 * @Params: host - Object from the Google Sheets api
 * @Constructor: id, name, capacity, array of meal classes
 * @Methods:
 *  - getAllGuests - returns all guests from all meals
 * */
export class Host {
  constructor(host) {
    this.name = host.name;
    this.capacity = host.seats;
    this.meals = ["appetizer", "dinner", "dessert"].map((meal) => {
      const mealObj = {
        name: host[meal],
        allergies: host[`allergies_${meal}`] || [],
        type: meal,
      };

      return new Meal(mealObj, this);
    });
  }

  getAllGuests() {
    return this.meals.flatMap((meal) => {
      return meal.guests.map((guest) => guest);
    });
  }
}
