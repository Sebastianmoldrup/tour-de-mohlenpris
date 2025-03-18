import { Hosts } from "@/app/_lib/class/Hosts";
import { Guests } from "@/app/_lib/class/Guests";
import { Guest } from "@/app/_lib/class/Guest";
import { GuestType, HostType } from "@/app/_lib/types";
import { Meals } from "@/app/_lib/class/Meals";
import { Meal } from "@/app/_lib/class/Meal";

export class Sort {
  hosts: Hosts;
  guests: Guests;

  constructor(hosts: HostType[], guests: GuestType[]) {
    this.hosts = new Hosts(hosts);
    this.guests = new Guests(guests);
    const meals = new Meals(this.hosts.hosts);

    // First, sort priority guests (vegetarian and/or with allergies)
    console.log("Sorting priority guests...");
    this.sortGuests(this.guests.getPriorityGuests(), meals);

    // Then sort the remaining guests
    console.log("Sorting remaining guests...");
    const remainingGuests = this.guests.guests.filter(
      (guest) => !guest.vegeterian && !guest.isAllergic(),
    );
    this.sortGuests(remainingGuests, meals);

    // Print final assignments for verification
    this.printAssignments();
  }

  sortGuests(guestList: Guest[], meals: Meals): void {
    guestList.forEach((guest: Guest) => {
      console.log(
        `Sorting ${guest.name} (${guest.vegeterian ? "Vegetarian" : "Non-veg"}${guest.isAllergic() ? ", Has allergies" : ""})`,
      );

      // Get appropriate meal types for this guest
      const appetizers = meals.getPriorityMeals("appetizer");
      const dinners = meals.getPriorityMeals("dinner");
      const desserts = meals.getPriorityMeals("dessert");

      // Assign appetizer
      const randomAppetizer = meals.getRandomMeal(appetizers, guest);
      if (randomAppetizer) {
        console.log(
          `${guest.name} assigned to ${randomAppetizer.hostName} for appetizer`,
        );
      } else {
        console.log(`Warning: Could not assign ${guest.name} to any appetizer`);
      }

      // Assign dinner
      const randomDinner = meals.getRandomMeal(dinners, guest);
      if (randomDinner) {
        console.log(
          `${guest.name} assigned to ${randomDinner.hostName} for dinner`,
        );
      } else {
        console.log(`Warning: Could not assign ${guest.name} to any dinner`);
      }

      // Assign dessert
      const randomDessert = meals.getRandomMeal(desserts, guest);
      if (randomDessert) {
        console.log(
          `${guest.name} assigned to ${randomDessert.hostName} for dessert`,
        );
      } else {
        console.log(`Warning: Could not assign ${guest.name} to any dessert`);
      }
    });
  }

  printAssignments(): void {
    console.log("\n--- Final Assignments ---");
    this.hosts.hosts.forEach((host) => {
      console.log(`\nHost: ${host.name}`);
      console.log(
        `Guests: ${host.guests.map((g) => g.name).join(", ") || "None"}`,
      );
    });
  }
}
