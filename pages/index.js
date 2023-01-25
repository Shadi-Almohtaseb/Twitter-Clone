import Head from "next/head";
import SideBar from "../src/components/sideBar/SideBar";
import Feed from "../src/components/main/Feed";
import Widgets from "../src/components/rightBar/Widgets";

export default function Home({ NewsData, UsersData }) {
  return (
    <div>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen  mx-auto">
        <SideBar />
        <Feed />
        <Widgets NewsData={NewsData} UsersData={UsersData} />
      </main>
    </div>
  );
}
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