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
              @{authorHandle} · {timestamp}
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
      <CardFooter className="flex justify-end gap-5 pb-[0.08rem]">
        <Button variant="ghost" className="flex hover:text-blue-500">
          {repliesCount} <MessageCircle className="ml-2 rounded-full" />
        </Button>
        {variant !== "compact" && (
          <Button variant="ghost" className="flex hover:text-emerald-500">
            {likesCount} <Bookmark className="ml-2" />
          </Button>
        )}
        <Button variant="ghost" className="flex hover:text-pink-500">
          {likesCount} <Heart className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
