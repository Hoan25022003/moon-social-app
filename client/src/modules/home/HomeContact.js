import { Avatar } from "@mui/material";
import Search from "components/search/Search";
import useChangeValue from "hooks/useChangeValue";
import React from "react";
import MenuNav from "components/menu/MenuNav";
import MenuNavItem from "components/menu/MenuNavItem";

const HomeContact = () => {
  const { value: query, handleChange } = useChangeValue();
  console.log(query);
  return (
    <div>
      <Search onChange={handleChange}></Search>
      <div className="mt-5 overflow-hidden rounded-xl bg-whiteSoft">
        <h3 className="p-4 text-xl font-bold">User contact</h3>
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
            <MenuNav>
              <MenuNavItem>View info</MenuNavItem>
              <MenuNavItem>Send message</MenuNavItem>
            </MenuNav>
          </div>
          <div className="flex items-center justify-between px-4 py-3 transition-all cursor-pointer hover:bg-graySoft">
            <div className="flex items-center gap-x-3">
              <Avatar
                alt=""
                src="https://images.unsplash.com/photo-1666526320312-d07111a23bdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                sx={{ width: 40, height: 40 }}
              />
              <span className="text-[15px] font-semibold">Huy Do</span>
            </div>
            <MenuNav>
              <MenuNavItem>View info</MenuNavItem>
              <MenuNavItem>Send message</MenuNavItem>
            </MenuNav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContact;
