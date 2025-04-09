import React, { useEffect } from "react";
interface useDetectOutsideProps {
  ref: React.RefObject<HTMLDivElement>;
  callback: () => void;
}
function useDetectOutside({ ref, callback }: useDetectOutsideProps) {
  useEffect(() => {
    //detecting outside click
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
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
