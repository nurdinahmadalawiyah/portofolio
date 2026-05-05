"use client";

import { title, subtitle } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  const highlightKeywords = (text: string) => {
    const keywords = [
      "programming", 
      "web and mobile application development", 
      "online courses", 
      "Nurdin A. Alawiyah",
      "Informatics Engineering"
    ];
    
    let parts = [text];
    keywords.forEach(keyword => {
      let newParts: any[] = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
          const regex = new RegExp(`(${keyword})`, 'gi');
          const split = part.split(regex);
          split.forEach((s, i) => {
            if (s.toLowerCase() === keyword.toLowerCase()) {
              newParts.push(<span key={i} className="text-turquoise font-semibold">{s}</span>);
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

  return (
    <section id="about" className="flex flex-col items-center justify-center gap-12 py-16 md:py-24 max-w-5xl mx-auto px-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className={title({ color: "turqoise", size: "sm" })}>About Me</h1>
        <h2 className={subtitle({ class: "mt-4" })}>Get to know Nurdin in brief</h2>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <Card
          isBlurred
          className="border border-black/10 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md overflow-hidden"
          shadow="none"
        >
          <CardBody className="p-8 md:p-16">
            <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-stretch">
              {/* Profile Image with Glow */}
              <div className="relative group flex-shrink-0 lg:w-[320px]">
                {/* Subtle Ambient Glow */}
                <div className="absolute -inset-2 bg-turquoise/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className="relative z-10 rounded-3xl overflow-hidden border-2 border-turquoise/20 h-full">
                  <Image
                    isBlurred
                    src="images/nurdin-circle-new.jpg"
                    alt="Nurdin A. Alawiyah"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between flex-1 py-2">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-1 bg-turquoise rounded-full" />
                    <span className="text-xs uppercase tracking-[0.3em] text-turquoise font-black">Biography</span>
                  </div>
                  <p className="text-lg md:text-xl text-default-600 leading-[1.8] text-center lg:text-left font-medium">
                    {highlightKeywords(siteConfig.about.desc)}
                  </p>
                </div>

                {/* Highlight Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-8 lg:mt-0">
                  {siteConfig.about.highlights?.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col items-center lg:items-start gap-3 hover:border-turquoise/30 hover:bg-turquoise/5 transition-all duration-300"
                    >
                      <span className="text-[10px] uppercase tracking-[0.2em] text-default-400 font-black">
                        {item.label}
                      </span>
                      <span className="text-lg font-black text-foreground">
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Education Section */}
      <motion.div 
        className="w-full mt-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-4 mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-turquoise font-black">Academic Background</span>
          <h3 className="text-4xl font-black text-foreground tracking-tight">Education</h3>
          <div className="h-1.5 w-12 bg-turquoise rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 gap-8">
          {siteConfig.about.education?.map((edu: any, idx: number) => (
            <Card 
              key={idx}
              isBlurred
              className="border border-black/10 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md overflow-hidden hover:border-turquoise/30 transition-all duration-500 group shadow-none rounded-[2.5rem]"
            >
              <CardBody className="p-8 md:p-12">
                <div className="flex flex-col lg:flex-row justify-between gap-12">
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left flex-1">
                    <div className="w-24 h-24 rounded-[2rem] bg-black/5 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/10 flex-shrink-0 group-hover:scale-105 transition-all duration-500 overflow-hidden p-3">
                      {edu.logo ? (
                        <Image 
                          src={edu.logo} 
                          alt={edu.school} 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 10L12 5L2 10L12 15L22 10Z" stroke="rgb(var(--accent-color))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6 12.5V16C6 16 8.5 19 12 19C15.5 19 18 16 18 16V12.5" stroke="rgb(var(--accent-color))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="space-y-1">
                        <h4 className="text-2xl md:text-3xl font-black text-foreground tracking-tight group-hover:text-turquoise transition-colors">
                          {edu.school}
                        </h4>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                          <span className="px-3 py-1 rounded-lg bg-turquoise/10 text-turquoise text-[10px] font-black uppercase tracking-widest border border-turquoise/20">
                            {edu.degree}
                          </span>
                          <span className="text-default-400 text-xs font-bold tracking-wider">
                            {edu.duration}
                          </span>
                        </div>
                      </div>
                      <p className="text-default-500 text-sm md:text-base leading-relaxed max-w-2xl italic">
                        &quot;{edu.desc}&quot;
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center lg:items-end justify-center gap-4 flex-shrink-0">
                    <div className="px-8 py-6 rounded-[2rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex flex-col items-center lg:items-end min-w-[180px] group-hover:border-turquoise/30 transition-all duration-300">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-default-400 font-black mb-2">Grade (GPA)</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-turquoise">
                          {edu.gpa.split('/')[0]}
                        </span>
                        <span className="text-default-400 font-bold text-sm">
                          / {edu.gpa.split('/')[1]}
                        </span>
                      </div>
                    </div>
                    <div className="px-5 py-2 rounded-full bg-turquoise/10 text-turquoise text-[10px] font-black uppercase tracking-[0.2em] border border-turquoise/20">
                      {edu.status}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
