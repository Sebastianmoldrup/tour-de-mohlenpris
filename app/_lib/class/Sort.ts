import { Host } from "@/app/_lib/class/Host";
import { Guest } from "@/app/_lib/class/Guest";
import { SortedGuests } from "./SortedGuests";
import { GuestType, HostType, MealType } from "../types";

export class Sort {
  hosts: Host[];
  guests: SortedGuests;
  meals: MealType[];

  constructor(hosts: Host[], guests: Guest[]) {
    this.hosts = hosts;
    this.guests = new SortedGuests(guests);
    this.meals = ["app", "dinner", "dessert"];
  }

  assignGuestsToHosts() {
    const sortedGuests = {
      veg: this.guests.sortByVegeterian(),
      allergic: this.guests.sortByAllergic(),
      normal: this.guests.sortByNormal(),
    };

    for (const key of Object.keys(
      sortedGuests,
    ) as (keyof typeof sortedGuests)[]) {
      // console.log(key);
      if (!sortedGuests[key]) {
        return;
      }

      for (const guest of sortedGuests[key]) {
        // console.log(key, guest);
        const vegeterian = guest.vegeterian;
        const allergy = guest.allergy.split(",").map((l: string): string => {
          return l.trim();
        });

        for (const host of this.hosts) {
          if (vegeterian && vegeterian === "ja") {
            for (const meal of this.meals) {
              // console.log(host.allergy[meal]?.includes("vegetar"));
              if (
                host.allergy[meal]?.includes("vegetar") &&
                !guest.hasVisited(meal)
              ) {
                console.log(host.allergy[meal], meal);
                guest.setVisited(meal, host);
              }
            }
          }
          console.log(guest);
        }
      }
    }

    // for (let i = 0; i < .length; i++) {
    //   const meals: MealType[] = ["app", "dinner", "dessert"];
    //   const allergies = guest.allergy
    //     ?.split(",")
    //     .map((letter: string): string => {
    //       return letter.trim();
    //     });
    //   for (let j = 0; j < meals.length; i++) {}
    // }

    // Iterate over vegeterian guests
    // sortedGuests.veg.forEach((guest: Guest) => {
    //   // Store the meals
    //   const meals: MealType[] = ["app", "dinner", "dessert"];
    //   // Parse the allergy string to an array & remove white space
    //   const allergies = guest.allergy?.split(",").map((letter) => {
    //     return letter.trim();
    //   });
    //   // console.log("sorting by veg");
    //
    //   // Iterare over the meals
    //   meals.forEach((meal: MealType) => {
    //     // Safeguard to goto next iteration if the guest has a host for this meal
    //     if (guest.hasVisited(meal)) {
    //       return;
    //     }
    //
    //     // console.log("sorting by meal");
    //     // Iterate over the hosts
    //     this.hosts.forEach((host: Host) => {
    //       // console.log(host.allergy[meal]);
    //       const parseMeal = host.allergy[meal]
    //         ?.split(",")
    //         .map((letter: string) => {
    //           return letter.trim();
    //         });
    //       const setMeal = new Set(parseMeal);
    //       // console.log(setMeal.size);
    //       console.log(host);
    //
    //       if (allergies && setMeal.size > 0) {
    //         allergies.forEach((allergy) => {
    //           // console.log(allergy);
    //           // console.log(setMeal.has(allergy));
    //           if (allergy && setMeal.has(host.allergy[meal])) {
    //             console.log(allergies, setMeal);
    //           }
    //           // console.log(setMeal.has(allergy));
    //         });
    //       }
    //     });
    //   });
    // });

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
