"use client";

import { title, subtitle } from "@/components/primitives";
import { Card, CardBody } from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function SkillPage() {
  return (
    <>
      <div className="max-w-lg text-center">
        <h1 className={title({ color: "turqoise", size: "sm" })}>My Skills</h1>
        <h2 className={subtitle()}>Shaping My Expertise</h2>
      </div>
      <Card>
        <CardBody  className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-8">
          {siteConfig.skill.map((item) => (
            <Tooltip content={item.name} key={item.name}>
              <motion.img
                width={75}
                alt={item.name}
                src={item.image}
                whileHover={{ scale: 1.2 }}
              />
            </Tooltip>
          ))}
        </CardBody>
      </Card>
    </>
  );
}
