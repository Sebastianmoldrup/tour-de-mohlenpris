import { Host } from "./Host.js";

export class Hosts {
  #hosts = [];

  constructor(host) {
    host.forEach((host) => {
      this.#hosts.push(new Host(host));
    });
  }
  get hosts() {
    return this.#hosts;
  }
}
