import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase.config";
import LikeItemSideBar from "./LikeItemSideBar";

const LikesSideBar = ({ onClose, open, post }) => {
  const [likes, setLikes] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", post.id, "likes"), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db]
  );

  return (
    <Drawer
      title=" ❤  Liked by:"
      placement="right"
      onClose={onClose}
      open={open}
      headerStyle={{
        fontFamily: "cursive",
        fontStyle: "italic",
        fontSize: "25px",
      }}
    >
      <div className="flex flex-col text-xl gap-4">
        {likes.map((likeItem, index) => {
          return (
            <LikeItemSideBar
              like={likeItem}
              key={post.id}
              index={index + 1}
              post={post}
            />
          );
        })}
      </div>
    </Drawer>
  );
};

export default LikesSideBar;
