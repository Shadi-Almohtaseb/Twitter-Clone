import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  ArrowUpTrayIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/20/solid";
import { UserAuth } from "../../context/AuthContext";
import Moment from "react-moment";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import { useRouter } from "next/router";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;
const Post = ({ post }) => {
  const { userIn } = UserAuth();
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === userIn?.uid) !== -1);
  }, [likes]);

  const HandelLike = async () => {
    if (userIn) {
      if (isLiked) {
        await deleteDoc(doc(db, "posts", post.id, "likes", userIn?.uid));
      } else {
        await setDoc(doc(db, "posts", post.id, "likes", userIn?.uid), {
          userName: userIn.displayName,
        });
      }
    } else {
      router.push("/auth/signin");
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this post?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await deleteDoc(doc(db, "posts", post.id));
      },
      onCancel() {},
    });
  };
  return (
    <div className="border-t-[1px] mb-7">
      <div className="flex items-center justify-between py-4 px-4">
        <div className="flex items-center">
          <div>
            <Image
              width={45}
              height={45}
              src={post.data().userImage}
              className="rounded-full mr-3"
            ></Image>
          </div>
          <div>
            <span className="hover:underline cursor-pointer font-semibold">
              {post.data().name}{" "}
            </span>
            <span className="text-gray-500">
              @{post.data().name.toLowerCase().replace(/\s/g, "")}
              {"   -  "}
            </span>
            <span className="text-gray-600">
              <Moment fromNow>{post?.data().timeStamp?.toDate()}</Moment>
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
      <div className="pl-5 pb-4">{post.data().textInputPost}</div>
      <div className="px-3">
        <img src={post.data().imagePost} className="rounded-xl" />
      </div>
      <div className="flex items-center justify-around py-3">
        <div className="flex items-center justify-center cursor-pointer group  gap-2 hover:text-blue-500">
          <ChatBubbleOvalLeftEllipsisIcon
            hanging={39}
            width={39}
            className="group-hover:bg-blue-100 rounded-full  p-[8px]"
          />
          <span>0</span>
        </div>
        <div className="flex items-center justify-center  cursor-pointer group gap-2  hover:text-green-400">
          <ArrowPathRoundedSquareIcon
            hanging={39}
            width={39}
            className="group-hover:bg-green-100 rounded-full  p-[8px]"
          />
          <span>0</span>
        </div>
        <div
          onClick={HandelLike}
          className="flex items-center justify-center cursor-pointer group  gap-2  hover:text-pink-500"
        >
          {!isLiked ? (
            <HeartIcon
              hanging={39}
              width={39}
              className="group-hover:bg-pink-100 rounded-full p-[8px]"
            />
          ) : (
            <FilledHeartIcon
              hanging={39}
              width={39}
              className="group-hover:bg-[#fce3e7db] text-pink-600 rounded-full p-[8px]"
            />
          )}
          <span className={`${likes.length === 0 && "hidden"}`}>
            {likes.length}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 group hover:text-blue-500 cursor-pointer  ">
          <ArrowUpTrayIcon
            hanging={39}
            width={39}
            className="group-hover:bg-blue-100 p-[10px] rounded-full"
          />
          <span>0</span>
        </div>
        <div
          onClick={showDeleteConfirm}
          className={`flex items-center justify-center gap-2 group hover:text-red-500 cursor-pointer ${
            post.data().uid !== userIn?.uid && "hidden"
          }`}
        >
          <TrashIcon
            hanging={40}
            width={40}
            className="group-hover:bg-red-100 p-[10px] rounded-full"
          />
        </div>
        {/* <Modal title="Delete" open={open} confirmLoading={confirmLoading}>
          <p>Are you sure that you want to do delete this post?</p>
          <div className="flex items-end justify-end">
            <Button type="primary" danger onClick={handleOk}>
              Delete
            </Button>
            <Button onClick={handleCancel}>Close</Button>
          </div>
        </Modal> */}
      </div>
    </div>
  );
};

export default Post;
