import { Guest } from "./Guest.js";

export class Guests {
  guests = [];

  constructor(guests) {
    console.log("guests", guests);
    guests.forEach((guest) => {
      this.guests.push(new Guest(guest));
    });
  }

  sort() {
    this.guests.sort((a, b) => {
      if (a.allergies.length > 0 && b.allergies.length === 0) return -3;
      if (a.allergies.length === 0 && b.allergies.length > 0) return 3;
      if (a.vegetarian && !b.vegetarian) return -2;
      if (!a.vegetarian && b.vegetarian) return 2;
      if (a.size > b.size) return -1;
      if (a.size < b.size) return 1;
      return 0;
    });
  }
}
