import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { Dropdown } from "antd";
import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import DefaultImage from "../../assets/Images/AuthenticationMark.png";

const BottomProfileSetting = () => {
  const router = useRouter();
  const { HandelSignOut, userIn } = UserAuth();
  const signOut = async () => {
    await HandelSignOut();
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          onClick={() => router.push(`/profile/${userIn?.uid}`)}
          className="flex items-center justify-between px-6 py-2 gap-3"
        >
          <button className="text-lg">Profile</button>
          <UserIcon width={22} height={22} />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={signOut}
          className="flex items-center justify-between px-6 py-2 gap-3"
        >
          <button className="text-lg">Logout</button>
          <ArrowRightOnRectangleIcon width={22} height={22} />
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex items-center justify-between px-6 py-2 gap-3">
          <button onClick={{}} className="text-lg">
            Setting
          </button>
          <Cog6ToothIcon width={22} height={22} />
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="topLeft"
      arrow
      trigger={["click"]}
    >
      <div className="flex justify-center items-center mb-5 lg:-mr-9 py-3 pl-3 lg:px-5 rounded-full hover:bg-gray-200 hover:cursor-pointer">
        <div>
          <Image
            src={userIn?.photoURL ? userIn?.photoURL : DefaultImage}
            alt="ProfileImage"
            className="rounded-full mr-3"
            width={45}
            height={45}
          ></Image>
        </div>
        <div className="flex sm:hidden lg:flex flex-col">
          <span className="font-bold sm:flex hidden">
            {userIn?.displayName?.slice(0, 13) + "..."}
          </span>
          <span className="font-bold sm:hidden flex">
            {userIn?.displayName}
          </span>
          <span className="text-gray-700 sm:flex hidden">
            {userIn?.email?.slice(0, 16) + "..."}
          </span>
          <span className="text-gray-700 sm:hidden flex">{userIn?.email}</span>
        </div>
        <div className="hidden lg:flex">
          <EllipsisHorizontalIcon height={26} width={26} />
        </div>
      </div>
    </Dropdown>
  );
};

export default BottomProfileSetting;
