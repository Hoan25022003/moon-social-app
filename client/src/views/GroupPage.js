import BackPage from "components/common/BackPage";
import EmptyLayout from "layout/EmptyLayout";
import React from "react";

const GroupPage = () => {
  return (
    <>
      <BackPage haveBackBtn={false}>
        <div className="flex flex-col px-4">
          <h4 className="text-lg font-bold">List group</h4>
          <p className="text-[13px] font-normal text-text4">0 groups</p>
        </div>
      </BackPage>
      <div className="flex items-center"></div>
      <EmptyLayout
        className="h-[300px]"
        linkImg="/img/profile-empty.png"
        info="There are no groups yet"
        support="Please join or create group to contact with everyone."
      ></EmptyLayout>
    </>
  );
};

export default GroupPage;
