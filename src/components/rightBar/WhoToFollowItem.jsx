import React from "react";

const WhoToFollowItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between hover:bg-gray-200 transition-all p-2 rounded-lg cursor-pointer ">
      <div className="flex items-center">
        <div>
          <img
            src={item.picture.medium}
            alt="img"
            className="rounded-full mr-3 w-[50px] h-[50px]"
          />
        </div>
        <div className="flex flex-col">
          <span className="hover:underline cursor-pointer font-semibold">
            {item.name?.title + " " + item.name?.first + " " + item.name.last}
          </span>
          <span className="text-gray-600 break-words text-[12px]">
            {item.email}
          </span>
        </div>
      </div>
      <div>
        <span className="text-white bg-black rounded-full py-[6px] px-3 text-base font-semibold">
          Follow
        </span>
      </div>
    </div>
  );
};

export default WhoToFollowItem;
