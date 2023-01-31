import { PencilSquareIcon } from "@heroicons/react/20/solid";
import React from "react";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../../../firebase.config";
// import { UserAuth } from "../../context/AuthContext";

const TweetButton = () => {
  // const { userIn } = UserAuth();
  // const HandelAddId = async () => {
  //   await updateDoc(doc(db, "users", userIn?.uid), {
  //     location: "Los Angeles",
  //   });
  // };

  return (
    <span
      // onClick={HandelAddId}
      className="lg:px-20 lg:py-[13px] ml-2 p-3 flex w-fit rounded-full bg-[#1d9bf0] text-white font-bold text-[19px] hover:cursor-pointer hover:bg-blue-600 transition-all"
    >
      <span className="lg:hidden">
        <PencilSquareIcon width={23} hanging={23} />
      </span>
      <span className="hidden lg:flex">Tweet</span>
    </span>
  );
};

export default TweetButton;
