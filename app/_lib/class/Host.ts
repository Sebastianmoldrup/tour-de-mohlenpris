import { HostJsonType } from "@/app/_lib/types";

export class Host {
  name: string;
  seats: number;
  menu: {
    appetizer: string;
    dinner: string;
    dessert: string;
  };
  allergy: {
    app: string | null;
    dinner: string | null;
    dessert: string | null;
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
    this.allergy = {
      app: host.appetizer_allergy ?? null,
      dinner: host.dinner_allergy ?? null,
      dessert: host.dessert_allergy ?? null,
    };

    // Host meal guests
    this.guests = {
      appetizer: [],
      dinner: [],
      dessert: [],
    };
  }
}
