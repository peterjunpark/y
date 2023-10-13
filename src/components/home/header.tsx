"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "../layout/header";
import { Button } from "@/components/ui/button";

type Tab = "explore" | "following";

export function HomeHeader() {
  const [tab, setTab] = useState<Tab>("explore");

  return (
    <Header title="Home">
      <Button
        variant="ghost"
        className={cn("w-full rounded-none py-6 text-base font-semibold", {
          "underline underline-offset-8": tab === "explore",
        })}
        onClick={() => setTab("explore")}
      >
        Explore
      </Button>
      <Button
        variant="ghost"
        className={cn("w-full rounded-none py-6 text-base font-semibold", {
          "underline underline-offset-8": tab === "following",
        })}
        onClick={() => setTab("following")}
      >
        Following
      </Button>
    </Header>
  );
}
