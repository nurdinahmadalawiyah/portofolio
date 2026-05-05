"use client";

import { title, subtitle } from "@/components/primitives";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { GithubIcon, ExternalLinkIcon, MapPinIcon } from "@/components/icons";

export default function ProjectPage() {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVars = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section id="project" className="flex flex-col items-center justify-center gap-12 py-16 md:py-24 max-w-6xl mx-auto px-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className={title({ color: "turqoise", size: "sm" })}>Selected Projects</h1>
        <h2 className={subtitle({ className: "mt-4 max-w-2xl mx-auto" })}>
          From Ideas to Solutions: A Collection of My Recent Work
        </h2>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full mt-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVars}
      >
        {siteConfig.project.map((project: any, index) => (
          <motion.div key={index} variants={cardVars}>
            <Card 
              isBlurred
              className="border border-black/5 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md shadow-2xl h-full overflow-hidden group"
            >
              <CardBody className="p-0 overflow-hidden relative">
                {/* Project Image Header */}
                <div className="relative h-72 w-full bg-gradient-to-br from-turquoise/20 to-blue-500/10 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Private Badge */}
                  {project.isPrivate && (
                    <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Private Repo</span>
                    </div>
                  )}

                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-turquoise/10 blur-2xl animate-pulse" />
                      <span className="text-turquoise/40 font-black text-4xl italic tracking-tighter opacity-20">NO PREVIEW</span>
                    </div>
                  )}
                  
                  {/* Floating Tech Stack */}
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10">
                    {project.tech.map((tech: any, techIdx: number) => (
                      <div key={techIdx} className="p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                        <Image src={tech.image} width={18} height={18} alt={tech.name} className="object-contain" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8">
                  {/* Title & Metadata */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-1.5 h-8 bg-turquoise rounded-full shadow-[0_0_10px_rgba(44,231,241,0.5)] flex-shrink-0 mt-1" />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-2xl font-black text-foreground tracking-tight group-hover:text-turquoise transition-colors leading-tight">
                        {project.name}
                      </h3>
                      {project.customer && (
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-default-500 text-xs font-bold uppercase tracking-widest mt-1">
                          <span>{project.customer}</span>
                          <span className="w-1 h-1 rounded-full bg-default-300" />
                          <span className="text-turquoise">{project.role}</span>
                          {project.date && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-default-300" />
                              <span className="text-default-400">{project.date}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-default-500 dark:text-default-400 text-sm leading-relaxed mb-6">
                    {project.desc}
                  </p>

                  {/* Job Description List */}
                  {project.jobDesc && (
                    <div className="flex flex-col gap-3 p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-turquoise font-black">Key Responsibilities:</h4>
                      <ul className="flex flex-col gap-2">
                        {project.jobDesc.map((job: string, jobIdx: number) => (
                          <li key={jobIdx} className="flex items-start gap-3 text-xs text-foreground/80 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-turquoise mt-1.5 flex-shrink-0 shadow-[0_0_5px_rgba(44,231,241,0.5)]" />
                            {job}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardBody>
              
              {!project.isPrivate && (
                <CardFooter className="px-8 pb-8 pt-4 flex gap-4">
                  <Button
                    as="a"
                    href={project.link}
                    target="_blank"
                    className="flex-1 bg-turquoise text-white dark:text-black font-black shadow-[0_0_20px_rgba(44,231,241,0.2)] hover:shadow-[0_0_30px_rgba(44,231,241,0.4)] transition-all duration-300 h-12 rounded-xl"
                    startContent={<GithubIcon size={20} />}
                  >
                    Source Code
                  </Button>
                  <Button
                    as="a"
                    href={project.link}
                    target="_blank"
                    className="flex-1 bg-white/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-turquoise/50 text-foreground font-bold transition-all duration-300 h-12 rounded-xl"
                    startContent={<ExternalLinkIcon size={20} />}
                  >
                    View Details
                  </Button>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
