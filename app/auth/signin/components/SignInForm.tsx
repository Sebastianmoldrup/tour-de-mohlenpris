"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "@/app/auth/signin/actions/signIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Zod Schema for form validation
const formSchema = z.object({
  email: z.string().email({ message: "Ugyldig e-postadresse" }),
  password: z
    .string()
    .min(4, { message: "Brukernavn må være minst 4 bokstaver" })
    .max(50, { message: "Brukernavn kan ikke være lengre en 50 bokstaver" }),
});

export function SignInForm() {
  // Next router initialized
  const router = useRouter();

  // Form hook initialized with Zod schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Run sign-in server action with form values
    const { success, error } = await signIn(values);

    if (error) {
      // Check for error and log the error
      console.error("Sign in failed:", error);
    }

    if (success) {
      // Refresh page on sign in, middleware redirects to home
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passord</FormLabel>
              <FormControl>
                <Input placeholder="Passord" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Logg inn</Button>
      </form>
    </Form>
  );
}
