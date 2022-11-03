import { Avatar } from "@mui/material";
import React from "react";
import BackPage from "components/common/BackPage";
import ProfileFeature from "modules/profile/ProfileFeature";
import ProfileGeneral from "modules/profile/ProfileGeneral";
import TextHeading from "components/text/TextHeading";
import TextLight from "components/text/TextLight";

const PersonalPage = () => {
  // const { id } = useParams();
  return (
    <div className="border-x border-graySoft">
      <BackPage>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">Hoan Do</h3>
          <p className="text-[13px] font-normal text-text4">12 posts</p>
        </div>
      </BackPage>
      <div className="relative">
        <img
          src="https://pbs.twimg.com/profile_banners/998963083816022017/1527006522/1080x360"
          className="w-full h-[250px] object-cover cursor-pointer"
          alt=""
        />
        <div className="absolute bottom-0 p-1 bg-white rounded-full cursor-pointer left-5 translate-y-2/4">
          <Avatar
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            sx={{ width: 130, height: 130 }}
          />
        </div>
      </div>
      <div className="px-5">
        <ProfileFeature></ProfileFeature>
        <div className="flex flex-col mt-6">
          <TextHeading>Hoan Do</TextHeading>
          <TextLight>hoan@gmail.com</TextLight>
          <ProfileGeneral></ProfileGeneral>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
