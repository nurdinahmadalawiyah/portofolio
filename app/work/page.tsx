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

  return (
    <>
      <div className="max-w-lg text-center">
        <h1 className={title({ color: "turqoise", size: "sm" })}>
          Work Experience
        </h1>
        <h2 className={subtitle()}>
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
          {siteConfig.work.map((item, index) => (
            <Tab key={item.company} title={item.company}>
              <Card>
                <CardBody>
                  <div className="flex gap-6 justify-left">
                    <Avatar size="lg" radius="sm" src={item.image} />
                    <div className="flex flex-col gap-0">
                      <h1 className="text-large font-medium">{item.company}</h1>
                      <p className="text-small text-foreground/80">
                        {item.alamat}
                      </p>
                    </div>
                  </div>
                  <Timeline
                    sx={{
                      [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0.45,
                      },
                    }}
                  >
                    {item.experience.map((experience, index) => (
                      <TimelineItem key={item.company} >
                        <TimelineSeparator>
                          <TimelineDot sx={{ bgcolor: '#2CE7F1' }} />
                          {index < item.experience.length - 1 && <TimelineConnector sx={{ bgcolor: '#2CE7F1' }} />}
                        </TimelineSeparator>
                        <TimelineContent>
                          {experience.position}
                          <p className="text-small text-foreground/80">
                            {experience.type}
                          </p>
                          <p className="text-small text-foreground/80">
                            {experience.date}
                            {experience.duration && ` ● ${experience.duration}`}
                          </p>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
}
