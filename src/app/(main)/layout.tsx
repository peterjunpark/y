import React from "react";
import { AuthCheck } from "@/components/auth/auth-check";
import { getServerSession } from "next-auth/next";
import { Sidebars } from "@/components/layout/sidebars";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {/* <AuthCheck> */}
      <Sidebars>{children}</Sidebars>
      {/* </AuthCheck> */}
    </>
  );
}
