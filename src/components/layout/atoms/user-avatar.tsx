import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
      <ul className="hidden flex-col items-start justify-center xl:flex">
        {session?.user?.name && <li>{session?.user?.name}</li>}
        {session?.user?.handle && <li>@{session?.user?.handle}</li>}
      </ul>
    </div>
  );
}
