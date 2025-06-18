"use server";
import { createClient } from "@/utils/supabase/client/serverClient";

export const signIn = async (values: {
  email: string;
  password: string;
}): Promise<{ success: boolean; error: boolean }> => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(values);

  if (error) {
    return { success: false, error: true };
  }

  return { success: true, error: false };
};
