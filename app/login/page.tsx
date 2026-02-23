import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { LoginCard } from "@/app/components/auth/LoginCard";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  const googleConfigured = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  async function handleGoogleSignIn() {
    "use server";
    await signIn("google", { redirectTo: "/auth/claim" });
  }

  return (
    <PublicPageShell
      kicker="Sign in"
      title="Continue with"
      subtitle="Secure access to your links and analytics."
    >
      <div className="mx-auto w-full max-w-md">
        <LoginCard googleConfigured={googleConfigured} onGoogleSignIn={handleGoogleSignIn} />
      </div>
    </PublicPageShell>
  );
}
