"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import NewsItem from "./NewsItem";

const WhatsHappeningWidget = ({ NewsData }) => {
  const [newsItemsCount, setNewsItemsCount] = useState(2);

  return (
    <div className="pt-5 bg-[#f3f4f6] rounded-xl ml-4 mt-10 shadow-lg">
      <span className="font-bold text-xl pl-2">Whats Happening</span>
      <AnimatePresence>
        {NewsData.filter((_, index) => index <= newsItemsCount).map(
          (item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                <NewsItem item={item} key={index} />
              </motion.div>
            );
          }
        )}
      </AnimatePresence>
      <div className="flex">
        <div
          onClick={() => setNewsItemsCount(newsItemsCount + 3)}
          className="hover:bg-blue-100 w-full mt-3 py-2 px-5  rounded-bl-xl cursor-pointer transition-all"
        >
          <span className="text-blue-600">Show More</span>
        </div>
        <div
          onClick={() => setNewsItemsCount(newsItemsCount - 3)}
          className={`hover:bg-pink-100 w-full ${
            newsItemsCount >= 3 ? "flex" : "hidden"
          } mt-3 py-2 px-5 rounded-br-xl cursor-pointer transition-all`}
        >
          <span className="text-pink-600">Show Less</span>
        </div>
      </div>
    </div>
  );
};

export default WhatsHappeningWidget;
