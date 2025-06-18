import { SignInForm } from "@/app/auth/signin/components/SignInForm";

export default function SignInPage() {
  return <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="shadow-lg p-8 bg-white rounded-lg w-full max-w-md space-y-4">
      <h2 className="font-semibold">Velkommen til Tour De Møhlenpris</h2>
      <SignInForm />
    </div>
  </main>
}
