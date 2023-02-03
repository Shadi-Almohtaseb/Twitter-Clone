import MenuItem from "./MenuItem";
import {
  HomeIcon as ActiveHomeIcon,
  BookmarkIcon as ActiveBookmarkIcon,
  UserIcon as ActiveUserIcon,
} from "@heroicons/react/20/solid";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { UserAuth } from "../../context/AuthContext";

let Items = [
  { title: "Home", reference: "/", icon: HomeIcon, activeIcon: ActiveHomeIcon },
  { title: "Explore", reference: "", icon: HashtagIcon },
  { title: "Notification", reference: "", icon: BellIcon },
  { title: "Messages", reference: "", icon: EnvelopeIcon },
  {
    title: "BookMarks",
    reference: "/saved_posts",
    icon: BookmarkIcon,
    activeIcon: ActiveBookmarkIcon,
  },
  { title: "Lists", reference: "", icon: ClipboardDocumentListIcon },
  {
    title: "Profile",
    reference: "/profile/[user_id]",
    icon: UserIcon,
    activeIcon: ActiveUserIcon,
  },
  { title: "More", reference: "", icon: EllipsisHorizontalCircleIcon },
];

const SideBarMenuItems = () => {
  const { userIn } = UserAuth();

  return (
    <div className="mb-7">
      {!userIn
        ? Items.filter((_, index) => index <= 1 && !userIn).map(
            (Item, index) => {
              return (
                <MenuItem
                  item={Item}
                  ActiveIcon={Item.activeIcon}
                  Icon={Item.icon}
                  key={index}
                />
              );
            }
          )
        : Items.map((Item, index) => {
            return (
              <MenuItem
                item={Item}
                ActiveIcon={Item.activeIcon}
                Icon={Item.icon}
                key={index}
              />
            );
          })}
    </div>
  );
};

export default SideBarMenuItems;
