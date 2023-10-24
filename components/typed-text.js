import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
import { title } from "@/components/primitives";

export const TypedText = () => {
  useEffect(() => {
    const target = document.getElementById("typewriter-target")
    if (target) {
      new Typewriter(target, {
        strings: ["I’m a Fullstack Developer", "I’m a Frontend Developer", "I’m a Backend Developer"],
        autoStart: true,
        loop: true,
      });
    }
  }, []);
    
  return (
    <h1 id="typewriter-target" className={title({ color: "turqoise", size: "xl" })}></h1>
  );
};
