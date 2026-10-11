"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/button";
import { ChevronUpIcon } from "./icons";
import { useLenis } from "lenis/react";
import clsx from "clsx";

export const ScrollToTop = ({ className }: { className?: string } = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis();

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    lenis?.scrollTo(0, {
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.6, x: 15 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.6, x: 15 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.95 }}
          className={clsx("shrink-0", className)}
        >
          <Button
            isIconOnly
            onClick={scrollToTop}
            className="bg-turquoise/20 hover:bg-turquoise/30 backdrop-blur-md border border-turquoise/30 text-turquoise h-14 w-14 rounded-2xl group transition-all duration-300 shadow-lg"
            aria-label="Scroll to top"
          >
            <ChevronUpIcon className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
