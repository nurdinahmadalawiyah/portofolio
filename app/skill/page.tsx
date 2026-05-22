"use client";

import { title, subtitle } from "@/components/primitives";
import { Card, CardBody } from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Image } from "@nextui-org/image";

export default function SkillPage() {
  const categories = [
    {
      name: "Programming & Markup",
      skills: ["HTML", "CSS", "JavaScript", "Java", "Dart", "PHP", "Kotlin", "TypeScript"],
    },
    {
      name: "Frontend",
      skills: ["React", "Next.js", "Angular"],
    },
    {
      name: "Backend",
      skills: ["Spring Boot", "Laravel", "Express.js", "NestJS", "Node JS", "Redis"],
    },
    {
      name: "Mobile",
      skills: ["Flutter", "Jetpack Compose", "React Native", "Expo"],
    },
    {
      name: "Database & Cloud",
      skills: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"],
    },
    {
      name: "Design",
      skills: ["Figma"],
    },
  ];

  const containerVars = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.05,
        ease: "easeOut"
      },
    },
  };

  const itemVars = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    },
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-8">
        {categories.map((category, catIdx) => (
          <motion.div
            key={category.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVars}
          >
            <Card 
              isBlurred
              className="border border-black/10 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md shadow-none h-full overflow-hidden group/card transition-all duration-300"
            >
              <CardBody className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-6 bg-turquoise rounded-full shadow-[0_0_10px_rgb(var(--accent-color)/0.5)]" />
                  <h3 className="text-xl font-black text-foreground tracking-tight">
                    {category.name}
                  </h3>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {category.skills.map((skillName) => {
                    const skill = siteConfig.skill.find((s) => s.name === skillName);
                    if (!skill) return null;
                    return (
                      <Tooltip 
                        key={skill.name} 
                        content={skill.name} 
                        placement="top"
                        closeDelay={0}
                        className="bg-background border border-black/10 dark:border-white/10 text-foreground"
                      >
                        <motion.div
                          variants={itemVars}
                          whileHover={{ y: -8, scale: 1.1 }}
                          className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-turquoise/40 hover:bg-turquoise/5 transition-all duration-300 group/skill cursor-pointer aspect-square shadow-sm"
                        >
                          <Image
                            width={32}
                            height={32}
                            alt={skill.name}
                            src={skill.image}
                            className="object-contain transition-all duration-500"
                          />
                        </motion.div>
                      </Tooltip>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
