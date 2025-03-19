import { Meal } from "./Meal.js";

export class Meals {
  #meals = [];
  constructor(host, data) {
    this.meals.push(
      new Meal({
        host: host,
        type: "appetizer",
        name: data.appetizer,
        allergies: data.appetizer_allergy
          ? data.appetizer_allergy
              .split(",")
              .map((allergy) => allergy.trim())
              .filter((allergy) => allergy !== "")
          : [],
      }),
    );
    this.meals.push(
      new Meal({
        host: host,
        type: "dinner",
        name: data.dinner,
        allergies: data.dinner_allergy
          ? data.dinner_allergy
              .split(",")
              .map((allergy) => allergy.trim())
              .filter((allergy) => allergy !== "")
          : [],
      }),
    );
    this.meals.push(
      new Meal({
        host: host,
        type: "dessert",
        name: data.dessert,
        allergies: data.dessert_allergy
          ? data.dessert_allergy
              .split(",")
              .map((allergy) => allergy.trim())
              .filter((allergy) => allergy !== "")
          : [],
      }),
    );
  }

  get meals() {
    return this.#meals;
  }

  get appetizer() {
    return this.#meals.find((meal) => meal.type === "appetizer");
  }

  get dinner() {
    return this.#meals.find((meal) => meal.type === "dinner");
  }

  get dessert() {
    return this.#meals.find((meal) => meal.type === "dessert");
  }
}
