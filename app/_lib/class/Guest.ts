import { GuestType } from "@/app/_lib/types";
import { Host } from "@/app/_lib/class/Host";
import { Meal } from "@/app/_lib/class/Meal";

export class Guest {
  id: number;
  name: string;
  last_name: string;
  allergy: string[] | null;
  vegeterian: boolean;
  co_guest: string | null;
  count: number;
  visited: Host[];
  metGuests: Guest[];
  constructor(guest: GuestType) {
    this.id = guest.id;
    this.name = guest.name;
    this.last_name = guest.last_name;
    this.allergy = this.parseAllergy(guest.allergy);
    this.vegeterian = this.parseVegeterian(guest.vegeterian);
    this.co_guest = guest.co_guest;
    this.count = this.parseCount(guest.co_guest);
    this.visited = [];
    this.metGuests = [];
  }
  // Add to Guest class
  hasMet(guest: Guest): boolean {
    return this.metGuests.some((metGuest) => metGuest.id === guest.id);
  }

  addMetGuest(guest: Guest): void {
    this.metGuests.push(guest);
  }

  hasVisited(name: string): boolean {
    if (this.visited.length === 0) {
      return false;
    }

    return this.visited.some((host: Host): boolean => {
      return host.name === name;
    });
  }

  setVisited(host: Host) {
    this.visited.push(host);
  }

  isAllergic(): boolean {
    if (!this.allergy || (this.allergy && this.allergy.includes("nei"))) {
      return false;
    }

    return true;
  }

  parseVegeterian(value: string | null): boolean {
    if (!value) return false;
    return value.toLowerCase().split(",").includes("ja");
  }

  parseAllergy(value: string | null): string[] | null {
    if (!value) return null;
    return value
      .toLowerCase()
      .split(",")
      .map((letter: string): string => {
        return letter.trim();
      });
  }

  parseCount(value: string | null): number {
    if (!value) return 1;
    return value.split(",").length + 1;
  }
}
