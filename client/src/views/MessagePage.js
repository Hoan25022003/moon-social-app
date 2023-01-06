import React from "react";
import BackPage from "components/common/BackPage";
import MessageForm from "modules/messages/MessageForm";
import MessageProfile from "modules/messages/MessageProfile";
import MessageItem from "modules/messages/MessageItem";

const MessagePage = () => {
  return (
    <>
      <BackPage turnSwitchTab="/chats">
        <div className="flex flex-col">
          <h4 className="text-lg font-bold">Hoan Do</h4>
          <p className="text-[13px] font-normal text-text4">Active</p>
        </div>
      </BackPage>
      <div className="flex flex-col px-5 gap-y-5 py-3 h-[calc(100vh-60px)]">
        <div className="h-full overflow-auto">
          <MessageProfile></MessageProfile>
          <div className="flex flex-col w-full gap-y-3">
            <MessageItem yourself={true}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              eaque fugit vitae nesciunt fuga quisquam, nisi reiciendis
              repudiandae ab mollitia debitis dolorum iusto officiis qui itaque,
              quidem vero maiores nihil?
            </MessageItem>
            <MessageItem yourself={false}>What is this?</MessageItem>
            {/* <div className="flex items-start gap-x-2">
              <Avatar
                src="/uploads/avatar-man.png"
                style={{ width: 20, height: 20 }}
              ></Avatar>
              <div className="px-3 py-2 font-normal text-[15px] rounded-xl bg-graySoft max-w-[80%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Expedita itaque aspernatur laborum fugit unde et dolorum quo?
                Quae reprehenderit corrupti voluptates voluptas est alias esse?
                Aperiam neque ipsum similique praesentium.
              </div>
            </div> */}
          </div>
        </div>
        <MessageForm></MessageForm>
      </div>
    </>
  );
};

export default MessagePage;
