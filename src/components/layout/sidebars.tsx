import React from "react";

import { Nav } from "./nav";

export function Sidebars({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <header className="sticky top-0 flex h-screen grow justify-end">
        <Nav />
      </header>
      <main className="w-[720px] grow-0 border-x border-y">{children}</main>
      <section className="sticky top-0 hidden h-screen grow lg:block"></section>
    </div>
  );
}
