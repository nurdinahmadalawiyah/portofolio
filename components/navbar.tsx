"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
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
    <div className="fixed top-6 left-0 right-0 z-50 mx-auto w-full max-w-6xl px-4 pointer-events-none">
      <NextUINavbar 
        maxWidth="full" 
        position="static"
        isBlurred={true}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="pointer-events-auto h-16 rounded-2xl border border-black/10 dark:border-white/10 bg-background/70 shadow-none transition-all duration-300 px-4"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-3 group"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActiveItem("#home");
                setIsMenuOpen(false);
                lenis?.scrollTo("#home", {
                  offset: -80,
                  duration: 1.5,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              }}
            >
              <Logo
                size={32}
                className="transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3 group-active:scale-95 group-hover:drop-shadow-[0_0_18px_rgba(44,231,241,0.45)]"
              />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden lg:flex gap-4" justify="center">
          <div className="flex items-center gap-1 rounded-full border border-black/10 bg-black/[0.03] p-1 shadow-inner shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
            {siteConfig.navItems.map((item) => {
              const isActive = activeItem === item.href;
              return (
                <NavbarItem key={item.href} className="relative">
                  <NextLink
                    className={`group relative flex h-9 min-w-20 items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors duration-300 ${
                      isActive ? "text-white" : "text-default-500 hover:text-turquoise"
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
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-turquoise shadow-[0_0_22px_rgb(var(--accent-color)/0.42)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {!isActive && (
                      <span className="absolute inset-0 rounded-full bg-turquoise/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </NextLink>
                </NavbarItem>
              );
            })}
          </div>
        </NavbarContent>

        <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="hidden lg:flex gap-4 items-center">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="lg:hidden basis-1" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle 
            className="text-default-500 w-10 h-10" 
          />
        </NavbarContent>

      </NextUINavbar>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className="fixed top-24 left-4 right-4 w-auto p-6 rounded-2xl bg-background/70 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-none ring-1 ring-black/5 dark:ring-white/10 z-[100] lg:hidden flex flex-col gap-6 isolate"
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
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
};
