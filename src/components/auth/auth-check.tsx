"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { FullPageLoading } from "../layout/full-page-loading";
import { useToast } from "@/components/ui/use-toast";

type AuthProps = {
  children: React.ReactNode;
  className?: string;
};

export function AuthCheck({ children, className }: AuthProps) {
  const { data: session, status } = useSession();
  const { toast } = useToast();

  if (session && status === "authenticated") {
    return <section className={className}>{children}</section>;
  }
  if (status === "unauthenticated") {
    toast({
      description: "Please log in.",
    });
    return redirect("/");
  }
  return <FullPageLoading />;
}
