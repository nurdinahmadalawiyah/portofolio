import { siteConfig } from '@/config/site';
import React, { useEffect, useRef } from 'react';
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
