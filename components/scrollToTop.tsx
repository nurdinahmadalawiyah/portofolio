"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/button";
import { ChevronUpIcon } from "./icons";
import { useLenis } from "lenis/react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      return;
    }

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
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              isIconOnly
              onClick={scrollToTop}
              className="bg-turquoise/20 hover:bg-turquoise/30 backdrop-blur-md border border-turquoise/30 text-turquoise shadow-[0_0_20px_rgba(44,231,241,0.2)] h-14 w-14 rounded-2xl group transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ChevronUpIcon className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
