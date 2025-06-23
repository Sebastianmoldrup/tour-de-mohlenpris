import { useEffect, useState } from 'react';
import { HostData, GuestData } from '@/types';
import { MealAssignment } from "@/app/admin/dashboard/classes/MealAssignment";
import { Guest } from "@/app/admin/dashboard/classes/Guest";
import { Meal } from "@/app/admin/dashboard/classes/Meal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DesktopOverview({ hostsData, guestsData }: { hostsData: HostData[], guestsData: GuestData[] }) {
  // console.log("Hosts Data:", hostsData);
  // console.log("Guests Data:", guestsData);

  // State to hold guests and meals
  const [guests, setGuests] = useState<Guest[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [availableHosts, setAvailableHosts] = useState<Meal[] | Meal>([]); // For the manual assignment UI
  const [unAssignedGuests, setUnAssignedGuests] = useState<Guest[] | Guest>([]); // For future use with UI to display the unassigned guests

  useEffect(() => {
    try {
      // Initialize MealAssignment with parsed hosts and guests
      const ma = new MealAssignment(hostsData, guestsData);

      // Set the state with the sorted guests and meals
      setGuests(ma.sortGuests());
      setMeals(ma.getMeals());
      setAvailableHosts(ma.getAvailableHosts());
      setUnAssignedGuests(ma.getUnAssignedGuests());
    } catch (error) {
      console.error("Parsing or MealAssignment failed:", error);
    }
  }, [hostsData, guestsData]);

  // console.log("availableHosts: ", availableHosts);
  // console.log("unAssignedGuests: ", unAssignedGuests);
  // console.log("Guests:", guests);
  // console.log("Meals:", meals);

  // return <div className='hidden lg:block'>Desktop</div>
  return (
    <div className="hidden lg:block overscroll-x-scroll overflow-hidden my-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Navn</TableHead>
            <TableHead>Medgjester</TableHead>
            <TableHead>Allergier</TableHead>
            <TableHead>Vegetar</TableHead>
            <TableHead>Forrett</TableHead>
            <TableHead>Middag</TableHead>
            <TableHead>Dessert</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest: Guest, index: number) => {
            const { name, coguest, allergies, vegeterian, meals } = guest;
            return (
              <TableRow key={index}>
                <TableCell className="capitalize font-medium">{name}</TableCell>
                <TableCell className="capitalize">
                  {coguest.join(", ")}
                </TableCell>
                <TableCell className="text-red-500">
                  {allergies.join(", ")}
                </TableCell>
                <TableCell>{vegeterian ? "ja" : null}</TableCell>
                {meals.map((meal: Meal, index: number) => {
                  const {
                    // type,
                    host,
                    name,
                    // capacity,
                    allergies,
                    // guests,
                    // guestCount,
                  } = meal;
                  return (
                    <TableCell key={index} className="capitalize space-y-2">
                      <div>{name}</div>
                      <div className='px-2 py-1 bg-gray-200 rounded-md w-fit'>{host.name}</div>
                      <div className="text-red-500">
                        Allergener: {allergies.join(", ")}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
