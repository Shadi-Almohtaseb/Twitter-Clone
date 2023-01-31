import React, { useEffect, useState } from "react";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  ArrowUpTrayIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/20/solid";
import { UserAuth } from "../../context/AuthContext";
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase.config";
import { useRouter } from "next/router";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../../atom/ModalAtom";
import { Modal, Tooltip } from "antd";
const BottomPostActions = ({ post }) => {
  const { userIn } = UserAuth();
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  const [comments, setComments] = useState([]);

  const router = useRouter();
  const { Post_Id } = router.query;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post?.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === userIn?.uid) !== -1);
  }, [likes]);

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

  // useEffect(
  //   () =>
  //     onSnapshot(
  //         doc(db, "us", post.id, "comments"),
  //       (snapshot) => {
  //         setComments(snapshot.docs);
  //       }
  //     ),
  //   [db]
  // );

  const { confirm } = Modal;

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this post?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        deleteDoc(doc(db, "posts", post.id));
        await updateDoc(doc(db, "users", userIn?.uid), {
          userPosts: arrayRemove(post.id),
        });
        // arrayRemove(doc(db, "users", userIn?.uid, "userPosts", post.id));
        // deleteDoc(doc(db, "users", userIn?.uid, "userPosts", post.id));
        if (post?.data()?.imagePost) {
          deleteObject(ref(storage, `posts/${post.id}/image`));
        }
        if (Post_Id) {
          router.push("/");
        }
      },
      onCancel() {},
    });
  };

  return (
    <div className="flex items-center justify-around py-3 border-b-2">
      <div
        onClick={() => {
          if (!userIn) {
            router.push("/auth/signin");
          } else {
            setPostId(post.id);
            setOpen(!open);
          }
        }}
        className="flex items-center justify-center cursor-pointer group  gap-2 hover:text-blue-500"
      >
        <Tooltip placement="top" color="#37a4ed" title="Comment">
          <ChatBubbleOvalLeftEllipsisIcon
            hanging={39}
            width={39}
            className="group-hover:bg-blue-100 rounded-full  p-[8px]"
          />
        </Tooltip>
        <span className={`${comments.length <= 0 && "hidden"}`}>
          {comments.length}
        </span>
      </div>
      <Tooltip placement="top" color="#4bdd7f" title="Retweet">
        <div className="flex items-center justify-center  cursor-pointer group gap-2  hover:text-green-400">
          <ArrowPathRoundedSquareIcon
            hanging={39}
            width={39}
            className="group-hover:bg-green-100 rounded-full  p-[8px]"
          />
          <span className="hidden">0</span>
        </div>
      </Tooltip>
      <div
        onClick={HandelLike}
        className="flex items-center justify-center cursor-pointer group  gap-2  hover:text-pink-500"
      >
        <Tooltip placement="top" color="#e2479c" title="Like">
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
        </Tooltip>
        <span className={`${likes.length === 0 && "hidden"}`}>
          {likes.length}
        </span>
      </div>
      <Tooltip placement="top" color="cyan" title="Share">
        <div className="flex items-center justify-center gap-2 group hover:text-blue-500 cursor-pointer  ">
          <ArrowUpTrayIcon
            hanging={39}
            width={39}
            className="group-hover:bg-blue-100 p-[10px] rounded-full"
          />
          <span className="hidden">0</span>
        </div>
      </Tooltip>
      <Tooltip placement="top" color="magenta" title="Delete">
        <div
          onClick={showDeleteConfirm}
          className={`flex items-center justify-center gap-2 group hover:text-red-500 cursor-pointer ${
            post?.data()?.uid !== userIn?.uid && "hidden"
          }`}
        >
          <TrashIcon
            hanging={40}
            width={40}
            className="group-hover:bg-red-100 p-[10px] rounded-full"
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default BottomPostActions;
/*
<Tooltip placement="rightBottom" title={text}>
        <Button>RB</Button>
      </Tooltip>
       */
