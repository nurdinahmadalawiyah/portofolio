"use client";

import { useEffect, useRef, useState } from "react";

type LazySectionProps = {
  children: React.ReactNode;
  className?: string;
  id: string;
  innerClassName?: string;
  minHeight?: string;
};

export function LazySection({
  children,
  className = "flex flex-col items-center justify-center gap-4 py-8 md:py-10 mb-20",
  id,
  innerClassName = "flex flex-col md:flex-col items-center justify-center gap-10",
  minHeight = "70vh",
}: LazySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <section ref={sectionRef} className={className} id={id} style={shouldRender ? undefined : { minHeight }}>
      {shouldRender ? <div className={innerClassName}>{children}</div> : null}
    </section>
  );
}

