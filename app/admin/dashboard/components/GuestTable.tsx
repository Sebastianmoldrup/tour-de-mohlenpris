"use client";

// React imports
import { useEffect, useState } from "react";
import Link from "next/link";

// Types import
import { HostData, GuestData } from "@/types";

// Import from lucide-react
import { Users, Trash2 } from "lucide-react";

// Class imports
import { MealAssignment } from "@/app/admin/dashboard/classes/MealAssignment";
import { Guest } from "@/app/admin/dashboard/classes/Guest";
import { Meal } from "@/app/admin/dashboard/classes/Meal";

// Skeleton component import
import SkeletonGuestTable from "@/app/admin/dashboard/components/SkeletonGuestTable";

// Shadcn/UI imports
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GuestTable({
  hostsData,
  guestsData,
}: {
  hostsData: HostData[];
  guestsData: GuestData[];
}) {
  // States for managing guests, meals, and update triggers
  const [guests, setGuests] = useState<Guest[]>([]);
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [, setUpdateTrigger] = useState(0);

  const mealTypes = ["appetizer", "dinner", "dessert"];
  const mealTypeNames = {
    appetizer: "Forrett",
    dinner: "Middag",
    dessert: "Dessert",
  };
  console.log("Guests", guests);

  // On component mount, initialize MealAssignment and set guests and meals with instance data
  useEffect(() => {
    try {
      const ma = new MealAssignment(hostsData, guestsData);

      setGuests(ma.sortGuests());
      setAllMeals(ma.getMeals());
    } catch (error) {
      console.error("Parsing or MealAssignment failed:", error);
    }
  }, [hostsData, guestsData]);

  // createPrintData function to format guest and meal data for printing
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
          };
        }),
      };
    });
    return JSON.stringify(printData);
  };

  // Update localStorage with print data when the print button is clicked
  const handlePrintClick = () => {
    localStorage.removeItem("printData"); // Clear previous print data
    localStorage.setItem("printData", createPrintData()); // Save new print data
  };

  // Loading state: if guests are not available, show a loading message
  if (!guests || guests.length === 0) {
    return <SkeletonGuestTable />;
  }

  /*
   *  1. Iterate over guest instances and their meals to display a tablerow for each guest.
   *  2. Return table cell with guest name, coguest, allergies
   *  3. Iterate over meals for each guest and display meal name, host, and a select dropdown for meal selection.
   *  4. On meal selection change, update the meal for the guest & meal instance and trigger a re-render.
   * */

  return (
    <div className="lg:block overscroll-x-scroll overflow-hidden my-6">
      {/* Buttons */}
      <div className="flex items-center justify-center my-6">
        <Link
          href="/admin/dashboard/print"
          className=""
          onClick={handlePrintClick}
        >
          <Button>Utskrift</Button>
        </Link>
      </div>

      {/* Unassigned guests and available meals */}
      <div className="grid md:grid-cols-2 gap-4 mx-auto my-16">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl">Ikke tildelt:</h2>
          <ul>
            {guests
              .filter((guest) => {
                return guest.meals.length < 3;
              })
              .map((guest, index) => {
                return <li key={index}>{`${guest.name}`}</li>;
              })}
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl">Ledige måltider:</h2>
          <ul className="space-y-4">
            <li className="grid grid-cols-3 px-2">
              <span className="border-b-2 pb-1 w-fit">Vert</span>
              <span className="border-b-2 pb-1 w-fit">Rett</span>
              <span className="border-b-2 pb-1 w-fit">Kapasitet</span>
            </li>
            {allMeals
              .filter((meal) => {
                return meal.getGuestCount() < meal.capacity;
              })
              .map((meal, index) => {
                return (
                  <li
                    key={index}
                    className="bg-green-200 px-2 py-1 rounded-md grid grid-cols-3"
                  >
                    <span className="font-medium">{meal.host.name}</span>
                    <span className="">{mealTypeNames[meal.type]}</span>
                    <span className="text-sm text-gray-600">
                      Kapasitet {Number(meal.getGuestCount())} / {meal.capacity}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      {/* Table */}
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
            return (
              <TableRow key={index}>
                <TableCell className="sticky left-0 bg-white capitalize font-medium max-w-[150px] overflow-hidden">
                  {guest.name}
                </TableCell>
                <TableCell className="p-0">
                  <div className="flex items-center h-full gap-2 capitalize">
                    <Users />
                    {guest.coguest.length}
                  </div>
                </TableCell>
                <TableCell className="text-red-500">
                  {guest.allergies.join(", ")}
                </TableCell>
                <TableCell>{guest.vegeterian ? "ja" : null}</TableCell>
                {guest.meals.map((meal: Meal, index: number) => {
                  return (
                    <TableCell key={index} className="capitalize space-y-2">
                      <div
                        title={meal.name}
                        className="w-[150px] overflow-hidden flex gap-2 items-center"
                      >
                        <span>{meal.name}</span>
                        <Trash2
                          onClick={() => guest.removeMeal(meal)}
                          className="w-3 h-3"
                        />
                      </div>
                      <Select
                        // defaultValue={meal.host.name}
                        onValueChange={(value) => {
                          if (meal.name === value) return;
                          const selectedMeal = allMeals.find(
                            (m) => m.name === value,
                          );
                          if (selectedMeal) {
                            guest.updateMeal(meal, selectedMeal);
                          }
                          // Trigger re-render
                          setUpdateTrigger((prev) => prev + 1);
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={meal.host.name} />
                        </SelectTrigger>
                        <SelectContent>
                          {allMeals
                            .filter((a: Meal) => {
                              if (a === meal) return true;
                              return (
                                a.type === meal.type && a.hasCapacity(guest)
                              );
                            })
                            .map((b: Meal, i: number) => {
                              return (
                                <SelectItem value={b.name} key={i}>
                                  {`${b.host.name} - ${b.name} - plasser ${Number(b.getGuestCount())} / ${b.capacity}`}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                      <div className="text-red-500 text-xs">
                        Allergener: {guest.allergies.join(", ")}
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
