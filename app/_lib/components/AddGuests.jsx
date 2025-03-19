"use client";
import { useDashboard } from "@/app/_lib/providers/DashboardProvider";
import Papa from "papaparse";
import { Guest } from "@/app/_lib/class/Guest";

// Papaparse minified version and does not support TS - Using JSX for now
export default function AddGuests() {
  const { setGuests } = useDashboard();

  const csvToJson = (csv) => {
    return Papa.parse(csv, {
      header: true, // Uses the first row as column names
      skipEmptyLines: true,
      dynamicTyping: true, // Converts numbers automatically
      transformHeader: (header) => header.toLowerCase(),
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        const json = csvToJson(csvData);
        // const guests = json.map((obj) => {
        //   return new Guest(obj);
        // });
        setGuests(json);
      };
      reader.readAsText(file);
    }
  };

  return (
    <li className="flex justify-center items-center">
      <label htmlFor="guests-file-upload" className="">
        <span className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          Legg til Deltagere
        </span>
        <input
          id="guests-file-upload"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
    </li>
  );
}
