"use client";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function HomePage() {
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
      <Image
        alt="Nurdin A. Alawiyah"
        className="object-cover rounded-xl hidden md:block"
        src="/images/nurdin1.png"
        width={450}
      />
    </>
  );
}
