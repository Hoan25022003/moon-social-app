import ButtonRemoveAll from "components/button/ButtonRemoveAll";
import React from "react";
import ListSuggest from "./ListSuggest";
import SearchHeading from "./SearchHeading";

const SearchHistory = () => {
  return (
    <div className="absolute left-0 w-full overflow-hidden translate-y-2 bg-white border rounded-lg shadow-md border-graySoft top-full">
      <SearchHeading>
        <ButtonRemoveAll>Clear All</ButtonRemoveAll>
      </SearchHeading>
      <ListSuggest></ListSuggest>
    </div>
  );
};

export default SearchHistory;
