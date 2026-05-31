"use client";

import { useEffect, useState } from "react";

const INTRO_EVENT = "portfolio:intro-complete";

export const markIntroComplete = () => {
  window.dispatchEvent(new Event(INTRO_EVENT));
};

export const useIntroReady = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleIntroComplete = () => setIsReady(true);
    const fallbackTimer = window.setTimeout(handleIntroComplete, 2600);

    window.addEventListener(INTRO_EVENT, handleIntroComplete);

    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener(INTRO_EVENT, handleIntroComplete);
    };
  }, []);

  return isReady;
};
