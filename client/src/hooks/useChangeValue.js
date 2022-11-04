import { debounce } from "lodash";
import { useState } from "react";

export default function useChangeValue(init = "", timer = 500) {
  const [value, setValue] = useState(init);
  const handleChange = debounce((e) => {
    setValue(e.target.value);
  }, timer);
  return { value, handleChange };
}
