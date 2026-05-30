"use client";

import { siteConfig } from '@/config/site';
import React, { useEffect, useState } from 'react';

const TypedDescription = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = siteConfig.home.role[roleIndex] ?? "";
    const isComplete = charIndex === currentRole.length;
    const isEmpty = charIndex === 0;
    const delay = isComplete && !isDeleting ? 1200 : isDeleting ? 45 : 85;

    const timer = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty && isDeleting) {
        setIsDeleting(false);
        setRoleIndex((index) => (index + 1) % siteConfig.home.role.length);
        return;
      }

      setCharIndex((index) => index + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const currentRole = siteConfig.home.role[roleIndex] ?? "";

  return (
    <span>
      {currentRole.slice(0, charIndex)}
      <span className="animate-caret">|</span>
    </span>
  );
};

export default TypedDescription;
