import React from "react";
import { notFound, redirect } from "next/navigation";
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
import { Header } from "@/components/layout/header";

export default async function Thread({ params }: { params: { id: string } }) {
  if (!/^\d+$/.test(params.id)) notFound();

  const threadId = parseInt(params.id, 10);

  const { id: currentUserId } = await getCurrentUser();

  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    include: {
      posts: {
        include: getPostIncludeParams(currentUserId, ["likes", "replies"]),
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!thread) notFound();

  return (
    <>
      <Header title="In this thread" />
      {thread.posts.map((post, index) => (
        <Link
          href={`/${post.author.handle}/${post.threadId}/${post.id}`}
          key={index}
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
                bookmarksCount: post._count.bookmarks,
                isLikedByCurrentUser: post.likes.length > 0,
                isBookmarkedByCurrentUser: post.bookmarks.length > 0,
              } satisfies InteractionsData
            }
          />
        </Link>
      ))}
      <div className="flex w-full justify-center py-10 text-muted-foreground">
        <p>No more related posts</p>
      </div>
    </>
  );
}
