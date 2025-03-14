import { GuestType } from "@/app/_lib/types";

export function GuestCard({ guest }: { guest: GuestType }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 text-gray-600">
      <div className="font-semibold text-lg">
        {guest.name} {guest.last_name}
      </div>
      <div className="">
        <div>
          <strong>Allergier:</strong> {guest.allergy}
        </div>
        <div>
          <strong>Medfølgende:</strong> {guest.co_guest ?? "nei"}
        </div>
      </div>
    </div>
  );
}
