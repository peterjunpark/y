import React from "react";
import type { Metadata } from "next";
import { HomeHeader } from "../../../components/home/header";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { posts, users, communities } from "@/data";

export const metadata: Metadata = {
  title: "Home / Y",
};

export default function Home() {
  return (
    <div className="h-[5000px]">
      <HomeHeader />
      {posts.map((post, index) => (
        <Card key={index} className="rounded-none">
          <CardHeader>{post.user_id}</CardHeader>
          <CardDescription>This is a card descriptio</CardDescription>
          <CardContent>{post.body}</CardContent>
          <CardFooter>This is a card footer</CardFooter>
        </Card>
      ))}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nobis
      nulla eius perspiciatis eveniet ea minus iste, dignissimos aspernatur
      earum esse commodi consectetur nisi! Quo voluptatum recusandae qui alias
      eaque.
    </div>
  );
}
