import Image from "next/image";
import React from "react";
import TwitterImage from "../../assets/Images/icons8-twitter-96.png";
import BottomProfileSetting from "./BottomProfileSetting";
import SideBarMenuItems from "./SideBarMenuItems";
import TweetButton from "./TweetButton";

const SideBar = () => {
  return (
    <div className="lg:w-[25%] w-fit fixed hidden lg:pr-24 h-screen sm:flex flex-col items-end justify-between">
      <div>
        {/* Twitter Logo */}
        <Image
          width={60}
          height={60}
          src={TwitterImage}
          alt="TwitterImage"
          className="lg:mr-36 mr-1 mt-2 p-2 rounded-full bg-slate-50 hover:bg-blue-50 hover:cursor-pointer "
        ></Image>
        {/* Menu Items in SideBar */}
        <SideBarMenuItems />
        {/* Tweet Button */}
        <TweetButton />
      </div>
      <div className="flex lg:self-end self-start">
        <BottomProfileSetting />
      </div>
    </div>
  );
};

export default SideBar;
