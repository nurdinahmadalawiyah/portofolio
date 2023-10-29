import { title, subtitle } from "@/components/primitives";
import { Card, CardBody } from "@nextui-org/card";
import { Tooltip } from "@nextui-org/tooltip";
import { Image } from "@nextui-org/image";
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
          {siteConfig.skill.map((item, index) => (
            <Tooltip content={item.name} key={item.name}>
              <Image
                radius="none"
                width={75}
                alt={item.name}
                src={item.image}
              />
            </Tooltip>
          ))}
        </CardBody>
      </Card>
    </>
  );
}
