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
          className="border border-white/10 bg-background/60 dark:bg-default-100/30 backdrop-blur-md overflow-hidden"
          shadow="lg"
        >
          <CardBody className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
              {/* Profile Image with Glow */}
              <div className="relative group flex-shrink-0">
                <div className="absolute -inset-2 bg-turquoise/20 rounded-full blur-xl group-hover:bg-turquoise/30 transition-colors" />
                <Image
                  isBlurred
                  width={280}
                  src="images/nurdin-circle.png"
                  alt="Nurdin A. Alawiyah"
                  className="relative z-10 border-4 border-white/5 rounded-full"
                />
              </div>

              <div className="flex flex-col gap-8">
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-default-600 leading-relaxed text-center lg:text-left">
                    {highlightKeywords(siteConfig.about.desc)}
                  </p>
                </div>

                {/* Highlight Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  {siteConfig.about.highlights?.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      className="p-4 rounded-2xl bg-default-50/50 dark:bg-default-100/20 border border-white/5 flex flex-col items-center lg:items-start gap-2 hover:border-turquoise/30 transition-all group"
                    >
                      <span className="text-xs uppercase tracking-wider text-default-400 font-bold group-hover:text-turquoise transition-colors">
                        {item.label}
                      </span>
                      <span className="text-base font-semibold text-foreground">
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
        className="w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px bg-turquoise/20 flex-grow" />
          <h3 className="text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
            Education
          </h3>
          <div className="h-px bg-turquoise/20 flex-grow" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {siteConfig.about.education?.map((edu: any, idx: number) => (
            <Card 
              key={idx}
              isBlurred
              className="border border-white/5 bg-white/5 dark:bg-default-100/10 backdrop-blur-sm overflow-hidden hover:border-turquoise/20 transition-all duration-500 group"
            >
              <CardBody className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-8">
                  <div className="flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
                    <div className="w-20 h-20 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shadow-xl flex-shrink-0 group-hover:scale-110 transition-all duration-500 overflow-hidden p-2">
                      {edu.logo ? (
                        <Image 
                          src={edu.logo} 
                          alt={edu.school} 
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 10L12 5L2 10L12 15L22 10Z" stroke="rgb(var(--accent-color))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6 12.5V16C6 16 8.5 19 12 19C15.5 19 18 16 18 16V12.5" stroke="rgb(var(--accent-color))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xl md:text-2xl font-black text-foreground tracking-tight group-hover:text-turquoise transition-colors">
                        {edu.school}
                      </h4>
                      <p className="text-turquoise font-bold text-xs md:text-sm uppercase tracking-widest leading-relaxed px-4 md:px-0">
                        {edu.degree}
                      </p>
                      <p className="text-default-500 text-[10px] md:text-xs font-medium">
                        {edu.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                    <div className="px-5 py-3 rounded-2xl bg-black/20 dark:bg-white/5 border border-white/10 flex flex-col items-center md:items-end w-full md:w-auto shadow-inner">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-default-400 font-black mb-1">Grade (GPA)</span>
                      <span className="text-3xl font-black text-turquoise shadow-turquoise/20 drop-shadow-md">
                        {edu.gpa}
                      </span>
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-turquoise/10 text-turquoise text-[10px] font-black uppercase tracking-widest border border-turquoise/20 shadow-sm">
                      {edu.status}
                    </span>
                  </div>
                </div>
                
                <div className="mt-8 p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-white/5 italic text-default-500 text-xs md:text-sm leading-relaxed text-center md:text-left">
                  "{edu.desc}"
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
