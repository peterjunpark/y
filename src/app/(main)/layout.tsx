import React from "react";
import { getServerSession } from "next-auth/next";
import { Sidebars } from "@/components/layout/sidebars";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/schema/users";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session) {
    return <Sidebars>{children}</Sidebars>;
  } else {
    redirect("/");
  }
}
