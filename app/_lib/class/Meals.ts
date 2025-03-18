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

  getPriorityMeals(value: string): Meal[] {
    return this.meals.filter((meal: Meal): boolean => {
      // Return meals that match the requested type (appetizer, dinner, dessert)
      return meal.name === value;
    });
  }

  getRandomMeal(value: Meal[], guest: Guest): Meal | null {
    if (value.length === 0) {
      console.log("No meals available");
      return null;
    }

    // Filter meals that match all criteria for this guest
    const availableMeals = value.filter((meal: Meal): boolean => {
      // Check if the meal has enough seats and the guest hasn't visited this host
      if (!meal.available(guest.count) || meal.hasVisited(guest.name)) {
        return false;
      }

      // Check vegetarian requirement
      if (guest.vegeterian && !meal.vegeterian) {
        return false;
      }

      // Check for allergy conflicts
      if (guest.isAllergic() && guest.allergy) {
        // Check if any of the guest's allergies conflict with meal allergies
        // Skip "vegetar" as it's not an allergy but a dietary preference
        for (const allergy of guest.allergy) {
          if (
            allergy !== "nei" &&
            meal.allergies.some(
              (mealAllergy) =>
                mealAllergy !== "vegetar" && mealAllergy === allergy,
            )
          ) {
            return false;
          }
        }
      }

      // Check if the guest would meet someone they've already met
      const wouldMeetAgain = meal.guests.some(
        (existingGuest) =>
          guest.hasMet(existingGuest) || existingGuest.hasMet(guest),
      );

      // Only consider this constraint if there are enough options
      if (wouldMeetAgain && availableMeals.length > 1) {
        return false;
      }

      return true;
    });

    if (availableMeals.length === 0) {
      console.log(
        `No suitable ${value[0]?.name || "meals"} available for ${guest.name}`,
      );
      return null;
    }

    // Select a random meal from available options
    const randomIndex = Math.floor(Math.random() * availableMeals.length);
    const selectedMeal = availableMeals[randomIndex];

    // Mark the meal as assigned to this guest
    selectedMeal.setGuest(guest);

    return selectedMeal;
  }
}
