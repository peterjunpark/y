import React from "react";
import { AuthCheck } from "@/components/auth/auth-check";
import { Sidebars } from "@/components/layout/sidebars";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthCheck>
      <Sidebars>{children}</Sidebars>
    </AuthCheck>
  );
}
