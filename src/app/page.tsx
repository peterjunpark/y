import React from "react";
import { Logo } from "@/components/layout/atoms/logo";
import { LogInButton } from "@/components/auth/buttons";

export default function Home() {
  return (
    <main className="flex h-screen">
      <div className="hidden h-full w-full flex-col items-center justify-center lg:flex">
        <h1 className="select-none text-[30rem]">
          <Logo />
        </h1>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-3/5 flex-col gap-6">
          <Logo className="select-none text-6xl opacity-100 lg:opacity-0" />
          <h2 className="mb-12 text-5xl font-semibold">Happening&nbsp;now</h2>
          <div className="my-10 flex flex-col items-center lg:items-start">
            <h3 className="mb-8 text-4xl">Join today.</h3>
            <LogInButton />
          </div>
        </div>
      </div>
    </main>
  );
}
