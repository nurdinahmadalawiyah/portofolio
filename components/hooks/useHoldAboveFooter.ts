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

/**
 * `true` selagi pengguna scroll ke bawah dengan tempo cukup cepat,
 * kembali `false` saat berhenti sebentar (350ms) atau scroll ke atas.
 */
export function useHideWhileScrollingDown(): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();
    let timer: ReturnType<typeof setTimeout>;
    let stable = true;

    const onScroll = () => {
      const y = window.scrollY;
      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      const velocity = (y - lastY) / dt; // px per ms
      lastY = y;
      lastT = now;

      if (velocity > 0.35) {
        // kecepatan cukup: sembunyikan dan tunda muncul selama still
        stable = false;
        setHidden(true);
        clearTimeout(timer);
        timer = setTimeout(() => {
          stable = true;
          setHidden(false);
        }, 350);
      } else if (stable || velocity < 0) {
        setHidden(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  return hidden;
}
