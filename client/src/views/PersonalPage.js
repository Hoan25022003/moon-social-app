import React from "react";
import BackPage from "components/common/BackPage";
import ProfileFeature from "modules/profile/ProfileFeature";
import ProfileGeneral from "modules/profile/ProfileGeneral";
import TextHeading from "components/text/TextHeading";
import TextLight from "components/text/TextLight";
import ProfileTabList from "modules/profile/ProfileTabList";
import PictureCover from "components/picture/PictureCover";
import ProfileAbout from "modules/profile/tabs/ProfileAbout";
import ProfilePost from "modules/profile/tabs/ProfilePost";
import ProfileFriend from "modules/profile/tabs/ProfileFriend";
import ProfileLike from "modules/profile/tabs/ProfileLike";
import PictureAvatarBig from "components/picture/PictureAvatarBig";
import useTurnSwitch from "hooks/useTurnSwitch";

const PersonalPage = () => {
  const listTab = ["about", "posts", "friends", "likes"];
  const { keyName: tabName, switchTab, setSearchParams } = useTurnSwitch("tab");
  return (
    <div className="border-x border-graySoft">
      <BackPage turnSwitchTab={switchTab}>
        <div className="flex flex-col">
          <h4 className="text-lg font-bold">Hoan Do</h4>
          <p className="text-[13px] font-normal text-text4">12 posts</p>
        </div>
      </BackPage>
      <div className="relative">
        <PictureCover src="https://pbs.twimg.com/profile_banners/998963083816022017/1527006522/1080x360" />
        <PictureAvatarBig
          avatar="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          alt="Hoan Do"
        />
      </div>
      <div className="px-5">
        <ProfileFeature></ProfileFeature>
        <div className="flex flex-col mt-6">
          <TextHeading>Hoan Do</TextHeading>
          <TextLight>hoan@gmail.com</TextLight>
          <ProfileGeneral></ProfileGeneral>
        </div>
      </div>
      <ProfileTabList listTab={listTab} setSearchParams={setSearchParams}>
        <ProfileTabItem tabName={tabName}></ProfileTabItem>
      </ProfileTabList>
    </div>
  );
};

const ProfileTabItem = ({ tabName }) => {
  switch (tabName) {
    case "posts":
      return <ProfilePost></ProfilePost>;

    case "friends":
      return <ProfileFriend></ProfileFriend>;

    case "likes":
      return <ProfileLike></ProfileLike>;

    default:
      return <ProfileAbout></ProfileAbout>;
  }
};

export default PersonalPage;
