"use client";

import SignInForm from "@/components/forms/SignInForm";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      if (session.user.role === "admin") {
        router.replace(`/dashboard/admin/${session.user.id}`);
      } else if (session.user.role === "user") {
        router.replace(`/dashboard/user/${session.user.id}`);
      }
    }
  }, [session, router]);

    return (
        <SignInForm />
    )
}