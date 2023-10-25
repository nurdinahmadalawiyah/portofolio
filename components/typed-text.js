'use client'

import React, { useEffect } from "react";
import { title } from "@/components/primitives";
import Typed from "typed.js";

export const TypedText = () => {
  const typedTextRef = useRef(null);

 useEffect(() => {
    const typed = new Typed(typedTextRef.current, {
      strings: [
        "I’m a Fullstack Developer",
        "I’m a Frontend Developer",
        "I’m a Backend Developer",
      ],
      typeSpeed: 50,
    });

    return () => {
      typed.destroy();
    };
  }, []);
    
  return (
    <h1 id="typewriter-target" className={title({ color: "turqoise", size: "xl" })}></h1>
  );
};
