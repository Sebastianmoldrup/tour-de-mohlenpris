import { Host } from "@/app/_lib/class/Host";
import { HostType } from "@/app/_lib/types";

export class Hosts {
  hosts: Host[];

  constructor(hosts: HostType[]) {
    // console.log(hosts);
    this.hosts = hosts.map((host: HostType) => {
      return new Host(host);
    });
    console.log(this.hosts);
  }
}
