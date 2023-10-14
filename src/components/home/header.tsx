import React from "react";
import Link from "next/link";
import { Header } from "../layout/header";
import { Button } from "@/components/ui/button";

type HomeHeaderProps = {
  tab: "explore" | "following";
};

export function HomeHeader({ tab }: HomeHeaderProps) {
  return (
    <div className="flex justify-around">
      {tab === "explore" ? (
        <>
          <Button
            variant="ghost"
            className="w-full rounded-none py-6 text-base font-semibold underline underline-offset-8"
          >
            Explore
          </Button>
          <Button
            asChild
            variant="ghost"
            className="w-full rounded-none py-6 text-base font-semibold"
          >
            <Link href="/following">Following</Link>
          </Button>
        </>
      ) : (
        <>
          <Button
            asChild
            variant="ghost"
            className="w-full rounded-none py-6 text-base font-semibold"
          >
            <Link href="/home">Explore</Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full rounded-none py-6 text-base font-semibold underline underline-offset-8"
          >
            Following
          </Button>
        </>
      )}
    </div>
  );
}
