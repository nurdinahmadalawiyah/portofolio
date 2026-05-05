"use client";

import { title, subtitle } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { motion } from "framer-motion";

export default function ExperiencePage() {
  const [tabSize, setTabSize] = useState<"lg" | "sm" | "md" | undefined>("lg");
  const [activeCompany, setActiveCompany] = useState<string>("Padepokan Tujuh Sembilan");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 640) {
        setTabSize("sm");
      } else {
        setTabSize("lg");
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const calculateDuration = (dateString: string) => {
    try {
      const [start, end] = dateString.split(" - ");
      if (!end || end.toLowerCase() !== "present") return null;

      const startDate = new Date(start);
      const endDate = new Date();

      let years = endDate.getFullYear() - startDate.getFullYear();
      let months = endDate.getMonth() - startDate.getMonth();

      if (months < 0) {
        years--;
        months += 12;
      }

      // Include the current month
      months++;
      if (months >= 12) {
        years++;
        months -= 12;
      }

      let result = [];
      if (years > 0) result.push(`${years} Year${years > 1 ? "s" : ""}`);
      if (months > 0) result.push(`${months} Month${months > 1 ? "s" : ""}`);

      return result.join(" ");
    } catch (e) {
      return null;
    }
  };

  return (
    <section id="experience" className="flex flex-col items-center justify-center gap-8 py-12 md:py-16">
      <motion.div 
        className="max-w-2xl text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={title({ color: "turqoise", size: "sm" })}>
          Work Experience
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          A Journey Through Professional Growth and Achievements
        </h2>
      </motion.div>

      <motion.div 
        className="flex w-full flex-col gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {tabSize === "sm" ? (
          <div className="w-full">
            <div className="flex flex-col gap-4">
              {siteConfig.work.map((item, index) => (
                <div key={item.company} className="flex flex-col gap-4">
                  {/* Company Header / Trigger */}
                  <button 
                    onClick={() => setActiveCompany(activeCompany === item.company ? "" : item.company)}
                    className={`flex items-center gap-4 p-4 rounded-2xl w-full border transition-all duration-300 backdrop-blur-md ${
                      activeCompany === item.company 
                        ? "bg-turquoise/10 border-turquoise/30 shadow-none" 
                        : "bg-white/50 dark:bg-default-100/30 border-black/10 dark:border-white/10 hover:bg-white/5"
                    } shadow-none`}
                  >
                    <Avatar 
                      src={item.image} 
                      className="w-10 h-10 border border-white/10 flex-shrink-0" 
                      radius="md"
                    />
                    <div className="flex flex-col items-start text-left flex-1">
                      <span className={`font-bold text-sm ${activeCompany === item.company ? "text-turquoise" : "text-foreground"}`}>
                        {item.company}
                      </span>
                      <p className="text-default-500 text-[10px] font-medium">
                        {item.alamat}
                      </p>
                    </div>
                    <div className={`transition-transform duration-300 ${activeCompany === item.company ? "rotate-180" : ""}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="rgb(var(--accent-color))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>

                  {/* Expanding Content */}
                  {activeCompany === item.company && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <Card className="border border-black/10 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md mb-4 shadow-none">
                        <CardBody className="p-6">
                          <div className="flex flex-col relative">
                            {item.experience.map((experience, idx) => (
                              <div key={`${item.company}-${idx}`} className="relative pl-12 pb-10 last:pb-0">
                                {/* Vertical Line */}
                                {idx < item.experience.length - 1 && (
                                  <div className="absolute left-[15px] top-4 bottom-0 w-[2px] bg-turquoise/20" />
                                )}
                                {/* Timeline Dot */}
                                <div className="absolute left-[16px] top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-turquoise shadow-[0_0_10px_rgb(var(--accent-color)/0.6)] z-10 border-2 border-background" />

                                <div className="flex flex-col">
                                  <h4 className="text-lg font-bold text-foreground/90 leading-tight">
                                    {experience.position}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="px-2 py-0.5 rounded-full bg-turquoise/10 text-turquoise text-[9px] font-bold uppercase tracking-wider">
                                      {experience.type}
                                    </span>
                                  </div>
                                  <p className="text-default-500 text-xs mt-3 font-medium">
                                    {experience.date}
                                  </p>
                                  {(experience.duration || calculateDuration(experience.date)) && (
                                    <p className="text-turquoise/60 text-[10px] mt-1 font-bold">
                                      {experience.duration || calculateDuration(experience.date)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex w-full gap-10 items-start">
            {/* Sidebar Master (Kiri) */}
            <div className="flex flex-col gap-4 w-[350px] flex-shrink-0 sticky top-24">
              {siteConfig.work.map((item) => (
                <button 
                  key={item.company}
                  onClick={() => setActiveCompany(item.company)}
                  className={`flex items-center gap-5 p-5 rounded-3xl w-full border transition-all duration-500 text-left group relative overflow-hidden ${
                    activeCompany === item.company 
                      ? "bg-turquoise/10 border-turquoise/30 shadow-none scale-[1.02]" 
                      : "bg-white/50 dark:bg-default-100/30 border-black/10 dark:border-white/10 hover:bg-white/[0.05] hover:translate-x-2"
                  }`}
                >
                  {/* Active Indicator Line */}
                  {activeCompany === item.company && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-turquoise shadow-[0_0_15px_rgb(var(--accent-color)/0.8)]"
                    />
                  )}
                  
                  <Avatar 
                    src={item.image} 
                    className={`w-14 h-14 border transition-all duration-500 shadow-xl ${
                      activeCompany === item.company ? "border-turquoise/50 scale-110" : "border-white/10"
                    }`} 
                    radius="lg"
                  />
                  <div className="flex flex-col flex-1">
                    <span className={`font-black text-lg tracking-tight transition-colors duration-300 ${
                      activeCompany === item.company ? "text-turquoise" : "text-foreground"
                    }`}>
                      {item.company}
                    </span>
                    <span className="text-default-500 text-xs font-medium uppercase tracking-widest mt-1">
                      {item.alamat.split(',')[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Detail Content (Kanan) */}
            <div className="flex-1 min-h-[600px]">
              {siteConfig.work.map((item) => (
                activeCompany === item.company && (
                  <motion.div
                    key={item.company}
                    initial={{ opacity: 0, x: 30, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full"
                  >
                    <Card className="border border-black/10 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md shadow-none overflow-visible transition-all duration-300">
                      <CardBody className="p-12">
                        {/* Company Header Detail - Aligned with Timeline */}
                        <div className="flex gap-8 items-center mb-16 relative">
                          <div className="absolute -left-12 -top-12 w-48 h-48 bg-turquoise/5 rounded-full blur-3xl" />
                          
                          <Avatar 
                            size="lg" 
                            radius="lg" 
                            src={item.image} 
                            className="w-20 h-20 shadow-2xl border-2 border-white/10 flex-shrink-0 z-10"
                          />
                          
                          <div className="flex flex-col gap-2 z-10">
                            <h1 className="text-5xl font-black text-foreground tracking-tighter leading-none">
                              {item.company}
                            </h1>
                            <div className="flex items-center gap-3">
                              <span className="h-px w-8 bg-turquoise/50" />
                              <p className="text-turquoise font-bold uppercase tracking-[0.2em] text-xs">
                                {item.alamat}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Custom Timeline Desktop */}
                        <div className="flex flex-col relative">
                          {item.experience.map((experience, index) => (
                            <div key={`${item.company}-${index}`} className="relative pl-[112px] pb-10 last:pb-0 group/exp">
                              {/* Vertical Line */}
                              {index < item.experience.length - 1 && (
                                <div className="absolute left-[39px] top-8 bottom-0 w-[2px] bg-white/5 overflow-hidden">
                                  <motion.div 
                                    initial={{ y: "-100%" }}
                                    animate={{ y: "0%" }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    className="w-full h-full bg-gradient-to-b from-turquoise to-transparent opacity-20"
                                  />
                                </div>
                              )}
                              
                              {/* Timeline Dot with Multi-layered Glow */}
                              <div className="absolute left-[40px] top-3 -translate-x-1/2 z-10">
                                <div className="w-4 h-4 rounded-full bg-turquoise shadow-[0_0_20px_rgb(var(--accent-color)/0.8)] border-4 border-background group-hover/exp:scale-125 transition-transform duration-300" />
                                <div className="absolute inset-0 w-4 h-4 rounded-full bg-turquoise animate-ping opacity-20" />
                              </div>

                              <div className="flex flex-col transition-transform duration-300 group-hover/exp:translate-x-2">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="text-3xl font-black text-foreground tracking-tight">
                                    {experience.position}
                                  </h4>
                                  <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-turquoise text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                                    {experience.type}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-4 text-default-400">
                                  <p className="text-sm font-bold tracking-wide">
                                    {experience.date}
                                  </p>
                                  {(experience.duration || calculateDuration(experience.date)) && (
                                    <>
                                      <div className="w-1.5 h-1.5 rounded-full bg-turquoise/40" />
                                      <p className="text-turquoise/80 text-sm font-black">
                                        {experience.duration || calculateDuration(experience.date)}
                                      </p>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                )
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
