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
import { useLenis } from "lenis/react";
import { AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [activeItem, setActiveItem] = useState("#home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenis = useLenis();

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
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl pointer-events-none">
      <NextUINavbar 
        maxWidth="full" 
        position="static"
        isBlurred={true}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="pointer-events-auto h-16 rounded-2xl border border-white/10 bg-background/70 shadow-lg transition-all duration-300 px-4"
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
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveItem(item.href);
                      lenis?.scrollTo(item.href, {
                        offset: -80,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                      });
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[3px] bg-turquoise rounded-full shadow-[0_0_15px_rgb(var(--accent-color)/0.6)]"
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
          <NavbarItem className="hidden lg:flex gap-4 items-center">
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
        </NavbarContent>

        <NavbarContent className="lg:hidden basis-1" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle 
            className="text-default-500 w-10 h-10" 
          />
        </NavbarContent>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-24 right-4 w-[280px] p-6 rounded-[2.5rem] bg-background/90 backdrop-blur-[64px] backdrop-saturate-150 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[100] lg:hidden flex flex-col gap-6"
              style={{ pointerEvents: "auto" }}
            >
              <div className="flex flex-col gap-3">
                {siteConfig.navMenuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      className={`w-full text-lg py-2 flex items-center justify-between group ${
                        activeItem === item.href ? "text-turquoise font-black" : "text-default-600 font-bold"
                      }`}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveItem(item.href);
                        setIsMenuOpen(false);
                        lenis?.scrollTo(item.href, {
                          offset: -80,
                          duration: 1.5
                        });
                      }}
                    >
                      <span>{item.label}</span>
                      {activeItem === item.href && (
                        <motion.div 
                          layoutId="active-dot"
                          className="w-2 h-2 rounded-full bg-turquoise shadow-[0_0_10px_rgb(var(--accent-color))]" 
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="h-px bg-white/10 w-full" />
              
              <Button
                isExternal
                as={Link}
                className="w-full bg-turquoise text-white dark:text-black font-black h-14 rounded-2xl shadow-lg shadow-turquoise/20"
                href={siteConfig.links.cv}
                startContent={<DownloadIcon size={22} />}
                onClick={() => setIsMenuOpen(false)}
              >
                Download CV
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </NextUINavbar>
    </div>
  );
};
