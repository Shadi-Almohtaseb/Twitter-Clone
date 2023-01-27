import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../atom/ModalAtom";

import { Modal } from "antd";
import Image from "next/image";
import Moment from "react-moment";
import { db } from "../../firebase.config";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const CommentModal = () => {
  const { userIn } = UserAuth();
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState();
  const [commentText, setCommentText] = useState("");
  const router = useRouter();

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot);
    });
  }, [postId, db]);

  const HandelAddComment = async () => {
    await addDoc(collection(db, "posts", postId, "comments"), {
      uid: userIn.uid,
      userName: userIn.displayName,
      userImage: userIn.photoURL,
      timeStamp: serverTimestamp(),
      commentText: commentText,
    });

    setCommentText("");
    setOpen(false);
    router.push(`/post/${post.id}`);
  };

  return (
    <div className="fixed">
      <Modal footer={null} open={open} onCancel={() => setOpen(false)}>
        <div className="flex items-center">
          <div>
            <Image
              width={50}
              height={50}
              src={post?.data()?.userImage}
              className="rounded-full mr-3"
            ></Image>
          </div>
          <div>
            <span className="hover:underline cursor-pointer font-semibold text-lg">
              {post?.data()?.name}
              {"   -  "}
            </span>
            {/* <span className="text-gray-500 text-base">
              @{post?.data()?.name.toLowerCase().replace(/\s/g, "")}
              {"   -  "}
            </span> */}
            <span className="text-gray-800">
              <Moment fromNow>{post?.data()?.timeStamp?.toDate()}</Moment>
            </span>
          </div>
        </div>
        <div className="pl-[35px] ml-[25px] pb-10 text-gray-600 border-l-2">
          {post?.data()?.textInputPost}
        </div>
        <div className="flex items-center justify-between">
          <Image
            width={50}
            height={50}
            src={userIn?.photoURL}
            className="rounded-full mr-3"
          ></Image>
        </div>
        <textarea
          cols="37"
          rows="5"
          className="w-full min-h-[60px] outline-none p-1 text-lg pl-[68px] -mt-[45px] bg-transparent"
          placeholder="Write your replay..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <div className="flex items-center justify-between gap-5 pl-7">
          <div className="flex items-center justify-center gap-5">
            <PhotoIcon
              width={25}
              height={25}
              className="text-blue-500 hover:cursor-pointer hover:text-blue-700"
            />
            {/* <input
              type="file"
              hidden
              ref={postImageRef}
              onChange={(e) => HandelAddPostImage(e)}
            /> */}
            <FaceSmileIcon
              width={25}
              height={25}
              className="text-blue-500 hover:cursor-pointer hover:text-blue-700"
            />
          </div>
          <span
            className={`px-5 py-[9px] ml-2 p-3 flex w-fit rounded-full cursor-pointer ${
              commentText === ""
                ? "bg-slate-400"
                : "bg-[#1d9bf0] hover:bg-blue-600"
            }  text-white font-bold text-[15px] transition-all`}
            onClick={HandelAddComment}
          >
            <button disabled={commentText === ""}>Tweet</button>
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default CommentModal;
