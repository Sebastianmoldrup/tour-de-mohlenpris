import { Hosts } from "./Hosts";
import { Guests } from "./Guests";

export class Sort {
  guests = null;
  hosts = null;

  constructor(hosts, guests) {
    this.hosts = new Hosts(hosts);
    this.guests = new Guests(guests);

    // console.log(this.hosts.hosts);
    // console.log(this.guests.guests);
    console.log(
      this.guests.guests.reduce((acc, guest) => {
        return (acc += guest.size);
      }, 0),
    );

    this.guests.sort();

    // adding meals to guests
    this.guests.guests.forEach((guest) => {
      const dessert = this.meals("dessert", guest).at(0);
      // console.log("dessert", dessert);
      dessert.addGuest(guest);
      guest.addMeal(dessert);

      const dinner = this.meals("dinner", guest).at(0);
      dinner.addGuest(guest);
      guest.addMeal(dinner);

      const appetizer = this.meals("appetizer", guest).at(0);
      appetizer.addGuest(guest);
      guest.addMeal(appetizer);
    });

    // this.guests.guests.forEach((guest) => {
    //   console.log(
    //     guest.name.padEnd(30),
    //     guest.size.toString().padEnd(5),
    //     guest.meals[0].host.name.padEnd(30),
    //     guest.meals[1].host.name.padEnd(30),
    //     guest.meals[2].host.name.padEnd(30),
    //   );
    // });
  }

  meals(meal = "meals", guest = null) {
    // console.log(meal, guest);
    if (!guest) return [];

    if (!["appetizer", "dinner", "dessert", "meals"].includes(meal)) {
      throw new Error("Invalid meal name");
    }

    const m = this.hosts.hosts
      .flatMap((host) => host[meal])
      .filter((meal) => {
        if (guest.allergies.some((allergy) => meal.allergies.includes(allergy)))
          return false;

        return true;
      })
      .filter((meal) => {
        // return true;
        return meal.spotsLeft >= guest.size;
      })
      .filter((meal) => {
        // return true;
        // new host for each meal for each guest
        const hosts = guest.meals.flatMap((meal) => meal.host);
        if (hosts.includes(meal.host)) return false;
        return true;
      })
      .sort((a, b) => {
        if (a.spotsLeft > b.spotsLeft) return -1;
        if (a.spotsLeft < b.spotsLeft) return 1;
        return 0;
      });
    // todo: add vegetarian check

    const temp = m.filter((meal) => {
      // guest don't meet other guests twice

      // current guests for this meal
      const guests = meal.guests.flatMap((guest) => guest.name);

      // all other guests that this guest has met
      const otherGuests = guest.otherGuests.flatMap((guest) => guest.name);

      if (otherGuests.some((name) => guests.includes(name))) return false;
      return true;
    });

    if (temp.length) return temp;

    return m;
  }

  getGuests() {
    return this.guests.guests.map((guest) => {
      console.log(guest);
      return {
        name: guest.name,
        coguest: guest.coguests.join(", "),
        appetizer: guest.meals[0].name,
        appetizer_host: guest.meals[0].host.name,
        dinner: guest.meals[1].name,
        dinner_host: guest.meals[1].host.name,
        dessert: guest.meals[2].name,
        dessert_host: guest.meals[2].host.name,
      };
    });
  }

  print() {
    return this.guests.guests.forEach((guest) => {
      console.log(
        guest.name.padEnd(30),
        guest.size.toString().padEnd(5),
        guest.meals[0].host.name.padEnd(30),
        guest.meals[1].host.name.padEnd(30),
        guest.meals[2].host.name.padEnd(30),
      );
    });
  }
}
