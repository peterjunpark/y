import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreVertical } from "lucide-react";

export function AvatarBtn() {
  return (
    <Button
      variant="ghost"
      className="flex justify-between rounded-full py-7 xl:w-64"
    >
      <div className="flex gap-3 ">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <ul className="hidden flex-col items-start xl:flex">
          <li>qkrwns</li>
          <li>@qkrwns</li>
        </ul>
      </div>
      <MoreVertical className="hidden xl:block" />
    </Button>
  );
}
