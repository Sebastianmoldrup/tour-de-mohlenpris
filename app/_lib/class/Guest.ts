import { GuestType } from "@/app/_lib/types";
import { Meal } from "@/app/_lib/class/Meal";

export class Guest {
  id: number;
  name: string;
  last_name: string;
  allergy: string[] | null;
  vegeterian: boolean;
  co_guest: string | null;
  count: number;
  visited: Meal[];
  constructor(guest: GuestType) {
    this.id = guest.id;
    this.name = guest.name;
    this.last_name = guest.last_name;
    this.visited = [];
    this.allergy = this.parseAllergy(guest.allergy);
    this.vegeterian = this.parseVegeterian(guest.vegeterian);
    this.co_guest = guest.co_guest;
    this.count = this.parseCount(guest.co_guest);
  }

  isVegetarian(): boolean {
    return this.vegeterian;
  }

  isAllergic(): boolean {
    if (!this.allergy) return false;
    return true;
  }

  hasVisited(name: string): boolean {
    return this.visited.some((meal: Meal): boolean => {
      return meal.name === name;
    });
  }

  parseAllergy(value: string | null): string[] | null {
    if (!value) return null;

    const arr = value.toLowerCase().split(",");

    if (arr.length === 1 && arr[0] === "nei") return null;

    return arr.map((letter: string): string => {
      return letter.trim();
    });
  }

  parseVegeterian(value: string | null): boolean {
    if (!value || value === "nei") return false;

    return value.toLowerCase() === "ja" ? true : false;
  }

  parseCount(value: string | null): number {
    if (!value) return 1;

    return (
      value.split(",").map((letter: string): string => {
        return letter.trim();
      }).length + 1
    );
  }
}
