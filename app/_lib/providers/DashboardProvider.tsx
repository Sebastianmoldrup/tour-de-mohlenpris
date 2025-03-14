"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { HostsArray, GuestsArray } from "@/app/_lib/types";

// Correcting the types
type HostState = HostsArray | null;
type GuestState = GuestsArray | null;

interface DashboardContextType {
  hosts: HostState;
  setHosts: Dispatch<SetStateAction<HostState>>;
  guests: GuestState;
  setGuests: Dispatch<SetStateAction<GuestState>>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

export function DashboardProvider({ children }: Props) {
  const [hosts, setHosts] = useState<HostState>(null);
  const [guests, setGuests] = useState<GuestState>(null);

  return (
    <DashboardContext.Provider value={{ hosts, setHosts, guests, setGuests }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextType {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
