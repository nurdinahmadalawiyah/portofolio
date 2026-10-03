"use client";

import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { motion } from "framer-motion";
import React, { useCallback, useMemo, useState } from "react";

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



type SkillDetailGroup = {
  title: string;
  items: string[];
};

type Skill = {
  name: string;
  image: string;
  highlights?: string[];
  details?: SkillDetailGroup[];
};

const SkillDetailModal = ({
  open,
  skill,
  onClose,
}: {
  open: boolean;
  skill: Skill | null;
  onClose: () => void;
}) => {
  if (!skill) return null;

  return (
    <Modal
      isOpen={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      backdrop="blur"
      scrollBehavior="inside"
      classNames={{
        base: "bg-background/80 backdrop-blur-md border border-white/10 shadow-2xl",
      }}
    >
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-turquoise uppercase tracking-[0.2em] font-black text-sm">
              Skill Details - {skill.name}
            </ModalHeader>
            <ModalBody className="min-h-0 overflow-y-auto overscroll-contain" data-lenis-prevent>
              <div className="flex items-center gap-4 pb-2">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-white/50 dark:border-white/10 dark:bg-white/5">
                  <Image
                    removeWrapper
                    width={42}
                    height={42}
                    alt={skill.name}
                    src={skill.image}
                    className="h-10 w-10 rounded-none object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xl font-black tracking-tight text-foreground">
                    {skill.name}
                  </h4>
                  {skill.highlights?.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skill.highlights.slice(0, 6).map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full border border-turquoise/20 bg-turquoise/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-turquoise"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 py-2 md:grid-cols-2">
                {skill.details?.length ? (
                  skill.details.map((group) => (
                    <div
                      key={group.title}
                      className="rounded-2xl border border-black/5 bg-white/40 p-4 dark:border-white/5 dark:bg-default-100/30"
                    >
                      <div className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-turquoise">
                        {group.title}
                      </div>
                      <ul className="flex flex-col gap-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm font-medium leading-relaxed text-foreground/80"
                          >
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-turquoise" />
                            <span className="min-w-0 break-words">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-black/5 bg-white/40 p-4 dark:border-white/5 dark:bg-default-100/30 md:col-span-2">
                    <div className="text-sm font-semibold text-foreground/80">
                      I'm still updating the details of this skill.
                    </div>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onModalClose} className="font-bold">
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default function SkillPage() {
  const allSkills = useMemo(() => siteConfig.skill as Skill[], []);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const closeModal = useCallback(() => setSelectedSkill(null), []);

  const categories = [
    {
      name: "Mobile",
      skills: ["Flutter", "Jetpack Compose", "React Native", "Expo",],
      className: "md:col-span-1 lg:col-span-1",
      delay: 0.1,
    },
    {
      name: "Frontend",
      skills: ["React", "Next.js", "Angular"],
      className: "md:col-span-1 lg:col-span-1",
      delay: 0.2,
    },
    {
      name: "Backend",
      skills: ["Spring Boot", "Laravel", "Express.js", "NestJS", "Node JS", "Redis"],
      className: "md:col-span-2 lg:col-span-2",
      delay: 0.3,
    },
    {
      name: "Database",
      skills: ["MySQL", "MongoDB", "PostgreSQL"],
      className: "md:col-span-1 lg:col-span-1",
      delay: 0.4,
    },
    {
      name: "Language",
      skills: ["JavaScript", "Java", "Dart", "PHP", "Kotlin", "TypeScript"],
      className: "md:col-span-2 lg:col-span-2",
      delay: 0.5,
    },
    {
      name: "Other",
      skills: ["Firebase", "Figma"],
      className: "md:col-span-1 lg:col-span-1",
      delay: 0.6,
    },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center gap-12 py-16 md:py-24 w-full max-w-6xl mx-auto px-6 overflow-hidden">
      {/* Giant Background Text Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 opacity-[0.04] dark:opacity-[0.08]">
        <h1 className="text-[12rem] md:text-[20rem] font-black tracking-tighter leading-none text-foreground whitespace-nowrap">SKILLS</h1>
      </div>

      <motion.div
        id="skill"
        variants={entrance}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 w-full mb-4 flex flex-col items-start"
      >
        <h2 className="text-sm font-black uppercase tracking-[0.5em] text-turquoise mb-4">Tech Stack</h2>
        <h3 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          My <span className="text-turquoise italic font-serif font-light">Skills.</span>
        </h3>
      </motion.div>

      <div className="flex flex-col gap-12 md:gap-16 w-full mt-12 z-10">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            variants={entrance}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: category.delay }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-start border-t border-black/10 dark:border-white/10 pt-8 md:pt-12"
          >
            <div className="md:col-span-1">
              <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">
                {category.name}
              </h3>
            </div>
            
            <div className="md:col-span-3 flex flex-wrap gap-x-8 gap-y-6">
              {category.skills.map((skillName) => {
                const skill = allSkills.find((s) => s.name === skillName);
                if (!skill) return null;
                const hasDetail = Boolean(skill.details?.length);
                return (
                  <div
                    key={skill.name}
                    role={hasDetail ? "button" : undefined}
                    tabIndex={hasDetail ? 0 : -1}
                    onClick={hasDetail ? () => setSelectedSkill(skill as Skill) : undefined}
                    onKeyDown={
                      hasDetail
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") setSelectedSkill(skill as Skill);
                          }
                        : undefined
                    }
                    className={`flex flex-col items-center justify-start gap-3 w-20 md:w-24 group/skill outline-none ${
                      hasDetail
                        ? "cursor-pointer focus-visible:ring-2 focus-visible:ring-turquoise/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-2xl"
                        : "cursor-default"
                    }`}
                  >
                    <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 group-hover/skill:border-turquoise/40 group-hover/skill:bg-turquoise/5 transition-all duration-300 flex-shrink-0 shadow-sm">
                      <Image
                        width={48}
                        height={48}
                        alt={skill.name}
                        src={skill.image}
                        className="object-contain w-9 h-9 md:w-11 md:h-11 group-hover/skill:scale-110 transition-transform duration-500 rounded-none"
                      />
                    </div>
                    <span className="text-xs md:text-sm text-center font-bold text-foreground/80 group-hover/skill:text-foreground transition-colors duration-300 leading-tight">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <SkillDetailModal open={Boolean(selectedSkill)} skill={selectedSkill} onClose={closeModal} />
    </section>
  );
}
