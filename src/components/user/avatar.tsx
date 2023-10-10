import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/utils";

type UserAvatarProps = {
  name?: string;
  handle?: string;
  image: string | null | undefined;
};

export async function UserAvatar({ name, image, handle }: UserAvatarProps) {
  return (
    <div className={cn("w-fit", name && handle && "flex gap-3")}>
      <Avatar>
        <AvatarImage src={image ?? undefined} />
        <AvatarFallback>{name?.charAt(0).toUpperCase() ?? " "}</AvatarFallback>
      </Avatar>
      <ul
        className={cn(
          "hidden flex-col items-start justify-center",
          name && handle && "xl:flex",
        )}
      >
        {name && <li>{name}</li>}
        {handle && <li>@{handle}</li>}
      </ul>
    </div>
  );
}
