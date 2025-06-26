"use client";
import { useSearchParams } from "next/navigation";

export default function PrintPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  return <div>print</div>;
}
