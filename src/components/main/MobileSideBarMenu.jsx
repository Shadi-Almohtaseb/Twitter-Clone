import { Drawer } from "antd";
import MenuItem from "../sideBar/MenuItem";
import { HashtagIcon, HomeIcon } from "@heroicons/react/20/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import TwitterImage from "../../assets/Images/icons8-twitter-96.png";
import React from "react";
import Image from "next/image";
import BottomProfileSetting from "../sideBar/BottomProfileSetting";

const MobileSideBarMenu = ({ open, onClose }) => {
  let Items = [
    { title: "Home", icon: HomeIcon },
    { title: "Explore", icon: HashtagIcon },
    { title: "Notification", icon: BellIcon },
    { title: "Messages", icon: EnvelopeIcon },
    { title: "BookMarks", icon: BookmarkIcon },
    { title: "Lists", icon: ClipboardDocumentListIcon },
    { title: "Profile", icon: UserIcon },
    { title: "More", icon: EllipsisHorizontalCircleIcon },
  ];

  return (
    <div>
      <Drawer
        title="Twitter Menu"
        placement="left"
        onClose={onClose}
        open={open}
      >
        <div className="flex justify-between flex-col h-[87vh]">
          <div>
            <Image
              width={60}
              height={60}
              src={TwitterImage}
              alt="TwitterImage"
              className="lg:mr-36 mr-1 mt-2 p-2 rounded-full hover:bg-blue-100 hover:cursor-pointer "
            ></Image>
            <div className="">
              {Items.map((Item, index) => {
                return <MenuItem item={Item} Icon={Item.icon} key={index} />;
              })}
            </div>
          </div>
          <div className="flex ">
            <BottomProfileSetting />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileSideBarMenu;
