import { getSheetsData } from "@/utils/googlesheets/getSheetData";
import { HostData, GuestData } from "@/types";
import ClientDashboard from "@/app/admin/dashboard/components/ClientDashboard";

export default async function DashboardPage() {
  const { hostsData, guestsData }: { hostsData: HostData[]; guestsData: GuestData[] } = await getSheetsData();
  // console.log("Hosts:", hosts);
  // console.log("Guests:", guests);

  return (
    <main className="flex w-full justify-center items-center">
      <ClientDashboard hostsData={hostsData} guestsData={guestsData} />
    </main>
  );
}
