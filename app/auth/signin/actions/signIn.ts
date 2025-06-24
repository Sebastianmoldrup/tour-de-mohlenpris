// Supabase import
import { createClient } from "@/utils/supabase/client/browserClient";

// SignIn function to handle user authentication accepting email and password
export const signIn = async (values: {
  email: string;
  password: string;
}): Promise<{ success: boolean; error: boolean }> => {
  // Initialize Supabase client
  const supabase = createClient();

  // Call Supabase's signInWithPassword method with the provided email and password
  const { error } = await supabase.auth.signInWithPassword(values);

  // error handling
  if (error) {
    return { success: false, error: true };
  }

  // Return success if no error occurred
  return { success: true, error: false };
}
