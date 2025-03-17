import { Host } from "@/app/_lib/class/Host";

export class Hosts {
  #hosts: Host[];
  constructor(hosts: Host[]) {
    this.#hosts = hosts.map((host: Host) => {
      return new Host(host);
    });
  }
}
