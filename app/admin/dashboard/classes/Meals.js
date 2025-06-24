/*
 * @Class: Meals
 * @Params: hosts - Hosts class instance containing a list of hosts
 * @Constructor: list (array of meal classes from all hosts)
 * @Methods:
 *  - getAvailable - returns all meals of a specific type that have capacity for a guest
 * */
export class Meals {
  constructor(hosts) {
    this.list = hosts.list.flatMap((host) => {
      return host.meals;
    });
  }

  getAvailable(type, guest) {
    return this.list.filter((meal) => {
      return meal.type === type && meal.hasCapacity(guest);
    });
  }
}
