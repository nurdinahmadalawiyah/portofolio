"use client";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { motion, useAnimation } from "framer-motion"; 
import { useEffect } from "react";

export default function HomePage() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ x: 0 });
  }, [controls]);

  return (
    <>
      <div className="max-w-lg text-center md:text-start">
        <h2 className={subtitle()}>Hi, my name is Nurdin</h2>
        <h1 className={title({ color: "turqoise", size: "xl" })}>
          I&rsquo;m a Fullstack Developer
        </h1>
        <br />
        <h2 className={subtitle({ class: "mt-8" })}>
          I&rsquo;m passionate about creating innovative and user-friendly web
          applications, and my enthusiasm extends to crafting intuitive and
          seamless mobile applications as well. I believe in delivering
          exceptional digital experiences across all platforms.
        </h2>
        <div className="mt-8">
          <Link isExternal as={NextLink} href={siteConfig.links.docs}>
            <Button
              variant="shadow"
              size="lg"
              className="bg-turquoise dark:text-black light:text-white shadow-lg font-bold"
            >
              Explore Project →
            </Button>
          </Link>
        </div>
      </div>
      <motion.img
        alt="Nurdin A. Alawiyah"
        className="object-cover rounded-xl hidden md:block"
        src="/images/nurdin1.png"
        width={450}
        whileHover={{ scale: 1.1 }}
        animate={{ y: [10, -10, 10] }} // Animasi bergerak atas-bawah
        transition={{
          y: {
            repeat: Infinity, // Mengulangi animasi secara tak terbatas
            duration: 4, // Durasi per putaran animasi
            ease: "linear", // Jenis animasi (dalam hal ini, linear)
          },
        }}
      />
    </>
  );
}
