import { createClient } from "@supabase/supabase-js";

// Access environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// console.log(supabaseKey, supabaseUrl);
// console.log(process.env);

// Initialize Supabase client
export const Supabase = createClient(supabaseUrl, supabaseKey);

export const getHosts = async () => {
  const { data, error } = await Supabase.from("hosts").select();
  if (error) {
    console.log("error", error);
    return;
  }
  return data;
};

export const getGuests = async () => {
  const { data, error } = await Supabase.from("guests").select();
  if (error) {
    console.log("error", error);
    return;
  }
  return data;
};
