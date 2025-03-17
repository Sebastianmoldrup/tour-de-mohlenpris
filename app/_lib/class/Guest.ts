import { GuestType, MealType } from "@/app/_lib/types";
import { Host } from "@/app/_lib/class/Host";

export class Guest {
  guest: GuestType;
  allergy: string | null | undefined;
  vegeterian: string | null | undefined;
  name: string;
  last_name: string;
  co_guest: string | null | undefined;
  phone: number | undefined;
  count: number;
  visited: {
    app: Host[];
    dinner: Host[];
    dessert: Host[];
  };

  constructor(guest: GuestType) {
    this.guest = guest;
    this.allergy = guest.allergy;
    this.vegeterian = guest.vegeterian;
    this.name = guest.name;
    this.last_name = guest.last_name;
    this.phone = guest.phone;
    this.co_guest = guest.co_guest;
    this.count = this.getGuestCount();
    this.visited = {
      app: [],
      dinner: [],
      dessert: [],
    };
  }

  getGuestCount(): number {
    if (this.co_guest) {
      return this.co_guest.split(",").length + 1;
    } else {
      return 1;
    }
  }

  hasVisited(meal: MealType): boolean {
    return this.visited[meal].length > 0 ? true : false;
  }

  setVisited(meal: MealType, host: Host): void {
    console.log("set visited");
    this.visited[meal].push(host);
    return;
  }
}
