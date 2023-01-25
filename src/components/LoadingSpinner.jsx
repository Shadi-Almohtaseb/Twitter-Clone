import Image from "next/image";
import React from "react";
import loadingImage from "../assets/Images/loading.gif";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <Image src={loadingImage} width={400} height={400} />
    </div>
  );
};

export default Loading;
