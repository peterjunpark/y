import React from "react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/atoms/logo";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-screen">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="select-none text-[30rem]">
          <Logo />
        </h1>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2>Happening now</h2>
        <div className="flex flex-col">
          <h3>Join today.</h3>
          <Button>Sign up with Google</Button>
          <Button>Sign up with Apple</Button>
        </div>
      </div>
    </main>
  );
}
