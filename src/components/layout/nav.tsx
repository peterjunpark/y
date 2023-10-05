import React from "react";
import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Home, Search, Bookmark, Users2, User2, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";

const xFont = localFont({
  src: "../../../public/special-alphabets-4-regular.otf",
  weight: "600",
  display: "swap",
  style: "normal",
});

export function Nav() {
  const navItems = [
    { name: "Home", href: "/home", icon: <Home className="my-[0.175rem]" /> },
    {
      name: "Explore",
      href: "/explore",
      icon: <Search className="my-[0.175rem]" />,
    },
    {
      name: "Bookmarks",
      href: "/bookmarks",
      icon: <Bookmark className="my-[0.175rem]" />,
    },
    {
      name: "Communities",
      href: "/communities",
      icon: <Users2 className="my-[0.175rem]" />,
    },
    {
      name: "Premium",
      href: "/premium",
      icon: (
        <span
          className={cn(xFont.className, "mt-1 text-[1.6rem] leading-none")}
        >
          Y
        </span>
      ),
    },
    {
      name: "Profile",
      href: "/profile",
      icon: <User2 className="my-[0.175rem]" />,
    },
  ];

  return (
    <div className="flex flex-col gap-6 py-4 pl-4 pr-4 lg:pr-10">
      <h1 className={cn(xFont.className, "ml-[0.8rem] text-4xl")}>
        <Link href="/home">Y</Link>
      </h1>
      <nav className="flex flex-col items-center gap-6 lg:items-start">
        {navItems.map((item, index) => (
          <Button key={index} className="justify-start text-xl" variant="ghost">
            <Link href={item.href} className="flex items-center gap-3">
              {item.icon}
              <span className="hidden lg:block">{item.name}</span>
            </Link>
          </Button>
        ))}
        <Button className="mt-2 text-lg lg:w-52">
          <span className="hidden lg:block">Post</span>
          <Feather className="block lg:hidden" />
        </Button>
      </nav>
    </div>
  );
}
