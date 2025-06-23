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
