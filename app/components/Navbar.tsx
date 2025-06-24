"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client/browserClient";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function Navbar() {
  // State to hold the session
  const [session, setSession] = useState<Session | null>(null);
  // Initialize Supabase client and Next router
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // Initialize the session state when component mounts
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); // Save the session (if logged in) to state
    });

    // Listen for login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); // Update the state when user logs in or out
    });

    // Remove the listener when the component unmounts
    return () => {
      subscription.unsubscribe(); // Prevent memory leaks
    };
  }, []); // Run once on component mount

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error);
    router.push("/");
  };

  return (
    <nav className="flex justify-between px-4 py-2 bg-gray-800 text-white print:hidden">
      <h1>
        <Link href="/">Tour De Møhlenpris</Link>
      </h1>
      <ul className="flex space-x-4">
        {!session && (
          <li>
            <Link href="/auth/signin">Login</Link>
          </li>
        )}
        {session && (
          <>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={signOut}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
