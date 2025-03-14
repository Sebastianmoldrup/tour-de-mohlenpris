"use client";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/app/_lib/providers/DashboardProvider";
import { usePathname } from "next/navigation";
import { HostType, GuestType } from "@/app/_lib/types";
import { GuestCard } from "@/app/_lib/components/GuestCard";
import { HostCard } from "@/app/_lib/components/HostCard";
import AddGuests from "@/app/_lib/components/AddGuests";
import AddHosts from "@/app/_lib/components/AddHosts";

// TODO: Fix router/navigation
export default function Dashboard() {
  // Procider states
  const { hosts, guests } = useDashboard();
  // console.log(hosts, guests);

  // Router
  const router = useRouter();
  const pathname = usePathname();
  // console.log(pathname);

  // Functions
  const handleSort = () => {
    router.push(pathname + "/sort");
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] w-full items-center sm:items-start">
        <div className="min-h-screen bg-gray-100 p-6 w-full">
          {/* Dashboard Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex gap-4">
              <AddGuests />
              <AddHosts />
              <button
                onClick={handleSort}
                className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
              >
                Sorter
              </button>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guests Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Deltagere</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[500px]">
                {guests &&
                  guests?.map((guest: GuestType, index: number) => (
                    <GuestCard key={index} guest={guest} />
                  ))}
              </div>
            </div>

            {/* Hosts Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Vertskap</h2>
              <div className="space-y-4">
                {hosts &&
                  hosts?.map((host: HostType, index: number) => (
                    <HostCard key={index} host={host} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
