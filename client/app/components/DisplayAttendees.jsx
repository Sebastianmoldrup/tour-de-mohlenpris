"use client";
import { useState, useEffect } from "react";
import { getGuests, getHosts } from "@/app/utils/supabase";

export default function FileUpload() {
  const [hosts, setHosts] = useState([]);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    // console.log("effect run");
    const fetchHostsAndGuests = async () => {
      try {
        const hostsTable = await getHosts();
        setHosts(hostsTable);

        const guestsTable = await getGuests();
        setGuests(guestsTable);
      } catch (error) {
        console.error("Error fetching hosts or guests:", error);
      }
    };
    fetchHostsAndGuests();
  }, []);

  return (
    <div>
      {hosts && hosts.length > 0 ? (
        hosts.map((host) => <div key={host.id}>{host.name}</div>)
      ) : (
        <p>Loading hosts...</p>
      )}

      {guests && guests.length > 0 ? (
        guests.map((guest) => <div key={guest.id}>{guest.name}</div>)
      ) : (
        <p>Loading guests...</p>
      )}
    </div>
  );
}
