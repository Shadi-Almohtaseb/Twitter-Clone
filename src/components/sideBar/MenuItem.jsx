import { useRouter } from "next/router";
import React from "react";
import { UserAuth } from "../../context/AuthContext";
const MenuItem = ({ item, Icon, ActiveIcon, setOpenSideBar }) => {
  const { userIn } = UserAuth();
  const router = useRouter();

  const handelNavigate = () => {
    switch (item.title) {
      case "Home":
        {
          router.push("/");
          // setOpenSideBar(false);
        }
        break;
      case "BookMarks":
        {
          router.push("/saved_posts");
          // setOpenSideBar(false);
        }
        break;
      case "Profile":
        {
          router.push(`/profile/${userIn?.uid}`);
          // setOpenSideBar(false);
        }
        break;

      default:
        break;
    }
  };

  return (
    <div
      onClick={handelNavigate}
      className="flex items-center gap-6 py-2 lg:pl-5 p-2 ml-2 lg:pr-9 mt-3 mb-2 w-fit hover:cursor-pointer hover:bg-gray-200 rounded-full"
    >
      {router.pathname === item.reference ? (
        <ActiveIcon className="h-7 w-7" />
      ) : (
        <Icon className="h-7 w-7" />
      )}
      <span
        className={`text-black text-xl flex sm:hidden lg:flex ${
          router.pathname === item.reference ? "font-bold" : "font-semibold"
        }`}
      >
        {item.title}
      </span>
    </div>
  );
};

export default MenuItem;
