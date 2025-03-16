import { HostsArray } from "@/app/_lib/types";

export class SortedHosts {
  hosts: HostsArray;

  constructor(hosts: HostsArray) {
    this.hosts = hosts;
    // console.log(hosts);
  }

  sortByVegeterian() {
    return this.hosts.filter(
      (h) => h.vegeterian && h.vegeterian.toLowerCase() !== "nei",
    );
  }

  sortByAllergic() {
    return this.hosts.filter(
      (h) =>
        h.allergy &&
        (Array.isArray(h.allergy) || h.allergy.toLowerCase() !== "nei"),
    );
  }

  sortByNormal() {
    return this.hosts.filter(
      (h) =>
        !h.allergy ||
        (h.allergy?.toLowerCase() === "nei" && !h.vegeterian) ||
        h.vegeterian === "nei",
    );
  }
}
