import Image from "next/image";
import { RiHome2Fill } from "react-icons/ri";
import {
  HiOutlineInboxIn,
  HiOutlineBell,
  HiOutlineHashtag,
  HiOutlineBookmark,
  HiOutlineClipboardList,
  HiOutlineUser,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";

import SidebarLink from "./helpers/SidebarLink";
import SidebarAvatar from "./helpers/SidebarAvatar";

export default function Sidebar() {
  return (
    <div className="fixed flex-col items-center hidden h-full p-2 pr-2 border-r sm:flex lg:items-start lg:ml-24 border-slate-800 ">
      <div className="flex items-center justify-center p-0 w-14 h-14 hoverAnimation ">
        <Image
          src="https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/twitter-icon-18-256.png"
          alt=""
          height={30}
          width={30}
        />
      </div>
      <div className="space-y-1.5 mt-4 mb-2.5 ">
        <SidebarLink text="Home" Icon={RiHome2Fill} active />
        <SidebarLink text="Explore" Icon={HiOutlineHashtag} />
        <SidebarLink text="Notifications" Icon={HiOutlineBell} />
        <SidebarLink text="Messages" Icon={HiOutlineInboxIn} />
        <SidebarLink text="Bookmarks" Icon={HiOutlineBookmark} />
        <SidebarLink text="Lists" Icon={HiOutlineClipboardList} />
        <SidebarLink text="Profile" Icon={HiOutlineUser} />
        <SidebarLink text="More" Icon={HiOutlineDotsCircleHorizontal} />
      </div>
      <button className="hidden lg:inline bg-[#1d9bf0] rounded-full w-44 h-12 text-md font-bold text-white hover:bg-opacity-75 mt-2">
        Tweet
      </button>
      <SidebarAvatar />
    </div>
  );
}
