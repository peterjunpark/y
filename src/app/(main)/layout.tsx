import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { Sidebars } from "@/components/layout/sidebars";
import { NewPostDialogProvider } from "@/components/post/new-post-dialog-context";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user.handle) {
      return (
        <NewPostDialogProvider>
          <Sidebars>{children}</Sidebars>
        </NewPostDialogProvider>
      );
    }
    redirect(`/create/${session.user.id}`);
  }
  redirect("/");
}
