import React from "react";
import SearchClose from "./SearchClose";

const ListSuggest = () => {
  return (
    <ul className="flex flex-col">
      <li className="flex items-center justify-between p-4 transition-all cursor-pointer hover:bg-whiteSoft">
        Naruto
        <SearchClose></SearchClose>
      </li>
    </ul>
  );
};

export default ListSuggest;
