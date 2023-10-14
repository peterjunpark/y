import React from "react";
import type { Metadata } from "next";
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
import { PostCard } from "@/components/post/post-card";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Threads / Y",
};

export default async function Threads() {
  const { id: currentUserId } = await getCurrentUser();

  const threads = await prisma.thread.findMany({
    include: {
      _count: { select: { posts: true } },
      posts: {
        include: getPostIncludeParams(currentUserId),
        orderBy: { createdAt: "asc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "asc" },
  });

  if (!threads) notFound();

  return (
    <>
      <Header title="Threads" />
      <div className="flex flex-col-reverse">
        {threads.map((thread, index) => {
          const post = thread.posts[0];

          return (
            <Link href={`/threads/${post.threadId}`} key={index}>
              <PostCard
                pageVariant="thread"
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
                    threadCount: thread._count.posts,
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
                    isLikedByCurrentUser: post.likes.length > 0,
                    isBookmarkedByCurrentUser: post.bookmarks.length > 0,
                  } satisfies InteractionsData
                }
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
