"use client";

import dynamic from "next/dynamic";
import { LazySection } from "@/components/lazy-section";
import HomeLayout from "./home/layout";
import HomePage from "./home/page";

const ProjectPage = dynamic(() => import("./project/page"), { ssr: false });
const SkillPage = dynamic(() => import("./skill/page"), { ssr: false });
const ExperiencePage = dynamic(() => import("./experience/page"), { ssr: false });
const AboutPage = dynamic(() => import("./about/page"), { ssr: false });
const ContactPage = dynamic(() => import("./contact/page"), { ssr: false });

export default function Home() {
  return (
    <>
      <HomeLayout>
        <HomePage />
      </HomeLayout>

      <LazySection id="project" minHeight="900px">
        <ProjectPage />
      </LazySection>

      <LazySection id="skill" minHeight="720px">
        <SkillPage />
      </LazySection>

      <LazySection id="experience" className="flex flex-col items-center justify-center gap-4 py-8 md:py-0 mb-20" minHeight="760px">
        <ExperiencePage />
      </LazySection>

      <LazySection id="about" minHeight="900px">
        <AboutPage />
      </LazySection>

      <LazySection id="contact" className="flex flex-col items-center justify-center gap-4 py-8 md:py-0 mb-20" minHeight="680px">
        <ContactPage />
      </LazySection>
    </>
  );
}
