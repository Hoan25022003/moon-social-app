import { debounce } from "lodash";
import { useState } from "react";

export default function useChangeValue(init = "") {
  const [value, setValue] = useState(init);
  const handleChange = debounce((e) => {
    setValue(e.target.value);
  }, 500);
  return { value, handleChange };
}
