/*
 *  @Class: Guest
 *  @Params: guest - Object from the Google Sheets api
 *  @Constructor: name, allergies, coguest, vegetarian, count (total count of guest + coguests), meals (array of meal classes assigned)
 *  @Methods:
 *    - UpdateMeal - updates the meal for the guest and the meal's guests
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
    // 1. validate that we can make this chnage
    if (!oldMeal || !newMeal) {
      console.error("Invalid meals provided");
      return false;
    }

    oldMeal.guests = oldMeal.guests.filter((guest) => {
      return guest !== this;
    });

    newMeal.guests.push(this);

    this.meals = this.meals.map((meal) => {
      return meal === oldMeal ? newMeal : meal;
    });

    return true;
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
