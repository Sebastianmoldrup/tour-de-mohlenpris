// Classes
import { Hosts } from "./Hosts.js";
import { Guests } from "./Guests.js";
import { Meals } from "./Meals.js";

export class MealAssignment {
  constructor(hosts, guests) {
    this.hosts = new Hosts(hosts);
    this.guests = new Guests(guests);
    this.meals = new Meals(this.hosts);
    this.mealTypes = ["appetizer", "dinner", "dessert"]; // Meal types based on the Google Sheets api data
  }

  /*
   * @Method: SortGuests
   * @Params:
   * @Returns: Guests list with assigned meals
   * @Description:
   *  - 1. Iterate through each guest
   *  - 2. For each guest, iterate through each meal type
   *  - 3. For each meal type, filter meals for each constraint as to have fall backs meals if none are found
   *    - 3.1. Current meals: all meals of that type that have capacity for the guest
   *    - 3.2. Allergy meals: all meals that are allergy-safe for the guest
   *    - 3.3. New host meals: all meals that the guest has not visited before
   *    - 3.4. New guests meals: all meals that the guest has not met before
   *  - 4. Meal pool: Filtered meals based on the preferred order: newGuests > newHost > allergy-safe > any with type & capacity
   *  - 5. Randomly select a meal from the meal pool and assign the guest to it
   *  - 6. Finally return the list of guests with their assigned meals
   * */
  sortGuests() {
    this.guests.list.forEach((guest) => {
      // console.log(guest.name);
      this.mealTypes.forEach((type) => {
        const currentMeals = this.meals.list.filter(
          (meal) => meal.type === type && meal.hasCapacity(guest),
        );

        if (currentMeals.length === 0) return;

        const allergyMeals = currentMeals.filter((meal) =>
          meal.allergies.every((a) => !guest.allergies.includes(a)),
        );

        const newHostMeals = allergyMeals.filter((meal) =>
          meal.hasGuestVisited(guest),
        );

        const newGuestsMeals = newHostMeals.filter((meal) => {
          if (meal.guests.length === 0) return true;
          return meal.guests.some((mealGuest) =>
            meal.host
              .getAllGuests()
              .some((hostGuest) => !mealGuest.hasMetGuest(hostGuest)),
          );
        });

        // Preferred order: newGuests > newHost > allergy-safe > any with capacity
        const mealPool =
          newGuestsMeals.length > 0
            ? newGuestsMeals
            : newHostMeals.length > 0
              ? newHostMeals
              : allergyMeals.length > 0
                ? allergyMeals
                : currentMeals;

        if (mealPool.length > 0) {
          const randomMeal =
            mealPool[Math.floor(Math.random() * mealPool.length)];
          randomMeal.assignGuest(guest);
        }
      });
    });

    return this.guests.list;
  }

  getMeals() {
    return this.meals.list;
  }

}
