"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type PostAvatarProps = {
  authorImage: string;
  authorName: string;
  authorHandle: string;
};

export function PostAvatar({
  authorImage,
  authorName,
  authorHandle,
}: PostAvatarProps) {
  const router = useRouter();

  return (
    <Avatar
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        router.push(`/${authorHandle}/`);
      }}
      className="ml-3 hover:border-2 hover:border-primary"
    >
      <AvatarImage src={authorImage} />
      <AvatarFallback>{authorName.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
