"use client";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Spacer } from "@nextui-org/spacer";

export default function Home() {
  return (
    <>
      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mb-20"
        id="home"
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-20">
          <div className="max-w-lg text-center md:text-start">
            <h2 className={subtitle()}>Hi, my name is Nurdin</h2>
            <h1 className={title({ color: "turqoise", size: "xl" })}>
              I&rsquo;m a Fullstack Developer
            </h1>
            <br />
            <h2 className={subtitle({ class: "mt-8" })}>
              I&rsquo;m passionate about creating innovative and user-friendly
              web applications, and my enthusiasm extends to crafting intuitive
              and seamless mobile applications as well. I believe in delivering
              exceptional digital experiences across all platforms.
            </h2>
            <div className="mt-8">
              <Link isExternal as={NextLink} href={siteConfig.links.docs}>
                <Button
                  variant="shadow"
                  size="lg"
                  className="bg-turquoise dark:text-black light:text-white shadow-lg font-bold"
                >
                  Explore Project →
                </Button>
              </Link>
            </div>
          </div>
          <Image
            alt="Nurdin A. Alawiyah"
            className="object-cover rounded-xl hidden md:block"
            src="/images/nurdin1.png"
            width={450}
          />
        </div>
      </section>

      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mb-20"
        id="about"
      >
        <div className="flex flex-col md:flex-col items-center justify-center gap-10">
          <div className="max-w-lg text-center">
            <h1 className={title({ color: "turqoise", size: "sm" })}>
              About Me
            </h1>
            <h2 className={subtitle()}>Get to know Nurdin in brief</h2>
          </div>
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-4xl"
            shadow="m"
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
                      I am Nurdin A. Alawiyah, and I possess a deep passion for
                      the realm of programming. Leveraging my accumulated
                      experience in web and mobile application development, I
                      remain highly enthusiastic and fully committed to the
                      continuous expansion of my skills and knowledge within the
                      dynamic landscape of technology and programming. Beyond my
                      working hours, I diligently engage in online courses to
                      further enrich my expertise in this ever-evolving field.
                    </h3>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
        id="work"
      >
        <div className="flex flex-col md:flex-col items-center justify-center gap-10">
          <div className="max-w-lg text-center">
            <h1 className={title({ color: "turqoise", size: "sm" })}>
              Work Experience
            </h1>
            <h2 className={subtitle()}>
              A Journey Through Professional Growth and Achievements
            </h2>
          </div>
        </div>
      </section>

      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
        id="project"
      >
        <div className="flex flex-col md:flex-col items-center justify-center gap-10">
          <div className="max-w-lg text-center">
            <h1 className={title({ color: "turqoise", size: "sm" })}>
              Project
            </h1>
            <h2 className={subtitle()}>From Ideas to Solutions</h2>
          </div>
        </div>
      </section>

      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
        id="skill"
      >
        <div className="flex flex-col md:flex-col items-center justify-center gap-10">
          <div className="max-w-lg text-center">
            <h1 className={title({ color: "turqoise", size: "sm" })}>
              My Skills
            </h1>
            <h2 className={subtitle()}>Shaping My Expertise</h2>
          </div>
        </div>
      </section>

      <section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
        id="contact"
      >
        <div className="flex flex-col md:flex-col items-center justify-center gap-10">
          <div className="max-w-lg text-center">
            <h1 className={title({ color: "turqoise", size: "sm" })}>
              Contact Me
            </h1>
            <h2 className={subtitle()}>
              Reach out to me easily through the contact form or my social media
              profiles.
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
