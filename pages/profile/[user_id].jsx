import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase.config";
import Post from "../../src/components/main/Post";
import Widgets from "../../src/components/rightBar/Widgets";
import SideBar from "../../src/components/sideBar/SideBar";
import CommentModal from "../../src/components/CommentModal";
import Header from "../../src/components/main/Header";
import Posts from "../../src/components/main/Posts";
import BottomNavigationBar from "../../src/components/main/BottomNavigationBar";
import LoadingSpinner from "../../src/components/LoadingSpinner";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import { AnimatePresence, motion } from "framer-motion";

const MyProfile = ({ NewsData, UsersData }) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timeStamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );
  return (
    <div>
      <Head>
        <title>Profile page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen mx-auto bg-[#f0f2f5]">
        <SideBar />
        <div className="flex flex-col lg:w-[45%] md:w-[50%] w-full lg:ml-[25%] sm:ml-[65px] border-l-[1px]">
          <ProfileHeader />
          <ProfileInfo />
          <AnimatePresence>
            {posts
              .filter((post) => post?.data()?.uid === user_id)
              .map((post) => {
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.3 }}
                  >
                    <Post post={post} key={post.id} />
                  </motion.div>
                );
              })}
          </AnimatePresence>
          <BottomNavigationBar />
        </div>
        <Widgets NewsData={NewsData} UsersData={UsersData} />
        <CommentModal />
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const [NewsAPI, UsersAPI] = await Promise.all([
    fetch(`https://saurav.tech/NewsAPI/top-headlines/category/health/in.json`, {
      cache: "no-store",
    }),
    fetch(`https://randomuser.me/api/?results=70`, {
      cache: "no-store",
    }),
  ]);

  const [NewsData, UsersData] = await Promise.all([
    NewsAPI.json(),
    UsersAPI.json(),
  ]);

  // Pass NewsData to the page via props
  return {
    props: { NewsData, UsersData }, // will be passed to the page component as props
  };
}

export default MyProfile;
