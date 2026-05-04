"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo, DownloadIcon } from "@/components/icons";

export const Navbar = () => {
  const [activeItem, setActiveItem] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      // Simple Scroll Spy
      const sections = siteConfig.navItems.map(item => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveItem(`#${section}`);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <NextUINavbar 
        maxWidth="xl" 
        position="static"
        className="pointer-events-auto h-16 rounded-2xl border bg-background/60 backdrop-blur-md border-white/10 shadow-lg w-full max-w-[1200px] transition-all duration-300"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-3 group" href="/">
              <Logo size={32} />
              <p className="font-bold text-inherit hidden sm:block group-hover:text-turquoise transition-colors text-lg">
                <span className="text-turquoise">N</span>urdin <span className="hidden lg:inline">A. Alawiyah</span>
              </p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden lg:flex gap-4" justify="center">
          <div className="flex gap-8 px-6 py-2">
            {siteConfig.navItems.map((item) => {
              const isActive = activeItem === item.href;
              return (
                <NavbarItem key={item.href} className="relative">
                  <NextLink
                    className={`text-sm font-semibold transition-all duration-300 relative py-1 ${
                      isActive ? "text-turquoise" : "text-default-500 hover:text-turquoise/80"
                    }`}
                    href={item.href}
                    onClick={() => setActiveItem(item.href)}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[3px] bg-turquoise rounded-full shadow-[0_0_15px_rgba(76,242,226,0.6)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </NextLink>
                </NavbarItem>
              );
            })}
          </div>
        </NavbarContent>

        <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="hidden sm:flex gap-4 items-center">
            <ThemeSwitch />
            <Button
              isExternal
              as={Link}
              className="text-sm font-bold text-white dark:text-black bg-turquoise shadow-lg shadow-turquoise/20 px-6 h-10 rounded-xl"
              href={siteConfig.links.cv}
              startContent={<DownloadIcon size={20} />}
              variant="flat"
            >
              Download CV
            </Button>
          </NavbarItem>
          
          <NavbarContent className="lg:hidden flex items-center gap-2">
            <ThemeSwitch />
            <NavbarMenuToggle className="text-default-500 w-10 h-10" />
          </NavbarContent>
        </NavbarContent>

        <NavbarMenu className="mt-4 rounded-3xl bg-background/95 backdrop-blur-xl border border-white/10 p-6 shadow-2xl overflow-hidden">
          <div className="flex flex-col gap-4">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className={`w-full text-lg py-2 ${
                    activeItem === item.href ? "text-turquoise font-bold" : "text-default-600"
                  }`}
                  href={item.href}
                  size="lg"
                  onClick={() => setActiveItem(item.href)}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
            <Button
              isExternal
              as={Link}
              className="mt-4 w-full bg-turquoise text-white dark:text-black font-bold h-12 rounded-2xl"
              href={siteConfig.links.cv}
              startContent={<DownloadIcon />}
            >
              Download CV
            </Button>
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </div>
  );
};
