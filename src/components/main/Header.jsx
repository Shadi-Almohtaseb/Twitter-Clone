"use client";
import React, { useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [feedToggle, setFeedToggle] = useState(true);
  const OnTapChange = () => {
    setFeedToggle(!feedToggle);
  };
  return (
    <div className="sticky top-0 bg-white bg-opacity-70 backdrop-blur-lg">
      <div className=" border-b-[1px]">
        <div className="flex items-center justify-between px-5">
          <span className="font-bold text-xl">Home</span>
          <SparklesIcon
            hanging={40}
            width={40}
            className="p-2 hover:bg-gray-200 rounded-full cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between mt-3 ">
          <span
            onClick={OnTapChange}
            className={`w-[50%] py-3 text-lg flex items-center justify-center hover:cursor-pointer hover:bg-gray-200 hover:backdrop-blur-sm hover:bg-opacity-70 transition-all  ${
              feedToggle && "border-b-4 border-indigo-500"
            } `}
          >
            Following
          </span>
          <span
            onClick={OnTapChange}
            className={`w-[50%] py-3 text-lg flex items-center justify-center hover:cursor-pointer hover:bg-gray-200 hover:backdrop-blur-sm hover:bg-opacity-70 transition-all  ${
              !feedToggle && "border-b-4 border-indigo-500"
            } `}
          >
            For You
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
