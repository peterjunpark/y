import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  formatTimestamp,
  getCurrentUser,
  getPostIncludeParams,
} from "@/lib/utils";

import { Header } from "@/components/layout/header";
import type {
  PostData,
  ThreadData,
  AuthorData,
  InteractionsData,
} from "@/components/post/post-card";
import { PostCard } from "@/components/post/post-card";

export default async function Bookmarks() {
  const { id: currentUserId } = await getCurrentUser();

  const bookmarks = await prisma.bookmark.findMany({
    include: {
      bookmarkedPost: {
        include: getPostIncludeParams(currentUserId, [
          "likes",
          "replies",
          "bookmarks",
        ]),
      },
    },
    orderBy: { bookmarkedPostId: "desc" },
  });

  return (
    <>
      <Header title="Bookmarks" />
      {bookmarks.map((bookmark, index) => {
        const post = bookmark.bookmarkedPost;

        return (
          <Link
            key={index}
            href={`/${post.author.handle}/${post.threadId}/${post.id}#main`}
          >
            <PostCard
              pageVariant="bookmark"
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
        );
      })}
      <div className="flex w-full justify-center py-10 text-muted-foreground">
        <p>No more bookmarks</p>
      </div>
    </>
  );
}
