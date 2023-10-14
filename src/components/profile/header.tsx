import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { FollowButton } from "@/components/post/interactions/buttons";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type ProfileHeaderProps = {
  currentUserId: string;
  tab: "posts" | "likes";
  userHandle: string;
};

export async function ProfileHeader({
  currentUserId,
  tab,
  userHandle,
}: ProfileHeaderProps) {
  const user = await prisma.user.findUnique({
    where: { handle: userHandle },
    include: {
      _count: { select: { followers: true, posts: true } },
    },
  });

  if (!user) notFound();

  return (
    <>
      <Header title={user.name!} />
      <Card className="rounded-none border-b-0">
        <div className="relative flex h-fit items-center justify-around pt-[0.4rem] sm:px-10">
          <Avatar className="my-2 ml-3 h-36 w-36 border-2 border-primary">
            <AvatarImage src={user.image!} />
            <AvatarFallback>
              {user.name!.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex w-full items-center justify-between">
              <CardHeader className="mr-2 py-3 text-2xl font-bold">
                {user.name}
              </CardHeader>
              <FollowButton
                className="relative"
                followedUserId={user.id}
                currentUserId={currentUserId}
              />
            </div>
            <ul className="gap-2 px-6">
              <li>@{user.handle}</li>
              <li className="mt-3 text-sm">
                {user._count.followers} followers · {user._count.posts} posts
              </li>
            </ul>
          </div>
        </div>
      </Card>
      <div className="flex border-none backdrop-blur-md">
        {tab === "posts" ? (
          <>
            <Button
              variant="ghost"
              className="w-full rounded-none py-6 text-base font-semibold underline underline-offset-8"
            >
              Posts
            </Button>
            <Button
              asChild
              variant="ghost"
              className="w-full rounded-none py-6 text-base font-semibold"
            >
              <Link href={`/${userHandle}/likes`}>Likes</Link>
            </Button>
          </>
        ) : (
          <>
            <Button
              asChild
              variant="ghost"
              className="w-full rounded-none py-6 text-base font-semibold"
            >
              <Link href={`/${userHandle}`}>Posts</Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full rounded-none py-6 text-base font-semibold underline underline-offset-8"
            >
              Likes
            </Button>
          </>
        )}
      </div>
    </>
  );
}
