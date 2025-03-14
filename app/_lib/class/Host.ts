import { HostJsonType, GuestType } from "@/app/_lib/types";

export class Host {
  name: string;
  seats: number;
  menu: {
    appetizer: string;
    dinner: string;
    dessert: string;
  };
  dietary: {
    allergy: {
      app: string | null;
      dinner: string | null;
      dessert: string | null;
    };
    veg: {
      app: boolean;
      dinner: boolean;
      dessert: boolean;
    };
  };
  guests: {
    appetizer: string[];
    dinner: string[];
    dessert: string[];
  };

  constructor(host: HostJsonType) {
    this.name = host.name;
    this.seats = host.seats;

    // Host menu
    this.menu = {
      appetizer: host.appetizer,
      dinner: host.dinner,
      dessert: host.dessert,
    };

    // Host meal allergy & vegeterian
    this.dietary = {
      allergy: {
        app: host.appetizer_allergy ?? null,
        dinner: host.dinner_allergy ?? null,
        dessert: host.dessert_allergy ?? null,
      },
      veg: {
        // Removing whitespace and looking for key "vegetar"
        // in allergy to give truthy statement for vegeterian meal
        app: (host.appetizer_allergy || "")
          .split(",")
          .map((x) => x.trim())
          .includes("vegetar"),
        dinner: (host.dinner_allergy || "")
          .split(",")
          .map((x) => x.trim())
          .includes("vegetar"),
        dessert: (host.dessert_allergy || "")
          .split(",")
          .map((x) => x.trim())
          .includes("vegetar"),
      },
    };

    // Host meal guests
    this.guests = {
      appetizer: [],
      dinner: [],
      dessert: [],
    };
  }

  isVegeterian() {
    return Object.values(this.dietary).filter((meal) => meal);
  }

  getSeatings() {
    return this.seats;
  }

  addAppetizerGuest(guest: GuestType) {
    this.guests.appetizer.push(guest.name);
  }

  addDinnerGuest(guest: GuestType) {
    this.guests.dinner.push(guest.name);
  }

  addDessertGuest(guest: GuestType) {
    this.guests.dessert.push(guest.name);
  }
}
