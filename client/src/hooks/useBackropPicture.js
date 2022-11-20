import { useState } from "react";

export default function useBackdropPicture() {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [picture, setPicture] = useState();
  const handleShowBackdrop = (data) => {
    setOpenBackdrop(true);
    setPicture(typeof data === "string" ? [data] : data);
  };
  return {
    openState: [openBackdrop, setOpenBackdrop],
    picture,
    handleShowBackdrop,
  };
}
