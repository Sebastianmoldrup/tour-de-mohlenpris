"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client/browserClient';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const supabase = createClient();
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Error fetching session:', error);
        setLoggedIn(false);
      }

      if (data.session) {
        console.log('Current session:', data.session?.user);
        setLoggedIn(true);
      }
    }
    getCurrentUser();
  }, []);
  // console.log('Logged in:', loggedIn);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Error signing out:', error);
    }

    router.push('/');
  }

  return <nav className="flex justify-between px-4 py-2 bg-gray-800 text-white">
    <h1>Tour De Møhlenpris</h1>
    <ul className="flex space-x-4">
      <li><Link href={"/"}>Home</Link></li>
      <li><Link href={"/auth/signin"}>Login</Link></li>
      {loggedIn && <li><button onClick={() => signOut()}>Logout</button></li>}
    </ul>
  </nav>;
}
