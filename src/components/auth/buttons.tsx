"use client";

import React from "react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Github, Discord } from "react-bootstrap-icons";

export function LogInButton() {
  const loginProviders = [
    {
      name: "GitHub",
      icon: <Github className="text-2xl" />,
      oAuthProvider: "github",
    },
    {
      name: "Discord",
      icon: <Discord className="text-2xl" />,
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
          className="m-2 flex w-[16.9rem] justify-start gap-3 rounded-full"
        >
          {icon}
          Log in or sign up with {name}
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
