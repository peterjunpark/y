"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function UserAvatar() {
  const { data: session } = useSession();
  return (
    <div className="flex gap-3 ">
      <Avatar>
        <AvatarImage src={session?.user?.image!} />
        <AvatarFallback>
          {session?.user?.name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <ul className="hidden flex-col items-start xl:flex">
        <li>{session?.user?.name ?? session?.user!.email}</li>
        <li>@qkrwns</li>
      </ul>
    </div>
  );
}
