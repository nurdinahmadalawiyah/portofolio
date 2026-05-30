"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { ChevronUpIcon } from "./icons";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        setIsVisible(window.pageYOffset > 300);
        ticking = false;
      });
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isVisible && (
          <div className="animate-scroll-top-in transition-transform duration-300 hover:-translate-y-1 active:scale-90">
            <Button
              isIconOnly
              onClick={scrollToTop}
              className="bg-turquoise/20 hover:bg-turquoise/30 backdrop-blur-md border border-turquoise/30 text-turquoise shadow-[0_0_20px_rgba(44,231,241,0.2)] h-14 w-14 rounded-2xl group transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ChevronUpIcon className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />
            </Button>
          </div>
        )}
    </div>
  );
};
