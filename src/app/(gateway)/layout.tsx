import React from "react";
import { Logo } from "@/components/logo";

export default function GatewayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          {children}
        </div>
      </div>
    </main>
  );
}
