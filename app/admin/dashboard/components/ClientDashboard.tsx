"use client";
import { HostData, GuestData } from "@/types";
import MobileOverview from "@/app/admin/dashboard/components/MobileOverview";
import DesktopOverview from "@/app/admin/dashboard/components/DesktopOverview";

export default function ClientDashboard({ hostsData, guestsData }: { hostsData: HostData[], guestsData: GuestData[] }) {
  // console.log("Hosts Data:", hostsData);
  // console.log("Guests Data:", guestsData);

  return <>
    <MobileOverview hostsData={hostsData} guestsData={guestsData} />
    <DesktopOverview hostsData={hostsData} guestsData={guestsData} />
  </>;
}
