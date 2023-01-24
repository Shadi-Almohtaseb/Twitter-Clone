import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import WhatsHappeningWidget from "./WhatsHappeningWidget";
import WhoToFollowWidget from "./WhoToFollowWidget";

const Widgets = ({ NewsData, UsersData }) => {
  return (
    <div className="md:flex hidden flex-col lg:w-[30%] h-screen border-l-[1px] overflow-y-scroll sticky top-0 RightBar pb-10">
      <div className="flex items-center justify-center gap-3 shadow-lg py-2 px-4 mt-4 mx-3 rounded-full bg-[#eff3f4]">
        <MagnifyingGlassIcon
          hanging={25}
          width={25}
          className="text-gray-400"
        />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent w-full outline-none"
        />
      </div>
      <WhatsHappeningWidget NewsData={NewsData.articles} />
      <WhoToFollowWidget UsersData={UsersData.results} />
    </div>
  );
};

export default Widgets;
