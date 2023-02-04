import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleFilled } from "@ant-design/icons";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { UserAuth } from "../../context/AuthContext";
import { useRecoilState } from "recoil";
import { modalState } from "../../../atom/ModalAtom";
import { db } from "../../../firebase.config";
import { Modal, Tooltip } from "antd";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import AuthenticationMark from "../../assets/Images/AuthenticationMark.png";

const BottomComments = ({ comment, commentId, postId, post }) => {
  const { userIn } = UserAuth();
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [userData, setUserData] = useState();
  const router = useRouter();

  useEffect(() => {
    onSnapshot(
      collection(db, "posts", postId, "comments", commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db, commentId, postId]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === userIn?.uid) !== -1);
  }, [likes, userIn]);

  const HandelLikeComment = async () => {
    if (userIn) {
      if (isLiked) {
        await deleteDoc(
          doc(db, "posts", postId, "comments", commentId, "likes", userIn?.uid)
        );
      } else {
        await setDoc(
          doc(db, "posts", postId, "comments", commentId, "likes", userIn?.uid),
          {
            userName: userIn.displayName,
          }
        );
      }
    } else {
      router.push("/auth/signin");
    }
  };

  const { confirm } = Modal;
  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this post?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        deleteDoc(doc(db, "posts", postId, "comments", commentId));
        // if (post.data().imagePost) {
        //   await deleteObject(ref(storage, `posts/${post.id}/image`));
        // }
      },
      onCancel() {},
    });
  };

  useEffect(() => {
    if (userIn) {
      const getUserData = async () => {
        const docRef = doc(db, "users", comment?.data()?.uid);
        const docSnap = await getDoc(docRef);
        setUserData(docSnap?.data());
      };
      getUserData();
    }
  }, [db, userData]);

  return (
    <div className="px-5 border-b-2 py-2 mb-2 lg:w-[100%] md:w-full">
      <div className="flex items-center">
        <div
          onClick={() => {
            userIn
              ? router.push(`/profile/${comment?.data()?.uid}`)
              : router.push("/auth/signin");
          }}
        >
          <Image
            width={40}
            height={40}
            src={comment?.data().userImage}
            className="rounded-full mr-3"
          ></Image>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <span
              onClick={() => {
                userIn
                  ? router.push(`/profile/${comment?.data()?.uid}`)
                  : router.push("/auth/signin");
              }}
              className="hover:underline cursor-pointer font-semibold"
            >
              {comment?.data()?.userName.length > 20
                ? comment?.data()?.userName.slice(0, 20) + "... "
                : comment?.data()?.userName + " "}
            </span>
            <div
              className={`${
                userData?.userPosts?.length >= 3 ? "flex" : "hidden"
              }`}
            >
              {" "}
              <Image src={AuthenticationMark} width={18} />
            </div>
          </div>
          <span className="text-gray-600 text-sm">
            <Moment fromNow>{comment?.data().timeStamp?.toDate()}</Moment>
          </span>
        </div>
      </div>
      <div className="px-2 pt-2 break-words textInput">
        {comment?.data().commentText}
      </div>
      <div className="flex items-center justify-around py-3">
        <div
          onClick={() => {
            if (!userIn) {
              router.push("/auth/signin");
            } else {
              // setPostId(post.id);
              setOpen(!open);
            }
          }}
          className="flex items-center justify-center cursor-pointer group  gap-2 hover:text-blue-500"
        >
          <Tooltip placement="top" color="#37a4ed" title="Comment">
            <ChatBubbleOvalLeftEllipsisIcon
              hanging={34}
              width={34}
              className="group-hover:bg-blue-100 rounded-full  p-[8px]"
            />
          </Tooltip>
          <span className="hidden">0</span>
        </div>
        <div
          onClick={() => HandelLikeComment(postId)}
          className="flex items-center justify-center cursor-pointer group  gap-2  hover:text-pink-500"
        >
          <Tooltip placement="top" color="#e2479c" title="Like">
            {!isLiked ? (
              <HeartIcon
                hanging={34}
                width={34}
                className="group-hover:bg-pink-100 rounded-full p-[8px]"
              />
            ) : (
              <FilledHeartIcon
                hanging={34}
                width={34}
                className="group-hover:bg-[#fce3e7db] text-pink-600 rounded-full p-[8px]"
              />
            )}
          </Tooltip>
          <span className={`${likes.length === 0 && "hidden"}`}>
            {likes.length}
          </span>
        </div>
        <div
          onClick={() => showDeleteConfirm(comment.id)}
          className={`flex items-center justify-center gap-2 group hover:text-red-500 cursor-pointer ${
            comment?.data().uid !== userIn?.uid && "hidden"
          }`}
        >
          <Tooltip placement="top" color="magenta" title="Delete">
            <TrashIcon
              hanging={35}
              width={35}
              className="group-hover:bg-red-100 p-[10px] rounded-full"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default BottomComments;
