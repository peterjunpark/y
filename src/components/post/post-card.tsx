import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardFooter,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Bookmark, Shirt } from "lucide-react";

type PostCardProps = {
  content: string;
  postId?: number;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorImage: string;
  timestamp: string;
  likesCount: number;
  repliesCount: number;
  bookmarksCount?: number;
  threadId: number;
  variant?: "compact";
  authorIsCurrentUser?: boolean;
};

export function PostCard({
  content,
  authorId,
  authorName,
  authorHandle,
  authorImage,
  timestamp,
  likesCount,
  repliesCount,
  bookmarksCount,
  threadId,
  variant,
  authorIsCurrentUser,
}: PostCardProps) {
  return (
    <Card
      className={cn("w-full rounded-none px-2", {
        "transition-colors duration-100 ease-in-out hover:bg-muted":
          variant === "compact",
      })}
      data-author-id={authorId}
    >
      <div className="relative flex items-center pt-[0.4rem]">
        <Avatar className="ml-3">
          <AvatarImage src={authorImage} />
          <AvatarFallback>{authorName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardHeader className="w-full px-4 pt-3 sm:flex-row sm:items-center sm:gap-3">
          {authorName}{" "}
          {variant !== "compact" ? (
            <>
              <CardDescription>@{authorHandle}</CardDescription>
              <Button
                className={cn("absolute right-4 rounded-full", {
                  hidden: authorIsCurrentUser,
                })}
              >
                Follow
              </Button>
            </>
          ) : (
            <CardDescription>
              <span>@{authorHandle}</span>
              <span className="hidden xs:inline"> · </span>
              <span className="ml-[0.16rem] mt-[0.32rem] block xs:ml-0 xs:mt-0 xs:inline">
                {timestamp}
              </span>
            </CardDescription>
          )}
        </CardHeader>
      </div>
      <CardContent className="mt-2 pb-[0.65rem]">
        <p className="break-inside-auto hyphens-auto break-words">{content}</p>
        {variant !== "compact" && (
          <CardDescription className="pt-6">{timestamp}</CardDescription>
        )}
      </CardContent>
      <CardFooter
        className={cn("flex justify-end gap-5 py-[0.1rem]", {
          "justify-end": variant === "compact",
        })}
      >
        <Button
          variant="ghost"
          className={cn("flex cursor-default hover:bg-transparent", {
            "cursor-pointer hover:bg-sky-100 hover:text-blue-500 dark:hover:bg-opacity-10":
              variant === "compact",
          })}
        >
          {repliesCount} <MessageCircle className="ml-2 rounded-full" />
        </Button>
        <Button
          variant="ghost"
          className="flex hover:bg-pink-100 hover:text-pink-500 dark:hover:bg-opacity-10"
        >
          {likesCount} <Heart className="ml-2" />
        </Button>
        {variant !== "compact" && (
          <>
            <Button
              variant="ghost"
              className="flex hover:bg-green-100 hover:text-emerald-600 dark:hover:bg-opacity-10"
            >
              {bookmarksCount} <Bookmark className="ml-2" />
            </Button>
            <Link href={`/threads/${threadId}`}>
              <Button
                variant="ghost"
                className="flex hover:bg-fuchsia-100 hover:text-purple-600 dark:hover:bg-opacity-10"
              >
                <Shirt />
              </Button>
            </Link>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
