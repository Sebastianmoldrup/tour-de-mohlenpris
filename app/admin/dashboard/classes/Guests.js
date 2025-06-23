import { Guest } from "./Guest.js";

/*
 * @Class: Guests
 * @Params: guests - Array of guest objects from the Google Sheets api
 * @Constructor: list of Guest classes
 * @Methods:
 * */
export class Guests {
  constructor(guests) {
    this.list = guests
      .map((guest, index) => {
        return new Guest(guest, index);
      })
      .sort((a, b) => {
        if (a.allergies.length > b.allergies.length) {
          return -1;
        }
        if (a.allergies.length < b.allergies.length) {
          return 1;
        }
        return 0;
      });
  }
}
