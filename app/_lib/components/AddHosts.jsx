"use client";
import { useDashboard } from "@/app/_lib/providers/DashboardProvider";
import { Host } from "@/app/_lib/class/Host";
import Papa from "papaparse";

// Papaparse minified version and does not support TS - Using JSX for now
export default function AddHosts() {
  const { setHosts } = useDashboard();

  const csvToJson = (csv) => {
    return Papa.parse(csv, {
      header: true, // Uses the first row as column names
      skipEmptyLines: true,
      dynamicTyping: true, // Converts numbers automatically
      transformHeader: (header) => header.toLowerCase(),
    }).data.map((row, index) => ({
      ...row,
      id: index + 1, // Assign incremental ID
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        const json = csvToJson(csvData);
        // console.log(json);
        // const hosts = json.map((obj) => {
        //   return new Host(obj);
        // });
        setHosts(json);
      };
      reader.readAsText(file);
    }
  };

  return (
    <li className="flex justify-center items-center">
      <label htmlFor="hosts-file-upload" className="">
        <span className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
          Legg til Verter
        </span>
        <input
          id="hosts-file-upload"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
    </li>
  );
}
