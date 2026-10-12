import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const sections: Record<string, () => JSX.Element> = {
  about: AboutSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  services: ServicesSection,
  projects: ProjectsSection,
  contact: ContactSection,
};

const Index = () => {
  const [hash, setHash] = useState(() => window.location.hash.slice(1));

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash.slice(1));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const Section = sections[hash];


  return (
    <main
      className={
        Section
          ? "min-h-screen bg-background"
          : "h-[100dvh] overflow-hidden bg-background"
      }
    >
      <Navbar active={hash} />
      {Section ? (
        <div className="pt-16 md:pt-20">
          <Section />
          <Footer />
        </div>
      ) : (
        <HeroSection />
      )}
    </main>
  );
};

export default Index;
