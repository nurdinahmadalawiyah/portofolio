"use client";

import { siteConfig } from "@/config/site";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePerformanceMode } from "@/components/usePerformanceMode";

export default function AboutPage() {
  const isLowPowerMode = usePerformanceMode();

  const highlightKeywords = (text: string) => {
    const keywords = [
      "Nurdin A. Alawiyah",
      "fullstack developer",
      "mobile development", 
      "web and backend",
      "staying curious",
      "online courses",
      "side projects"
    ];
    
    let parts = [text];
    keywords.forEach(keyword => {
      let newParts: any[] = [];
      parts.forEach((part, pIndex) => {
        if (typeof part === 'string') {
          const regex = new RegExp(`(${keyword})`, 'gi');
          const split = part.split(regex);
          split.forEach((s, i) => {
            if (s.toLowerCase() === keyword.toLowerCase()) {
              newParts.push(<span key={`${keyword}-${pIndex}-${i}`} className="text-turquoise font-semibold">{s}</span>);
            } else {
              newParts.push(s);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });
    return parts;
  };

  // Helper component for Bento Cards with hover effect
  const BentoCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: isLowPowerMode ? 0.2 : 0.5, delay: isLowPowerMode ? 0 : delay }}
      className={`relative group rounded-[2.5rem] border border-black/5 dark:border-white/5 bg-white/40 dark:bg-default-100/30 overflow-hidden backdrop-blur-xl hover:border-turquoise/30 transition-all duration-500 ${className}`}
    >
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-turquoise/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10 h-full w-full p-8 md:p-10 flex flex-col">
        {children}
      </div>
    </motion.div>
  );

  return (
    <section id="about" className="relative flex flex-col items-center justify-center min-h-screen py-24 w-full max-w-6xl mx-auto px-6 overflow-hidden">
      
      {/* Giant Background Text Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 opacity-[0.04] dark:opacity-[0.08]">
        <h1 className="text-[15rem] md:text-[20rem] font-black tracking-tighter leading-none text-foreground">ABOUT</h1>
      </div>

      <div className="relative z-10 w-full mb-12 flex flex-col items-start">
        <h2 className="text-sm font-black uppercase tracking-[0.5em] text-turquoise mb-4">Get to know me</h2>
        <h3 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Not just <span className="text-turquoise italic font-serif font-light">writing code.</span>
        </h3>
      </div>

      {/* Bento Box Grid */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
        
        {/* Card 1: Hero Bio (Spans 2x2) */}
        <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between" delay={0.1}>
          <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-1 bg-turquoise rounded-full" />
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-turquoise/30 shadow-[0_0_20px_rgba(44,231,241,0.2)]">
              <Image
                src="/images/nurdin-circle-thumb.webp"
                alt="Nurdin"
                width={80}
                height={80}
                sizes="80px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-2xl font-black tracking-tight">Nurdin A. Alawiyah</h4>
            <p className="text-default-500 leading-relaxed font-medium text-lg">
              {highlightKeywords(siteConfig.about.desc)}
            </p>
          </div>
        </BentoCard>

        {/* Card 2: Highlight 1 (1x1) */}
        <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col items-center justify-center text-center" delay={0.2}>
          <span className="text-sm uppercase tracking-[0.2em] text-default-400 font-bold mb-2">
            {siteConfig.about.highlights?.[0]?.label}
          </span>
          <span className="text-4xl md:text-5xl font-black text-foreground">
            {siteConfig.about.highlights?.[0]?.value}
          </span>
        </BentoCard>

        {/* Card 3: Highlight 2 (1x1) */}
        <BentoCard className="md:col-span-1 md:row-span-1 flex flex-col items-center justify-center text-center" delay={0.3}>
          <span className="text-sm uppercase tracking-[0.2em] text-default-400 font-bold mb-2">
            {siteConfig.about.highlights?.[1]?.label}
          </span>
          <span className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
            {siteConfig.about.highlights?.[1]?.value}
          </span>
        </BentoCard>

        {/* Card 4: Highlight 3 (Spans 2x1 to fill the gap) */}
        <BentoCard className="md:col-span-2 md:row-span-1 flex flex-col items-start justify-center bg-turquoise/5 border-turquoise/20" delay={0.4}>
          <div className="flex w-full items-center justify-between">
            <div>
              <span className="text-sm uppercase tracking-[0.2em] text-turquoise font-bold mb-2 block">
                {siteConfig.about.highlights?.[2]?.label}
              </span>
              <span className="text-3xl md:text-4xl font-black text-foreground">
                {siteConfig.about.highlights?.[2]?.value}
              </span>
            </div>
            <div className="text-turquoise opacity-50">
              <span className="text-6xl font-mono font-black">&lt;/&gt;</span>
            </div>
          </div>
        </BentoCard>

        {/* Card 5: Education (Spans 4 columns) */}
        <BentoCard className="md:col-span-4" delay={0.5}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 mb-8 text-center md:text-left">
            <div className="flex items-center gap-4">
              <span className="text-sm uppercase tracking-[0.3em] text-turquoise font-black">Academic Background</span>
            </div>
            {siteConfig.about.education?.[0] && (
              <div className="px-5 py-2 rounded-full bg-turquoise/10 text-turquoise text-[10px] font-black uppercase tracking-[0.2em] border border-turquoise/20 text-center">
                {siteConfig.about.education[0].status}
              </div>
            )}
          </div>

          {siteConfig.about.education?.map((edu: any, idx: number) => (
            <div key={idx} className="flex flex-col lg:flex-row gap-8 items-center lg:items-center w-full">
              <div className="w-24 h-24 rounded-[1.5rem] bg-white dark:bg-white/5 flex items-center justify-center flex-shrink-0 p-4 border border-black/5 dark:border-white/10 group-hover:scale-105 transition-transform duration-500">
                {edu.logo ? (
                  <Image
                    src={edu.logo}
                    alt={edu.school}
                    width={96}
                    height={96}
                    sizes="96px"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 bg-turquoise rounded-full" />
                )}
              </div>
              
              <div className="flex-1 space-y-3 flex flex-col items-center lg:items-start text-center lg:text-left">
                <h4 className="text-2xl md:text-3xl font-black text-foreground tracking-tight group-hover:text-turquoise transition-colors duration-300">
                  {edu.school}
                </h4>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <span className="px-3 py-1 rounded-lg bg-turquoise/10 text-turquoise text-xs font-black uppercase tracking-widest text-center">
                    {edu.degree}
                  </span>
                  <span className="text-default-500 font-bold tracking-wider text-sm">
                    {edu.duration}
                  </span>
                </div>
                <p className="text-default-500 text-sm md:text-base leading-relaxed max-w-3xl mt-2 text-center lg:text-left">
                  {edu.desc}
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-end p-6 w-full lg:w-auto mt-4 lg:mt-0 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-default-400 font-black mb-1 text-center lg:text-right">Grade (GPA)</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-turquoise">{edu.gpa.split('/')[0]}</span>
                  <span className="text-default-400 font-bold text-sm">/ {edu.gpa.split('/')[1]}</span>
                </div>
              </div>
            </div>
          ))}
        </BentoCard>

      </div>
    </section>
  );
}
