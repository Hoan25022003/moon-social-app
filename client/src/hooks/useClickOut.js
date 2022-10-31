import { useEffect, useRef } from "react";

export default function useClickOut(show, setShow) {
  const nodeRef = useRef(null);
  useEffect(() => {
    document.onclick = (e) => {
      if (show && !nodeRef.current.contains(e.target)) setShow(false);
    };
  }, [show, setShow]);
  return { nodeRef };
}
