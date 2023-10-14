"use client";

import React from "react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  SiGithub as Github,
  SiDiscord as Discord,
  SiKakaotalk as Kakao,
  SiOsu as Osu,
} from "react-icons/si";

export function LogInButton() {
  const loginProviders = [
    {
      name: "Discord",
      icon: <Discord className="text-2xl" />,
      oAuthProvider: "discord",
    },
    {
      name: "GitHub",
      icon: <Github className="text-2xl" />,
      oAuthProvider: "github",
    },
    {
      name: "KakaoTalk",
      icon: <Kakao className="text-2xl" />,
      oAuthProvider: "kakao",
    },
    {
      name: "Osu!",
      icon: <Osu className="text-2xl" />,
      oAuthProvider: "osu",
    },
  ];

  return (
    <>
      {loginProviders.map(({ name, icon, oAuthProvider }, index) => (
        <Button
          key={index} // Added key prop for React list rendering
          onClick={() => signIn(oAuthProvider, { callbackUrl: "/home" })}
          variant="default"
          className="m-2 flex w-[18rem] justify-start gap-3 rounded-full"
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
