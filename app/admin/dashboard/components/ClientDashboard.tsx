"use client";
// Import types
import { Button } from "@/components/ui/button";
import { HostData, GuestData } from "@/types";

// Import react state
import { useState } from "react";
import GuestTable from "./GuestTable";
// import { Guest } from "../classes/Guest";

export default function ClientDashboard({ hostsData, guestsData }: { hostsData: HostData[]; guestsData: GuestData[] }) {
  // console.log("ClientDashboard hostsData:", hostsData);
  // console.log("ClientDashboard guestsData:", guestsData);

  const [sorted, setSorted] = useState<boolean>(false);

  return <section>
    <div className="grid justify-center items-center max-w-4xl mx-auto my-8">
      {/* Buttons */}
      <div className="flex justify-center items-center gap-8 max-w-4xl my-8">
        <Button onClick={() => setSorted(!sorted)}>Sorter</Button>
        <Button>Print</Button>
      </div>

      {/* Preview data */}
      <div className="flex gap-8 max-w-4xl">
        <PreviewData title={"Verter"} data={hostsData} />
        <PreviewData title={"Deltakere"} data={guestsData} />
      </div>
    </div>

    {/* Sorted list */}
    {sorted && <GuestTable hostsData={hostsData} guestsData={guestsData} />}
  </section>;
}

function PreviewData({ title = "Tittel", data }: { title: string, data: HostData[] | GuestData[] }) {
  return <div className="space-y-4">
    <h2 className="text-2xl">{title}</h2>
    <ul className="flex flex-wrap gap-4">{data.map(((item: HostData | GuestData, index) => {
      // Check if item has a surname property
      const surname = 'surname' in item ? item.surname ?? "" : "";

      return <li key={index} className="bg-green-200 h-fit px-2 py-1 rounded-md">{`${index + 1}. ${surname ?? ""} ${item.name}`}</li>
    }))}</ul>
  </div>
}
