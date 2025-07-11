// Google Sheets import
import { getSheetsData } from "@/utils/googlesheets/getSheetData";

// Type imports
import { HostData, GuestData } from "@/types";

// Dashboard component imports
import ClientDashboard from "@/app/admin/dashboard/components/ClientDashboard";

export default async function DashboardPage() {
  // Call the Server Action to get the data from Google Sheets formated
  const { hostsData, guestsData }: { hostsData: HostData[]; guestsData: GuestData[] } = await getSheetsData();

  return (
    <main className="flex w-full min-h-screen justify-center items-center mt-24">
      <ClientDashboard hostsData={hostsData} guestsData={guestsData} />
    </main>
  );
}
