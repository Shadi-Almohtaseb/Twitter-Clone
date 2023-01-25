import React from "react";
import ProfileImage from "../../assets/Images/shadi.jpg";
import Image from "next/image";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowPathRoundedSquareIcon,
  ShareIcon,
  HeartIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { UserAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const Post = ({ post }) => {
  const { userIn } = UserAuth();
  const router = useRouter();
  return (
    <div className="border-t-[1px] mb-7">
      <div className="flex items-center justify-between py-4 px-4">
        <div className="flex items-center">
          <div>
            <Image
              width={45}
              height={45}
              src={userIn?.photoURL || ProfileImage}
              className="rounded-full mr-3"
              alt="ProfileImage"
            ></Image>
          </div>
          <div>
            <span className="hover:underline cursor-pointer font-semibold">
              {post.name}
            </span>
            <span className="text-gray-600"> @Shadi </span>
            <span className="text-gray-600">{post.timeStamp}</span>
          </div>
        </div>
        <div className="p-[7px] hover:bg-gray-200 rounded-full cursor-pointer">
          <EllipsisHorizontalIcon
            hanging={30}
            width={30}
            className="text-gray-700"
          />
        </div>
      </div>
      <div className="pl-5 pb-4">{post.text}</div>
      <div className="px-3">
        <img src={post.image} alt="img" className="rounded-xl" />
      </div>
      <div className="flex items-center justify-around py-3">
        <div className="flex items-center justify-center cursor-pointer group  gap-2 hover:text-blue-500">
          <ChatBubbleOvalLeftEllipsisIcon
            hanging={39}
            width={39}
            className="group-hover:bg-blue-100 rounded-full  p-[8px]"
          />
          <span>2589</span>
        </div>
        <div className="flex items-center justify-center  cursor-pointer group gap-2  hover:text-green-400">
          <ArrowPathRoundedSquareIcon
            hanging={39}
            width={39}
            className="group-hover:bg-green-100 rounded-full  p-[8px]"
          />
          <span>2589</span>
        </div>
        <div className="flex items-center justify-center cursor-pointer group  gap-2  hover:text-pink-500">
          <HeartIcon
            hanging={39}
            width={39}
            className="group-hover:bg-pink-100 rounded-full  p-[8px]"
          />
          <span>2589</span>
        </div>
        <div className="flex items-center justify-center gap-2 group hover:text-blue-500 cursor-pointer  ">
          <ArrowUpTrayIcon
            hanging={39}
            width={39}
            className="group-hover:bg-blue-100 p-[10px] rounded-full"
          />
          <span>2589</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
