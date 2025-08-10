"use client";

import { useEffect, useState } from "react";

export const useSectionHighlight = (sectionId: string) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === `#${sectionId}`) {
        setIsHighlighted(true);
        const timer = setTimeout(() => setIsHighlighted(false), 2000);
        return () => clearTimeout(timer);
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [sectionId]);

  return isHighlighted;
};
