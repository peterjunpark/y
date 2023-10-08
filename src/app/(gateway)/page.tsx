import React from "react";
import { LogInButton } from "@/components/auth/buttons";

export default function Login() {
  return (
    <>
      <h2 className="mb-12 text-5xl font-semibold">Happening&nbsp;now</h2>
      <div className="my-10 flex flex-col items-center lg:items-start">
        <h3 className="mb-8 text-4xl">Join today.</h3>
        <LogInButton />
      </div>
    </>
  );
}
