"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type Tab = "for-you" | "following";

export function HomeHeader() {
  const [tab, setTab] = useState<Tab>("for-you");

  return (
    <div className="h-30 back sticky top-0 backdrop-blur-md">
      <h1 className="p-3 text-xl font-semibold">Home</h1>
      <div className="flex justify-around">
        <Button
          variant="ghost"
          className="w-full rounded-none py-6 text-base font-semibold"
          onClick={() => setTab("for-you")}
        >
          For you
        </Button>
        <Button
          variant="ghost"
          className="w-full rounded-none py-6 text-base font-semibold"
          onClick={() => setTab("following")}
        >
          Following
        </Button>
      </div>
    </div>
  );
}
