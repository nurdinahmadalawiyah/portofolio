"use client";
import { Card, CardBody } from "@heroui/card";
import { siteConfig } from "@/config/site";
import { useT } from "@/i18n/context";
import { 
  GithubIcon, 
  LinkedInIcon, 
  InstagramIcon, 
  WhatsAppIcon, 
  MailIcon, 
  MapPinIcon 
} from "@/components/icons";
import { motion, Variants } from "framer-motion";

const entrance = {
  hidden: { opacity: 0, y: 58, scale: 0.96, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ContactPage() {
  const t = useT();
  const emailHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(t.contact.emailSubject)}&body=${t.contact.emailBody}`;
  const whatsappHref = `${siteConfig.contact.whatsapp}?text=${encodeURIComponent(t.contact.whatsappText)}`;

  const contactItems = [
    {
      icon: <WhatsAppIcon size={24} />,
      label: t.contact.labels.whatsapp,
      value: siteConfig.contact.whatsapp.split("/").pop(),
      href: siteConfig.contact.whatsapp,
    },
    {
      icon: <LinkedInIcon size={24} />,
      label: t.contact.labels.linkedin,
      value: siteConfig.contact.linkedinName,
      href: siteConfig.contact.linkedin,
    },
    {
      icon: <InstagramIcon size={24} />,
      label: t.contact.labels.instagram,
      value: "@nurdin_ahmad_alawiyah",
      href: siteConfig.contact.instagram,
    },
    {
      icon: <GithubIcon size={24} />,
      label: t.contact.labels.github,
      value: "nurdinahmadalawiyah",
      href: siteConfig.contact.github,
    },
    {
      icon: <MapPinIcon size={24} />,
      label: t.contact.labels.location,
      value: siteConfig.contact.location,
      href: siteConfig.contact.maps,
    },
    {
      icon: <MailIcon size={24} />,
      label: t.contact.labels.email,
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -46, scale: 0.96, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center gap-12 py-16 md:py-24 w-full max-w-6xl mx-auto px-6 overflow-hidden">
      {/* Giant Background Text Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 opacity-[0.04] dark:opacity-[0.08]">
        <h1 className="text-[12rem] md:text-[20rem] font-black tracking-tighter leading-none text-foreground whitespace-nowrap">{t.contact.watermark}</h1>
      </div>

      <motion.div
        id="contact"
        variants={entrance}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 w-full mb-4 flex flex-col items-start"
      >
        <h2 className="text-sm font-black uppercase tracking-[0.5em] text-turquoise mb-4">{t.contact.eyebrow}</h2>
        <h3 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          {t.contact.titleLead}<span className="text-turquoise italic font-serif font-light">{t.contact.titleAccent}</span>
        </h3>
      </motion.div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        {/* Social Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {contactItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="flex items-center gap-4 p-5 rounded-[2rem] border border-black/10 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md hover:border-turquoise/50 transition-all duration-300 group overflow-clip shadow-none"
            >
              <div className={`p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 group-hover:border-turquoise/30 transition-colors flex-shrink-0`}>
                {item.icon}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[10px] uppercase tracking-widest text-default-500 dark:text-default-400 font-bold truncate">{item.label}</span>
                <span className="text-sm font-semibold text-foreground group-hover:text-turquoise transition-colors truncate" title={item.value}>
                  {item.value}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Direct Contact Section */}
        <motion.div
          initial={{ opacity: 0, x: 54, scale: 0.96, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="w-full"
        >
          <div className="rounded-[2rem] border border-black/10 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md shadow-none transition-all duration-300">
            <div className="p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest text-turquoise font-black ml-1">{t.contact.directMessage}</span>
                <h4 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                  {t.contact.reachOut}
                </h4>
                <p className="text-sm text-default-600 dark:text-default-400 leading-relaxed mt-1">
                  {t.contact.reachOutDesc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-black/10 dark:border-white/10 bg-white/60 dark:bg-default-100/40 text-foreground">
                  {t.contact.fastReply}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-black/10 dark:border-white/10 bg-white/60 dark:bg-default-100/40 text-foreground">
                  {t.contact.openToCollaboration}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <motion.a
                  href={emailHref}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-turquoise text-white dark:text-black font-black uppercase tracking-widest py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs"
                >
                  <MailIcon size={18} />
                  {t.contact.emailMe}
                </motion.a>
                <motion.a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white/60 dark:bg-default-100/40 border border-black/10 dark:border-white/10 font-black uppercase tracking-widest py-4 rounded-xl hover:border-turquoise/50 transition-all duration-300 flex items-center justify-center gap-2 text-xs text-foreground"
                >
                  <WhatsAppIcon size={18} />
                  {t.contact.whatsappCta}
                </motion.a>
              </div>

              <motion.a
                href={`/${siteConfig.links.cv}`}
                download
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white/60 dark:bg-default-100/40 border border-black/10 dark:border-white/10 font-black uppercase tracking-widest py-4 rounded-xl hover:border-turquoise/50 transition-all duration-300 flex items-center justify-center text-xs text-foreground"
              >
                {t.contact.downloadCv}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
