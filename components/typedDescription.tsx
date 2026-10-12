"use client";

import { useT } from '@/i18n/context';
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedDescription = () => {
  const typedTextRef = useRef(null);
  const roles = useT().home.roles;

  useEffect(() => {
    const options = {
      strings: roles,
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
  }, [roles]);

  return <span ref={typedTextRef}></span>;
};

export default TypedDescription;
