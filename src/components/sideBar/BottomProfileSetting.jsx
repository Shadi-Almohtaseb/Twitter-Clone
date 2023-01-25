import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import ProfileImage from "../../assets/Images/shadi.jpg";
import Image from "next/image";
import React from "react";
import { UserAuth } from "../../context/AuthContext";

const BottomProfileSetting = () => {
  const { HandelSignOut, userIn } = UserAuth();
  console.log("userIn", userIn);
  const signOut = async () => {
    await HandelSignOut();
  };

  return (
    <div className="flex justify-center items-center mb-5 lg:-mr-9 py-3 pl-3 lg:px-5 rounded-full hover:bg-gray-200 hover:cursor-pointer">
      <div onClick={signOut}>
        <Image
          width={45}
          height={45}
          src={userIn.photoURL}
          alt="ProfileImage"
          className="rounded-full mr-3"
        ></Image>
      </div>
      <div className="hidden lg:flex flex-col">
        <span className="font-bold">
          {userIn.displayName?.slice(0, 13) + "..."}
        </span>
        <span className="text-gray-700">
          {userIn.email?.slice(0, 16) + "..."}
        </span>
      </div>
      <div className="hidden lg:flex">
        <EllipsisHorizontalIcon height={26} width={26} />
      </div>
    </div>
  );
};

export default BottomProfileSetting;
