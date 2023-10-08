import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export async function UserAvatar() {
  const session = await getServerSession(authOptions);

  console.log({ avatar: session });

  return (
    <div className="flex gap-3 ">
      <Avatar>
        <AvatarImage src={session?.user?.image!} />
        <AvatarFallback>
          {session?.user?.name?.charAt(0).toUpperCase() ?? " "}
        </AvatarFallback>
      </Avatar>
      <ul
        className={cn("hidden flex-col items-start xl:flex", {
          "justify-center": session?.user?.name === undefined,
        })}
      >
        {session?.user?.name && <li>{session?.user?.name} </li>}
        <li>@wwwwwwwwwwww</li>
      </ul>
    </div>
  );
}
