"use client";

import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import TypedDescription from "@/components/typedDescription";
import { GithubIcon, LinkedInIcon, WhatsAppIcon, MailIcon } from "@/components/icons";
import { useLenis } from "lenis/react";

export default function HomePage() {
  const controls = useAnimation();
  const lenis = useLenis();

  useEffect(() => {
    controls.start({ x: 0 });
  }, [controls]);

  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-[50%_50%] gap-12 py-20 min-h-[90vh] items-center w-full max-w-6xl mx-auto">
      {/* Background Glow Container (Handles overflow for glows only) */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-turquoise/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-turquoise/10 rounded-full blur-[150px]" />
      </div>

      <div className="w-full text-center lg:text-start z-10 overflow-visible">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={subtitle({ class: "text-turquoise font-medium mb-2" })}>
            {siteConfig.home.greatings}
          </h2>
          <div className="min-h-[160px] md:min-h-[140px] flex items-center justify-center lg:justify-start overflow-visible py-2">
            <h1 className={`${title({ color: "turqoise", size: "xl" })} leading-[1.2] pb-2`}>
              <TypedDescription />
            </h1>
          </div>
          <p className="mt-6 text-lg text-default-600 leading-relaxed w-full">
            {siteConfig.home.description}
          </p>
        </motion.div>

        <motion.div 
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
          
          <div className="flex items-center gap-5 px-4 mt-4 sm:mt-0">
            <Link isExternal href={siteConfig.contact.github} className="text-default-400 hover:text-turquoise transition-colors">
              <GithubIcon size={24} />
            </Link>
            <Link isExternal href={siteConfig.contact.linkedin} className="text-default-400 hover:text-turquoise transition-colors">
              <LinkedInIcon size={24} />
            </Link>
            <Link isExternal href={siteConfig.contact.whatsapp} className="text-default-400 hover:text-turquoise transition-colors">
              <WhatsAppIcon size={24} />
            </Link>
            <Link isExternal href={`mailto:${siteConfig.contact.email}`} className="text-default-400 hover:text-turquoise transition-colors">
              <MailIcon size={24} />
            </Link>
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

          <motion.img
            alt="Nurdin A. Alawiyah"
            className="relative object-cover rounded-2xl shadow-[0_0_50px_rgba(8,145,178,0.3)] z-10 border-4 border-white/10 w-full max-w-[420px] h-auto backdrop-brightness-110"
            src="/images/nurdin1-new.jpeg"
            whileHover={{ scale: 1.05, rotate: 2 }}
            animate={{ y: [15, -15, 15] }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
              },
              scale: { duration: 0.3 },
              rotate: { duration: 0.3 }
            }}
          />
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
