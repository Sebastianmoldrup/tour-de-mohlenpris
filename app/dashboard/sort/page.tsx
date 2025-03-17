"use client";
import { useDashboard } from "@/app/_lib/providers/DashboardProvider";
import { Sort } from "@/app/_lib/class/Sort";
import { Guest } from "@/app/_lib/class/Guest";
import { Host } from "@/app/_lib/class/Host";

interface GuestType {
  allergy: string | null;
  co_guest: string | null;
  id: number;
  last_name: string;
  name: string;
  vegeterian: string | null;
}

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
}

export default function MealSchedule() {
  const { guests, hosts } = useDashboard();
  // console.log(guests);
  // console.log(hosts);

  if (!guests || !hosts) {
    return <div>Loading...</div>; // Prevent passing null to Sort
  }

  // const sort = new Sort(hosts, guests);
  const classGuests = guests.map((guest: GuestType) => {
    return new Guest(guest);
  });

  const classHosts = hosts.map((host: HostType) => {
    return new Host(host);
  });

  new Sort(classHosts, classGuests);
  // sort.assignGuestsToHosts();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        meal schedule
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        footer
      </footer>
    </div>
  );
}
