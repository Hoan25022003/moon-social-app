import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TextHeading from "components/text/TextHeading";
import FilterRadio from "components/filter/FilterRadio";
import FilterSwitch from "components/filter/FilterSwitch";

const SideFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const getParamName = (name) => searchParams.get(name);
  const [selectedValue, setSelectedValue] = useState(
    getParamName("list") || "all"
  );
  const [checkedComment, setCheckedComment] = useState(
    getParamName("comment") || true
  );
  const [checkedLatest, setCheckedLatest] = useState(
    getParamName("latest") || false
  );
  function handleFilterByParams(
    [value, setValue],
    param = "list",
    except = "all"
  ) {
    setValue(value);
    searchParams.delete(param);
    if (value !== except) searchParams.append(param, value.toString());
    setSearchParams(searchParams);
  }
  return (
    <div className="px-4 py-3 mt-5 border border-graySoft rounded-xl">
      <TextHeading>Search filters</TextHeading>
      <div className="flex flex-col my-3 gap-y-1">
        <FilterRadio
          selectedValue={selectedValue}
          handleChange={(e) =>
            handleFilterByParams([e.target.value, setSelectedValue])
          }
          value="all"
          label="All"
        />
        <FilterRadio
          selectedValue={selectedValue}
          handleChange={(e) =>
            handleFilterByParams([e.target.value, setSelectedValue])
          }
          value="people"
          label="People"
        />
        <FilterRadio
          selectedValue={selectedValue}
          handleChange={(e) =>
            handleFilterByParams([e.target.value, setSelectedValue])
          }
          value="post"
          label="Post"
        />
        {selectedValue === "post" && (
          <div className="flex flex-col gap-y-[6px]">
            <FilterSwitch
              label="Comment"
              checked={!!checkedComment}
              handleChange={(e) =>
                handleFilterByParams(
                  [e.target.checked, setCheckedComment],
                  "comment",
                  true
                )
              }
            />
            <FilterSwitch
              label="Latest"
              checked={!!checkedLatest}
              handleChange={(e) =>
                handleFilterByParams(
                  [e.target.checked, setCheckedLatest],
                  "latest",
                  false
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideFilter;
