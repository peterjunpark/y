import React from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Nav } from "./nav";

export function Sidebars({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <header className="flex h-screen grow justify-end">
        <Nav />
      </header>
      <main className="w-[720px] grow-0 border-x border-y">{children}</main>
      <section className="hidden h-screen grow lg:block">
        <ThemeToggle />
        <Nav />
      </section>
    </main>
  );
}
