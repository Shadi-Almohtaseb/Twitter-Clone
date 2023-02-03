import {
  HomeIcon as ActiveHomeIcon,
  BookmarkIcon as ActiveBookmarkIcon,
  UserIcon as ActiveUserIcon,
} from "@heroicons/react/20/solid";
import {
  HomeIcon,
  BookmarkIcon,
  EllipsisHorizontalCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { UserAuth } from "../../context/AuthContext";

const BottomNavigationBar = () => {
  const { userIn } = UserAuth();
  const router = useRouter();

  return (
    <div className="fixed bottom-0 flex sm:hidden justify-around items-center h-[7vh] bg-gray-100 w-full backdrop-blur-lg bg-opacity-60">
      <Link href="/">
        {router.pathname === "/" ? (
          <ActiveHomeIcon className="h-7 w-7" />
        ) : (
          <HomeIcon className="h-7 w-7" />
        )}
      </Link>
      <Link href={`/profile/${userIn?.uid}`}>
        {router.pathname === "/profile/[user_id]" ? (
          <ActiveUserIcon className="h-7 w-7" />
        ) : (
          <UserIcon className="h-7 w-7" />
        )}
      </Link>
      <Link href={`/saved_posts`}>
        {router.pathname === "/saved_posts" ? (
          <ActiveBookmarkIcon className="h-7 w-7" />
        ) : (
          <BookmarkIcon className="h-7 w-7" />
        )}
      </Link>
      <div>
        <EllipsisHorizontalCircleIcon className="h-7 w-7" />
      </div>
    </div>
  );
};

export default BottomNavigationBar;
