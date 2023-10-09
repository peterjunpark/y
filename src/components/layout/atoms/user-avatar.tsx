import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { clsx } from "clsx";

type UserAvatarProps = {
  hideHandle?: boolean;
};

export async function UserAvatar(
  { hideHandle }: UserAvatarProps = { hideHandle: false },
) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex gap-3 ">
      <Avatar>
        <AvatarImage src={session?.user?.image!} />
        <AvatarFallback>
          {session?.user?.name?.charAt(0).toUpperCase() ?? " "}
        </AvatarFallback>
      </Avatar>
      <ul
        className={clsx(
          "hidden flex-col items-start justify-center",
          !hideHandle && "xl:flex",
        )}
      >
        {session?.user?.name && <li>{session?.user?.name}</li>}
        {session?.user?.handle && <li>@{session?.user?.handle}</li>}
      </ul>
    </div>
  );
}
