"use client";

import { title, subtitle } from "@/components/primitives";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/tooltip";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { 
  GithubIcon, 
  AppleIcon, 
  PlayStoreIcon,
  ChevronLeftIcon,
  ChevronRightIcon 
} from "@/components/icons";

export default function ProjectPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  
  const [currentPage, setCurrentPage] = useState(0);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const itemsPerPage = 2;
  const totalPages = Math.ceil(siteConfig.project.length / itemsPerPage);

  // Calculate constraints for dragging
  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        const offsetWidth = containerRef.current.offsetWidth;
        // Add a bit of padding to the constraints to account for shadows
        setConstraints({ left: Math.min(0, -(scrollWidth - offsetWidth + 16)), right: 8 });
      }
    };

    updateConstraints();
    const timer = setTimeout(updateConstraints, 500);
    window.addEventListener("resize", updateConstraints);
    return () => {
      window.removeEventListener("resize", updateConstraints);
      clearTimeout(timer);
    };
  }, []);

  const scrollToPage = (page: number) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // Precision offset calculation: (CardWidth * 2) + Gap
      // Since each card is 50% - 20px and gap is 40px
      // targetX should be exactly the container width
      const targetX = -page * containerWidth; 
      
      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
        onUpdate: (latest) => x.set(latest)
      });
      setCurrentPage(page);
    }
  };

  const nextSlide = () => {
    if (currentPage < totalPages - 1) {
      scrollToPage(currentPage + 1);
    }
  };

  const prevSlide = () => {
    if (currentPage > 0) {
      scrollToPage(currentPage - 1);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      const newX = x.get() - e.deltaX;
      const limitedX = Math.max(constraints.left, Math.min(constraints.right, newX));
      x.set(limitedX);
      
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const page = Math.round(Math.abs(limitedX) / containerWidth);
        if (page !== currentPage) setCurrentPage(page);
      }
    }
  };

  const ProjectCard = ({ project }: { project: any }) => (
    <Card 
      isBlurred
      className="border border-black/5 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md shadow-2xl h-full flex flex-col overflow-hidden group/card select-none"
    >
      <CardBody className="p-0 flex flex-col flex-grow">
        <div className="relative h-36 md:h-44 w-full bg-gradient-to-br from-turquoise/20 to-blue-500/10 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-black/20 group-hover/card:bg-transparent transition-colors duration-500" />
          
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
            {project.isPrivate && (
              <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Private Repo</span>
              </div>
            )}
            {project.isOngoing && (
              <div className="px-3 py-1 rounded-full bg-turquoise/20 backdrop-blur-md border border-turquoise/30 flex items-center gap-2 shadow-[0_0_15px_rgb(var(--accent-color)/0.2)]">
                <div className="w-1.5 h-1.5 rounded-full bg-turquoise animate-pulse shadow-[0_0_8px_rgb(var(--accent-color)/1)]" />
                <span className="text-[10px] font-black text-turquoise uppercase tracking-widest">In Development</span>
              </div>
            )}
          </div>

          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 pointer-events-none"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-turquoise/10 blur-2xl animate-pulse" />
              <span className="text-turquoise/40 font-black text-4xl italic tracking-tighter opacity-20 text-center px-4">NO PREVIEW</span>
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10">
            {project.tech.map((tech: any, techIdx: number) => (
              <Tooltip key={techIdx} content={tech.name} closeDelay={0}>
                <motion.div 
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-xl cursor-help transition-colors hover:border-turquoise/50"
                >
                  <Image src={tech.image} width={18} height={18} alt={tech.name} className="object-contain pointer-events-none" />
                </motion.div>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-1.5 h-10 bg-turquoise rounded-full shadow-[0_0_10px_rgb(var(--accent-color)/0.5)] flex-shrink-0 mt-1" />
            <div className="flex flex-col gap-1.5">
              <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight group-hover/card:text-turquoise transition-colors leading-tight">
                {project.name}
              </h3>
              <div className="flex flex-col gap-1 text-default-500 font-bold uppercase tracking-widest">
                {project.customer && (
                  <span className="text-[10px] md:text-xs leading-relaxed">{project.customer}</span>
                )}
                <div className="flex items-center gap-2 text-[9px] md:text-[10px]">
                  <span className="text-turquoise">{project.role}</span>
                  {project.date && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-default-300" />
                      <span className="text-default-400">{project.date}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="text-default-500 dark:text-default-400 text-sm leading-relaxed mb-6">
            {project.desc}
          </p>

          <div className="mt-auto">
            {project.jobDesc && (
              <div className="flex flex-col gap-3 p-4 md:p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-turquoise font-black">Key Responsibilities:</h4>
                <ul className="flex flex-col gap-2 max-h-32 overflow-y-auto custom-scrollbar">
                  {project.jobDesc.map((job: string, jobIdx: number) => (
                    <li key={jobIdx} className="flex items-start gap-3 text-[11px] md:text-xs text-foreground/80 font-medium leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-turquoise mt-1.5 flex-shrink-0 shadow-[0_0_5px_rgb(var(--accent-color)/0.5)]" />
                      {job}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </CardBody>
      
      <CardFooter className="px-6 md:px-8 pb-6 md:pb-8 pt-2 flex flex-wrap gap-3">
        {!project.isPrivate && (
          <Button
            as="a"
            href={project.link}
            target="_blank"
            className="flex-1 min-w-[120px] bg-turquoise text-white dark:text-black font-black shadow-[0_0_20px_rgb(var(--accent-color)/0.2)] hover:shadow-[0_0_30px_rgb(var(--accent-color)/0.4)] transition-all duration-300 h-12 rounded-xl"
            startContent={<GithubIcon size={20} />}
          >
            Source Code
          </Button>
        )}
        {project.appStore && (
          <Button
            as="a"
            href={project.appStore}
            target="_blank"
            className="flex-1 min-w-[120px] bg-black text-white border border-white/20 hover:border-white/50 font-bold transition-all duration-300 h-12 rounded-xl"
            startContent={<AppleIcon size={20} />}
          >
            App Store
          </Button>
        )}
        {project.playStore && (
          <Button
            as="a"
            href={project.playStore}
            target="_blank"
            className="flex-1 min-w-[120px] bg-black text-white border border-white/20 hover:border-white/50 font-bold transition-all duration-300 h-12 rounded-xl"
            startContent={<PlayStoreIcon size={20} />}
          >
            Play Store
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <section id="project" className="flex flex-col items-center justify-center gap-12 py-16 md:py-24 w-full max-w-7xl mx-auto px-6">
      <motion.div 
        className="text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={title({ color: "turqoise", size: "sm" })}>Selected Projects</h1>
        <h2 className={subtitle({ className: "mt-4 max-w-2xl mx-auto" })}>
          From Ideas to Solutions: A Collection of My Recent Work
        </h2>
      </motion.div>

      {/* PROJECT LIST / CAROUSEL */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full"
      >
        {/* MOBILE VIEW */}
        <div className="flex lg:hidden flex-col gap-12 w-full mt-4">
          {siteConfig.project.map((project: any, index) => (
            <motion.div 
              key={index} 
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* DESKTOP VIEW: Horizontal Draggable/Swipable Carousel */}
        <div 
          className="hidden lg:block relative w-full group mt-4"
          onWheel={handleWheel}
        >
          {/* Navigation Buttons */}
          {totalPages > 1 && (
            <>
              <div className="absolute top-1/2 -left-12 -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  disabled={currentPage === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className={`bg-background/60 backdrop-blur-md border border-white/10 shadow-2xl h-14 w-14 flex items-center justify-center ${currentPage === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 hover:border-turquoise/50 hover:bg-turquoise/10 active:scale-95 text-turquoise'}`}
                >
                  <ChevronLeftIcon size={28} />
                </Button>
              </div>

              <div className="absolute top-1/2 -right-12 -translate-y-1/2 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  disabled={currentPage === totalPages - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className={`bg-background/60 backdrop-blur-md border border-white/10 shadow-2xl h-14 w-14 flex items-center justify-center ${currentPage === totalPages - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 hover:border-turquoise/50 hover:bg-turquoise/10 active:scale-95 text-turquoise'}`}
                >
                  <ChevronRightIcon size={28} />
                </Button>
              </div>
            </>
          )}

          {/* Carousel Content Container */}
          <div 
            ref={containerRef}
            className="overflow-hidden px-4 -mx-4 cursor-grab active:cursor-grabbing"
          >
            <motion.div 
              drag={totalPages > 1 ? "x" : false}
              dragConstraints={constraints}
              style={{ x: springX }}
              className="flex gap-10"
              onDragEnd={(e, info) => {
                if (containerRef.current && totalPages > 1) {
                  const containerWidth = containerRef.current.offsetWidth;
                  const velocity = info.velocity.x;
                  const offset = info.offset.x;
                  
                  let page = currentPage;
                  if (offset < -100 || velocity < -500) {
                    page = Math.min(totalPages - 1, currentPage + 1);
                  } else if (offset > 100 || velocity > 500) {
                    page = Math.max(0, currentPage - 1);
                  }
                  
                  scrollToPage(page);
                }
              }}
            >
              {siteConfig.project.map((project: any, index) => (
                <div 
                  key={index} 
                  className={`flex-shrink-0 ${siteConfig.project.length === 1 ? 'w-full max-w-2xl mx-auto' : 'w-[calc(50%-20px)]'}`}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToPage(i)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    currentPage === i 
                      ? "w-10 bg-turquoise shadow-[0_0_15px_rgb(var(--accent-color)/0.8)]" 
                      : "w-2.5 bg-default-300 hover:bg-default-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--accent-color), 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--accent-color), 0.4);
        }
      `}</style>
    </section>
  );
}
