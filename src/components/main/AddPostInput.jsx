import Image from "next/image";
import ProfileImage from "../../assets/Images/shadi.jpg";
import React from "react";
import {
  CalendarIcon,
  FaceSmileIcon,
  GifIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { UserAuth } from "../../context/AuthContext";

const AddPostInput = () => {
  const { userIn } = UserAuth();

  return (
    <div className="flex flex-col px-4 py-2">
      <div className="flex items-center justify-center gap-2 py-3">
        <Image
          width={50}
          height={50}
          src={userIn.photoURL}
          alt="ProfileImage"
          className="rounded-full"
        ></Image>
        <input
          type="text"
          placeholder="What's happening?"
          className="w-full h-16 py-2 px-3 outline-none text-xl rounded-xl bg-transparent placeholder:text-xl"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-5 pl-16">
          <PhotoIcon
            width={25}
            height={25}
            className="text-blue-500 hover:cursor-pointer hover:text-blue-700"
          />
          <FaceSmileIcon
            width={25}
            height={25}
            className="text-blue-500 hover:cursor-pointer hover:text-blue-700"
          />
          <GifIcon
            width={25}
            height={25}
            className="text-blue-500 hover:cursor-pointer hover:text-blue-700"
          />
          <CalendarIcon
            width={25}
            height={25}
            className="text-blue-500 hover:cursor-pointer hover:text-blue-700"
          />
        </div>
        <span className="px-5 py-[9px] ml-2 p-3 flex w-fit rounded-full bg-[#1d9bf0] text-white font-bold text-[15px] hover:cursor-pointer hover:bg-blue-600 transition-all">
          <span>Tweet</span>
        </span>
      </div>
    </div>
  );
};

export default AddPostInput;
