import { Host } from "@/app/_lib/class/Host";
import { Meal } from "@/app/_lib/class/Meal";

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

  getVegetarianMeals() {
    this.meals = this.meals.filter((meal: Meal): boolean => {
      return meal.isVegetarian();
    });
  }

  getMealsWithAllergies(allergies: string[]): Meal[] {
    return this.meals.filter((meal: Meal) => {
      return allergies.some((allergy: string) => {
        return meal.allergies.includes(allergy);
      });
    });
  }

  getRandomMeal(mealsArray: Meal[]): Meal {
    return mealsArray[Math.floor(Math.random() * mealsArray.length)];
  }
}
