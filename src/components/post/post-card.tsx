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
import { Heart, MessageCircle, Bookmark } from "lucide-react";

type PostCardProps = {
  content: string;
  postId: number;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorImage: string;
  timestamp: string;
  likesCount: number;
  repliesCount: number;
  variant?: "compact";
  authorIsCurrentUser?: boolean;
};

export function PostCard({
  content,
  postId,
  authorId,
  authorName,
  authorHandle,
  authorImage,
  timestamp,
  likesCount,
  repliesCount,
  variant,
  authorIsCurrentUser,
}: PostCardProps) {
  return (
    <Card
      className={cn("rounded-none px-2", {
        "transition-colors duration-100 ease-in-out hover:bg-muted":
          variant === "compact",
      })}
      id={`${postId}`}
      data-author-id={authorId}
    >
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={authorImage} />
          <AvatarFallback>{authorName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardHeader className="w-full px-4 pt-5 sm:flex-row sm:items-center sm:gap-3">
          {authorName}{" "}
          {variant !== "compact" ? (
            <CardDescription className="relative flex w-full items-center justify-between">
              @{authorHandle}
              <Button
                className={cn("absolute right-0 rounded-full", {
                  hidden: authorIsCurrentUser,
                })}
              >
                Follow
              </Button>
            </CardDescription>
          ) : (
            <CardDescription>
              <span>@{authorHandle}</span>
              <span className="hidden xs:inline"> · </span>
              <span className="mt-1 block xs:mt-0 xs:inline">{timestamp}</span>
            </CardDescription>
          )}
        </CardHeader>
      </div>
      <CardContent className="pb-[0.65rem]">
        <p className="break-inside-auto hyphens-auto break-words">{content}</p>
        {variant !== "compact" && (
          <CardDescription className="pt-6">{timestamp}</CardDescription>
        )}
      </CardContent>
      <CardFooter className="flex justify-around gap-5 py-[0.1rem] xs:justify-end">
        <Button
          variant="ghost"
          className={cn("flex hover:bg-transparent", {
            "hover:bg-sky-100 hover:text-blue-500 dark:hover:bg-opacity-10":
              variant === "compact",
          })}
        >
          {repliesCount} <MessageCircle className="ml-2 rounded-full" />
        </Button>
        {variant !== "compact" && (
          <Button
            variant="ghost"
            className="flex hover:bg-green-100 hover:text-emerald-600 dark:hover:bg-opacity-10"
          >
            {likesCount} <Bookmark className="ml-2" />
          </Button>
        )}
        <Button
          variant="ghost"
          className="flex hover:bg-pink-100 hover:text-pink-500 dark:hover:bg-opacity-10"
        >
          {likesCount} <Heart className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
