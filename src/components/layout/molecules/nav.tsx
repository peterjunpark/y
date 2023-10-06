import React from "react";
import Link from "next/link";
import { UserCard } from "./user-card";
import { Logo } from "../atoms/logo";
import { Button } from "@/components/ui/button";
import { Home, Search, Bookmark, Users2, User2, Feather } from "lucide-react";

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
        <Logo className="ml-[0.23rem] mr-[0.1rem] mt-1 text-[1.6rem] leading-none" />
      ),
    },
    {
      name: "Profile",
      href: "/profile",
      icon: <User2 className="my-[0.175rem]" />,
    },
  ];

  return (
    <div className="flex flex-col justify-between py-4 xl:pr-10">
      <div className="flex flex-col items-center gap-6 xl:items-start">
        <Link href="/home">
          <Logo className={"text-4xl xl:ml-[0.8rem]"} />
        </Link>
        <nav className="flex flex-col items-center gap-6 xl:items-start">
          {navItems.map((item, index) => (
            <Button
              key={index}
              className="justify-start rounded-full text-xl"
              variant="ghost"
            >
              <Link href={item.href} className="flex items-center gap-3">
                {item.icon}
                <span className="hidden xl:block">{item.name}</span>
              </Link>
            </Button>
          ))}
          <Button className="mt-2 rounded-full text-lg xl:w-52">
            <span className="hidden xl:block">Post</span>
            <Feather className="block xl:hidden" />
          </Button>
        </nav>
      </div>
      <UserCard />
    </div>
  );
}
