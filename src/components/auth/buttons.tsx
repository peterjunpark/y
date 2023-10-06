"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github, Instagram, LogOut } from "lucide-react";

export function LogInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return;

  return (
    <>
      <Button
        onClick={() => signIn("github", { callbackUrl: "/home" })}
        variant="ghost"
        className="flex justify-start gap-3 rounded-full"
      >
        <Github />
        Log in with GitHub
      </Button>
      <Button
        onClick={() => signIn("instagram", { callbackUrl: "/home" })}
        variant="ghost"
        className="flex justify-start gap-3 rounded-full"
      >
        <Instagram />
        Log in with Instagram
      </Button>
    </>
  );
}

export function LogOutButton() {
  return (
    <Button onClick={() => signOut()} variant="ghost" className="rounded-full">
      <LogOut className="mr-2" />
      Log out
    </Button>
  );
}
