import { getSheetsData } from "@/utils/googlesheets/getSheetData";

export default async function DashboardPage() {
  const { hosts, guests } = await getSheetsData();
  console.log("Hosts:", hosts);
  console.log("Guests:", guests);

  return (
    <main className="flex w-full h-screen justify-center items-center">
      DashboardPage
    </main>
  );
}
