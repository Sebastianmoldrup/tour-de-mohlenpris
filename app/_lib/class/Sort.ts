import { Host } from "@/app/_lib/class/Host";
import { Guest } from "@/app/_lib/class/Guest";
import { SortedGuests } from "./SortedGuests";
import { GuestType, HostType, MealType } from "../types";

export class Sort {
  hosts: Host[];
  guests: SortedGuests;

  constructor(hosts: Host[], guests: Guest[]) {
    this.hosts = hosts;
    this.guests = new SortedGuests(guests);
  }

  assignGuestsToHosts() {
    const sortedGuests = {
      veg: this.guests.sortByVegeterian(),
      allergic: this.guests.sortByAllergic(),
      normal: this.guests.sortByNormal(),
    };

    // Iterate over vegeterian guests
    sortedGuests.veg.forEach((guest: Guest) => {
      // Store the meals
      const meals: MealType[] = ["app", "dinner", "dessert"];
      // Parse the allergy string to an array & remove white space
      const allergies = guest.allergy?.split(",").map((letter) => {
        return letter.trim();
      });
      // console.log("sorting by veg");

      // Iterare over the meals
      meals.forEach((meal: MealType) => {
        // Safeguard to goto next iteration if the guest has a host for this meal
        if (guest.hasVisited(meal)) {
          return;
        }

        // console.log("sorting by meal");
        // Iterate over the hosts
        this.hosts.forEach((host: Host) => {
          // console.log(host.allergy[meal]);
          const parseMeal = host.allergy[meal]
            ?.split(",")
            .map((letter: string) => {
              return letter.trim();
            });
          const setMeal = new Set(parseMeal);
          // console.log(setMeal.size);

          if (allergies && setMeal.size > 0) {
            allergies.forEach((allergy) => {
              console.log(allergy);
              console.log(setMeal.has(allergy));
              if (allergy && setMeal.has(allergy)) {
                console.log(allergies, setMeal);
              }
              // console.log(setMeal.has(allergy));
            });
          }
        });
      });

      // ["app", "dinner", "dessert"].forEach((meal) => {
      //   this.hosts.forEach((host: HostType) => {
      //     if (host.allergy[meal]) {
      //       // console.log(guest, host, meal);
      //       host.allergy[meal]
      //         .split(",")
      //         .map((letter: string) => {
      //           letter.trim();
      //         })
      //         .filter((allergy: string) => {
      //           console.log(allergy, guest.allergy);
      //         });
      //     }
      //   });
      // });
    });

    // sortedGuests.allergic.forEach((guest) => {});
    //
    // sortedGuests.normal.forEach((guest) => {});
  }

  parseMeal(meal: MealType) {
    return meal
      ? meal.split(",").map((letter) => {
          return letter.trim();
        })
      : null;
  }
}
