"use client";

import { title, subtitle } from "@/components/primitives";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import { Link } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";
import { motion } from "framer-motion";

export default function ProjectPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center mb-8">
        <h1 className={title({ color: "turqoise", size: "sm" })}>Project</h1>
        <h2 className={subtitle()}>From Ideas to Solutions</h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-4"
      >
        {siteConfig.project.map((project, index) => (
          <motion.div key={project.name} variants={item} className="h-full">
            <Card
              isPressable
              className="group border-none bg-background/60 dark:bg-default-100/30 backdrop-blur-md hover:bg-default-100/50 transition-all duration-300 h-full flex flex-col"
              shadow="lg"
            >
              <CardHeader className="p-0 overflow-hidden shrink-0">
                <Image
                  alt={project.name}
                  className="object-cover w-full h-[240px] transition-transform duration-500 group-hover:scale-110"
                  src={project.image}
                  width="100%"
                />
              </CardHeader>
              <CardBody className="p-6 flex-grow">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-turquoise tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-default-600 text-sm md:text-medium">
                    {project.desc}
                  </p>
                </div>
              </CardBody>
              <CardFooter className="flex flex-col items-start gap-4 p-6 pt-0 mt-auto">
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <Tooltip content={tech.name} key={tech.name} placement="bottom">
                      <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/5 hover:border-turquoise/50 transition-colors">
                        <Image
                          radius="none"
                          width={20}
                          height={20}
                          alt={tech.name}
                          src={tech.image}
                        />
                      </div>
                    </Tooltip>
                  ))}
                </div>
                <div className="flex w-full gap-3 mt-2">
                  <Button
                    isExternal
                    as={Link}
                    className="flex-1 text-sm font-normal text-default-600 bg-default-100"
                    href={project.link}
                    startContent={<GithubIcon />}
                    variant="flat"
                  >
                    Source Code
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
