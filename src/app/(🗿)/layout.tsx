import React from "react";
import { Sidebars } from "@/components/layout/sidebars";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <Sidebars>{children}</Sidebars>;
}
