import { Host } from "@/app/_lib/class/Host";
import { Meal } from "@/app/_lib/class/Meal";
import { Guest } from "./Guest";

export class Meals {
  meals: Meal[];

  constructor(hosts: Host[]) {
    const mealNames = ["appetizer", "dinner", "dessert"];

    this.meals = hosts.flatMap((host: Host): Meal[] => {
      // Use map to create an array of Meal objects for each host
      return mealNames.map((name: string): Meal => {
        return new Meal(host, name);
      });
    });
  }

  getPriority(): Meal[] {
    const vegeterian = this.meals.filter((meal: Meal) => meal.isVegetarian());
    const allergic = this.meals.filter(
      (meal: Meal) => meal.allergies && meal.allergies.length > 0,
    );

    return [...new Set(vegeterian.concat(allergic))];
  }

  getAvailableMeals(
    vegeterian: boolean,
    allergic: boolean,
    guest: Guest,
  ): Meal[] {
    const vegeterianMeals = this.meals.filter((meal: Meal) =>
      meal.isVegetarian(),
    );
    const allergicMeals = this.meals.filter((meal: Meal) =>
      meal.conflictingAllergies(guest.allergy),
    );
    const concat = vegeterianMeals.concat(allergicMeals);

    concat.filter((meal: Meal) => {
      return;
    });

    return [];
  }
}
