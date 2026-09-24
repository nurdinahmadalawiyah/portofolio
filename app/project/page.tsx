"use client";

import { title, subtitle } from "@/components/primitives";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Tooltip } from "@heroui/tooltip";
import { motion } from "framer-motion";
import { useState, useCallback, useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { siteConfig } from "@/config/site";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Tabs, Tab } from "@heroui/tabs";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { 
  GithubIcon, 
  AppleIcon, 
  PlayStoreIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  KeyIcon,
  MenuIcon
} from "@/components/icons";

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

const ProjectCard = ({ project }: { project: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="rounded-[2rem] border border-black/10 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md hover:border-turquoise/50 transition-all duration-300 shadow-none h-full flex flex-col overflow-clip group/card select-none">
      <div className="p-0 flex flex-col flex-grow">
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
              <div className="px-3 py-1 rounded-full bg-turquoise/20 backdrop-blur-md border border-turquoise/30 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-turquoise animate-pulse" />
                <span className="text-[10px] font-black text-turquoise uppercase tracking-widest">In Development</span>
              </div>
            )}
          </div>

          {project.jobDesc && (
            <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none">
              <Tooltip content="Key Responsibilities" closeDelay={0} placement="top">
                <Button
                  isIconOnly
                  radius="full"
                  className="bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-xl pointer-events-auto hover:bg-turquoise hover:text-black hover:border-turquoise transition-all duration-300 hover:scale-110"
                  onPress={() => setIsOpen(true)}
                >
                  <KeyIcon size={20} />
                </Button>
              </Tooltip>
            </div>
          )}

          {project.image ? (
            <Image
              removeWrapper
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 pointer-events-none"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
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
            <div className="w-1.5 h-10 bg-turquoise rounded-full flex-shrink-0 mt-1" />
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

          <p className="text-default-500 dark:text-default-400 text-sm leading-relaxed">
            {project.desc}
          </p>

          <div>
            {project.jobDesc && (
              <Modal 
                isOpen={isOpen} 
                onOpenChange={setIsOpen} 
                backdrop="blur" 
                scrollBehavior="inside"
                classNames={{
                  base: "bg-background/80 backdrop-blur-md border border-white/10 shadow-2xl",
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1 text-turquoise uppercase tracking-[0.2em] font-black text-sm">
                        Responsibilities - {project.name}
                      </ModalHeader>
                      <ModalBody className="min-h-0 overflow-y-auto overscroll-contain" data-lenis-prevent>
                        <ul className="flex flex-col gap-4 py-2">
                          {project.jobDesc.map((job: string, jobIdx: number) => (
                            <li key={jobIdx} className="flex items-start gap-3 text-sm text-foreground/80 font-medium leading-relaxed">
                              <span className="w-2 h-2 rounded-full bg-turquoise mt-1.5 flex-shrink-0" />
                              <span className="min-w-0 break-words">{job}</span>
                            </li>
                          ))}
                        </ul>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="default" variant="light" onPress={onClose} className="font-bold">
                          Close
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            )}
          </div>
        </div>
      </div>
      
      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 flex flex-wrap gap-3">
        {!project.isPrivate && project.link && (
          <Button
            as="a"
            href={project.link}
            target="_blank"
            className="flex-1 min-w-[120px] bg-turquoise text-white dark:text-black font-black transition-all duration-300 h-12 rounded-xl"
            startContent={<GithubIcon size={20} />}
          >
            Source Code
          </Button>
        )}
        {project.web && (
          <Button
            as="a"
            href={project.web}
            target="_blank"
            className="flex-1 min-w-[120px] bg-black text-white border border-white/20 hover:border-white/50 font-bold transition-all duration-300 h-12 rounded-xl"
            startContent={<ExternalLinkIcon size={20} />}
          >
            Open Web
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
      </div>
    </div>
  );
};

export default function ProjectPage() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    return siteConfig.project.filter((project) => {
      if (filter === "All") return true;
      const role = project.role.toLowerCase();
      if (filter === "Mobile") return role.includes("mobile") || role.includes("android") || role.includes("ios");
      if (filter === "Frontend") return role.includes("frontend");
      if (filter === "Backend") return role.includes("backend");
      if (filter === "Fullstack") return role.includes("fullstack") || role.includes("full stack");
      return role.includes(filter.toLowerCase());
    });
  }, [filter]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    slidesToScroll: 2,
    containScroll: "trimSnaps"
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((api: any) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      emblaApi.scrollTo(0, true);
    }
  }, [emblaApi, filteredProjects]);

  return (
    <section className="relative flex flex-col items-center justify-center gap-12 py-16 md:py-24 w-full max-w-6xl mx-auto px-6 overflow-hidden min-h-screen">
      {/* Giant Background Text Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 opacity-[0.04] dark:opacity-[0.08]">
        <h1 className="text-[12rem] md:text-[20rem] font-black tracking-tighter leading-none text-foreground whitespace-nowrap">PROJECTS</h1>
      </div>

      <motion.div
        id="project"
        variants={entrance}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 w-full mb-8 flex flex-row items-end justify-between gap-4"
      >
        <div className="flex flex-col items-start">
          <h2 className="text-sm font-black uppercase tracking-[0.5em] text-turquoise mb-4">Selected Works</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Recent <span className="text-turquoise italic font-serif font-light">Projects.</span>
          </h3>
        </div>

        {/* Desktop Filter */}
        <div className="hidden lg:block">
          <Tabs 
            aria-label="Project Filters" 
            selectedKey={filter} 
            onSelectionChange={(key) => setFilter(key as string)}
            variant="light"
            radius="full"
            fullWidth
            classNames={{
              tabList: "gap-2 w-[600px] p-1 border border-default-200/50 bg-background/50 backdrop-blur-md",
              cursor: "w-full bg-turquoise/10 border border-turquoise/20",
              tab: "h-10",
              tabContent: "group-data-[selected=true]:text-turquoise font-bold text-xs uppercase tracking-widest transition-colors w-full text-center"
            }}
          >
            <Tab key="All" title="All" />
            <Tab key="Mobile" title="Mobile" />
            <Tab key="Fullstack" title="Fullstack" />
            <Tab key="Frontend" title="Frontend" />
            <Tab key="Backend" title="Backend" />
          </Tabs>
        </div>

        {/* Mobile Filter (Hamburger) */}
        <div className="block lg:hidden">
          <Dropdown>
            <DropdownTrigger>
              <Button 
                isIconOnly 
                variant="flat" 
                radius="full"
                className="bg-background/50 backdrop-blur-md border border-default-200/50 shadow-sm hover:bg-default-100"
              >
                <MenuIcon size={20} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Project Filters"
              selectionMode="single"
              selectedKeys={new Set([filter])}
              onSelectionChange={(keys) => {
                if (keys !== "all") {
                  const selected = Array.from(keys)[0];
                  if (selected) setFilter(selected as string);
                }
              }}
              className="w-48"
              itemClasses={{
                base: "data-[selected=true]:bg-turquoise/10 data-[selected=true]:text-turquoise",
                title: "font-bold text-sm uppercase tracking-widest"
              }}
            >
              <DropdownItem key="All">All</DropdownItem>
              <DropdownItem key="Mobile">Mobile</DropdownItem>
              <DropdownItem key="Fullstack">Fullstack</DropdownItem>
              <DropdownItem key="Frontend">Frontend</DropdownItem>
              <DropdownItem key="Backend">Backend</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </motion.div>

      {/* PROJECT LIST / CAROUSEL */}
      <motion.div 
        variants={entrance}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="w-full"
      >
        {/* MOBILE VIEW */}
        <div className="flex lg:hidden flex-col gap-12 w-full mt-4">
          {filteredProjects.map((project: any, index) => (
            <motion.div 
              key={project.name} 
              className="w-full"
              initial={{ opacity: 0, y: 56, scale: 0.96, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="w-full py-12 text-center text-default-500 font-medium">No projects found for {filter}.</div>
          )}
        </div>

        {/* DESKTOP VIEW: Horizontal Embla Carousel */}
        <div className="hidden lg:block relative w-full group mt-4">
          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {filteredProjects.length === 0 ? (
                <div className="w-full py-20 text-center text-default-500 font-medium flex-[0_0_100%]">No projects found for {filter}.</div>
              ) : (
                filteredProjects.map((project: any, index) => (
                  <div 
                    key={project.name} 
                    className={`min-w-0 px-5 flex ${filteredProjects.length === 1 ? 'flex-[0_0_100%] max-w-2xl mx-auto' : 'flex-[0_0_50%]'}`}
                  >
                    <div className="w-full h-full">
                      <ProjectCard project={project} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Controls: Navigation and Pagination */}
          {scrollSnaps.length > 1 && (
            <div className="flex justify-between items-center mt-8 px-5">
              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  disabled={prevBtnDisabled}
                  onClick={scrollPrev}
                  className={`bg-background/60 backdrop-blur-md border border-white/10 shadow-lg h-12 w-12 flex items-center justify-center ${prevBtnDisabled ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 hover:border-turquoise/50 hover:bg-turquoise/10 active:scale-95 text-turquoise'}`}
                >
                  <ChevronLeftIcon size={24} />
                </Button>
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  disabled={nextBtnDisabled}
                  onClick={scrollNext}
                  className={`bg-background/60 backdrop-blur-md border border-white/10 shadow-lg h-12 w-12 flex items-center justify-center ${nextBtnDisabled ? 'opacity-20 cursor-not-allowed' : 'hover:scale-110 hover:border-turquoise/50 hover:bg-turquoise/10 active:scale-95 text-turquoise'}`}
                >
                  <ChevronRightIcon size={24} />
                </Button>
              </div>

              {/* Pagination Dots */}
              <div className="flex gap-3">
                {scrollSnaps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      selectedIndex === i 
                        ? "w-10 bg-turquoise"
                        : "w-2.5 bg-default-300 hover:bg-default-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
    </section>
  );
}
