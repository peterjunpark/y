import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  getCurrentUser,
  getPostIncludeParams,
  formatTimestamp,
} from "@/lib/utils";
import type {
  PostData,
  ThreadData,
  AuthorData,
  InteractionsData,
} from "@/components/post/post-card";
import { PostCard } from "@/components/post/post-card";
import { HomeHeader } from "@/components/home/header";
import { NewPostCard } from "@/components/post/new-post-card";

export const metadata: Metadata = {
  title: "Home / Y",
};

export default async function Home() {
  const { id: currentUserId } = await getCurrentUser();

  const posts = await prisma.post.findMany({
    include: getPostIncludeParams(currentUserId, ["likes", "replies"]),
    orderBy: { updatedAt: "asc" },
  });

  if (!posts) notFound();

  return (
    <>
      <HomeHeader tab="explore" />
      <NewPostCard />
      <div className="flex flex-col-reverse">
        {posts.map((post, index) => (
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
