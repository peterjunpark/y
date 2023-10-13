"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { handleLikeOrBookmark } from "./actions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { Heart, MessageCircle, Bookmark, Shirt } from "lucide-react";

type ReplyButtonProps = {
  count?: number;
  hoverEffect?: boolean;
};

type LikeButtonProps = {
  postId: number;
  currentUserId: string;
  isLikedByCurrentUser: boolean;
} & ReplyButtonProps;

type BookmarkButtonProps = {
  postId: number;
  currentUserId: string;
  isBookmarkedByCurrentUser: boolean;
} & ReplyButtonProps;

type ThreadButtonProps = {
  threadId: number;
} & ReplyButtonProps;

type FollowButtonProps = {
  hidden?: boolean;
  followedUserId: string;
  currentUserId: string;
};

export function ReplyButton({ count, hoverEffect }: ReplyButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className={cn("flex cursor-default hover:bg-transparent", {
            "cursor-pointer hover:bg-sky-100 hover:text-blue-500 dark:hover:bg-opacity-10":
              hoverEffect,
          })}
        >
          {count} <MessageCircle className="ml-2 rounded-full" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {hoverEffect ? <p>Reply</p> : <p>Replies</p>}
      </TooltipContent>
    </Tooltip>
  );
}

export function LikeButton({
  count,
  postId,
  currentUserId,
  isLikedByCurrentUser,
}: LikeButtonProps) {
  const [currentCount, setCurrentCount] = useState<number>(count!);
  const [isLiked, setIsLiked] = useState<boolean>(isLikedByCurrentUser);
  const initialIsLiked = useRef<boolean>(isLikedByCurrentUser);
  const { toast } = useToast();

  useEffect(() => {
    const formData = new FormData();
    formData.append("currentUserId", currentUserId);

    if (isLiked) {
      formData.append("like", postId.toString());
    } else {
      formData.append("unlike", postId.toString());
    }

    (async () => {
      if (isLiked === initialIsLiked.current) return;
      const res = await handleLikeOrBookmark(formData);

      if (res) {
        if (res.success === "liked") {
          toast({
            title: "Like added",
          });
          initialIsLiked.current = isLiked;
          setCurrentCount((prev) => prev + 1);
        } else if (res.success === "unliked") {
          toast({
            title: "Like removed",
          });
          initialIsLiked.current = isLiked;
          setCurrentCount((prev) => prev - 1);
        } else if (res.error) {
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: res.error.message,
          });
          setIsLiked(initialIsLiked.current);
        }
      }
    })();
  }, [isLiked, toast, currentUserId, postId]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked((prev) => !prev);
          }}
          variant="ghost"
          className={cn(
            "flex hover:bg-pink-100 hover:text-pink-500 dark:hover:bg-opacity-10",
            { "text-pink-500 hover:text-muted": isLiked },
          )}
        >
          {currentCount} <Heart className="ml-2" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{isLiked ? <p>Unlike</p> : <p>Like</p>}</TooltipContent>
    </Tooltip>
  );
}

export function BookmarkButton({
  count,
  postId,
  currentUserId,
  isBookmarkedByCurrentUser,
}: BookmarkButtonProps) {
  const [currentCount, setCurrentCount] = useState<number>(count!);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    isBookmarkedByCurrentUser,
  );
  const initialIsBookmarked = useRef<boolean>(isBookmarkedByCurrentUser);
  const { toast } = useToast();

  useEffect(() => {
    const formData = new FormData();
    formData.append("currentUserId", currentUserId);

    if (isBookmarked) {
      formData.append("bookmark", postId.toString());
    } else {
      formData.append("unbookmark", postId.toString());
    }

    (async () => {
      if (isBookmarked === initialIsBookmarked.current) return;
      const res = await handleLikeOrBookmark(formData);

      if (res) {
        if (res.success === "bookmarked") {
          toast({
            title: "Bookmark added",
          });
          initialIsBookmarked.current = isBookmarked;
          setCurrentCount((prev) => prev + 1);
        } else if (res.success === "unbookmarked") {
          toast({
            title: "Bookmark removed",
          });
          initialIsBookmarked.current = isBookmarked;
          setCurrentCount((prev) => prev - 1);
        } else if (res.error) {
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: res.error.message,
          });
          setIsBookmarked(initialIsBookmarked.current);
        }
      }
    })();
  });
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setIsBookmarked((prev) => !prev);
          }}
          variant="ghost"
          className={cn(
            "flex hover:bg-green-100 hover:text-emerald-600 dark:hover:bg-opacity-10",
            { "text-emerald-600 hover:text-muted": isBookmarked },
          )}
        >
          {currentCount} <Bookmark className="ml-2" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isBookmarked ? <p>Unbookmark</p> : <p>Bookmark</p>}
      </TooltipContent>
    </Tooltip>
  );
}

export function ThreadButton({ count, threadId }: ThreadButtonProps) {
  const router = useRouter();

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              router.push(`/threads/${threadId}`);
            }}
            variant="ghost"
            className="flex hover:bg-orange-100 hover:text-amber-500 dark:hover:bg-opacity-10"
          >
            {count ? (
              <>
                {count} <Shirt className="ml-2" />
              </>
            ) : (
              <Shirt />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {count ? (
            <p>
              {count} post{count > 1 && "s"} in this thread
            </p>
          ) : (
            <p>See full thread</p>
          )}
        </TooltipContent>
      </Tooltip>
    </>
  );
}

export function FollowButton({
  currentUserId,
  followedUserId,
}: FollowButtonProps) {
  const handleFollow = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };
  return (
    <Button
      onClick={handleFollow}
      className={cn("absolute right-4 rounded-full", {
        hidden: currentUserId === followedUserId,
      })}
    >
      Follow
    </Button>
  );
}