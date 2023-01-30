import { Drawer } from "antd";
import React from "react";
import WhatsHappeningWidget from "../rightBar/WhatsHappeningWidget";
import WhoToFollowWidget from "../rightBar/WhoToFollowWidget";

const MobileRightBar = ({ onClose, open, NewsData, UsersData }) => {
  return (
    <div>
      <Drawer
        title="General content"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <WhatsHappeningWidget NewsData={NewsData?.articles} />
        <WhoToFollowWidget UsersData={UsersData?.results} />
      </Drawer>
    </div>
  );
};

export default MobileRightBar;
