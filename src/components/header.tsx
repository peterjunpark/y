import React from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header() {
  return (
    <header className="flex justify-center py-5">
      <ThemeToggle />
    </header>
  );
}
