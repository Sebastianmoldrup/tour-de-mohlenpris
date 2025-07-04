"use client";

// React imports
import { useEffect, useState } from "react";
import Link from "next/link";

// Types import
import { HostData, GuestData } from "@/types";

// Import from lucide-react
import { Users, Trash2, Leaf } from "lucide-react";

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
                {/* Guest name */}
                <TableCell className="capitalize">{guest.name}</TableCell>

                {/* Guest's coguests */}
                <TableCell className="">
                  {guest.coguest.length > 0 ? (
                    <div className="flex items-center h-full gap-2 capitalize">
                      <Users className="w-5" /> {guest.coguest.length}
                    </div>
                  ) : null}
                </TableCell>

                {/* Guest's allergies */}
                <TableCell className="text-red-500">
                  {guest.allergies.length > 0 ? (
                    <>Allergener: {guest.allergies.join(", ")}</>
                  ) : null}
                </TableCell>

                {/* Guest vegeterian */}
                <TableCell>
                  {guest.vegeterian ? (
                    <Leaf className="w-5 text-green-500" />
                  ) : null}
                </TableCell>

                {/* Guest's meals */}
                {mealTypes.map((type) => {
                  const meal = guest.meals.find(
                    (meal: Meal) => meal.type === type,
                  );

                  return (
                    <TableCell key={type} className="capitalize space-y-2">
                      {meal ? (
                        <>
                          {/* Host name & delete button */}
                          <div className="flex items-center gap-2">
                            <Trash2
                              className="w-4"
                              onClick={() => {
                                guest.removeMeal(meal);
                                setUpdateTrigger((prev) => prev + 1);
                              }}
                            />
                            <div>{meal.host.name}</div>
                          </div>

                          {/* Select a meal */}
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
                            <SelectTrigger className="w-[180px] md:w-fit">
                              <SelectValue className="font-semibold" placeholder={meal.name} />
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
                                      {`${b.host.name} - plasser ${Number(b.getGuestCount())} / ${b.capacity}`}
                                    </SelectItem>
                                  );
                                })}
                            </SelectContent>
                          </Select>

                          {/* Allergies */}
                          {meal.allergies.length > 0 ? (
                            <div className="text-red-500">
                              {meal.allergies.join(", ")}
                            </div>
                          ) : (
                            <div className="text-green-500">
                              Ingen allergier
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-gray-400 italic">Velg rett</div>
                      )}
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
