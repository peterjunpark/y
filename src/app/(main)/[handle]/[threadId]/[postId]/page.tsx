import React from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { PostCard } from "@/components/post/post-card";
import { NewPostCard } from "@/components/post/new-post-card";
import { getCurrentUser, formatTimestamp } from "@/lib/utils";

export default async function PostPage({
  params,
}: {
  params: { handle: string; threadId: string; postId: string };
}) {
  // Make sure post ID and thread ID are numbers so we can safely parse to int.
  // Kinda jank route validation.
  // TODO: Could probably improve this.

  if (!/^\d+$/.test(params.postId) || !/^\d+$/.test(params.threadId))
    notFound();
  const postId = parseInt(params.postId, 10);
  const threadId = parseInt(params.threadId, 10);

  const post = await prisma.post.findUnique({
    where: { id: postId, threadId: threadId },
    include: {
      _count: { select: { likes: true, bookmarks: true } }, // Get likes count for the main post.
      author: {
        select: { handle: true, membership: true, image: true, name: true },
      },
      parent: {
        include: {
          author: true,
          _count: { select: { likes: true, replies: true } },
        },
      },
      replies: {
        // Get replies under the main post.
        include: {
          author: true, // Get the author of the reply.
          _count: { select: { likes: true, replies: true } }, // Get likes and replies count for each reply.
        },
        orderBy: { updatedAt: "desc" }, // Order replies by latest first.
      },
    },
  });

  if (!post) notFound();
  // Make sure to display correct author in URL.
  if (post.author.handle !== params.handle)
    redirect(`/${post.author.handle}/post/${postId}#main`);

  const { handle: currentUserHandle } = await getCurrentUser();

  return (
    <>
      {post.parent && (
        <Link
          href={`/${post.parent.author.handle}/${post.parent.threadId}/${post.parent.id}#main`}
        >
          <PostCard
            variant="compact"
            authorIsCurrentUser={
              currentUserHandle === post.parent.author.handle
            }
            content={post.parent.content}
            postId={post.parent.id}
            authorId={post.parent.authorId}
            authorName={post.parent.author.name!}
            authorHandle={post.parent.author.handle!}
            authorImage={post.parent.author.image!}
            threadId={post.parent.threadId!}
            timestamp={formatTimestamp(post.parent.updatedAt, "diff")}
            likesCount={post.parent._count.likes}
            repliesCount={post.parent._count.replies}
          />
        </Link>
      )}

      {/* Automatically scroll to id="main" on page load. */}
      <div id="main" className="min-h-screen">
        <PostCard
          authorIsCurrentUser={currentUserHandle === post.author.handle}
          content={post.content}
          postId={parseInt(params.postId)}
          authorId={post.authorId}
          authorName={post.author.name!}
          authorHandle={post.author.handle!}
          authorImage={post.author.image!}
          threadId={post.threadId!}
          timestamp={formatTimestamp(post.updatedAt)}
          likesCount={post._count.likes}
          repliesCount={post.replies.length}
          bookmarksCount={post._count.bookmarks}
        />

        <NewPostCard replyTo={postId} thread={threadId} />

        {post.replies.map((reply, index) => (
          <Link
            href={`/${reply.author.handle}/${reply.threadId}/${reply.id}#main`}
            key={index}
            className="w-full"
          >
            <PostCard
              variant="compact"
              authorIsCurrentUser={currentUserHandle === reply.author.handle}
              content={reply.content}
              postId={reply.id}
              authorId={reply.authorId}
              authorName={reply.author.name!}
              authorHandle={reply.author.handle!}
              authorImage={reply.author.image!}
              threadId={reply.threadId!}
              timestamp={formatTimestamp(reply.updatedAt, "diff")}
              likesCount={reply._count.likes}
              repliesCount={reply._count.replies}
            />
          </Link>
        ))}

        <div className="flex w-full justify-center py-10 text-muted-foreground">
          <p>No {post.replies.length > 0 && "more "}direct replies</p>
        </div>
      </div>
    </>
  );
}
