import { useRef, useMemo, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { Github, Sparkles, Loader2, X, Terminal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  accent: string;
}

const projects: Project[] = [
  {
    title: 'Fake News Detection System',
    description: 'Full-stack NLP web application built using Flask and React to classify news articles as real or fake using TF-IDF and machine learning models.',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800',
    tags: ['Flask', 'React', 'NLP', 'ML'],
    github: 'https://github.com/Saiprasath-12/Naan-Mudhalvan-Fake-News-Detector-Project',
    accent: '#00d4ff',
  },
  {
    title: 'Financial Management System',
    description: 'Full-stack web application to manage income, expenses, and budgets using React, TS, Flask, and MySQL with secure CRUD and dashboards.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
    tags: ['React', 'TS', 'MySQL'],
    github: 'https://github.com/Saiprasath-12/SocietyFinanceManagement',
    accent: '#a855f7',
  },
  {
    title: 'Virus Hunter',
    description: 'Antivirus simulation system implementing signature-based scanning logic to identify malware payloads in a modular architecture.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    tags: ['Cybersecurity', 'Python', 'Signature-Scanning'],
    github: 'https://github.com/Saiprasath-12/Virus-Hunter',
    accent: '#22c55e',
  },
  {
    title: 'Vitals Monitoring AI',
    description: 'AI-powered webcam system detecting respiratory and heart rates using real-time video processing and CV algorithms.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    tags: ['AI', 'OpenCV', 'HealthTech'],
    github: 'https://github.com/Saiprasath-12/Respiratory-rate-using-ai-webcam',
    accent: '#f59e0b',
  },
  {
    title: 'AgriChain-Nizamabad',
    description: 'Decentralized regional blockchain implementation securing agricultural supply chain records for enhanced transparency.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800',
    tags: ['Solidity', 'Blockchain', 'Web3'],
    github: 'https://github.com/Saiprasath-12/AgriChain-Nizamabad',
    accent: '#ef4444',
  },
  {
    title: 'MentisAI',
    description: 'Intelligent NLP-driven application focused on mental health support and cognitive assistance using advanced language models.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    tags: ['NLP', 'LLM', 'React', 'AI'],
    github: 'https://github.com/Saiprasath-12/MentisAI',
    accent: '#06b6d4',
  },
];

/* ── Wave Card ── */
const WaveProjectCard = ({
  project,
  index,
  totalCards,
  smoothProgress,
}: {
  project: Project;
  index: number;
  totalCards: number;
  smoothProgress: any;
}) => {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [deepDive, setDeepDive] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const phase = useTransform(smoothProgress, (p: number) => p * totalCards * 1.2 - index * 1.2);

  const rawX = useTransform(phase, (ph: number) => -Math.sin(ph) * 450);
  const rawY = useTransform(phase, (ph: number) => -(ph * 120 - Math.abs(Math.sin(ph)) * 80));
  const rawScale = useTransform(phase, (ph: number) => 0.55 + (Math.cos(ph) + 1) * 0.45);
  const rawRotateY = useTransform(phase, (ph: number) => Math.sin(ph) * 50);
  const rawRotateZ = useTransform(phase, (ph: number) => Math.sin(ph) * -8);
  const rawOpacity = useTransform(phase, (ph: number) => (Math.abs(ph) > 4 ? 0 : 1));
  const blur = useTransform(phase, (ph: number) => {
    const dist = Math.abs(ph);
    return dist < 0.35 ? 0 : (dist - 0.35) * 6;
  });
  const zIndex = useTransform(phase, (ph: number) => 100 - Math.round(Math.abs(ph) * 10));

  const springCfg = { damping: 18, stiffness: 80, mass: 0.3 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);
  const scale = useSpring(rawScale, springCfg);
  const rotateY = useSpring(rawRotateY, springCfg);
  const rotateZ = useSpring(rawRotateZ, springCfg);
  const opacity = useSpring(rawOpacity, springCfg);
  const filterStr = useTransform(blur, (b: number) => `blur(${b}px)`);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const handleAnalysis = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('saibot-chat', {
        body: {
          messages: [{ role: 'user', content: `Provide a brief 1-paragraph architectural analysis of this project: ${project.title} - ${project.description}. Tags: ${project.tags.join(', ')}` }],
          mode: 'analysis',
        },
      });
      if (error) throw error;
      setDeepDive(data?.reply || 'Analysis unavailable.');
    } catch {
      setDeepDive('Analysis unavailable at the moment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.div
        className="absolute top-1/2 left-1/2 cursor-pointer"
        style={{
          x, y, scale, rotateY, rotateZ, opacity,
          filter: filterStr,
          zIndex,
          marginLeft: -160,
          marginTop: -220,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="w-[320px] h-[440px] rounded-[20px] relative overflow-hidden flex flex-col"
          style={{
            background: 'linear-gradient(145deg, rgba(16,16,22,0.98), rgba(8,8,12,0.99))',
            backdropFilter: 'blur(8px)',
            border: `2px solid ${project.accent}`,
            boxShadow: hovered
              ? `0 30px 60px rgba(0,0,0,0.6), 0 0 80px ${project.accent}50`
              : `0 30px 60px rgba(0,0,0,0.6), 0 0 50px ${project.accent}30`,
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Cursor spotlight */}
          <div
            className="absolute inset-0 z-[2] pointer-events-none rounded-[20px] transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, ${project.accent}15, transparent 70%)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          {/* Scanning line */}
          {hovered && (
            <div
              className="absolute inset-x-0 z-[3] pointer-events-none h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${project.accent}99, transparent)`,
                animation: 'scanLine 2.5s linear infinite',
              }}
            />
          )}

          {/* Image area */}
          <div className="relative h-[180px] overflow-hidden flex-shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: hovered ? 'scale(1.15)' : 'scale(1)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,12,1)] via-[rgba(8,8,12,0.6)] to-transparent" />

            {/* Terminal header dots */}
            <div className="absolute top-3 left-3 flex gap-1.5 z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" style={{ boxShadow: hovered ? '0 0 6px #ef4444' : 'none' }} />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" style={{ boxShadow: hovered ? '0 0 6px #eab308' : 'none' }} />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" style={{ boxShadow: hovered ? '0 0 6px #22c55e' : 'none' }} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between p-5">
            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: `${project.accent}15`,
                      color: project.accent,
                      border: `1px solid ${project.accent}30`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">{project.title}</h3>
              <p className="text-xs text-muted-foreground/70 leading-relaxed line-clamp-3">{project.description}</p>
            </div>

            <div className="flex gap-2 mt-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl hover:scale-110 transition-all duration-300"
                style={{ background: `${project.accent}15` }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} style={{ color: project.accent }} />
              </a>
              <button
                onClick={handleAnalysis}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
                style={{ background: `${project.accent}15`, color: project.accent }}
              >
                {isLoading ? <Loader2 size={12} className="animate-spin" /> : <><Sparkles size={12} /> Analysis ✨</>}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analysis Modal */}
      {deepDive && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setDeepDive(null)}>
          <div className="glass rounded-3xl p-8 max-w-lg w-full relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setDeepDive(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-2 hover:bg-secondary rounded-full transition-colors">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-foreground mb-4">{project.title} Review</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{deepDive}</p>
          </div>
        </div>
      )}
    </>
  );
};

/* ── Floating particle ── */
const Particle = ({ i }: { i: number }) => {
  const dur = 10 + Math.random() * 15;
  const left = Math.random() * 100;
  const size = 1 + Math.random() * 2;
  const delay = Math.random() * dur;

  return (
    <motion.div
      className="absolute rounded-full bg-foreground/20"
      style={{ left: `${left}%`, width: size, height: size }}
      animate={{ y: [0, -80, 0] }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: 'linear' }}
    />
  );
};

/* ── Main Component ── */
const ProjectShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 90 });
  const badgeOpacity = useTransform(scrollYProgress, [0.98, 1], [0, 1]);

  const particles = useMemo(
    () => Array.from({ length: 30 }, (_, i) => <Particle key={i} i={i} />),
    []
  );

  // Mobile: vertical stack
  if (isMobile) {
    return (
      <section id="projects" className="py-20 px-6 relative" style={{ background: '#080810' }}>
        <div className="container mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">
            <span className="text-gradient">Project Showcase</span>
          </h2>
          <div className="flex flex-col gap-6 max-w-sm mx-auto">
            {projects.map((p) => (
              <div
                key={p.title}
                className="rounded-[20px] overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, rgba(16,16,22,0.98), rgba(8,8,12,0.99))',
                  border: `2px solid ${p.accent}`,
                  boxShadow: `0 0 30px ${p.accent}20`,
                }}
              >
                <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ background: `${p.accent}15`, color: p.accent, border: `1px solid ${p.accent}30` }}>{t}</span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1">{p.title}</h3>
                  <p className="text-xs text-muted-foreground/70 mb-3">{p.description}</p>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: p.accent }}>
                    <Github size={14} /> View Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ height: '700vh', background: '#080810' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Glow orbs */}
        <div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'rgba(0,255,136,0.06)', filter: 'blur(120px)' }}
        />
        <div
          className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'rgba(138,43,226,0.05)', filter: 'blur(100px)' }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.015) 49px, rgba(255,255,255,0.015) 50px),
              repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.015) 49px, rgba(255,255,255,0.015) 50px)`,
          }}
        />

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>

        {/* Header */}
        <div className="absolute top-12 left-0 right-0 text-center z-20">
          <h2 className="text-4xl md:text-6xl font-black">
            <span className="text-gradient">Project Showcase</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">Scroll to explore my work</p>
        </div>

        {/* Cards container */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: 1200 }}>
          {projects.map((p, i) => (
            <WaveProjectCard
              key={p.title}
              project={p}
              index={i}
              totalCards={projects.length}
              smoothProgress={smoothProgress}
            />
          ))}
        </div>

        {/* Completion badge */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          style={{ opacity: badgeOpacity }}
        >
          <div className="px-6 py-3 rounded-full glass border border-primary/30 text-primary text-sm font-medium">
            ✨ All Projects Explored
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
