"use client";
import React, { useState } from "react";
import WhoToFollowItem from "./WhoToFollowItem";

const WhoToFollowWidget = ({ UsersData }) => {
  const [usersItemsCount, setUsersItemsCount] = useState(2);

  return (
    <div className="pt-5 bg-[#f3f4f6] rounded-xl ml-4 mt-10 shadow-lg">
      <span className="font-bold text-xl pl-2">Who To follow</span>
      <div className="flex flex-col gap-7 mt-5 px-1">
        {UsersData.filter((_, index) => index <= usersItemsCount).map(
          (item, index) => {
            return <WhoToFollowItem item={item} key={index} />;
          }
        )}
      </div>
      <div className="flex">
        <div
          onClick={() => setUsersItemsCount(usersItemsCount + 3)}
          className="hover:bg-blue-100 w-full mt-3 py-2 px-5  rounded-bl-xl cursor-pointer transition-all"
        >
          <span className="text-blue-600">Show More</span>
        </div>
        <div
          onClick={() => setUsersItemsCount(usersItemsCount - 3)}
          className={`hover:bg-pink-100 w-full ${
            usersItemsCount >= 3 ? "flex" : "hidden"
          } mt-3 py-2 px-5 rounded-br-xl cursor-pointer transition-all`}
        >
          <span className="text-pink-600">Show Less</span>
        </div>
      </div>
    </div>
  );
};

export default WhoToFollowWidget;
