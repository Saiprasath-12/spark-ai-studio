import { useRef, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useState } from 'react';
import { Briefcase, Code2, Brain, Rocket, Layers, Cpu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExperienceCard {
  icon: React.ElementType;
  date: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
  accent: string;
}

const experiences: ExperienceCard[] = [
  {
    icon: Rocket,
    date: '2025 – Present',
    role: 'AI Engineer',
    company: 'Freelance',
    description: 'Building intelligent automation systems and AI-powered applications.',
    skills: ['Python', 'LangChain', 'OpenAI', 'RAG'],
    accent: '#00d4ff',
  },
  {
    icon: Code2,
    date: '2024 – 2025',
    role: 'Full-Stack Developer',
    company: 'Projects & Freelance',
    description: 'Developing scalable web applications with modern frameworks.',
    skills: ['React', 'Node.js', 'TypeScript', 'Tailwind'],
    accent: '#a855f7',
  },
  {
    icon: Brain,
    date: '2024',
    role: 'ML Research Intern',
    company: 'Academic Research',
    description: 'Explored deep learning architectures for NLP and computer vision tasks.',
    skills: ['PyTorch', 'TensorFlow', 'NLP', 'CV'],
    accent: '#22c55e',
  },
  {
    icon: Layers,
    date: '2023 – 2024',
    role: 'Backend Developer',
    company: 'Student Projects',
    description: 'Designed REST APIs and database architectures for production apps.',
    skills: ['FastAPI', 'PostgreSQL', 'Docker', 'Redis'],
    accent: '#f59e0b',
  },
  {
    icon: Cpu,
    date: '2023',
    role: 'IoT Developer',
    company: 'Hackathon Projects',
    description: 'Built embedded systems and IoT prototypes with real-time data.',
    skills: ['Arduino', 'Raspberry Pi', 'MQTT', 'Sensors'],
    accent: '#ef4444',
  },
  {
    icon: Briefcase,
    date: '2022 – 2023',
    role: 'Web Developer',
    company: 'College Club',
    description: 'Created event websites and dashboards for college organizations.',
    skills: ['HTML/CSS', 'JavaScript', 'Firebase', 'Figma'],
    accent: '#06b6d4',
  },
];

// Single animated card driven by scroll
const WaveCard = ({
  card,
  index,
  totalCards,
  smoothProgress,
}: {
  card: ExperienceCard;
  index: number;
  totalCards: number;
  smoothProgress: any;
}) => {
  const [hovered, setHovered] = useState(false);

  const phase = useTransform(smoothProgress, (p: number) => {
    return p * totalCards * 1.2 - index * 1.2;
  });

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

  const Icon = card.icon;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 cursor-pointer"
      style={{
        x,
        y,
        scale,
        rotateY,
        rotateZ,
        opacity,
        filter: filterStr,
        zIndex,
        marginLeft: -130,
        marginTop: -180,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-[260px] h-[360px] rounded-[20px] p-6 flex flex-col justify-between relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(16,16,22,0.98), rgba(8,8,12,0.99))',
          backdropFilter: 'blur(8px)',
          border: `2px solid ${card.accent}`,
          boxShadow: hovered
            ? `0 30px 60px rgba(0,0,0,0.6), 0 0 80px ${card.accent}50`
            : `0 30px 60px rgba(0,0,0,0.6), 0 0 50px ${card.accent}30`,
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Icon */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${card.accent}20` }}
          >
            <Icon size={20} style={{ color: card.accent }} />
          </div>
          <span className="text-xs font-mono" style={{ color: card.accent }}>
            {card.date}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center gap-2 mt-4">
          <h3 className="text-lg font-bold text-foreground">{card.role}</h3>
          <p className="text-sm text-muted-foreground">{card.company}</p>
          <p className="text-xs text-muted-foreground/70 leading-relaxed mt-1">
            {card.description}
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {card.skills.map((skill) => (
            <span
              key={skill}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                background: `${card.accent}15`,
                color: card.accent,
                border: `1px solid ${card.accent}30`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Floating particle
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

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 90,
  });

  const badgeOpacity = useTransform(scrollYProgress, [0.98, 1], [0, 1]);

  const particles = useMemo(
    () => Array.from({ length: 30 }, (_, i) => <Particle key={i} i={i} />),
    []
  );

  // Mobile: simple vertical stack
  if (isMobile) {
    return (
      <section id="experience" className="py-20 px-6 relative" style={{ background: '#0a0a0f' }}>
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12">
            <span className="text-gradient">Experience</span>
          </h2>
          <div className="flex flex-col gap-6 max-w-md mx-auto">
            {experiences.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.role}
                  className="rounded-[20px] p-6 flex flex-col gap-3"
                  style={{
                    background: 'linear-gradient(145deg, rgba(16,16,22,0.98), rgba(8,8,12,0.99))',
                    border: `2px solid ${card.accent}`,
                    boxShadow: `0 0 30px ${card.accent}20`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${card.accent}20` }}
                    >
                      <Icon size={20} style={{ color: card.accent }} />
                    </div>
                    <span className="text-xs font-mono" style={{ color: card.accent }}>
                      {card.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{card.role}</h3>
                  <p className="text-sm text-muted-foreground">{card.company}</p>
                  <p className="text-xs text-muted-foreground/70">{card.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {card.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: `${card.accent}15`,
                          color: card.accent,
                          border: `1px solid ${card.accent}30`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative"
      style={{ height: '700vh', background: '#0a0a0f' }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background ambiance */}
        <div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'rgba(0,255,136,0.06)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'rgba(138,43,226,0.05)',
            filter: 'blur(100px)',
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.015) 49px, rgba(255,255,255,0.015) 50px),
              repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.015) 49px, rgba(255,255,255,0.015) 50px)`,
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>

        {/* Header */}
        <div className="absolute top-12 left-0 right-0 text-center z-20">
          <h2 className="text-4xl md:text-6xl font-black">
            <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">Scroll to explore my journey</p>
        </div>

        {/* Cards container */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: 1200 }}
        >
          {experiences.map((card, i) => (
            <WaveCard
              key={card.role}
              card={card}
              index={i}
              totalCards={experiences.length}
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
            ✨ Journey Complete
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
