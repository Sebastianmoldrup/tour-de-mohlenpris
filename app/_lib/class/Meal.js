export class Meal {
  name = "";
  allergies = [];
  guests = [];
  host = null;
  type = "";

  constructor(meal) {
    this.name = meal.name;
    this.allergies = meal.allergies;
    this.host = meal.host;
    this.type = meal.type;
  }

  addGuest(guest) {
    this.guests.push(guest);
  }

  get spotsLeft() {
    const guests = this.guests.reduce((acc, guest) => acc + guest.size, 0);
    return this.host.seats - guests;
  }

  get allergy() {
    return this.allergies;
  }

  get seats() {
    return this.host.seats;
  }
  get numberOfGuests() {
    return this.guests.reduce((acc, guest) => acc + guest.size, 0);
  }
}
