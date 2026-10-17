"use client";

import { useEffect, useState } from "react";

/**
 * Mengembalikan berapa px tombol fixed harus menggeser diri ke atas agar
 * tidak masuk ke area footer. 0 saat footer belum kelihatan; makin banyak
 * saat footer sudah memasuki viewport.
 */
export function useHoldAboveFooter(): number {
  const [holdPx, setHoldPx] = useState(0);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      // sebelum footer terlihat: overflow <= 0 → hold 0 (posisi normal)
      const overflow = window.innerHeight - footer.getBoundingClientRect().top;
      setHoldPx(overflow > 0 ? overflow : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return holdPx;
}
