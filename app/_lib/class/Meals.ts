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

  getVisited(value: string) {
    return this.meals.filter((meal: Meal): boolean => {
      return meal.name === value;
    });
  }

  getVegMeals(value: Meal): Meal[] {
    return this.meals.filter((meal: Meal): boolean => {
      return meal.name === value.name;
    });
  }

  getAllergyMeals(value: string): Meal[] {
    return this.meals.filter((meal: Meal): boolean => {
      return !meal.allergies.includes(value);
    });
  }

  getRandomMeal(value: Meal[], guest: Guest): Meal | null {
    if (value.length === 0) {
      return null; // No meals available
    }

    const randomIndex = Math.floor(Math.random() * value.length);
    const randomMeal = value[randomIndex];

    console.log(this.getVisited(value));

    // Check if the guest has already visited this host
    if (guest.hasVisited(randomMeal.hostName)) {
      // If so, try again with the remaining meals
      return this.getRandomMeal(
        value.filter((meal) => meal !== randomMeal), // Exclude the conflicting meal
        guest,
      );
    }

    // Assign the guest to the meal and mark the host as visited
    randomMeal.setGuest(guest);
    guest.setVisited(randomMeal.getHost());

    return randomMeal; // Return the assigned meal
  }
}
