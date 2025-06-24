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
import Link from 'next/link';

export default function DesktopOverview({ hostsData, guestsData }: { hostsData: HostData[], guestsData: GuestData[] }) {

  // State to hold guests and meals
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    try {
      // Initialize MealAssignment with parsed hosts and guests
      const ma = new MealAssignment(hostsData, guestsData);

      // Set the state with the sorted guests and meals
      setGuests(ma.sortGuests());
    } catch (error) {
      console.error("Parsing or MealAssignment failed:", error);
    }
  }, [hostsData, guestsData]);

  const createPrintData = () => {
    const printData = guests.map((guest: Guest) => {
      return {
        name: guest.name,
        coguest: guest.coguest,
        allergies: guest.allergies,
        meals: guest.meals.map((meal: Meal) => {
          return {
            name: meal.name,
            host: meal.host.name,
            allergies: meal.allergies.join(", "),
          }
        })
      }
    })
    // console.log(printData);
    return JSON.stringify(printData);
  }
  const handlePrintClick = () => {
    localStorage.removeItem('printData'); // Clear previous print data
    localStorage.setItem('printData', createPrintData()); // Save new print data
  };

  return (
    <div className="hidden lg:block overscroll-x-scroll overflow-hidden my-6">
      <div className="flex items-center justify-center my-6">
        <Link
          href="/admin/dashboard/print"
          className="bg-green-200 py-2 px-4 rounded-md"
          onClick={handlePrintClick}
        >
          Utskrift
        </Link>
      </div>
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
