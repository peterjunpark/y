import React from "react";
import { Logo } from "@/components/layout/atoms/logo";
import { LogInButton } from "@/components/auth/buttons";

export default function Home() {
  return (
    <main className="flex h-screen">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="select-none text-[30rem]">
          <Logo />
        </h1>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2 className="text-8xl">Happening now</h2>
        <div className="flex flex-col">
          <h3>Join today.</h3>
          <LogInButton />
        </div>
      </div>
    </main>
  );
}
