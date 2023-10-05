import { NextResponse } from "next/server";

const posts = [
  {
    title: "peter",
    slug: "peter",
    content: "lorem ipsum",
  },
  {
    title: "john",
    slug: "john",
    content: "dolor sit amet",
  },
  {
    title: "jane",
    slug: "jane",
    content: "consectetur adipiscing elit",
  },
];

export async function GET() {
  return NextResponse.json(posts);
}
