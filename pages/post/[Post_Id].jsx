import { doc, onSnapshot } from "firebase/firestore";
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

const ViewSinglePost = ({ NewsData, UsersData }) => {
  const router = useRouter();
  const { Post_Id } = router.query;
  const [post, setPost] = useState();

  useEffect(() => {
    onSnapshot(doc(db, "posts", Post_Id), (snapshot) => {
      setPost(snapshot);
    });
  }, [Post_Id, db]);

  return (
    <div>
      <Head>
        <title>Post Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen mx-auto bg-[#f0f2f5]">
        <SideBar />
        <div className="flex flex-col lg:w-[45%] md:w-[50%] w-full lg:ml-[25%] sm:ml-[65px] border-l-[1px]">
          <Header />
          {post !== undefined ? <Post post={post} /> : <LoadingSpinner />}
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

export default ViewSinglePost;
