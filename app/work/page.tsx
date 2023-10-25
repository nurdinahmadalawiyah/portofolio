"use client";

import { title, subtitle } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";

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
                  <div className="flex gap-6 justify-center">
                    <Avatar size="lg" radius="sm" src={item.image} />
                    <div className="flex flex-col gap-0">
                      <h1 className="text-large font-medium">{item.company}</h1>
                      <p className="text-small text-foreground/80">
                        {item.alamat}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
}
