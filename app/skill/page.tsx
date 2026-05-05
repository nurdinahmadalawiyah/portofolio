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
      skills: ["Spring Boot", "Laravel", "Express.js", "NestJS", "Node JS"],
    },
    {
      name: "Mobile",
      skills: ["Flutter", "Jetpack Compose", "React Native", "Expo"],
    },
    {
      name: "Database",
      skills: ["MySQL", "MongoDB", "PostgreSQL"],
    },
    {
      name: "Design",
      skills: ["Figma"],
    },
  ];

  const containerVars = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVars = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 10 }
    },
  };

  return (
    <section id="skill" className="flex flex-col items-center justify-center gap-12 py-16 md:py-24 max-w-6xl mx-auto px-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className={title({ color: "turqoise", size: "sm" })}>My Skills</h1>
        <h2 className={subtitle({ className: "mt-4 max-w-2xl mx-auto" })}>
          Shaping My Expertise with Modern Technologies and Frameworks
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-8">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVars}
          >
            <Card 
              isBlurred
              className="border border-black/5 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md shadow-2xl h-full overflow-hidden group/card"
            >
              <CardBody className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-6 bg-turquoise rounded-full shadow-[0_0_10px_rgba(44,231,241,0.5)]" />
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
                          whileHover={{ y: -5, scale: 1.1 }}
                          className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-turquoise/40 hover:bg-turquoise/5 transition-all duration-300 group/skill cursor-pointer aspect-square"
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
