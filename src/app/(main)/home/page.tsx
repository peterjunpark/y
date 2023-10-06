import React from "react";
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

export default function Home() {
  return (
    <div className="h-[5000px]">
      <HomeHeader />
      {posts.map((post, index) => (
        <Card key={index} className="rounded-none">
          <CardHeader>{post.user_id}</CardHeader>
          <CardContent>{post.body}</CardContent>
        </Card>
      ))}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nobis
      nulla eius perspiciatis eveniet ea minus iste, dignissimos aspernatur
      earum esse commodi consectetur nisi! Quo voluptatum recusandae qui alias
      eaque.
    </div>
  );
}
