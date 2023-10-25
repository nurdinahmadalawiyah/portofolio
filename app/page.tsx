"use client";
import AboutPage from "./about/page";
import AboutLayout from "./about/layout";
import WorkPage from "./work/page";
import WorkLayout from "./work/layout";
import ProjectPage from "./project/page";
import ProjectLayout from "./project/layout";
import SkillLayout from "./skill/layout";
import SkillPage from "./skill/page";
import ContactLayout from "./contact/layout";
import ContactPage from "./contact/page";
import HomeLayout from "./home/layout";
import HomePage from "./home/page";

export default function Home() {
  return (
    <>
      <HomeLayout>
        <HomePage />
      </HomeLayout>

      <AboutLayout>
        <AboutPage />
      </AboutLayout>

      <WorkLayout>
        <WorkPage />
      </WorkLayout>
      
      <ProjectLayout>
        <ProjectPage />
      </ProjectLayout>

      <SkillLayout>
        <SkillPage />
      </SkillLayout>

      <ContactLayout>
        <ContactPage />
      </ContactLayout>
    </>
  );
}
