import { GuestType } from "@/app/_lib/types";
import { Host } from "@/app/_lib/class/Host";

export class Guest {
  name: string = "";
  allergies: string[] | false | null = [];
  vegeterian: boolean = false;
  coguest: string | null = "";

  constructor(guest: GuestType) {
    this.name = `${guest.name} ${guest.lastName}`;
    this.allergies = guest.allergy?.split(",").map((a: string): string => {
      return a.trim();
    });
    this.allergies = this.allergies?.filter((a: string): boolean => {
      return a.toLowerCase() !== "nei";
    });
  }
}
