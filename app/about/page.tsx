import { title, subtitle } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col md:flex-col items-center justify-center gap-10">
      <div className="max-w-lg text-center">
        <h1 className={title({ color: "turqoise", size: "sm" })}>About Me</h1>
        <h2 className={subtitle()}>Get to know Nurdin in brief</h2>
      </div>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-4xl"
        shadow="md"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-4 mx-auto my-11">
              <Image
                isBlurred
                width={240}
                src="images/nurdin-circle.png"
                alt="Nurdin A. Alawiyah"
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-foreground/90">
                  {siteConfig.about.desc}
                </h3>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
