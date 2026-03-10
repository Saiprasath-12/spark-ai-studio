import { useState, useCallback } from 'react';
import ConstellationBackground from '@/components/ConstellationBackground';
import BinaryRain from '@/components/BinaryRain';
import FloatingNav from '@/components/FloatingNav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import ProjectShowcase from '@/components/ProjectShowcase';
import Milestones from '@/components/Milestones';
import Blog from '@/components/Blog';
import Connect from '@/components/Connect';
import Footer from '@/components/Footer';
import SaiBot from '@/components/SaiBot';
import LiveViewCounter from '@/components/LiveViewCounter';
import WelcomeScreen from '@/components/WelcomeScreen';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [heroEntered, setHeroEntered] = useState(false);

  const handleWelcomeComplete = useCallback(() => {
    setShowWelcome(false);
    // Small delay so Hero is visible before animating in
    setTimeout(() => setHeroEntered(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
      <CustomCursor />
      <ConstellationBackground />
      <BinaryRain />
      <FloatingNav />
      <Hero entered={heroEntered} />
      <About />
      <Skills />
      <ProjectShowcase />
      <Milestones />
      <Blog />
      <Connect />
      <SaiBot />
      <LiveViewCounter />
      <Footer />
    </div>
  );
};

export default Index;
