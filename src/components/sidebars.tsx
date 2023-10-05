import React from "react";
import localFont from "next/font/local";
import { clsx } from "clsx";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const xFont = localFont({
  src: "../../public/special-alphabets-4-regular.otf",
  weight: "600",
  display: "swap",
  style: "normal",
});

export function Sidebars({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <header className="h-screen grow">
        <span className={clsx(xFont.className, "text-4xl")}>Y</span>
        <nav></nav>
      </header>
      <main className="w-[600px] grow-0 border-x border-y">{children}</main>
      <footer className="h-screen grow">
        <ThemeToggle />
      </footer>
    </main>
  );
}
