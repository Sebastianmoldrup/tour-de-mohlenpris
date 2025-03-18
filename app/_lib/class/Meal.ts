import { Host } from "@/app/_lib/class/Host";
import { Guest } from "@/app/_lib/class/Guest";

export class Meal {
  host: Host;
  hostName: string;
  name: string;
  allergies: string[];
  vegeterian: boolean;
  seats: number;
  guests: Guest[];

  constructor(host: Host, name: string) {
    this.host = host;
    this.hostName = host.name;
    this.name = name;
    this.seats = host.seats;
    this.guests = [];
    this.allergies = this.parseAllergy();
    this.vegeterian = this.parseVegeterian();
  }

  isVegetarian() {
    return this.vegeterian;
  }

  conflictingAllergies(guestAllergies: string[] | null): boolean {
    if (!this.allergies) return false;
    return this.allergies?.some((allergy: string): boolean => {
      return guestAllergies.includes(allergy);
    });
  }

  parseAllergy() {
    return (this.host[`${this.name}_allergy` as keyof Host] as string)
      ?.split(",")
      .map((letter: string) => {
        return letter.trim();
      });
  }

  parseVegeterian() {
    if (!this.allergies) return false;

    return this.allergies.includes("vegetar");
  }
}
