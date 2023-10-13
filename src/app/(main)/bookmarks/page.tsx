import React from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { PostCard } from "@/components/post/post-card";
import { formatTimestamp } from "@/lib/utils";

export default function Bookmarks() {
  return <Header title="Bookmarks" />;
}
