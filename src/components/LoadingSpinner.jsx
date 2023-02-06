import Image from "next/image";
import React from "react";
import loadingImage from "../assets/Images/Material-Loading-Animation-unscreen.gif";

const Loading = () => {
  return (
    <div className="bg-[#8a8a8a69] z-50 h-screen w-screen fixed backdrop-blur-sm">
      <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50 bg-transparent">
        <Image src={loadingImage} alt="loading..." width={400} height={400} />
      </div>
    </div>
  );
};

export default Loading;
