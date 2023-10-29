import { title, subtitle } from "@/components/primitives";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import { Link } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";

export default function ProjectPage() {
  return (
    <>
      <div className="max-w-lg text-center">
        <h1 className={title({ color: "turqoise", size: "sm" })}>Project</h1>
        <h2 className={subtitle()}>From Ideas to Solutions</h2>
      </div>
      {siteConfig.project.map((item, index) => (
        <Card
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-6xl"
          shadow="sm"
          key={item.name}
        >
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-3">
                <Image
                  alt={item.name}
                  className="object-cover rounded-xl"
                  src={item.image}
                />
              </div>
              <div className="flex flex-col col-span-6 md:col-span-9">
                <div className="flex justify-start items-start">
                  <div className="flex flex-col gap-0">
                    <h1 className="text-xl font-bold">{item.name}</h1>
                    <p className="text-medium text-foreground/80 mt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex w-full items-center justify-between mt-6 flex-col md:flex-row">
                  <div className="flex space-x-4">
                    {item.tech.map((tech, index) => (
                      <Tooltip content={tech.name} key={tech.name}>
                        <Image
                          radius="none"
                          width={25}
                          alt={tech.name}
                          src={tech.image}
                        />
                      </Tooltip>
                    ))}
                  </div>
                  <Button
                    isExternal
                    as={Link}
                    className="text-sm font-normal text-default-600 bg-default-100 mt-4 md:mt-0 w-full md:w-auto"
                    href={item.link}
                    startContent={<GithubIcon />}
                    variant="flat"
                  >
                    See On Github
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
}
