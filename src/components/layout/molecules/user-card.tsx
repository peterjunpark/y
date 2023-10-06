import React from "react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/layout/atoms/user-avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LogOutButton } from "@/components/auth/buttons";
import { MoreVertical } from "lucide-react";

export function UserCard() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex justify-between rounded-full py-7 xl:w-64"
        >
          <div className="flex gap-3 ">
            <UserAvatar />
            <ul className="hidden flex-col items-start xl:flex">
              <li>qkrwns</li>
              <li>@qkrwns</li>
            </ul>
          </div>
          <MoreVertical className="hidden xl:block" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit justify-around gap-2">
        <ThemeToggle />
        <LogOutButton />
      </PopoverContent>
    </Popover>
  );
}
