import React from "react";
import Search from "components/search/Search";
import useChangeValue from "hooks/useChangeValue";
import { Avatar, Button } from "@mui/material";
import TextLight from "components/text/TextLight";

const ProfileFriend = () => {
  const { value, handleChange } = useChangeValue();
  return (
    <div className="px-3 py-4">
      <Search
        isSuggested={false}
        placeholder="Search friend"
        onChange={handleChange}
      ></Search>
      <div className="grid grid-cols-2 my-3 gap-x-5 gap-y-4">
        <div className="flex flex-col items-center justify-center p-4 border rounded-xl border-strock">
          <Avatar
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
            sx={{ width: 80, height: 80 }}
          />
          <h4 className="mt-3 text-lg font-bold">Hoan Do</h4>
          <TextLight>hoan2003@gmail.com</TextLight>
          <div className="flex flex-col w-full mt-3 gap-y-3">
            <Button
              variant="contained"
              className="w-full p-[10px] text-base font-semibold capitalize rounded-full font-body bg-primary text-white"
            >
              Add friend
            </Button>
            <Button
              variant="outlined"
              className="w-full p-[10px] text-base font-semibold capitalize rounded-full font-body border-primary text-primary"
            >
              View Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFriend;
