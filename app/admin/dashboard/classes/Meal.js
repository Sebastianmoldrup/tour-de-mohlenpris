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

  // Method to check if a guest can be assigned to the meal based on capacity
  hasCapacity(guest) {
    return this.guestCount + guest.count <= this.capacity;
  }

  // Method to check all host meals guests to see if the guest has visited the host before
  hasGuestVisited(guest) {
    return !this.host.meals.some((meal) => {
      return meal.guests.some((g) => {
        return g === guest;
      });
    });
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
