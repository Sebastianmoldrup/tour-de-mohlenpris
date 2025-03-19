"use client";
import { useDashboard } from "@/app/_lib/providers/DashboardProvider";
import { Sort } from "@/app/_lib/class/Sort";
import Papa from "papaparse";

export default function MealSchedule() {
  const { guests, hosts } = useDashboard();
  // console.log(guests);
  // console.log(hosts);

  if (!guests || !hosts) {
    return <div>Loading...</div>; // Prevent passing null to Sort
  }

  const sort = new Sort(hosts, guests);
  const data = sort.getGuests();

  const csvString = Papa.unparse(data);
  console.log(csvString);

  const downloadCSV = (csvString: string, filename = "data.csv") => {
    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename); // Set the file name
    document.body.appendChild(link); // Append the link to the DOM

    // Trigger the download
    link.click();

    // Clean up: remove the link and revoke the Blob URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    downloadCSV(csvString, "guests.csv");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        meal schedule
        <button onClick={handleDownload()}>Download CSV</button>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        footer
      </footer>
    </div>
  );
}
