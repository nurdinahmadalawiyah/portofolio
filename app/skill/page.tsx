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
      name: "Languages",
      skills: ["HTML", "CSS", "JavaScript", "Java", "Dart", "PHP"],
    },
    {
      name: "Frontend",
      skills: ["React", "Next.js"],
    },
    {
      name: "Backend",
      skills: ["Spring Boot", "Laravel", "Hapi.js", "Node JS"],
    },
    {
      name: "Mobile",
      skills: ["Flutter"],
    },
    {
      name: "Database",
      skills: ["MySQL", "PostgreSQL"],
    },
    {
      name: "Design",
      skills: ["Figma"],
    },
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section id="skill" className="flex flex-col items-center justify-center gap-8 py-12 md:py-20">
      <div className="inline-block max-w-lg text-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={title({ color: "cyan", size: "lg" })}>My Skills</h1>
          <h2 className={subtitle({ className: "mt-4" })}>
            Shaping My Expertise with Modern Technologies
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4 mt-8">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVars}
          >
            <Card className="border-none bg-background/60 dark:bg-default-100/50 backdrop-blur-md shadow-lg h-full">
              <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-8 text-primary">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                  {category.skills.map((skillName) => {
                    const skill = siteConfig.skill.find((s) => s.name === skillName);
                    if (!skill) return null;
                    return (
                      <Tooltip key={skill.name} content={skill.name} placement="bottom">
                        <motion.div
                          variants={itemVars}
                          whileHover={{ scale: 1.2 }}
                          className="flex flex-col items-center gap-2 group cursor-pointer"
                        >
                          <Image
                            width={56}
                            height={56}
                            alt={skill.name}
                            src={skill.image}
                            className="object-contain"
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
