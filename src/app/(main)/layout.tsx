import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { Sidebars } from "@/components/layout/sidebars";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user.handle) {
      return <Sidebars>{children}</Sidebars>;
    }
    redirect(`/create/${session.user.id}`);
  }
  redirect("/");
}
