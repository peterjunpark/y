"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function UserAvatar() {
  const { data: session } = useSession();
  return (
    <Avatar>
      <AvatarImage src={session?.user?.image!} />
      <AvatarFallback>
        {session?.user?.name?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
