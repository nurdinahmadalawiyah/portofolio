"use client";

import { siteConfig } from '@/config/site';
import React, { useEffect, useRef } from 'react';
// @ts-expect-error: typed.js has issues with type resolution in modern moduleResolution settings
import Typed from 'typed.js';

const TypedDescription = () => {
  const typedTextRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: siteConfig.home.role,
      typeSpeed: 100,
      backSpeed: 50,
      showCursor: true,
      cursorChar: '|',
      loop: true,
    };

    const typed = new Typed(typedTextRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return <span ref={typedTextRef}></span>;
};

export default TypedDescription;
