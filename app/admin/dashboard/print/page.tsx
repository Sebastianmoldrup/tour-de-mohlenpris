"use client";
import { useEffect, useState } from "react";
import { PrintMeal, PrintGuest } from "@/types";

export default function PrintPage() {
  const [printData, setPrintData] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem('printData');
    if (data) {
      setPrintData(JSON.parse(data));
    }
  }, []);

  // console.log(printData);
  return <main className="flex flex-col items-center p-10">
    <button
      onClick={() => window.print()}
      className="mb-6 px-4 py-2 bg-black text-white rounded max-w-fit print:hidden"
    >
      Skriv ut invitasjoner
    </button>
    {printData.map((guest: PrintGuest, index: number) => (
      <div
        key={index}
        className="w-full h-[250mm] px-12 py-10 mb-10 break-after-page border border-gray-300 shadow-xl bg-white"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold mb-2">Tour De Møhlenpris</h1>
          <p className="text-lg italic">Velkommen til en kulinarisk aften</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-1">
            Kjære {guest.name}
            {guest.coguest && ` og ${guest.coguest}`}
          </h2>
          {guest.allergies && guest.allergies?.length > 0 && (
            <p className="text-sm text-gray-600">
              Allergier:{" "}
              {Array.isArray(guest.allergies)
                ? guest.allergies.join(", ")
                : guest.allergies}
            </p>
          )}
        </div>

        <div className="space-y-6">
          {guest.meals.map((meal: PrintMeal, i: number) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-sm"
            >
              <h3 className="text-xl font-semibold capitalize mb-2">
                {meal.name}
              </h3>
              <p className="text-sm text-gray-700 mb-1">
                Vertskap: <span className="font-medium">{meal.host}</span>
              </p>
              {meal.allergies && meal.allergies?.length > 0 && (
                <p className="text-sm text-gray-700">
                  Allergener: {Array.isArray(meal.allergies) ? meal.allergies.join(", ") : meal.allergies}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          <p>Vennligst møt opp presis til hvert måltid.</p>
          <p>Ta kontakt om du har spørsmål.</p>
        </div>
      </div>
    ))}
  </main>
}
