import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Moment from "react-moment";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase.config";
import BottomComments from "./BottomComments";
import BottomPostActions from "./BottomPostActions";
import { useRouter } from "next/router";
import { UserAuth } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);
  const { userIn } = UserAuth();
  const router = useRouter();
  const { Post_Id } = router.query;

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", post.id, "comments"),
          orderBy("timeStamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div
      className={`border-t-[1px] mb-5 bg-white shadow-xl rounded-md ${
        Post_Id && "pb-0"
      } ${comments.length >= 3 && userIn ? "pb-3" : "pb-0"}`}
    >
      <div className="flex items-center justify-between py-4 px-4">
        <div className="flex items-center">
          <div>
            <Image
              width={45}
              height={45}
              src={post?.data()?.userImage}
              className="rounded-full mr-3"
            ></Image>
          </div>
          <div>
            <span className="hover:underline cursor-pointer font-semibold">
              {post?.data()?.name}{" "}
            </span>
            <span className="text-gray-500">
              @{post?.data()?.name.toLowerCase().replace(/\s/g, "")}
              {"   -  "}
            </span>
            <span className="text-gray-600">
              <Moment fromNow>{post?.data()?.timeStamp?.toDate()}</Moment>
            </span>
          </div>
        </div>
        <div className="p-[7px] hover:bg-gray-200 rounded-full cursor-pointer">
          <EllipsisHorizontalIcon
            hanging={30}
            width={30}
            className="text-gray-700"
          />
        </div>
      </div>
      <div className="pl-5 pb-4 break-words">{post?.data()?.textInputPost}</div>
      <div className="px-3">
        <img src={post?.data()?.imagePost} className="rounded-xl" />
      </div>
      <div className="w-full">
        <BottomPostActions post={post} />
      </div>
      <div className="w-full">
        <AnimatePresence>
          {Post_Id
            ? comments.map((comment, index) => {
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1 }}
                  >
                    <BottomComments
                      key={index}
                      comment={comment}
                      commentId={comment.id}
                      postId={post.id}
                      post={post}
                    />
                  </motion.div>
                );
              })
            : comments
                .filter((_, index) => index <= 2)
                .map((comment, index) => {
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.1 }}
                    >
                      <BottomComments
                        key={index}
                        comment={comment}
                        commentId={comment.id}
                        postId={post.id}
                        post={post}
                      />
                    </motion.div>
                  );
                })}
        </AnimatePresence>
      </div>
      <span
        onClick={() => router.push(`/post/${post.id}`)}
        className={`text-gray-600 ${userIn ? "flex" : "hidden"} ${
          comments.length <= 3 && "hidden"
        } ${
          Post_Id && "hidden"
        } decoration-slate-600 cursor-pointer hover:underline text-base pl-5`}
      >
        See all comments...
      </span>
    </div>
  );
};

export default Post;
