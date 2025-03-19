import { Host } from "@/app/_lib/class/Host";
import { HostType } from "@/app/_lib/types";

export class Hosts {
  #hosts: Host[] = [];

  constructor(hosts: HostType[]) {
    hosts.forEach((host: HostType) => {
      this.#hosts.push(new Host(host));
    });
  }

  get hosts(): Host[] {
    return this.#hosts;
  }
}
