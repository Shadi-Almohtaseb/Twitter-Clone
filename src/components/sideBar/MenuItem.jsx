import React from "react";
const MenuItem = ({ item, Icon }) => {
  return (
    <div className="flex items-center gap-6 py-2 lg:pl-5 p-2 ml-2 lg:pr-9 mt-3 mb-2 w-fit hover:cursor-pointer hover:bg-gray-200 rounded-full">
      <Icon className="h-7 w-7" />
      <span className="text-black font-semibold text-xl flex sm:hidden lg:flex">
        {item.title}
      </span>
    </div>
  );
};

export default MenuItem;
