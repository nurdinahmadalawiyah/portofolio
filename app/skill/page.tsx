"use client";

import { siteConfig } from "@/config/site";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/tooltip";
import { motion } from "framer-motion";

const BentoCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`group relative overflow-hidden rounded-[2.5rem] border border-black/5 dark:border-white/5 bg-white/40 dark:bg-default-100/30 backdrop-blur-xl hover:border-turquoise/30 transition-all duration-500 flex flex-col p-6 md:p-8 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-turquoise/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

export default function SkillPage() {
  const categories = [
    {
      name: "Programming & Markup",
      skills: ["HTML", "CSS", "JavaScript", "Java", "Dart", "PHP", "Kotlin", "TypeScript"],
      className: "md:col-span-2 lg:col-span-2",
      delay: 0.1,
    },
    {
      name: "Frontend",
      skills: ["React", "Next.js", "Angular"],
      className: "md:col-span-1 lg:col-span-1",
      delay: 0.2,
    },
    {
      name: "Mobile",
      skills: ["Flutter", "Jetpack Compose", "React Native", "Expo"],
      className: "md:col-span-1 lg:col-span-1",
      delay: 0.3,
    },
    {
      name: "Backend",
      skills: ["Spring Boot", "Laravel", "Express.js", "NestJS", "Node JS", "Redis"],
      className: "md:col-span-2 lg:col-span-2",
      delay: 0.4,
    },
    {
      name: "Database & Cloud",
      skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
      className: "md:col-span-1 lg:col-span-1",
      delay: 0.5,
    },
    {
      name: "Design",
      skills: ["Figma"],
      className: "md:col-span-1 lg:col-span-1",
      delay: 0.6,
    },
  ];

  return (
    <section id="skill" className="relative flex flex-col items-center justify-center gap-12 py-16 md:py-24 w-full max-w-6xl mx-auto px-6 overflow-hidden">
      {/* Giant Background Text Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 opacity-[0.04] dark:opacity-[0.08]">
        <h1 className="text-[12rem] md:text-[20rem] font-black tracking-tighter leading-none text-foreground whitespace-nowrap">SKILLS</h1>
      </div>

      <div className="relative z-10 w-full mb-4 flex flex-col items-start">
        <h2 className="text-sm font-black uppercase tracking-[0.5em] text-turquoise mb-4">Tech Stack</h2>
        <h3 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          My <span className="text-turquoise italic font-serif font-light">Skills.</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full mt-4">
        {categories.map((category) => (
          <BentoCard key={category.name} className={category.className} delay={category.delay}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-6 bg-turquoise rounded-full shadow-[0_0_10px_rgb(var(--accent-color)/0.5)]" />
              <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
                {category.name}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {category.skills.map((skillName) => {
                const skill = siteConfig.skill.find((s) => s.name === skillName);
                if (!skill) return null;
                return (
                  <Tooltip 
                    key={skill.name} 
                    content={skill.name} 
                    placement="top"
                    closeDelay={0}
                    className="bg-background border border-black/10 dark:border-white/10 text-foreground font-bold"
                  >
                    <motion.div
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-turquoise/40 hover:bg-turquoise/5 transition-all duration-300 group/skill cursor-pointer shadow-sm flex-shrink-0"
                    >
                      <Image
                        width={32}
                        height={32}
                        alt={skill.name}
                        src={skill.image}
                        className="object-contain w-8 h-8 md:w-10 md:h-10 transition-all duration-500"
                      />
                    </motion.div>
                  </Tooltip>
                );
              })}
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
}
