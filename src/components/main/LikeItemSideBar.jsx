import { useRouter } from "next/router";
import React from "react";

const LikeItemSideBar = ({ like, post, index }) => {
  const router = useRouter();
  return (
    <div>
      <span className="font-bold">
        {index + ") "}
        <span
          onClick={() => {
            router.push(`/profile/${post?.data()?.uid}`);
          }}
          className="cursor-pointer hover:underline"
        >
          {like?.data()?.userName.length >= 25
            ? like?.data()?.userName.slice(0, 25) + "..."
            : like?.data()?.userName}
        </span>
      </span>
    </div>
  );
};

export default LikeItemSideBar;
