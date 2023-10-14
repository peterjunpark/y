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
import { ProfileHeader } from "@/components/profile/header";
import { PostCard } from "@/components/post/post-card";

export const metadata: Metadata = {
  title: `Likes / Y`,
};

export default async function ProfileLikes({
  params,
}: {
  params: { handle: string };
}) {
  const { id: currentUserId } = await getCurrentUser();

  const user = await prisma.user.findUnique({
    where: { handle: params.handle },
    select: {
      handle: true,
      likes: {
        include: {
          likedPost: {
            include: getPostIncludeParams(currentUserId, ["likes", "replies"]),
          },
        },
      },
    },
  });

  if (!user) notFound();

  return (
    <>
      <ProfileHeader
        currentUserId={currentUserId}
        tab="likes"
        userHandle={user.handle!}
      />
      <div className="flex flex-col-reverse">
        {user.likes.map((like, index) => {
          const post = like.likedPost;

          return (
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
          );
        })}
      </div>
      {user.likes.length < 1 && (
        <div className="flex w-full justify-center py-10 text-muted-foreground">
          <p>Like some posts to see them here</p>
        </div>
      )}
    </>
  );
}
