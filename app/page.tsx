import { getSheetsData } from "@/utils/googlesheets/getSheetData";

export default async function Home() {
  // Testing the getSheetsData function to fetch hosts and guests data
  const { hosts, guests } = await getSheetsData();
  console.log("Hosts:", hosts);
  console.log("Guests:", guests);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        main
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        footer
      </footer>
    </div>
  );
}
