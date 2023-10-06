"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Github, Discord } from "react-bootstrap-icons";

export function LogInButton() {
  const { data: session, status } = useSession();

  const loginProviders = [
    {
      name: "GitHub",
      icon: <Github />,
      oAuthProvider: "github",
    },
    {
      name: "Discord",
      icon: <Discord />,
      oAuthProvider: "discord",
    },
  ];

  return (
    <>
      {loginProviders.map(({ name, icon, oAuthProvider }, index) => (
        <Button
          key={index} // Added key prop for React list rendering
          onClick={() => signIn(oAuthProvider, { callbackUrl: "/home" })}
          variant="default"
          className="m-1 flex w-64 justify-start gap-3 rounded-full text-xl"
        >
          {icon}
          Log in with {name}
        </Button>
      ))}
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
