import {
  Card,
  CardHeader,
  CardFooter,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

type PostCardProps = {
  content: string;
  postId: number;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorImage: string;
  timestamp: Date;
  likesCount: number;
  repliesCount: number;
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
}: PostCardProps) {
  const timeDiff = Math.round(
    (Date.now() - timestamp.getTime()) / 1000 / 60 / 60,
  );
  const dayDiff = Math.round(timeDiff / 24);

  return (
    <Card
      className="rounded-none px-2"
      data-post-id={postId}
      data-author-id={authorId}
    >
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={authorImage} />
          <AvatarFallback>{authorName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardHeader className="px-3 pt-[1.1rem] sm:flex-row sm:items-center sm:gap-3">
          {authorName}{" "}
          <CardDescription>
            @{authorHandle} ·{" "}
            {dayDiff ? `${dayDiff}d` : timeDiff ? `${timeDiff}h` : "now"}
          </CardDescription>
        </CardHeader>
      </div>
      <CardContent className="pb-[0.65rem]">
        <p className="break-inside-auto hyphens-auto break-words">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-5 pb-[0.08rem]">
        <Button variant="ghost" className="flex">
          {repliesCount} <MessageCircle className="ml-2" />
        </Button>
        <Button variant="ghost" className="flex">
          {likesCount} <Heart className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
