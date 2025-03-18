interface HostType {
  appetizer: string;
  appetizer_allergy: string | null;
  dinner: string;
  dinner_allergy: string | null;
  dessert: string;
  dessert_allergy: string | null;
  id: number;
  name: string;
  seats: number;
  visited: Set<string>;
}

export class Host {
  id: number;
  name: string;
  seats: number;
  visited: Set<string>;
  appetizer: string;
  appetizer_allergy: string | null;
  dinner: string;
  dinner_allergy: string | null;
  dessert: string;
  dessert_allergy: string | null;

  constructor(host: HostType) {
    this.id = host.id;
    this.name = host.name;
    this.seats = host.seats;
    this.visited = new Set();
    this.appetizer = host.appetizer;
    this.appetizer_allergy = host.appetizer_allergy;
    this.dinner = host.dinner;
    this.dinner_allergy = host.dinner_allergy;
    this.dessert = host.dessert;
    this.dessert_allergy = host.dessert_allergy;
  }

  visit(name: string): Set<string> {
    return this.visited.add(name); // Add an item to the Set
  }

  hasVisited(name: string): boolean {
    return this.visited.has(name); // Check if the item is in the Set
  }
}
