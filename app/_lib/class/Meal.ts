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

    // const mealAllergyKey = `${name}_allergy` as keyof Host;
    this.allergies =
      (host[`${name}_allergy` as keyof Host] as string)
        ?.split(",")
        .map((letter: string): string => {
          return letter.trim();
        }) || [];

    this.vegeterian = this.allergies.includes("vegetar");
  }
}
