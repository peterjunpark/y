"use client";

import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { FullPageLoading } from "../layout/full-page-loading";

type AuthProps = {
  children: React.ReactNode;
  className?: string;
};

export function AuthCheck({ children, className }: AuthProps) {
  const { data: session, status } = useSession();

  if (session) {
    return <section className={className}>{children}</section>;
  }
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center text-8xl">
        <FullPageLoading />
      </div>
    );
  }
  redirect("/");
}
