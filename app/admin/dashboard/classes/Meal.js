/*
 *  @Class: Meal
 *  @Params: meal - Object from the Google Sheets api, host - Host class instance
 *  @Constructor: type, host, name, capacity, allergies (array of allergies), guests (array of guest classes assigned), guestCount (total count of guests)
 *  @Methods:
 *    - hasCapacity - checks if the meal has capacity for a guest
 *    - getGuestCount - returns the total count of guests in the meal
 *    - hasGuestVisited - checks if a guest has visited the host before
 *    - removeGuest - removes a guest from the meal
 *    - addGuest - adds a guest to the meal
 *    - assignGuest - assigns a guest to the meal and adds the meal to the guest's meals
 * */
export class Meal {
  constructor(meal, host) {
    this.type = meal.type;
    this.host = host;
    this.name = meal.name;
    this.capacity = host.capacity;
    this.allergies = meal.allergies;
    this.allergies = Array.isArray(meal.allergies)
      ? meal.allergies
      : meal.allergies
        ? [meal.allergies]
        : [];
    this.guests = [];
    this.guestCount = 0;
  }

  hasCapacity(guest) {
    return this.getGuestCount() + guest.count <= this.capacity;
  }

  getGuestCount() {
    return this.guests.reduce((count, guest) => {
      return count + guest.count;
    }, 0);
  }

  hasGuestVisited(guest) {
    return !this.host.meals.some((meal) => {
      return meal.guests.some((g) => {
        return g === guest;
      });
    });
  }

  removeGuest(guest) {
    const guestIndex = this.guests.findIndex(
      (g) => g === guest || g.id === guest.id,
    );
    if (guestIndex !== -1) {
      this.guests = [
        ...this.guests.slice(0, guestIndex),
        ...this.guests.slice(guestIndex + 1),
      ];
      this.guestCount -= guest.count;
      return true;
    }
    return false;
  }

  addGuest(guest) {
    if (this.guests.includes(guest)) {
      return false;
    }

    this.guests = [...this.guests, guest];
    this.guestCount += guest.count;
    return true;
  }

  // Method to assign a guest to the meal
  assignGuest(guest) {
    // Add meal to guest class
    guest.addMeal(this);
    // Add guest to the meal guests
    this.guests.push(guest);
    // Add guest count to the meal count
    this.guestCount += guest.count;
  }
}
