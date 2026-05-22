"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while splash screen is active
    document.body.style.overflow = "hidden";
    
    // Hide splash screen after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
        >
          {/* Elegant Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <motion.h1 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-6xl font-black text-turquoise z-10 font-mono tracking-tighter drop-shadow-md"
            >
              &lt;/&gt;
            </motion.h1>
            
            {/* Elegant subtle pulse behind logo */}
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0, 0.3, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-turquoise/20 blur-xl pointer-events-none"
            />
          </motion.div>
          
          {/* Minimalist Loading Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            {/* Loading progress bar */}
            <div className="w-32 h-[1px] bg-foreground/10 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: "0%", x: "-100%" }}
                animate={{ width: "100%", x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 left-0 h-full bg-turquoise shadow-[0_0_10px_rgba(44,231,241,0.5)]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
