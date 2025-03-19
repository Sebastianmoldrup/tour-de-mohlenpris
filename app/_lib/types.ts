export interface GuestType {
  allergy: string | null;
  coguest: string | null;
  lastName: string;
  name: string;
  vegeterian: string | null;
}

export interface HostType {
  name: string;
  seats: number;
}
