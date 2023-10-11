import React from "react";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { PostCard } from "@/components/post/post-card";
import { NewPostCard } from "@/components/post/new-post-card";
import { getCurrentUser, formatTimestamp } from "@/lib/utils";

export default async function PostPage({
  params,
}: {
  params: { handle: string; postId: string };
}) {
  // Make sure post ID is a number so we can safely parse to int.
  if (!/^\d+$/.test(params.postId)) notFound();
  const postId = parseInt(params.postId, 10);

  const { handle: currentUserHandle } = await getCurrentUser();

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      replies: true,
      likes: true,
    },
  });

  if (!post) notFound();

  // Make sure to display correct author in URL.
  if (post.author.handle !== params.handle)
    redirect(`/${post.author.handle}/post/${postId}`);

  const isReply = post.parentId !== null;
  const isParent = post.replies.length > 0;

  return (
    <>
      <PostCard
        authorIsCurrentUser={currentUserHandle === post.author.handle}
        content={post.content}
        postId={parseInt(params.postId)}
        authorId={post.authorId}
        authorName={post.author.name!}
        authorHandle={post.author.handle!}
        authorImage={post.author.image!}
        timestamp={formatTimestamp(post.updatedAt)}
        likesCount={post.likes.length}
        repliesCount={post.replies.length}
      />
      <NewPostCard replyTo={postId} />
      {!isParent && (
        <div className="flex w-full justify-center pt-10 text-muted-foreground">
          <p>No replies</p>
        </div>
      )}
    </>
  );
}
