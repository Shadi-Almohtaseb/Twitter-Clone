import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Moment from "react-moment";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import BottomComments from "./BottomComments";
import BottomPostActions from "./BottomPostActions";
import { useRouter } from "next/router";
import { UserAuth } from "../../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Dropdown, notification, Tooltip } from "antd";
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  ChevronUpIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import AuthenticationMark from "../../assets/Images/AuthenticationMark.png";
import { useGetPublicUserData } from "../../hooks/useGetPublicUserData";

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [savedPost, setSavedPost] = useState([]);
  const { userIn } = UserAuth();
  const UserData = useGetPublicUserData();
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const { Post_Id } = router.query;

  const openNotificationWithIconSuccess = (type) => {
    api[type]({
      message: "The Tweet has been  Saved",
      description: "see it in bookmark page!",
    });
  };

  const openNotificationWithIconInfo = (type) => {
    api[type]({
      message: "The Tweet has been cancelled",
      description: "",
    });
  };

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

  useEffect(() => {
    if (userIn) {
      onSnapshot(doc(db, "users", userIn?.uid), (snapshot) => {
        setSavedPost(snapshot?.data()?.userSavedPosts);
      });
    }
  }, [db]);

  const HandelSavePost = async () => {
    openNotificationWithIconSuccess("success");
    await updateDoc(doc(db, "users", userIn?.uid), {
      userSavedPosts: arrayUnion(post.id),
    });
  };

  const HandelUnSavePost = async () => {
    openNotificationWithIconInfo("info");
    await updateDoc(doc(db, "users", userIn?.uid), {
      userSavedPosts: arrayRemove(post.id),
    });
  };

  const items = [
    {
      key: "0",
      label: (
        <div>
          {savedPost?.find((postId) => postId === post.id) ? (
            <div
              onClick={HandelUnSavePost}
              className="flex items-center justify-between px-3 py-1 gap-5"
            >
              <button className="text-lg">unSave</button>
              <BookmarkSlashIcon width={22} height={22} />
            </div>
          ) : (
            <div
              onClick={HandelSavePost}
              className="flex items-center justify-between px-3 py-1 gap-5"
            >
              <button className="text-lg">Save</button>
              <BookmarkIcon width={22} height={22} />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div className="flex items-center justify-between px-3 py-1 gap-5">
          <button onClick={{}} className="text-lg">
            Show Likes
          </button>
          <HeartIcon width={22} height={22} />
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => router.push(`/post/${post.id}`)}
          className="flex items-center justify-between px-3 py-1 gap-5"
        >
          <button className="text-lg">Visit post</button>
          <ChevronUpIcon width={22} height={22} />
        </div>
      ),
    },
  ];

  return (
    <div
      className={`border-t-[1px] mb-5 bg-[#f9f9f9] shadow-lg rounded-md ${
        Post_Id && "pb-0"
      } ${comments.length > 3 && userIn ? "pb-3" : "pb-0"}`}
    >
      {contextHolder}
      <div className="flex items-center justify-between py-4 px-4">
        <div className="flex items-center">
          <div
            onClick={() => {
              userIn
                ? router.push(`/profile/${post?.data()?.uid}`)
                : router.push("/auth/signin");
            }}
          >
            <Image
              width={45}
              height={45}
              src={post?.data()?.userImage}
              className="rounded-full mr-3 cursor-pointer"
            ></Image>
          </div>
          <div className="flex items-center">
            <span
              onClick={() => {
                userIn
                  ? router.push(`/profile/${post?.data()?.uid}`)
                  : router.push("/auth/signin");
              }}
              className="hover:underline cursor-pointer font-semibold pr-1 sm:flex hidden"
            >
              {post?.data()?.name}{" "}
            </span>
            <span
              onClick={() => router.push(`/profile/${post?.data()?.uid}`)}
              className="hover:underline cursor-pointer font-semibold pr-1 sm:hidden flex"
            >
              {post?.data()?.name.slice(0, 11) + "..."}{" "}
            </span>
            <div>
              <Image src={AuthenticationMark} width={20} />
            </div>{" "}
            <span className="text-gray-500 pl-2 hidden lg:flex">
              @
              {post?.data()?.name.toLowerCase().replace(/\s/g, "").slice(0, 8) +
                "..."}
              {" - "}
            </span>
            <span className="text-gray-600 pl-1">
              <Moment fromNow>{post?.data()?.timeStamp?.toDate()}</Moment>
            </span>
          </div>
        </div>
        <div
          className={`p-[7px] hover:bg-gray-200 rounded-full cursor-pointer ${
            !userIn && "hidden"
          }`}
        >
          <Tooltip placement="bottom" color="#37a4e0" title="Settings">
            <Dropdown
              menu={{
                items,
              }}
              arrow
              placement="topRight"
              trigger={["click"]}
            >
              <EllipsisHorizontalIcon
                hanging={30}
                width={30}
                className="text-gray-700"
              />
            </Dropdown>
          </Tooltip>
        </div>
      </div>
      <div className="px-5 pb-4 break-words textInput">
        {post?.data()?.textInputPost}
      </div>
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
      <Link
        href={`/post/${post.id}`}
        // onClick={() => router.push(`/post/${post.id}`)}
        className={`text-gray-600 ${userIn ? "flex" : "hidden"} ${
          comments.length <= 3 && "hidden"
        } ${
          Post_Id && "hidden"
        } decoration-slate-600 cursor-pointer hover:underline text-base pl-5`}
      >
        See all comments...
      </Link>
    </div>
  );
};

export default Post;
