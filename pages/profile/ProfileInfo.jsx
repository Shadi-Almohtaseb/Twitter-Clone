import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import { useGetUserData } from "../../src/hooks/useGetUserData";

const ProfileInfo = () => {
  const UserData = useGetUserData();
  return (
    <div className="max-h-[65vh] bg-white">
      <div className="relative">
        <img
          src="https://source.unsplash.com/random"
          alt="img"
          className="h-[43vh] w-full"
        />
        <div>
          <Image
            src={UserData?.avatar}
            alt="img"
            className=" rounded-full absolute bottom-0 sm:left-8 left-2 -mb-[80px] border-2 shadow-lg"
            width={145}
            height={145}
          />
        </div>
      </div>
      <div className="flex items-center justify-between px-5">
        <span></span>
        <span className="lg:flex hidden py-2 px-5 border-2 text-lg font-semibold rounded-full m-3 cursor-pointer hover:bg-sky-500 hover:border-blue-400 hover:text-white transition-all">
          Edit Profile
        </span>
        <span className="lg:hidden py-2 px-5 border-2 text-lg font-semibold rounded-full m-3 cursor-pointer hover:bg-sky-500 hover:border-blue-400 hover:text-white transition-all">
          <PencilSquareIcon width={23} hanging={23} />
        </span>
      </div>
      <div className="flex flex-col my-5 mx-7">
        <span className="text-xl font-bold">{UserData?.name}</span>
        <span className="text-gray-700">
          @{UserData?.name.toLowerCase().replace(/\s/g, "")}
        </span>
      </div>
    </div>
  );
};

export default ProfileInfo;
