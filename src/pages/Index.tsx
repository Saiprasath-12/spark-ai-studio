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

const Index = () => (
  <div className="min-h-screen bg-background text-foreground relative">
    <ConstellationBackground />
    <BinaryRain />
    <FloatingNav />
    <Hero />
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

export default Index;
