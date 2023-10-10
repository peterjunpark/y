import React from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { HomeHeader } from "@/components/home/header";
import { NewPostCard } from "@/components/post/new-post-card";
import { PostCard } from "@/components/post/post-card";

export const metadata: Metadata = {
  title: "Home / Y",
};

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { parent: null },
    include: {
      author: true,
      _count: { select: { likes: true, replies: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <>
      <HomeHeader />
      <NewPostCard />
      {posts.map((post, index) => (
        <PostCard
          key={index}
          content={post.content}
          postId={post.id}
          authorId={post.authorId}
          authorName={post.author.name!}
          authorHandle={post.author.handle!}
          authorImage={post.author.image!}
          timestamp={post.updatedAt}
          likesCount={post._count.likes}
          repliesCount={post._count.replies}
        />
      ))}
    </>
  );
}
