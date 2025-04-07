import React, { use, useEffect } from "react";
interface useDetectOutsideProps {
  ref: React.RefObject<HTMLElement>;
  callback: () => void;
}
function useDetectOutside({ ref, callback }: useDetectOutsideProps) {
  useEffect(() => {
    //detecting outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
  return ref;
}

export default useDetectOutside;
