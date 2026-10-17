"use client";

import { useEffect, useRef } from "react";

/**
 * Kota mini dengan awan bergerak parallax — overlay di footer, di belakang konten.
 * Layers (dari jauh ke dekat):
 * - bintang + bulan (dark mode)
 * - pesawat kecil lewat dengan lampu berkedip
 * - burung sewaktu-waktu
 * - skyline jauh (siluet, offset parallax kecil)
 * - skyline dekat (jendela menyala yang kedip, antena radar)
 * - awan 2 lapis dengan kecepatan berbeda
 * Kursor memberi efek parallax lembut ke semua layer.
 */
export const MiniCity = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let raf = 0;

    let dark = document.documentElement.classList.contains("dark");
    const darkObserver = new MutationObserver(() => {
      dark = document.documentElement.classList.contains("dark");
    });
    darkObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ---- dunia kecil: dibangun sekali per resize
    interface Bld {
      x: number;
      w: number;
      h: number;
      antenna: boolean;
      windows: { x: number; y: number; on: boolean; ph: number }[];
    }
    interface Cloud {
      x: number;
      y: number;
      s: number;
      speed: number;
      alpha: number;
    }
    interface Star {
      x: number;
      y: number;
      ph: number;
    }
    interface Bird {
      x: number;
      y: number;
      vx: number;
      ph: number;
      wing: number;
    }
    let far: Bld[] = [];
    let near: Bld[] = [];
    let cloudsBack: Cloud[] = [];
    let cloudsFront: Cloud[] = [];
    let stars: Star[] = [];
    const birds: Bird[] = [];
    let plane: { x: number; y: number; speed: number } | null = null;

    const makeSkyline = (
      layerH: number,
      seed: number
    ): Bld[] => {
      const arr: Bld[] = [];
      let x = -20;
      let i = 0;
      let rng = seed;
      while (x < W + 20) {
        rng = (rng * 16807) % 2147483647;
        const r = rng / 2147483647;
        const w = 34 + r * 46;
        const h = layerH * (0.35 + ((rng >> 8) % 70) / 100);
        const b: Bld = { x, w, h, antenna: false, windows: [] };
        // jendela grid untuk layer dekat
        const cols = Math.floor(w / 12);
        const rows = Math.floor(h / 14);
        for (let c = 0; c < cols; c++) {
          for (let rw = 0; rw < rows; rw++) {
            if (((rng >> (c + rw)) & 3) !== 0) continue;
            b.windows.push({
              x: 5 + c * 12,
              y: 8 + rw * 14,
              on: ((rng >> (c * 3 + rw)) & 1) === 1,
              ph: r * 10 + c + rw,
            });
          }
        }
        if (i % 4 === 2 && h > layerH * 0.6) b.antenna = true;
        arr.push(b);
        x += w + 3 + r * 8;
        i++;
      }
      return arr;
    };

    const makeClouds = (n: number, topY: number, spread: number, sMin: number, sMax: number, vMax: number): Cloud[] => {
      const arr: Cloud[] = [];
      for (let i = 0; i < n; i++) {
        arr.push({
          x: Math.random() * (W + 200) - 100,
          y: topY + Math.random() * spread,
          s: sMin + Math.random() * (sMax - sMin),
          speed: 4 + Math.random() * vMax, // px per detik
          alpha: 0.35 + Math.random() * 0.3,
        });
      }
      return arr;
    };

    const rebuild = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      far = makeSkyline(H * 0.42, 7);
      near = makeSkyline(H * 0.58, 13);
      cloudsBack = makeClouds(Math.max(3, W / 260), 8, H * 0.22, 0.5, 0.9, 3);
      cloudsFront = makeClouds(Math.max(2, W / 380), 20, H * 0.3, 0.9, 1.5, 6);
      stars = Array.from({ length: Math.max(24, W / 24) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.7,
        ph: Math.random() * 10,
      }));
    };
    rebuild();
    const ro = new ResizeObserver(rebuild);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // parallax mengikuti kursor (normalisasi -1..1)
    const mouseNX = { v: 0 };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseNX.v = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
    };
    window.addEventListener("mousemove", onMove);

    const drawCloud = (c: Cloud, ox: number) => {
      const x = c.x + ox;
      ctx.beginPath();
      ctx.ellipse(x, c.y, 26 * c.s, 9 * c.s, 0, 0, Math.PI * 2);
      ctx.ellipse(x - 18 * c.s, c.y + 3 * c.s, 15 * c.s, 7 * c.s, 0, 0, Math.PI * 2);
      ctx.ellipse(x + 18 * c.s, c.y + 4 * c.s, 17 * c.s, 6.5 * c.s, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawSkyline = (blds: Bld[], baseY: number, ox: number, color: string, winOn: boolean, winColor: string, t: number, density: number, twinkle = false) => {
      for (const b of blds) {
        const x = b.x + ox;
        if (x + b.w < -30 || x > W + 30) continue;
        ctx.fillStyle = color;
        ctx.fillRect(x, baseY - b.h, b.w, b.h + 10);
        // puncak runcing sebagian gedung
        if (b.antenna) {
          ctx.fillRect(x + b.w / 2 - 1, baseY - b.h - 12, 2, 12);
          // lampu radar merah berkedip
          ctx.fillStyle = `rgba(255,80,80,${0.4 + 0.6 * Math.abs(Math.sin(t * 3 + b.x))})`;
          ctx.beginPath();
          ctx.arc(x + b.w / 2, baseY - b.h - 13.5, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = color;
        }
        if (!winOn) continue;
        // jendela: malam = menyala kedip-kedip; siang = kaca pantulan statis
        ctx.fillStyle = winColor;
        for (const wd of b.windows) {
          if (twinkle) {
            if (!wd.on && Math.random() > 0.0015) continue;
            if (wd.on && Math.random() < 0.0015) wd.on = false;
          }
          const mx = x + wd.x;
          const my = baseY - b.h + wd.y;
          if (mx < -10 || mx > W + 10 || my > baseY - 2) continue;
          ctx.globalAlpha = twinkle
            ? 0.75 + 0.25 * Math.sin(t * 2 + wd.ph)
            : 0.55 + 0.2 * Math.sin(wd.ph);
          ctx.fillRect(mx, my, 4.5, 6);
        }
        ctx.globalAlpha = 1;
      }
      void density;
    };

    let planeTimer = 6;
    let birdTimer = 14;
    let lastT = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      const t = now / 1000;

      // palet
      const farColor = dark ? "#20263380" : "#00000018";
      const nearColor = dark ? "#161b26" : "#323a4822";
      const farColorSolid = dark ? "#202633" : "#adb5c2";
      const nearSolid = dark ? "#151a24" : "#727d8e";
      const winColor = dark ? "rgba(250,205,100,0.95)" : "rgba(255,255,255,0.4)";
      const cloudColor = dark
        ? "rgba(190,205,230,0.16)"
        : "rgba(199,211,226,0.65)";

      ctx.clearRect(0, 0, W, H);

      // langit siang: tint biru lembut biar awan putih kelihatan di bg putih
      if (!dark) {
        const sky = ctx.createLinearGradient(0, 0, 0, H * 0.8);
        sky.addColorStop(0, "rgba(140,185,250,0.14)");
        sky.addColorStop(1, "rgba(140,185,250,0)");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H * 0.8);
      }

      // parallax per-layer (makin dekat makin besar gesernya)
      const pFar = -mouseNX.v * 5;
      const pNear = -mouseNX.v * 14;
      const pCloudB = mouseNX.v * 3;
      const pCloudF = mouseNX.v * 8;

      // ---- langit
      if (dark) {
        // bintang berkelip
        for (const st of stars) {
          ctx.globalAlpha = 0.25 + 0.55 * Math.abs(Math.sin(t * 1.6 + st.ph));
          ctx.fillStyle = "#e8ecf5";
          ctx.fillRect(st.x, st.y, 1.3, 1.3);
        }
        ctx.globalAlpha = 1;
        // bulan + halo
        const mx = W * 0.24, my = 30;
        const halo = ctx.createRadialGradient(mx, my, 6, mx, my, 46);
        halo.addColorStop(0, "rgba(240,240,220,0.20)");
        halo.addColorStop(1, "rgba(240,240,220,0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(mx, my, 46, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#e9e6d8";
        ctx.beginPath();
        ctx.arc(mx, my, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = dark ? "#0f1219" : "#fff";
        ctx.beginPath();
        ctx.arc(mx - 4, my - 3, 7.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // siang hari: matahari dengan pancaran hangat
        const sx = W * 0.24, sy = 26;
        const sunHalo = ctx.createRadialGradient(sx, sy, 8, sx, sy, 55);
        sunHalo.addColorStop(0, "rgba(255,220,140,0.35)");
        sunHalo.addColorStop(1, "rgba(255,220,140,0)");
        ctx.fillStyle = sunHalo;
        ctx.beginPath();
        ctx.arc(sx, sy, 55, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#f5c86a";
        ctx.beginPath();
        ctx.arc(sx, sy, 8.5, 0, Math.PI * 2);
        ctx.fill();
        // sinar berputar pelan
        ctx.strokeStyle = "rgba(245,200,106,0.35)";
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + t * 0.3;
          ctx.beginPath();
          ctx.moveTo(sx + Math.cos(a) * 13, sy + Math.sin(a) * 13);
          ctx.lineTo(sx + Math.cos(a) * 18, sy + Math.sin(a) * 18);
          ctx.stroke();
        }
      }

      // glow atmosfer: malam = aksen accent, siang = hangat sinar matahari
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-color")
        .trim();
      if (dark && accent) {
        const glow = ctx.createLinearGradient(0, H, 0, H * 0.4);
        glow.addColorStop(0, `rgb(${accent} / 0.10)`);
        glow.addColorStop(1, `rgb(${accent} / 0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(0, H * 0.4, W, H * 0.6);
      }

      // ---- burung
      birdTimer -= dt;
      if (birdTimer <= 0 && birds.length === 0) {
        birdTimer = 10 + Math.random() * 10;
        const bx = birdTimer % 2 < 1 ? -30 : W + 30;
        birds.push({
          x: bx,
          y: 18 + Math.random() * H * 0.3,
          vx: (bx < 0 ? 1 : -1) * (22 + Math.random() * 12),
          ph: Math.random() * 6,
          wing: 0,
        });
      }
      for (let i = birds.length - 1; i >= 0; i--) {
        const b = birds[i];
        b.x += b.vx * dt;
        b.wing = Math.sin(t * 9 + b.ph);
        ctx.strokeStyle = dark ? "rgba(220,228,240,0.55)" : "rgba(30,35,45,0.5)";
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        for (let k = 0; k < 3; k++) {
          const fx = b.x - k * 7 * Math.sign(b.vx);
          const fy = b.y + Math.sin(t * 2 + k) * 2 + k * 2;
          const flap = Math.sin(t * 9 + b.ph) * 2.4;
          ctx.beginPath();
          ctx.moveTo(fx - 3.5, fy + flap);
          ctx.quadraticCurveTo(fx, fy - 1.5, fx + 3.5, fy + flap);
          ctx.stroke();
        }
        if (b.x < -50 || b.x > W + 50) birds.splice(i, 1);
      }

      // ---- pesawat lewat sesekali
      planeTimer -= dt;
      if (!plane && planeTimer <= 0) {
        planeTimer = 18 + Math.random() * 12;
        plane = { x: -40, y: 10 + Math.random() * H * 0.25, speed: 26 + Math.random() * 14 };
      }
      if (plane) {
        plane.x += plane.speed * dt;
        const px = plane.x + pCloudB;
        ctx.fillStyle = dark ? "rgba(235,240,248,0.65)" : "rgba(60,66,80,0.5)";
        ctx.beginPath();
        ctx.ellipse(px, plane.y, 6, 1.6, -0.06, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath(); // ekor
        ctx.moveTo(px - 5, plane.y);
        ctx.lineTo(px - 8, plane.y - 2.6);
        ctx.lineTo(px - 4.5, plane.y + 0.5);
        ctx.closePath();
        ctx.fill();
        // lampu berkedip
        if (Math.sin(t * 7) > 0.3) {
          ctx.fillStyle = "rgba(255,90,90,0.9)";
          ctx.beginPath();
          ctx.arc(px + 2, plane.y - 2, 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
        if (plane.x > W + 60) plane = null;
      }

      // ---- awan belakang (lambat)
      ctx.fillStyle = cloudColor;
      for (const c of cloudsBack) {
        c.x += c.speed * dt;
        if (c.x > W + 120) c.x = -120;
        drawCloud(c, pCloudB);
      }

      // ---- skyline jauh
      drawSkyline(far, H, pFar, farColor, false, "", t, 0);
      // layer jauh versi solid tipis
      ctx.globalAlpha = 0.35;
      drawSkyline(far, H, pFar, dark ? "#232a3a" : "#b6bfca", false, "", t, 0);
      ctx.globalAlpha = 1;

      // ---- skyline dekat + jendela
      drawSkyline(near, H, pNear, nearSolid, true, winColor, t, 1, dark);

      // ---- awan depan (lebih cepat, menutupi skyline sedikit)
      ctx.fillStyle = cloudColor;
      for (const c of cloudsFront) {
        c.x += c.speed * dt;
        if (c.x > W + 140) c.x = -140;
        drawCloud(c, pCloudF);
      }

      // ---- kabut di dasar kota: bikin area teks footer tetap terbaca
      const fog = ctx.createLinearGradient(0, H, 0, H * 0.5);
      fog.addColorStop(0, dark ? "rgba(10,13,20,0.6)" : "rgba(255,255,255,0.75)");
      fog.addColorStop(0.6, dark ? "rgba(10,13,20,0.25)" : "rgba(255,255,255,0.4)");
      fog.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = fog;
      ctx.fillRect(0, H * 0.5, W, H * 0.5 + 1);

      void farColorSolid;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      darkObserver.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-48 opacity-30 dark:opacity-40"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};
