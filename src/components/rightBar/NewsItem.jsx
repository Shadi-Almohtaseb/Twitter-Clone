import Link from "next/link";
import React from "react";

const NewsItem = ({ item }) => {
  return (
    <div className="flex flex-col gap-7 mt-5 px-1">
      <Link
        href={item.url}
        target="_blank"
        className="flex justify-between hover:bg-gray-200 transition-all p-2 rounded-lg cursor-pointer"
      >
        <div className="pr-4">
          <p>
            <span className="font-bold px-1">{item.author + ": "}</span>
            <span>{item.title}</span>
          </p>
          <span className="text-gray-600">{item.publishedAt}</span>
        </div>
        <div>
          <img
            src={item.urlToImage}
            alt="img"
            className="rounded-lg w-20 max-w-[150px] "
          />
        </div>
      </Link>
    </div>
  );
};

export default NewsItem;
