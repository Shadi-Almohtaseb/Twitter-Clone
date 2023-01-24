import React from "react";
import Post from "./Post";
import ProfileImage from "../../assets/Images/shadi.jpg";

const Posts = () => {
  const PostData = [
    {
      id: "1",
      name: "Shadi Almohtaseb",
      userImage: { ProfileImage },
      image: "https://source.unsplash.com/random",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum nis laboriosam beatae aliquampraesentium nobis saepe nemo.",
      timeStamp: "5 min ago",
    },
    {
      id: "2",
      name: "Ahmed Almohtaseb",
      userImage: "https://source.unsplash.com/random",
      image: "https://source.unsplash.com/random",
      text: "Rerum nis laboriosam beatae aliquampraesentium nobis saepe nemo.",
      timeStamp: "10 min ago",
    },
    {
      id: "3",
      name: "Noor Almohtaseb",
      userImage: { ProfileImage },
      image: "https://source.unsplash.com/random",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      timeStamp: "15 min ago",
    },
  ];

  return (
    <div>
      {PostData.map((post, index) => {
        return <Post post={post} key={index} />;
      })}
    </div>
  );
};

export default Posts;
