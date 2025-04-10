import React, { useEffect } from "react";

interface useDetectOutsideProps {
  ref: React.RefObject<HTMLElement | null>; // ✅ THIS FIXES THE ISSUE
  callback: () => void;
}

function useDetectOutside({ ref, callback }: useDetectOutsideProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);

  return ref;
}

export default useDetectOutside;
