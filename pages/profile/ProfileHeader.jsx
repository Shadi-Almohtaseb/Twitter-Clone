import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";
import { useGetUserData } from "../../src/hooks/useGetUserData";

const ProfileHeader = () => {
  const UserData = useGetUserData();
  return (
    <div className="h-[8vh] gap-12 bg-white flex items-center border-b-2 sticky top-0 bg-opacity-70 backdrop-blur-lg z-10">
      <Link
        href="/"
        className="p-2 m-1 hover:bg-slate-100 rounded-full transition-all"
      >
        <ArrowLeftIcon hanging={30} width={30} />
      </Link>
      <div className="flex  flex-col">
        <span className="text-xl font-bold">
          {UserData?.name.length >= 20
            ? UserData?.name.slice(0, 20) + "..."
            : UserData?.name}
        </span>
        <span className="text-gray-700">
          {UserData?.userPosts?.length}
          {UserData?.userPosts?.length >= 2 ? " Tweets" : " Tweet"}
        </span>
      </div>
    </div>
  );
};

export default ProfileHeader;
