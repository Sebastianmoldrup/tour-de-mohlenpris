"use client";

// Zod and React Hook Form imports
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// NextJS imports
import { useRouter } from "next/navigation";
import { signIn } from "@/app/auth/signin/actions/signIn";

// Shadcn/UI imports
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
  // Initialize NextJS router for navigation
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
    // Call signIn action with form values
    const { success, error } = await signIn(values);

    // error handling
    if (error) {
      console.error("Sign in failed:", error);
    }

    // redirect or refresh page on successful sign in (refresh makes middleware redirect)
    if (success) {
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
