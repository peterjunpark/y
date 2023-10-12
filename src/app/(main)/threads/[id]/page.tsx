import React from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { PostCard } from "@/components/post/post-card";
import { NewPostCard } from "@/components/post/new-post-card";
import { getCurrentUser, formatTimestamp } from "@/lib/utils";

export default async function Thread({ params }: { params: { id: string } }) {
  return <div>{params.id}</div>;
}
