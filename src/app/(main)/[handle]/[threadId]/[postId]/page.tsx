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
import { NewPostCard } from "@/components/post/new-post-card";

export default async function PostPage({
  params,
}: {
  params: { handle: string; threadId: string; postId: string };
}) {
  // Make sure post ID and thread ID are numbers so we can safely parse to int.
  // Kinda jank route validation. Could probably be better.

  if (!/^\d+$/.test(params.postId) || !/^\d+$/.test(params.threadId))
    notFound();
  const postId = parseInt(params.postId, 10);
  const threadId = parseInt(params.threadId, 10);

  // Reminder: we're already making sure the session exists in the helper function.
  const { id: currentUserId } = await getCurrentUser();

  const post = await prisma.post.findUnique({
    where: { id: postId, threadId: threadId },
    include: {
      ...getPostIncludeParams(currentUserId, ["likes", "bookmarks"]),
      parent: {
        include: getPostIncludeParams(currentUserId, ["likes", "replies"]),
      },
      replies: {
        // Get replies under the main post.
        include: getPostIncludeParams(currentUserId, ["likes", "replies"]),
        orderBy: { updatedAt: "asc" }, // Order replies by latest first.
      },
    },
  });

  if (!post) notFound();
  // Make sure to display correct author in URL.
  if (post.author.handle !== params.handle)
    redirect(`/${post.author.handle}/post/${postId}#main`);

  return (
    <>
      {post.parent && (
        <Link
          href={`/${post.parent.author.handle}/${post.parent.threadId}/${post.parent.id}#main`}
        >
          <PostCard
            variant="compact"
            currentUserId={currentUserId}
            postData={
              {
                content: post.parent.content,
                postId: post.parent.id,
                timestamp: formatTimestamp(post.parent.updatedAt, "diff"),
              } satisfies PostData
            }
            threadData={
              {
                threadId: post.parent.threadId!,
              } satisfies ThreadData
            }
            authorData={
              {
                authorId: post.parent.authorId,
                authorName: post.parent.author.name!,
                authorHandle: post.parent.author.handle!,
                authorImage: post.parent.author.image!,
              } satisfies AuthorData
            }
            interactionsData={
              {
                likesCount: post.parent._count.likes,
                repliesCount: post.parent._count.replies,
                isLikedByCurrentUser: post.parent.likes.length > 0,
                isBookmarkedByCurrentUser: post.parent.bookmarks.length > 0,
              } satisfies InteractionsData
            }
          />
        </Link>
      )}

      {/* Automatically scroll to id="main" on page load. */}
      <div id="main" className="min-h-screen">
        <div className="sticky top-0 z-10">
          <PostCard
            currentUserId={currentUserId}
            postData={
              {
                content: post.content,
                postId: post.id,
                timestamp: formatTimestamp(post.updatedAt),
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

          <NewPostCard
            className="border-t-0 bg-stone-50 dark:bg-stone-950"
            replyTo={postId}
            thread={threadId}
          />
        </div>
        <div className="flex flex-col-reverse">
          {post.replies.map((reply, index) => (
            <Link
              href={`/${reply.author.handle}/${reply.threadId}/${reply.id}#main`}
              key={index}
              className="w-full"
            >
              <PostCard
                variant="compact"
                currentUserId={currentUserId}
                postData={
                  {
                    content: reply.content,
                    postId: reply.id,
                    timestamp: formatTimestamp(reply.updatedAt, "diff"),
                  } satisfies PostData
                }
                threadData={
                  {
                    threadId: reply.threadId!,
                  } satisfies ThreadData
                }
                authorData={
                  {
                    authorId: reply.authorId,
                    authorName: reply.author.name!,
                    authorHandle: reply.author.handle!,
                    authorImage: reply.author.image!,
                  } satisfies AuthorData
                }
                interactionsData={
                  {
                    likesCount: reply._count.likes,
                    repliesCount: reply._count.replies,
                    isLikedByCurrentUser: reply.likes.length > 0,
                    isBookmarkedByCurrentUser: reply.bookmarks.length > 0,
                  } satisfies InteractionsData
                }
              />
            </Link>
          ))}
        </div>
        <div className="flex w-full justify-center py-10 text-muted-foreground">
          <p>No {post.replies.length > 0 && "more "}direct replies</p>
        </div>
      </div>
    </>
  );
}
