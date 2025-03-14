import { HostType } from "@/app/_lib/types";

export function HostCard({ host }: { host: HostType }) {
  // console.log(host);
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-gray-600">
      <h3 className="text-xl font-bold">{host.name}</h3>

      {host.menu &&
        Object.values(host.menu).map((item, index: number) => {
          // console.log("item", item);
          return (
            <div key={index}>
              <h4></h4>
              <p></p>
            </div>
          );
        })}

      {/* Meal Information */}
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Forrett (Starter) */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold">Forrett:</h4>
          <p>{host.appetizer}</p>
          {host.appetizer_allergy && (
            <p className="mt-1 text-sm ">
              <strong>Allergi:</strong> {host.appetizer_allergy}
            </p>
          )}
        </div>

        {/* Middag (Main Course) */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold">Middag:</h4>
          <p>{host.dinner}</p>
          {host.dinner_allergy && (
            <p className="mt-1 text-sm ">
              <strong>Allergi:</strong> {host.dinner_allergy}
            </p>
          )}
        </div>

        {/* Dessert */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold">Dessert:</h4>
          <p>{host.dessert}</p>
          {host.dessert_allergy && (
            <p className="mt-1 text-sm ">
              <strong>Allergi:</strong> {host.dessert_allergy}
            </p>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-4 text-sm text-gray-700">
        <p>
          <strong>Plasser:</strong> {host.seats}
        </p>
      </div>
    </div>
  );
}
