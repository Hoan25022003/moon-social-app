import React from "react";
import ListSuggest from "./ListSuggest";
import SearchHeading from "./SearchHeading";

const SearchHistory = () => {
  return (
    <div className="absolute left-0 w-full overflow-hidden translate-y-2 bg-white border rounded-lg shadow-md border-graySoft top-full">
      <SearchHeading>
        <span className="px-4 py-1 text-sm font-semibold transition-all rounded-full cursor-pointer hover:bg-primary hover:bg-opacity-10 text-primary">
          Clear all
        </span>
      </SearchHeading>
      <ListSuggest></ListSuggest>
    </div>
  );
};

export default SearchHistory;
