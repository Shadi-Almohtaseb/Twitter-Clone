import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import TwitterImage from "../../assets/Images/icons8-twitter-96.png";
import { UserAuth } from "../../context/AuthContext";
import BottomProfileSetting from "./BottomProfileSetting";
import SideBarMenuItems from "./SideBarMenuItems";
import TweetButton from "./TweetButton";

const SideBar = () => {
  const { userIn } = UserAuth();
  const router = useRouter();
  return (
    <div className="lg:w-[25%] w-fit fixed hidden lg:pr-12 h-screen sm:flex flex-col items-end justify-between">
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
        {userIn ? (
          <TweetButton />
        ) : (
          <div
            className="flex items-center justify-center mt-5"
            onClick={() => router.push("/auth/signin")}
          >
            <button className="py-[9px] px-11 hidden lg:flex rounded-full bg-blue-500 text-white font-bold hover:bg-blue-700 transition-all text-2xl">
              Sign in
            </button>
          </div>
        )}
      </div>
      <div className="flex lg:self-end self-start">
        {userIn && <BottomProfileSetting />}
      </div>
    </div>
  );
};

export default SideBar;
