"use client";

import { Card, CardBody } from "@heroui/card";
import { siteConfig } from "@/config/site";
import { Avatar } from "@heroui/avatar";
import { motion } from "framer-motion";

const experienceStories = [
  {
    title: "First professional chapter",
    desc: "My professional journey started here while I was in my final year of college, just before graduation. I began as a Frontend Developer intern, continued with backend on-the-job training, and was later contracted as a Software Developer. This phase shaped me to be adaptive across frontend, backend, and mobile development.",
  },
  {
    title: "Stepping into corporate work",
    desc: "This was my first outsourced and onsite assignment with a client company. I moved from Bandung to Jakarta, learned to live independently, and experienced working inside a large corporate environment. As a Full Stack Developer, I helped continue Victoria's core system using NestJS and Angular.",
  },
  {
    title: "Where mobile development began",
    desc: "This was the first time I wrote code for a real company while I was still a student. I joined as an intern at my lecturer's company, discovered mobile programming, and built a mobile system for the business using Flutter. It became the starting point of my interest in mobile development.",
  },
];

export default function ExperiencePage() {
  const calculateDuration = (dateString: string) => {
    try {
      const [start, end] = dateString.split(" - ");
      if (!end || end.toLowerCase() !== "present") return null;

      const startDate = new Date(start);
      const endDate = new Date();

      let years = endDate.getFullYear() - startDate.getFullYear();
      let months = endDate.getMonth() - startDate.getMonth();

      if (months < 0) {
        years--;
        months += 12;
      }

      // Include the current month
      months++;
      if (months >= 12) {
        years++;
        months -= 12;
      }

      let result = [];
      if (years > 0) result.push(`${years} Year${years > 1 ? "s" : ""}`);
      if (months > 0) result.push(`${months} Month${months > 1 ? "s" : ""}`);

      return result.join(" ");
    } catch (e) {
      return null;
    }
  };

  return (
    <section id="experience" className="relative flex flex-col items-center justify-center gap-8 py-12 md:py-24 w-full max-w-6xl mx-auto px-6 overflow-hidden">
      {/* Giant Background Text Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 opacity-[0.04] dark:opacity-[0.08]">
        <h1 className="text-[12rem] md:text-[20rem] font-black tracking-tighter leading-none text-foreground whitespace-nowrap">EXPERIENCE</h1>
      </div>

      <div className="relative z-10 w-full mb-12 flex flex-col items-start">
        <h2 className="text-sm font-black uppercase tracking-[0.5em] text-turquoise mb-4">Professional Journey</h2>
        <h3 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          Work <span className="text-turquoise italic font-serif font-light">Experience.</span>
        </h3>
      </div>

      <motion.div
        className="relative z-10 w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-turquoise/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="flex w-full flex-col gap-8 md:gap-12">
          {siteConfig.work.map((item, index) => {
            const isRight = index % 2 !== 0;
            const firstExperience = item.experience[0];
            const story = experienceStories[index];

            return (
              <motion.div
                key={item.company}
                className="relative grid w-full grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[1fr_5rem_1fr] md:gap-8"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-turquoise/30 bg-background shadow-[0_0_24px_rgb(var(--accent-color)/0.18)] md:h-16 md:w-16">
                    <Avatar
                      src={item.image}
                      className="h-7 w-7 border border-white/10 md:h-11 md:w-11"
                      radius="md"
                    />
                  </div>
                </div>

                <div className={`col-start-2 row-start-1 self-center pb-4 md:pb-0 ${isRight ? "md:col-start-1 md:text-right" : "md:col-start-3 md:text-left"}`}>
                  <div className={`flex flex-col gap-3 ${isRight ? "md:items-end" : "md:items-start"}`}>
                    <span className="w-fit rounded-full border border-turquoise/20 bg-turquoise/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-turquoise">
                      Storyline
                    </span>
                    <h4 className="max-w-sm text-2xl font-black tracking-tight text-foreground md:text-3xl">
                      {story.title}
                    </h4>
                    <p className="max-w-md text-sm font-medium leading-7 text-default-500">
                      {story.desc}
                    </p>
                  </div>
                </div>

                <Card className={`glass-card col-start-2 row-start-2 overflow-hidden shadow-none transition-all duration-300 hover:-translate-y-1 ${isRight ? "md:col-start-3" : "md:col-start-1"} md:row-start-1`}>
                  <CardBody className="p-5 md:p-8">
                    <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h4 className="text-2xl font-black tracking-tight text-foreground md:text-4xl">
                          {item.company}
                        </h4>
                        <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-default-500">
                          {item.alamat}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-turquoise/20 bg-turquoise/10 px-4 py-3 text-left md:text-right">
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-turquoise/80">
                          Main Role
                        </p>
                        <p className="mt-1 text-sm font-black text-foreground">
                          {firstExperience.position}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      {item.experience.map((experience, experienceIndex) => (
                        <div
                          key={`${item.company}-${experienceIndex}`}
                          className="group/role relative rounded-2xl border border-black/10 bg-background/50 p-4 transition-all duration-300 hover:border-turquoise/30 hover:bg-turquoise/[0.04] dark:border-white/10"
                        >
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div>
                              <h5 className="text-lg font-black leading-tight text-foreground md:text-xl">
                                {experience.position}
                              </h5>
                              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-default-500">
                                <span>{experience.date}</span>
                                {(experience.duration || calculateDuration(experience.date)) && (
                                  <>
                                    <span className="h-1 w-1 rounded-full bg-turquoise/50" />
                                    <span className="text-turquoise/80">
                                      {experience.duration || calculateDuration(experience.date)}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            <span className="w-fit rounded-full border border-turquoise/20 bg-turquoise/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-turquoise">
                              {experience.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
