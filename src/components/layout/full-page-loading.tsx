import React from "react";
import { Logo } from "@/components/layout/atoms/logo";

export function FullPageLoading() {
  return (
    <div className="flex h-screen items-center justify-center text-8xl">
      <Logo className="opacity-30" />
    </div>
  );
}
