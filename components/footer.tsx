"use client";

import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedInIcon, WhatsAppIcon, MailIcon, InstagramIcon } from "@/components/icons";
import { Divider } from "@nextui-org/divider";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-16 pb-10 px-6 relative overflow-hidden mt-20">
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start gap-4 max-w-sm">
            <h3 className="text-xl font-bold text-turquoise tracking-tight">
              {siteConfig.name}
            </h3>
            <p className="text-default-500 text-sm text-center md:text-left leading-relaxed">
              Fullstack Developer based in {siteConfig.contact.location}, Indonesia.
            </p>
          </div>

          {/* Social Connect */}
          <div className="flex flex-col items-center md:items-end gap-5">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-default-400">Connect</h4>
            <div className="flex items-center gap-6">
              <Link isExternal href={siteConfig.contact.github} className="text-default-400 hover:text-turquoise transition-all hover:-translate-y-1">
                <GithubIcon size={24} />
              </Link>
              <Link isExternal href={siteConfig.contact.linkedin} className="text-default-400 hover:text-turquoise transition-all hover:-translate-y-1">
                <LinkedInIcon size={24} />
              </Link>
              <Link isExternal href={siteConfig.contact.instagram} className="text-default-400 hover:text-turquoise transition-all hover:-translate-y-1">
                <InstagramIcon size={24} />
              </Link>
              <Link isExternal href={siteConfig.contact.whatsapp} className="text-default-400 hover:text-turquoise transition-all hover:-translate-y-1">
                <WhatsAppIcon size={24} />
              </Link>
              <Link isExternal href={`mailto:${siteConfig.contact.email}`} className="text-default-400 hover:text-turquoise transition-all hover:-translate-y-1">
                <MailIcon size={24} />
              </Link>
            </div>
          </div>
        </div>

        <Divider className="opacity-5" />

        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-default-400 font-medium">
          <p>© {currentYear} ALL RIGHTS RESERVED</p>
          <p>DESIGNED BY {siteConfig.name}</p>
        </div>
      </div>
      
      {/* Subtle Glow */}
      <div className="absolute -bottom-24 right-0 w-64 h-64 bg-turquoise/5 rounded-full blur-[100px] pointer-events-none" />
    </footer>
  );
};
