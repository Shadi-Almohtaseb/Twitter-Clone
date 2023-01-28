"use client";
import React, { useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { UserAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { ArrowDownLeftIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const Header = () => {
  const [feedToggle, setFeedToggle] = useState(true);
  const { userIn } = UserAuth();
  const router = useRouter();
  const { Post_Id } = router.query;

  const OnTapChange = () => {
    setFeedToggle(!feedToggle);
  };
  return (
    <div className="sticky top-0 bg-white bg-opacity-70 backdrop-blur-lg z-10">
      <div className=" border-b-[1px]">
        <div className="flex items-center justify-between px-5">
          {Post_Id ? (
            <div className="flex items-center justify-start gap-3 ">
              <Link
                href="/"
                // onClick={() => router.push("/")}
                className="p-2 m-1 hover:bg-slate-100 rounded-full transition-all"
              >
                <ArrowLeftIcon hanging={30} width={30} />
              </Link>
              <span className="text-xl font-semibold">Tweet</span>
            </div>
          ) : (
            <span className="font-bold text-xl">Home</span>
          )}
          {userIn ? (
            <SparklesIcon
              hanging={40}
              width={40}
              className="p-2 hover:bg-gray-200 rounded-full cursor-pointer"
            />
          ) : (
            <div className="flex items-center justify-center mt-2">
              <button
                onClick={() => router.push("/auth/signin")}
                className="py-[4px] px-7 flex md:hidden rounded-full bg-blue-500 text-white font-bold hover:bg-blue-700 transition-all text-lg"
              >
                Sign in
              </button>
              <SparklesIcon
                hanging={40}
                width={40}
                className="p-2 hover:bg-gray-200 rounded-full cursor-pointer hidden md:flex"
              />
            </div>
          )}
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
