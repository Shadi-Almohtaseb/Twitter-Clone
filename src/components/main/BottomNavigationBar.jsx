import { HomeIcon } from "@heroicons/react/20/solid";
import {
  BookmarkIcon,
  EllipsisHorizontalCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const BottomNavigationBar = () => {
  return (
    <div className="fixed bottom-0 flex sm:hidden justify-around items-center h-[7vh] bg-gray-100 w-full backdrop-blur-lg bg-opacity-60">
      <div>
        <HomeIcon className="h-7 w-7" />
      </div>
      <div>
        <UserIcon className="h-7 w-7" />
      </div>
      <div>
        <BookmarkIcon className="h-7 w-7" />
      </div>
      <div>
        <EllipsisHorizontalCircleIcon className="h-7 w-7" />
      </div>
    </div>
  );
};

export default BottomNavigationBar;
