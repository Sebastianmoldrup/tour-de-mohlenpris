"use client";
import { useDashboard } from "@/app/_lib/providers/DashboardProvider";
import { Sort } from "@/app/_lib/class/Sort";

export default function MealSchedule() {
  const { guests, hosts } = useDashboard();
  // console.log(guests);
  // console.log(hosts);

  if (!guests || !hosts) {
    return <div>Loading...</div>; // Prevent passing null to Sort
  }

  // const sort = new Sort(hosts, guests);
  // sort.asssignGuestsToHosts();
  new Sort(hosts, guests);

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
