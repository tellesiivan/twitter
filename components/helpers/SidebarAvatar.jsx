import { HiDotsHorizontal } from "react-icons/hi";
import { useSession, signOut } from "next-auth/react";

export default function SidebarAvatar() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-shrink-0 w-auto mt-auto mb-4 lg:w-56 group lg:hoverAnimation lg:inline">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="inline-block rounded-full h-9 w-9"
              src={session.user.image}
              alt=""
            />
          </div>
          <div className="hidden ml-3 lg:inline">
            <p className="text-sm font-medium text-gray-400 group-hover:text-gray-200">
              {session.user.name}
            </p>
            <p className="text-xs font-medium text-gray-600 group-hover:text-gray-300">
              @{session.user.tag}
            </p>
          </div>
        </div>
        <HiDotsHorizontal
          className="hidden text-gray-200 lg:inline"
          onClick={() => signOut({ callbackUrl: "/" })}
        />
      </div>
    </div>
  );
}
