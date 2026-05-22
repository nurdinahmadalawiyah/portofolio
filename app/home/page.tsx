"use client";

import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import TypedDescription from "@/components/typedDescription";
import { DownloadIcon } from "@/components/icons";
import { useLenis } from "lenis/react";

export default function HomePage() {
  const controls = useAnimation();
  const lenis = useLenis();

  useEffect(() => {
    controls.start({ x: 0 });
  }, [controls]);

  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-[50%_50%] gap-12 py-20 min-h-[90vh] items-center w-full max-w-6xl mx-auto">


      <div className="w-full text-center lg:text-start z-10 overflow-visible">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`${title({ size: "sm" })} leading-[1.2] block`}>
            Hi, I&apos;m <span className={title({ color: "turqoise", size: "md" })}>Nurdin A. Alawiyah</span>
          </h1>
          <div className="mt-4 md:mt-5 min-h-[32px] md:min-h-[40px] flex items-center justify-center lg:justify-start overflow-visible">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80 tracking-tight">
              <TypedDescription />
            </h2>
          </div>
          <p className="mt-4 md:mt-5 text-base md:text-lg text-default-500 leading-[1.8] w-full max-w-lg lg:max-w-none">
            A{" "}
            <span className="text-foreground font-semibold">fullstack developer</span>{" "}
            with a strong passion for{" "}
            <span className="text-turquoise font-semibold">mobile development</span>.
            I love turning ideas into real products and I&apos;m always excited to{" "}
            <span className="text-turquoise font-semibold">learn new technologies</span>{" "}
            along the way.
          </p>
        </motion.div>

        <motion.div 
          className="mt-10 flex flex-col gap-8 items-center lg:items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              variant="shadow"
              size="lg"
              className="bg-turquoise text-white dark:text-black shadow-lg shadow-turquoise/20 font-bold px-8 h-14"
              onClick={() => {
                lenis?.scrollTo("#project", {
                  offset: -80,
                  duration: 1.5,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
              }}
            >
              Explore Project →
            </Button>

            <Button
              isExternal
              as={Link}
              size="lg"
              className="bg-turquoise/10 border border-turquoise/50 hover:border-turquoise hover:bg-turquoise/20 text-turquoise shadow-[0_0_20px_rgba(44,231,241,0.15)] hover:shadow-[0_0_30px_rgba(44,231,241,0.3)] font-bold px-8 h-14 transition-all duration-300"
              href={siteConfig.links.cv}
              startContent={<DownloadIcon size={20} />}
            >
              Download CV
            </Button>
          </div>

        </motion.div>
      </div>

      <div className="flex justify-center lg:justify-end z-10 w-full overflow-visible">
        <motion.div
          className="relative lg:block overflow-visible"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Dual-tone Glow Effect (Turquoise + Deep Cyan) */}
          <div className="absolute -inset-6 bg-turquoise/20 rounded-full blur-3xl group-hover:bg-turquoise/40 transition-all duration-500 animate-pulse" />
          <div className="absolute -inset-12 bg-cyan-600/20 rounded-full blur-[120px] group-hover:bg-cyan-600/30 transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-tr from-turquoise/20 to-cyan-600/20 rounded-2xl blur-xl transition-all duration-500" />

          <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] z-10 mx-auto">
            {/* Morphing Blob Image */}
            <motion.img
              alt="Nurdin A. Alawiyah"
              className="absolute inset-0 object-cover shadow-[0_0_40px_rgba(44,231,241,0.2)] border-[3px] border-turquoise/40 w-full h-full"
              src="/images/nurdin1-new.jpeg"
              animate={{ 
                borderRadius: [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "30% 60% 70% 40% / 50% 60% 30% 60%",
                  "60% 40% 30% 70% / 60% 30% 70% 40%"
                ],
                y: [0, -10, 0]
              }}
              transition={{
                borderRadius: { repeat: Infinity, duration: 8, ease: "easeInOut" },
                y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
              }}
            />

            {/* Chat Balloon 1: Top Right */}
            <motion.div
              className="absolute -top-4 -right-4 md:-right-12 bg-background/80 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl rounded-bl-sm px-4 py-2 flex items-center gap-2 z-20"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
            >
              <span className="text-xl">👋</span>
              <span className="text-sm font-bold">Hi there!</span>
            </motion.div>

            {/* Chat Balloon 2: Bottom Left */}
            <motion.div
              className="absolute bottom-12 -left-6 md:-left-16 bg-turquoise/10 backdrop-blur-md border border-turquoise/30 shadow-[0_0_20px_rgba(44,231,241,0.15)] rounded-2xl rounded-tr-sm px-4 py-2 flex items-center gap-2 z-20"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              <span className="text-turquoise text-sm font-mono font-bold">&lt;/&gt;</span>
              <span className="text-sm font-semibold text-foreground/90">ships clean code</span>
            </motion.div>

            {/* Chat Balloon 3: Bottom Right */}
            <motion.div
              className="absolute -bottom-6 right-4 md:-right-2 bg-background/80 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl rounded-tl-sm px-4 py-2 flex items-center gap-2 z-20"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.2 }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-default-500">open for work</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-default-400 font-bold">Scroll</span>
        <motion.div 
          className="w-[2px] h-10 bg-gradient-to-b from-turquoise to-transparent rounded-full"
          animate={{ height: [20, 40, 20], opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
