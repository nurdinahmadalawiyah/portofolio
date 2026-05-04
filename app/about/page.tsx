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
    <section className="flex flex-col items-center justify-center gap-12 py-16 md:py-20 max-w-5xl mx-auto px-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className={title({ color: "turqoise", size: "sm" })}>About Me</h1>
        <h2 className={subtitle({ class: "mt-4" })}>Get to know Nurdin in brief</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
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
    </section>
  );
}
