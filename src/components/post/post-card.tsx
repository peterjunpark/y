import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardFooter,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TooltipProvider } from "../ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  FollowButton,
  ReplyButton,
  LikeButton,
  BookmarkButton,
  ThreadButton,
} from "@/components/post/interactions/buttons";

type PostCardProps = {
  postData: PostData;
  threadData: ThreadData;
  authorData: AuthorData;
  interactionsData: InteractionsData;
  variant?: "compact";
  pageVariant?: "thread" | "bookmark";
  currentUserId: string;
};

type PostData = {
  content: string;
  postId: number;
  timestamp: string;
};

type ThreadData = {
  threadId: number;
  threadCount?: number;
};

type AuthorData = {
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorImage: string;
};

type InteractionsData = {
  likesCount?: number;
  repliesCount?: number;
  bookmarksCount?: number;
  isLikedByCurrentUser: boolean;
  isBookmarkedByCurrentUser: boolean;
};

export type { PostData, ThreadData, AuthorData, InteractionsData };

export function PostCard({
  variant,
  pageVariant,
  currentUserId,
  postData: { content, postId, timestamp },
  threadData: { threadCount, threadId },
  authorData: { authorId, authorName, authorHandle, authorImage },
  interactionsData: {
    likesCount,
    repliesCount,
    bookmarksCount,
    isLikedByCurrentUser,
    isBookmarkedByCurrentUser,
  },
}: PostCardProps) {
  return (
    <Card
      className={cn(
        "w-full rounded-none px-2",
        {
          "transition-colors duration-100 ease-in-out hover:bg-muted":
            variant === "compact",
        },
        {
          "bg-stone-50 dark:bg-stone-950": variant !== "compact",
        },
      )}
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
              <FollowButton
                followedUserId={authorId}
                currentUserId={currentUserId!}
              />
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
        <TooltipProvider>
          {pageVariant !== "thread" && (
            <>
              <ReplyButton
                count={repliesCount}
                hoverEffect={variant === "compact"}
              />
              <LikeButton
                postId={postId}
                currentUserId={currentUserId}
                count={likesCount}
                hoverEffect={variant === "compact"}
                isLikedByCurrentUser={isLikedByCurrentUser}
              />
            </>
          )}
          {(pageVariant === "bookmark" || variant !== "compact") && (
            <BookmarkButton
              postId={postId}
              currentUserId={currentUserId}
              count={bookmarksCount}
              isBookmarkedByCurrentUser={isBookmarkedByCurrentUser}
            />
          )}
          {(pageVariant === "thread" || variant !== "compact") && (
            <ThreadButton count={threadCount} threadId={threadId} hoverEffect />
          )}
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
