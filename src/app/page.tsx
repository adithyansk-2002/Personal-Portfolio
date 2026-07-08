import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import AboutSection from '@/app/components/AboutSection';
import SkillsSection from '@/app/components/SkillsSection';
import ExperienceSection from '@/app/components/ExperienceSection';
import ProjectsSection from '@/app/components/ProjectsSection';
import AWSArchitectureSection from '@/app/components/AWSArchitectureSection';
import TerminalSection from '@/app/components/TerminalSection';
import CertificationsSection from '@/app/components/CertificationsSection';
import ContactSection from '@/app/components/ContactSection';
import EasterEggs from '@/app/components/EasterEggs';
import BackgroundEffects from '@/app/components/BackgroundEffects';
import ScrollToTopButton from '@/app/components/ScrollToTopButton';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <BackgroundEffects />
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <AWSArchitectureSection />
      <TerminalSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
      <EasterEggs />
      <ScrollToTopButton />
    </main>
  );
}