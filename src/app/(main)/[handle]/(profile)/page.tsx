import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  formatTimestamp,
  getCurrentUser,
  getPostIncludeParams,
} from "@/lib/utils";
import type {
  PostData,
  ThreadData,
  AuthorData,
  InteractionsData,
} from "@/components/post/post-card";
import { ProfileHeader } from "@/components/profile/header";
import { PostCard } from "@/components/post/post-card";

export default async function ProfilePosts({
  params,
}: {
  params: { handle: string };
}) {
  const { id: currentUserId } = await getCurrentUser();

  const user = await prisma.user.findUnique({
    where: { handle: params.handle },
    select: {
      handle: true,
      posts: {
        include: getPostIncludeParams(currentUserId, ["likes", "replies"]),
      },
    },
  });

  if (!user) notFound();

  console.log(user);
  return (
    <>
      <ProfileHeader
        currentUserId={currentUserId}
        tab="posts"
        userHandle={user.handle!}
      />
      <div className="flex flex-col-reverse">
        {user.posts.map((post, index) => (
          <Link
            key={index}
            href={`/${post.author.handle}/${post.threadId}/${post.id}#main`}
          >
            <PostCard
              variant="compact"
              currentUserId={currentUserId}
              postData={
                {
                  content: post.content,
                  postId: post.id,
                  timestamp: formatTimestamp(post.updatedAt, "diff"),
                } satisfies PostData
              }
              threadData={
                {
                  threadId: post.threadId!,
                } satisfies ThreadData
              }
              authorData={
                {
                  authorId: post.authorId,
                  authorName: post.author.name!,
                  authorHandle: post.author.handle!,
                  authorImage: post.author.image!,
                } satisfies AuthorData
              }
              interactionsData={
                {
                  likesCount: post._count.likes,
                  repliesCount: post._count.replies,
                  isLikedByCurrentUser: post.likes.length > 0,
                  isBookmarkedByCurrentUser: post.bookmarks.length > 0,
                } satisfies InteractionsData
              }
            />
          </Link>
        ))}
      </div>
    </>
  );
}
