import { Host } from "./Host.js";

/*
 * @Class: Hosts
 * @Params: hosts - Array of host objects from the Google Sheets api
 * @Constructor: list of Host classes
 * */
export class Hosts {
  constructor(hosts) {
    // console.log(hosts);
    this.list = hosts.map((host, index) => {
      return new Host(host, index);
    });
  }
}
