import { createClient } from "@/utils/supabase/client/browserClient";

export const signIn = async (values: {
  email: string;
  password: string;
}): Promise<{ success: boolean; error: boolean }> => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(values);

  if (error) {
    return { success: false, error: true };
  }

  return { success: true, error: false };
}

// "use server";
// // Get supabase client
// import { createClient } from "@/utils/supabase/client/serverClient";
//
// export const signIn = async (values: {
//   email: string;
//   password: string;
// }): Promise<{ success: boolean; error: boolean }> => {
//   // Initialize supabase client
//   const supabase = await createClient();
//
//   // Attempt to sign in the user with email and password
//   const { error } = await supabase.auth.signInWithPassword(values);
//
//   // Check if there was an error during sign-in return error
//   if (error) {
//     return { success: false, error: true };
//   }
//
//   // Sign-in was successful, return success
//   return { success: true, error: false };
// };
