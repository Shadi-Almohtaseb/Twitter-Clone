import MenuItem from "./MenuItem";
import { HashtagIcon, HomeIcon } from "@heroicons/react/20/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

let Items = [
  { title: "Home", icon: HomeIcon },
  { title: "Explore", icon: HashtagIcon },
  { title: "Notification", icon: BellIcon },
  { title: "Messages", icon: EnvelopeIcon },
  { title: "BookMarks", icon: BookmarkIcon },
  { title: "Lists", icon: ClipboardDocumentListIcon },
  { title: "Profile", icon: UserIcon },
  { title: "More", icon: EllipsisHorizontalCircleIcon },
];

const SideBarMenuItems = () => {
  return (
    <div className="mb-7">
      {Items.map((Item, index) => {
        return <MenuItem item={Item} Icon={Item.icon} key={index} />;
      })}
    </div>
  );
};

export default SideBarMenuItems;
