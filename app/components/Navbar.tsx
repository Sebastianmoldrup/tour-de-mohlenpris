"use client";

// NextJS imports
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Supabase client import
import { createClient } from "@/utils/supabase/client/browserClient";

// Supabase types import
import type { Session } from "@supabase/supabase-js";

// React imports
import { useEffect, useState } from "react";

export default function Navbar() {
  // React state to manage the session
  const [session, setSession] = useState<Session | null>(null);

  // Initialize Supabase client
  const supabase = createClient();

  // Initialize NextJS router for navigation
  const router = useRouter();

  // On component mount, check for existing session and set up auth state change listener
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
  }, []);

  // Sign out function to handle user logout
  const signOut = async () => {
    // Call Supabase's signOut method
    const { error } = await supabase.auth.signOut();

    // error handling
    if (error) console.error("Error signing out:", error);

    // Successful sign out, redirect to home page
    router.push("/");
  };

  /*
   *  Render the navigation bar with links to home always, and conditionally render login or dashboard/logout links based on session state
   * */
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between px-4 py-4 bg-gray-800 text-white print:hidden">
      <h1 className="flex items-center gap-2 text-xl font-bold">
        <Image
          src="/logo.png"
          alt="Tour De Møhlenpris Logo"
          width={32}
          height={32}
          className="inline-block ml-2"
        />
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
