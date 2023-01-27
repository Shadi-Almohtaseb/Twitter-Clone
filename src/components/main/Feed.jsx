import React from "react";
import { UserAuth } from "../../context/AuthContext";
import AddPostInput from "./AddPostInput";
import BottomNavigationBar from "./BottomNavigationBar";
import Header from "./Header";
import Posts from "./Posts";

const Feed = () => {
  const { userIn } = UserAuth();

  return (
    <div className="flex flex-col lg:w-[45%] md:w-[50%] w-full lg:ml-[25%] sm:ml-[65px] border-l-[1px]">
      <Header />
      {userIn && <AddPostInput />}
      <Posts />
      <BottomNavigationBar />
    </div>
  );
};

export default Feed;
