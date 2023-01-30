import React, { useEffect, useState } from "react";
import FilterRadio from "components/filter/FilterRadio";
import TextHeading from "components/text/TextHeading";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userFriend } from "redux/users/userRequest";
import { filterUser } from "redux/users/userSlice";

const SideFriend = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getParamName = (name) => searchParams.get(name);
  const { filters } = useSelector((state) => state.users?.friend);
  const [selectedGender, setSelectedGender] = useState(
    getParamName("sex") || "all"
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const condition = {
      ...filters,
      gender: selectedGender === "all" ? "" : selectedGender,
    };
    dispatch(userFriend(condition));
    dispatch(filterUser(condition));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGender]);
  const handleFilterByParams = (
    [value, setValue],
    param = "sex",
    except = "all"
  ) => {
    setValue(value);
    searchParams.delete(param);
    if (value !== except) searchParams.append(param, value.toString());
    setSearchParams(searchParams);
  };
  return (
    <div className="px-4 py-3 mt-5 border border-graySoft rounded-xl">
      <TextHeading>Gender</TextHeading>
      <div className="flex flex-col my-3 gap-y-1">
        <FilterRadio
          selectedValue={selectedGender}
          handleChange={(e) =>
            handleFilterByParams([e.target.value, setSelectedGender])
          }
          value="all"
          label="All"
        />
        <FilterRadio
          selectedValue={selectedGender}
          handleChange={(e) =>
            handleFilterByParams([e.target.value, setSelectedGender])
          }
          value="male"
          label="Male"
        />
        <FilterRadio
          selectedValue={selectedGender}
          handleChange={(e) =>
            handleFilterByParams([e.target.value, setSelectedGender])
          }
          value="female"
          label="Female"
        />
      </div>
    </div>
  );
};

export default SideFriend;
