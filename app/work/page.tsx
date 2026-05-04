"use client";

import { title, subtitle } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineContent from "@mui/lab/TimelineContent";
import { motion } from "framer-motion";

export default function WorkPage() {
  const [tabSize, setTabSize] = useState<"lg" | "sm" | "md" | undefined>("lg");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 640) {
        setTabSize("sm");
      } else {
        setTabSize("lg");
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <section className="flex flex-col items-center justify-center gap-8 py-12 md:py-16">
      <div className="max-w-2xl text-center">
        <h1 className={title({ color: "turqoise", size: "sm" })}>
          Work Experience
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          A Journey Through Professional Growth and Achievements
        </h2>
      </div>

      <div className="flex w-full flex-col">
        <Tabs
          size={tabSize}
          variant="bordered"
          items={siteConfig.work}
          className="justify-center"
        >
          {siteConfig.work.map((item) => (
            <Tab key={item.company} title={item.company}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 w-full"
              >
                <Card className="border-none bg-background/60 dark:bg-default-100/30 backdrop-blur-md shadow-xl">
                  <CardBody className="p-8">
                    <div className="flex gap-6 items-center mb-8">
                      <Avatar 
                        size="lg" 
                        radius="md" 
                        src={item.image} 
                        className="w-16 h-16 shadow-lg border-2 border-white/10"
                      />
                      <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-turquoise tracking-tight">
                          {item.company}
                        </h1>
                        <p className="text-default-500 font-medium italic">
                          {item.alamat}
                        </p>
                      </div>
                    </div>

                    <Timeline
                      sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                          flex: 0,
                          padding: 0,
                        },
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {item.experience.map((experience, index) => (
                        <TimelineItem key={`${item.company}-${index}`}>
                          <TimelineSeparator>
                            <TimelineDot 
                              sx={{ 
                                bgcolor: '#2CE7F1', 
                                boxShadow: '0 0 10px rgba(44, 231, 241, 0.5)',
                                margin: '6px 0'
                              }} 
                            />
                            {index < item.experience.length - 1 && (
                              <TimelineConnector 
                                sx={{ 
                                  bgcolor: '#2CE7F1', 
                                  opacity: 0.3,
                                  width: '2px'
                                }} 
                              />
                            )}
                          </TimelineSeparator>
                          <TimelineContent sx={{ paddingLeft: "30px", py: "0", mb: "24px" }}>
                            <h4 className="text-xl font-bold text-foreground/90 leading-none">
                              {experience.position}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-0.5 rounded-full bg-turquoise/10 text-turquoise text-[10px] font-bold uppercase tracking-wider">
                                {experience.type}
                              </span>
                            </div>
                            <p className="text-default-500 text-sm mt-2 font-medium">
                              {experience.date}
                              {(experience.duration || calculateDuration(experience.date)) && (
                                <span className="ml-2 px-2 border-l border-default-200">
                                  {experience.duration || calculateDuration(experience.date)}
                                </span>
                              )}
                            </p>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </CardBody>
                </Card>
              </motion.div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
