import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import ProfileImage from "../../assets/Images/shadi.jpg";
import Image from "next/image";
import React from "react";

const BottomProfileSetting = () => {
  return (
    <div className="flex justify-center items-center mb-5 lg:-mr-9 py-3 pl-3 lg:px-5 rounded-full hover:bg-gray-200 hover:cursor-pointer">
      <div>
        <Image
          width={45}
          height={45}
          src={ProfileImage}
          alt="ProfileImage"
          className="rounded-full mr-3"
        ></Image>
      </div>
      <div className="hidden lg:flex flex-col">
        <span className="font-bold">Shadi Almoh...</span>
        <span className="text-gray-700">shadi987654321...</span>
      </div>
      <div className="hidden lg:flex">
        <EllipsisHorizontalIcon height={26} width={26} />
      </div>
    </div>
  );
};

export default BottomProfileSetting;
