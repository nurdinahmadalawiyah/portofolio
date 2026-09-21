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
    <section className="relative flex flex-col items-center justify-center text-center py-32 min-h-[90vh] w-full max-w-5xl mx-auto px-4">
      <motion.div
        variants={heroGroup}
        initial="hidden"
        animate={isIntroReady ? "visible" : "hidden"}
        className="w-full flex flex-col items-center"
      >
        <motion.h1 variants={heroItem} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-[1.05] block">
          Hi, I&apos;m<br/>
          <span className="text-turquoise">Nurdin A. Alawiyah</span>
        </motion.h1>

        <motion.div variants={heroItem} className="mt-6 md:mt-8 min-h-[32px] md:min-h-[40px] flex items-center justify-center overflow-visible">
          <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-foreground/80 tracking-tight uppercase">
            <TypedDescription />
          </h2>
        </motion.div>

        <motion.p variants={heroItem} className="mt-6 text-base md:text-xl text-default-500 font-medium leading-[1.6] w-full max-w-2xl mx-auto">
          A <span className="text-foreground font-bold">Fullstack Developer</span> with <span className="text-turquoise font-bold">4+ years of experience</span> and a strong specialization in <span className="text-turquoise font-bold">mobile application development</span>.
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center w-full"
        variants={heroGroup}
        initial="hidden"
        animate={isIntroReady ? "visible" : "hidden"}
      >
        <motion.div variants={buttonItem}>
          <Button
            variant="solid"
            size="lg"
            className="bg-turquoise text-white dark:text-black font-extrabold px-8 h-12 rounded-full hover:bg-turquoise/80 hover:scale-105 transition-all"
            onClick={scrollToProject}
          >
            Explore Projects
          </Button>
        </motion.div>

        <motion.div variants={buttonItem}>
          <Button
            isExternal
            as={Link}
            variant="bordered"
            size="lg"
            className="bg-transparent border-2 border-foreground/20 text-foreground hover:border-foreground/60 hover:bg-foreground/5 font-bold px-8 h-12 rounded-full transition-all"
            href={siteConfig.links.cv}
            startContent={<DownloadIcon size={18} />}
          >
            Download CV
          </Button>
        </motion.div>
      </motion.div>

    </section>
  );
}
