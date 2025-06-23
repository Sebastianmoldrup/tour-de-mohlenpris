import { useEffect, useState } from 'react';
import { HostData, GuestData } from '@/types';
import { MealAssignment } from "@/app/admin/dashboard/classes/MealAssignment";
import { Guest } from "@/app/admin/dashboard/classes/Guest";
// import { Meal } from "@/app/admin/dashboard/classes/Meal";

export default function MobileOverview({ hostsData, guestsData }: { hostsData: HostData[], guestsData: GuestData[] }) {
  // console.log("Hosts Data:", hostsData);
  // console.log("Guests Data:", guestsData);

  // State to hold guests and meals
  const [guests, setGuests] = useState<Guest[]>([]);
  // const [meals, setMeals] = useState<Meal[]>([]);
  // const [availableHosts, setAvailableHosts] = useState<Meal[] | Meal>([]); // For the manual assignment UI
  // const [unAssignedGuests, setUnAssignedGuests] = useState<Guest[] | Guest>([]); // For future use with UI to display the unassigned guests

  useEffect(() => {
    try {
      // Initialize MealAssignment with parsed hosts and guests
      const ma = new MealAssignment(hostsData, guestsData);

      // Set the state with the sorted guests and meals
      setGuests(ma.sortGuests());
      // setMeals(ma.getMeals());
      // setAvailableHosts(ma.getAvailableHosts());
      // setUnAssignedGuests(ma.getUnAssignedGuests());
    } catch (error) {
      console.error("Parsing or MealAssignment failed:", error);
    }
  }, [hostsData, guestsData]);

  // console.log("availableHosts: ", availableHosts);
  // console.log("unAssignedGuests: ", unAssignedGuests);
  // console.log("Guests:", guests);
  // console.log("Meals:", meals);

  return (
    <section
      aria-labelledby="gjeste-oversikt"
      className="space-y-6 px-4 md:px-8 py-6 lg:hidden"
    >
      <h2 id="gjeste-oversikt" className="text-xl font-bold sr-only">
        Gjesteoversikt
      </h2>

      {guests.map((guest, index) => (
        <article
          key={index}
          className="border rounded-2xl p-4 shadow-md bg-white space-y-4"
          aria-labelledby={`guest-${index}-name`}
        >
          <header>
            <h3
              id={`guest-${index}-name`}
              className="text-lg font-semibold capitalize"
            >
              {guest.name}
            </h3>
          </header>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <dt className="font-medium">Medgjest:</dt>
            <dd className="capitalize">
              {guest.coguest.join(", ") || "Ingen"}
            </dd>

            <dt className="font-medium text-red-500">Allergener:</dt>
            <dd className="text-red-500 capitalize">
              {guest.allergies.join(", ") || "Ingen"}
            </dd>

            <dt className="font-medium">Vegetar:</dt>
            <dd>{guest.vegeterian ? "Ja" : "Nei"}</dd>
          </dl>

          {/* Meals */}
          <div className="space-y-2">
            {["appetizer", "dinner", "dessert"].map((type) => {
              const meal = guest.meals.find((m) => m.type === type);
              if (!meal) return null;

              const norwegianLabel: Record<string, string> = {
                appetizer: "Forrett",
                dinner: "Middag",
                dessert: "Dessert",
              };

              return (
                <section
                  key={type}
                  aria-label={`${norwegianLabel[type]} informasjon`}
                  className="border-t pt-2"
                >
                  <h4 className="text-sm font-semibold">
                    {norwegianLabel[type]}: {meal.name}
                  </h4>
                  <p className="text-sm">
                    Allergener:{" "}
                    <span className="capitalize">
                      {meal.allergies.join(", ") || "Ingen"}
                    </span>
                  </p>
                  <p className="text-sm mt-2">
                    Vert: {meal.host.name}
                  </p>
                </section>
              );
            })}
          </div>
        </article>
      ))}
    </section>
  );
}
