import React from "react";
import BackPage from "components/common/BackPage";
import NotifyFriend from "modules/notify/NotifyFriend";
import { useSelector } from "react-redux";
import NotifyItem from "modules/notify/NotifyItem";
import EmptyLayout from "layout/EmptyLayout";

const NotifyPage = () => {
  const { listNotify, listUsers } = useSelector((state) => state.notify);
  return (
    <>
      <BackPage haveBackBtn={false}>
        <div className="flex flex-col px-2">
          <h4 className="text-lg font-bold">Notification</h4>
          <p className="text-[13px] font-normal text-text4">
            {listNotify?.length + listUsers?.length} notify
          </p>
        </div>
      </BackPage>
      <div className="flex flex-col p-3 gap-y-5">
        {listUsers.length > 0 && (
          <div className="flex flex-col gap-y-4">
            {listUsers.map((user) => (
              <NotifyFriend key={user._id} user={user}></NotifyFriend>
            ))}
          </div>
        )}
        {listNotify.length > 0 && (
          <div className="flex flex-col gap-y-1">
            {listNotify.map((notify) => (
              <NotifyItem
                key={notify?._id}
                notifyInfo={notify}
                postID={notify.postID?._id}
                userInfo={notify.from}
              ></NotifyItem>
            ))}
          </div>
        )}
        {listNotify.length === 0 && listUsers.length === 0 && (
          <EmptyLayout
            linkImg="/img/mute.png"
            info="You haven't already any notification."
            support="Please switch to other page."
          ></EmptyLayout>
        )}
      </div>
    </>
  );
};

export default NotifyPage;
