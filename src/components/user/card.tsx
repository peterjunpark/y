import React from "react";
import { getCurrentUser } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ThemeToggle } from "@/components/theme/toggle";
import { LogOutButton } from "@/components/auth/buttons";
import { MoreVertical } from "lucide-react";

type UserCardProps = {
  name: string;
  image: string | null | undefined;
  handle: string;
};

export async function UserCard({ name, image, handle }: UserCardProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex justify-between gap-3 rounded-full py-7 xl:w-64"
        >
          <UserAvatar {...{ name, image, handle }} />
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
