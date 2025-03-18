interface GuestType {
  allergy: string | null;
  co_guest: string | null;
  id: number;
  last_name: string;
  name: string;
  vegeterian: string | null;
}

export class Guest {
  #id: number;
  #name: string;
  #last_name: string;
  #allergy: string | null;
  #vegeterian: string | null;
  #co_guest: string | null;
  constructor(guest: GuestType) {
    this.#id = guest.id;
    this.#name = guest.name;
    this.#last_name = guest.last_name;
    this.#allergy = guest.allergy;
    this.#vegeterian = guest.vegeterian;
    this.#co_guest = guest.co_guest;
  }
}
