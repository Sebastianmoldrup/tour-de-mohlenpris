/*
 *  @Class: Guest
 *  @Params: guest - Object from the Google Sheets api
 *  @Constructor: name, allergies, coguest, vegetarian, count (total count of guest + coguests), meals (array of meal classes assigned)
 *  @Methods:
 *    - hasMetGuest - checks if the guest has met another guest
 *    - addMeal - adds a meal to the guest's meals
 *    - GetAllMealGuests - returns all guests from all meals the guest has attended
 * */
export class Guest {
  constructor(guest) {
    this.name = `${guest.name.toLowerCase()} ${guest.surname.toLowerCase()}`;
    this.allergies = Array.isArray(guest.allergies)
      ? guest.allergies
      : guest.allergies
        ? [guest.allergies]
        : [];
    this.coguest = Array.isArray(guest.coguest)
      ? guest.coguest
      : guest.coguest
        ? guest.coguest.split(",").map((c) => c.trim())
        : [];
    this.vegeterian =
      guest.vegeterian && guest.vegeterian.toLowerCase() === "ja"
        ? true
        : false;
    this.count = this.coguest.length + 1; // Include the guest themselves
    this.meals = [];
  }

  updateMeal(oldMeal, newMeal) {
    // Remove guest from the old meal's guest list
    oldMeal.guests = oldMeal.guests.filter((g) => g !== this);
    oldMeal.guestCount -= this.count;

    // Remove the old meal from the guest
    this.meals = this.meals.filter((m) => m !== oldMeal);

    // Add the new meal to the guest
    this.meals.push(newMeal);

    // Add the guest to the new meal
    newMeal.guests.push(this);
    newMeal.guestCount += this.count;
  }

  hasMetGuest(guest) {
    return this.meals.some((meal) => {
      return meal.hasGuestVisited(guest);
    });
  }

  addMeal(meal) {
    this.meals.push(meal);
  }

  getAllMealGuests() {
    return this.meals.flatMap((meal) => {
      return meal.guests.map((guest) => {
        return guest;
      });
    });
  }
}
