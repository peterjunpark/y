import React from "react";
import type { Metadata } from "next";
import { LogInButton } from "@/components/auth/buttons";

export const metadata: Metadata = {
  title: "Log In / Y",
};

export default function Login() {
  return (
    <>
      <h2 className="mb-2 text-5xl font-semibold">Happening&nbsp;now</h2>
      <div className="my-10 flex flex-col items-center lg:items-start">
        <h3 className="mb-6 text-4xl">Join today.</h3>
        <LogInButton />
      </div>
    </>
  );
}
