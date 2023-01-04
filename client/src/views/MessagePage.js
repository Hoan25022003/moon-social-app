import React from "react";
import BackPage from "components/common/BackPage";
import { TextareaAutosize } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessagePage = () => {
  return (
    <div className="">
      <BackPage>
        <div className="flex flex-col">
          <h4 className="text-lg font-bold">Hoan Do</h4>
          <p className="text-[13px] font-normal text-text4">Active</p>
        </div>
      </BackPage>
      <div className="relative px-5 py-3 h-[calc(100vh-70px)]">
        <div className="absolute bottom-0 left-0 flex items-center w-full px-4 gap-x-4">
          <TextareaAutosize
            aria-label="minimum height"
            minRows={1}
            placeholder="Type message in here"
            autoFocus={true}
            className="w-full h-auto px-4 py-3 text-sm transition-all border border-none rounded-full text-text2 bg-whiteSoft focus:bg-graySoft"
          ></TextareaAutosize>
          <button className="flex items-center justify-center p-2 transition-all bg-transparent rounded-full cursor-pointer hover:bg-graySoft">
            <SendIcon className="text-2xl text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
