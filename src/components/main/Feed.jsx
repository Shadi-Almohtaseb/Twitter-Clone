import React from "react";
import { UserAuth } from "../../context/AuthContext";
import AddPostInput from "./AddPostInput";
import BottomNavigationBar from "./BottomNavigationBar";
import Header from "./Header";
import Posts from "./Posts";

const Feed = ({ NewsData, UsersData }) => {
  const { userIn } = UserAuth();

  return (
    <div className="flex flex-col lg:w-[45%] md:w-[78%] w-full lg:ml-[25%] sm:ml-[65px] border-l-[1px]">
      <Header NewsData={NewsData} UsersData={UsersData} />
      {userIn && <AddPostInput />}
      <Posts />
      <BottomNavigationBar />
      <div className="h-8"></div>
    </div>
  );
};

export default Feed;
