import React from "react";
import { Avatar } from "@mui/material";
import TextHeading from "components/text/TextHeading";
import TextUsername from "components/text/TextUsername";

const SideContact = () => {
  return (
    <div className="mt-5 overflow-hidden rounded-xl bg-whiteSoft">
      <TextHeading className="p-4">User contact</TextHeading>
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 transition-all cursor-pointer hover:bg-graySoft">
          <div className="flex items-center gap-x-3">
            <Avatar
              alt=""
              src="https://images.unsplash.com/photo-1666526320312-d07111a23bdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              sx={{ width: 40, height: 40 }}
            />
            <span className="text-[15px] font-semibold">Hoan Do</span>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-3 transition-all cursor-pointer hover:bg-graySoft">
          <div className="flex items-center gap-x-3">
            <Avatar
              alt=""
              src="https://images.unsplash.com/photo-1666526320312-d07111a23bdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              sx={{ width: 40, height: 40 }}
            />
            <TextUsername>Huy Do</TextUsername>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideContact;
