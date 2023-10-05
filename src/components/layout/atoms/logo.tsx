import React from "react";
import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const xFont = localFont({
  src: "../../../../public/special-alphabets-4-regular.otf",
  weight: "600",
  display: "swap",
  style: "normal",
});

export function Logo({ className }: { className?: string }) {
  return <span className={cn(xFont.className, className)}>Y</span>;
}
