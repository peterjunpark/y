import React from "react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Search, Bookmark, Users2, User2, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";

const xFont = localFont({
  src: "../../public/special-alphabets-4-regular.otf",
  weight: "600",
  display: "swap",
  style: "normal",
});

export default function Home() {
  return (
    <main className="flex h-screen">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className={cn(xFont.className, "select-none text-[30rem]")}>Y</h1>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2>Happening now</h2>
        <div className="flex flex-col">
          <h3>Join today.</h3>
          <Button>Sign up with Google</Button>
          <Button>Sign up with Apple</Button>
        </div>
      </div>
    </main>
  );
}
