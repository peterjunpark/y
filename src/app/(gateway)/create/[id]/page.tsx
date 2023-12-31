import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/signup/form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export const metadata: Metadata = {
  title: "Create Your Profile / Y",
};

export default async function CreateHandle() {
  const session = await getServerSession(authOptions);

  if (session && session.user.handle) {
    redirect("/home");
  }

  return (
    <div className="flex flex-col items-center lg:items-start">
      <h3 className="mb-4 text-3xl">
        What&nbsp;do&nbsp;we&nbsp;call&nbsp;you?
      </h3>

      <SignupForm
        defaultName={session?.user.name as string}
        userId={session?.user.id as string}
        image={session?.user.image as string}
      />
    </div>
  );
}
