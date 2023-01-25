import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  CalendarIcon,
  FaceSmileIcon,
  GifIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { UserAuth } from "../../context/AuthContext";
import { db, storage } from "../../../firebase.config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { XMarkIcon } from "@heroicons/react/20/solid";

const AddPostInput = () => {
  const { userIn } = UserAuth();
  const [textInputPost, setTextInputPost] = useState("");
  const [imagePost, setImagePost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(false);
  const postImageRef = useRef(null);

  const HandelAddPost = async () => {
    // if (loadingPost) return;
    setLoadingPost(true);
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        uid: userIn.uid,
        name: userIn.displayName,
        userImage: userIn.photoURL,
        timeStamp: serverTimestamp(),
        textInputPost: textInputPost,
      });

      const imageRef = ref(storage, `posts/${docRef.id}/image`);

      if (imagePost) {
        await uploadString(imageRef, imagePost, "data_url").then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            imagePost: downloadURL,
          });
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setTextInputPost("");
    setImagePost(null);
    setLoadingPost(false);
  };

  const HandelAddPostImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImagePost(readerEvent.target.result);
    };
  };

  return (
    <div className="flex flex-col px-4 py-2">
      <div className="flex items-center justify-center gap-2 py-3">
        <Image
          width={50}
          height={50}
          src={userIn.photoURL}
          alt="ProfileImage"
          className="rounded-full"
        ></Image>
        <input
          type="text"
          placeholder="What's happening?"
          value={textInputPost}
          onChange={(e) => setTextInputPost(e.target.value)}
          className="w-full h-16 py-2 px-3 outline-none text-xl rounded-xl bg-transparent placeholder:text-xl"
        />
      </div>
      {imagePost && (
        <div className="relative">
          <div
            onClick={() => setImagePost(null)}
            className="absolute top-3 left-0 p-1 m-1 mt-1 bg-slate-400 hover:bg-[#a6a6a6ba] text-white bg-opacity-60 cursor-pointer backdrop-blur-sm rounded-full"
          >
            <XMarkIcon width={29} height={29} />
          </div>
          <img
            src={imagePost}
            className={`my-3 rounded-lg ${loadingPost && "animate-pulse"}`}
          />
        </div>
      )}
      <div
        className={`flex items-center justify-between ${
          loadingPost && "hidden"
        }`}
      >
        <div className="flex items-center justify-center gap-5 pl-16">
          <div onClick={() => postImageRef.current.click()}>
            <PhotoIcon
              width={25}
              height={25}
              className="text-blue-500 hover:cursor-pointer hover:text-blue-700"
            />
            <input
              type="file"
              hidden
              ref={postImageRef}
              onChange={(e) => HandelAddPostImage(e)}
            />
          </div>
          <FaceSmileIcon
            width={25}
            height={25}
            className="text-blue-500 hover:cursor-pointer hover:text-blue-700"
          />
          <GifIcon
            width={25}
            height={25}
            className="text-blue-500 hover:cursor-pointer hover:text-blue-700"
          />
          <CalendarIcon
            width={25}
            height={25}
            className="text-blue-500 hover:cursor-pointer hover:text-blue-700"
          />
        </div>
        <span
          className={`px-5 py-[9px] ml-2 p-3 flex w-fit rounded-full ${
            textInputPost === "" && imagePost === null
              ? "bg-slate-400"
              : "bg-[#1d9bf0] hover:bg-blue-600"
          }  text-white font-bold text-[15px] transition-all`}
          onClick={HandelAddPost}
        >
          <button disabled={textInputPost === "" && imagePost === null}>
            Tweet
          </button>
        </span>
      </div>
    </div>
  );
};

export default AddPostInput;