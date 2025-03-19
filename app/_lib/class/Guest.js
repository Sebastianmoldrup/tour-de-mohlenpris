export class Guest {
  name = "";
  coguests = [];
  allergies = [];
  vegetarian = false;
  meals = [];

  constructor(guest) {
    // console.log("guest", guest);
    this.name = guest.name + " " + guest.last_name;
    this.allergies = this.parseAllergies(guest.allergy);
    this.allergies = this.allergies.filter(
      (allergy) => allergy && allergy !== "Nei",
    );
    this.coguests = guest.coguest
      ? guest.coguest?.split(",").map((coguest) => coguest.trim())
      : [];
    this.vegetarian = guest.vegeterian === "ja";
  }

  parseAllergies(allergyString) {
    if (!allergyString) {
      return [];
    }

    return allergyString
      .split(",")
      .map((allergy) => allergy.trim())
      .filter((allergy) => allergy);
  }

  get size() {
    if (!this.coguests) return 1;
    return 1 + this.coguests.length;
  }

  addMeal(meal) {
    this.meals.push(meal);
  }

  get otherGuests() {
    return this.meals
      .flatMap((meal) => meal.guests)
      .filter((guest) => guest !== this);
  }
}
