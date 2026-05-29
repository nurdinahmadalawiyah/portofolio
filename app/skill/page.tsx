"use client";

import { siteConfig } from "@/config/site";
import { Image } from "@heroui/image";
import { Tooltip } from "@heroui/tooltip";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!mounted || !open || !skill) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl rounded-[2rem] border border-black/10 dark:border-white/10 bg-background/90 backdrop-blur-xl shadow-2xl overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label={`${skill.name} details`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-turquoise/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Image
                    width={64}
                    height={64}
                    alt={skill.name}
                    src={skill.image}
                    className="object-contain w-14 h-14 md:w-16 md:h-16 rounded-none"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-2xl md:text-3xl font-black tracking-tight text-foreground truncate">
                    {skill.name}
                  </h4>
                  {skill.highlights?.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skill.highlights.slice(0, 6).map((h) => (
                        <span
                          key={h}
                          className="px-3 py-1 rounded-full bg-turquoise/10 text-turquoise text-xs font-black uppercase tracking-widest border border-turquoise/20"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="size-11 shrink-0 aspect-square rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 transition-all flex items-center justify-center text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.35)] active:scale-95"
                aria-label="Close"
              >
                <span className="text-2xl leading-[1] -translate-y-[1px]">×</span>
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {skill.details?.length ? (
                skill.details.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/40 dark:bg-default-100/30 p-4"
                  >
                    <div className="text-[11px] font-black uppercase tracking-[0.18em] text-turquoise mb-2">
                      {group.title}
                    </div>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="text-sm font-semibold text-foreground/90">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 rounded-2xl border border-black/5 dark:border-white/5 bg-white/40 dark:bg-default-100/30 p-4">
                  <div className="text-sm font-semibold text-foreground/80">
                    I'm still updating the details of this skill.
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>,
    document.body
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
                const skill = allSkills.find((s) => s.name === skillName);
                if (!skill) return null;
                const hasDetail = Boolean(skill.details?.length);
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
                      className={`flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-turquoise/40 hover:bg-turquoise/5 transition-all duration-300 group/skill shadow-sm flex-shrink-0 outline-none ${
                        hasDetail
                          ? "cursor-pointer focus-visible:ring-2 focus-visible:ring-turquoise/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          : "cursor-default"
                      }`}
                    >
                      <Image
                        width={38}
                        height={38}
                        alt={skill.name}
                        src={skill.image}
                        className="object-contain w-9 h-9 md:w-10 md:h-10 transition-all duration-500 rounded-none"
                      />
                    </motion.div>
                  </Tooltip>
                );
              })}
            </div>
          </BentoCard>
        ))}
      </div>

      <SkillDetailModal open={Boolean(selectedSkill)} skill={selectedSkill} onClose={closeModal} />
    </section>
  );
}
