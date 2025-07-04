"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HostData, GuestData } from "@/types";
import GuestTable from "./GuestTable";

export default function ClientDashboard({
  hostsData,
  guestsData,
}: {
  hostsData: HostData[];
  guestsData: GuestData[];
}) {
  // Instead of boolean toggle
  const [showTable, setShowTable] = useState<boolean>(false);
  const [sortVersion, setSortVersion] = useState<number>(0);

  const handleSortClick = () => {
    if (!showTable) {
      setShowTable(true); // show it the first time
    } else {
      // Trigger re-render of GuestTable
      setSortVersion(prev => prev + 1);
    }
  };

  return (
    <section className="w-full px-4">
      {/* Buttons */}
      <div className="flex justify-center items-center gap-8 my-8 w-full">
        <Button onClick={handleSortClick}>Sorter</Button>
      </div>

      {/* Preview data */}
      <div className="flex gap-8 max-w-4xl mx-auto">
        <PreviewData title="Verter" data={hostsData} />
        <PreviewData title="Deltakere" data={guestsData} />
      </div>

      {/* Sorted list */}
      {showTable && (
        <GuestTable
          key={sortVersion} // ensures remount on new sortVersion
          hostsData={hostsData}
          guestsData={guestsData}
        />
      )}
    </section>
  );
}

function PreviewData({
  title = "Tittel",
  data,
}: {
  title: string;
  data: HostData[] | GuestData[];
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl">{title}</h2>
      <ul className="flex flex-wrap gap-4 text-xs">
        {data.map((item: HostData | GuestData, index) => {
          const surname = "surname" in item ? item.surname ?? "" : "";
          return (
            <li
              key={index}
              className="bg-gray-200 h-fit px-2 py-1 rounded-md"
            >{`${index + 1}. ${surname} ${item.name}`}</li>
          );
        })}
      </ul>
    </div>
  );
}
