"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { motion, Variants } from "framer-motion";
import TypedDescription from "@/components/typedDescription";
import { DownloadIcon } from "@/components/icons";
import { useLenis } from "lenis/react";
import { useIntroReady } from "@/components/useIntroReady";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const heroGroup: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 54, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

const buttonItem: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export default function HomePage() {
  const lenis = useLenis();
  const isIntroReady = useIntroReady();

  const scrollToProject = () => {
    const projectHeading = document.getElementById("project");
    const targetTop = projectHeading
      ? projectHeading.getBoundingClientRect().top + window.scrollY - 160
      : 0;

    if (!lenis) {
      window.scrollTo({ top: targetTop, behavior: "smooth" });
      return;
    }

    lenis.scrollTo(targetTop, {
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-[50%_50%] gap-12 py-20 min-h-[90vh] items-center w-full max-w-6xl mx-auto">
      <div className="w-full text-center lg:text-start z-10 overflow-visible">
        <motion.div
          variants={heroGroup}
          initial="hidden"
          animate={isIntroReady ? "visible" : "hidden"}
        >
          <motion.h1 variants={heroItem} className={`${title({ size: "sm" })} leading-[1.2] block`}>
            Hi, I&apos;m <span className={title({ color: "turqoise", size: "md" })}>Nurdin A. Alawiyah</span>
          </motion.h1>

          <motion.div variants={heroItem} className="mt-4 md:mt-5 min-h-[32px] md:min-h-[40px] flex items-center justify-center lg:justify-start overflow-visible">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80 tracking-tight">
              <TypedDescription />
            </h2>
          </motion.div>

          <motion.p variants={heroItem} className="mt-4 md:mt-5 text-base md:text-lg text-default-500 leading-[1.8] w-full max-w-lg lg:max-w-none">
            A{" "}
            <span className="text-foreground font-semibold">fullstack developer</span>{" "}
            with a strong passion for{" "}
            <span className="text-turquoise font-semibold">mobile development</span>.
            I love turning ideas into real products and I&apos;m always excited to{" "}
            <span className="text-turquoise font-semibold">learn new technologies</span>{" "}
            along the way.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col gap-8 items-center lg:items-start"
          variants={heroGroup}
          initial="hidden"
          animate={isIntroReady ? "visible" : "hidden"}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.div variants={buttonItem}>
              <Button
                variant="solid"
                size="lg"
                className="bg-foreground text-background font-medium px-8 h-12 rounded-full hover:scale-105 transition-transform"
                onClick={scrollToProject}
              >
                Explore Project
              </Button>
            </motion.div>

            <motion.div variants={buttonItem}>
              <Button
                isExternal
                as={Link}
                variant="bordered"
                size="lg"
                className="bg-transparent border border-foreground/20 text-foreground hover:bg-foreground/5 font-medium px-8 h-12 rounded-full transition-colors"
                href={siteConfig.links.cv}
                startContent={<DownloadIcon size={18} />}
              >
                Download CV
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center lg:justify-end z-10 w-full overflow-visible">
        <motion.div
          className="relative lg:block overflow-visible"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
          animate={isIntroReady ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(4px)" }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
        >
          <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] z-10 mx-auto">
            <motion.img
              alt="Nurdin A. Alawiyah"
              className="absolute inset-0 object-cover rounded-3xl border border-foreground/10 shadow-sm w-full h-full"
              src="/images/nurdin1-new.jpeg"
            />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
