import { useState, useRef, useCallback, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Code, Terminal, Cpu, FileCode, Sparkles, Search, Brain, Bot,
  Workflow, Rocket, Atom, FlaskConical, Paintbrush, Globe, Palette,
  Database, Flame, Leaf, Triangle, GitBranch, Github, Container,
  Cloud, Server, Send, Code2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const categories = ['All', 'Languages', 'AI Ecosystem', 'Full Stack', 'Database', 'DevOps & Tools'];

interface Skill { name: string; cat: string; Icon: LucideIcon; color: string }

const allSkills: Skill[] = [
  { name: 'Java', cat: 'Languages', Icon: Code, color: '#f89820' },
  { name: 'Python', cat: 'Languages', Icon: Terminal, color: '#3776ab' },
  { name: 'C', cat: 'Languages', Icon: Cpu, color: '#a8b9cc' },
  { name: 'TypeScript', cat: 'Languages', Icon: FileCode, color: '#3178c6' },
  { name: 'Gemini', cat: 'AI Ecosystem', Icon: Sparkles, color: '#8b5cf6' },
  { name: 'DeepSeek', cat: 'AI Ecosystem', Icon: Search, color: '#0ea5e9' },
  { name: 'Claude AI', cat: 'AI Ecosystem', Icon: Brain, color: '#d97706' },
  { name: 'Nanobana', cat: 'AI Ecosystem', Icon: Bot, color: '#f59e0b' },
  { name: 'Flow', cat: 'AI Ecosystem', Icon: Workflow, color: '#06b6d4' },
  { name: 'Antigravity', cat: 'AI Ecosystem', Icon: Rocket, color: '#ef4444' },
  { name: 'React', cat: 'Full Stack', Icon: Atom, color: '#61dafb' },
  { name: 'Flask', cat: 'Full Stack', Icon: FlaskConical, color: '#22c55e' },
  { name: 'Tailwind CSS', cat: 'Full Stack', Icon: Paintbrush, color: '#38bdf8' },
  { name: 'HTML5', cat: 'Full Stack', Icon: Globe, color: '#e34f26' },
  { name: 'CSS3', cat: 'Full Stack', Icon: Palette, color: '#264de4' },
  { name: 'Node.js', cat: 'Full Stack', Icon: Server, color: '#68a063' },
  { name: 'MySQL', cat: 'Database', Icon: Database, color: '#00758f' },
  { name: 'Firebase', cat: 'Database', Icon: Flame, color: '#ffca28' },
  { name: 'MongoDB', cat: 'Database', Icon: Leaf, color: '#47a248' },
  { name: 'Supabase', cat: 'Database', Icon: Cloud, color: '#3ecf8e' },
  { name: 'Vercel', cat: 'DevOps & Tools', Icon: Triangle, color: '#ffffff' },
  { name: 'Git', cat: 'DevOps & Tools', Icon: GitBranch, color: '#f05032' },
  { name: 'GitHub', cat: 'DevOps & Tools', Icon: Github, color: '#c9d1d9' },
  { name: 'Docker', cat: 'DevOps & Tools', Icon: Container, color: '#2496ed' },
  { name: 'Postman', cat: 'DevOps & Tools', Icon: Send, color: '#ff6c37' },
  { name: 'VS Code', cat: 'DevOps & Tools', Icon: Code2, color: '#007acc' },
];

/* ── Magnetic Filter Pill ── */
const MagneticPill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 80) {
      const pull = (1 - dist / 80) * 6;
      ref.current.style.transform = `translate(${dx * pull / 80}px, ${dy * pull / 80}px) scale(${active ? 1.05 : 1})`;
    }
  }, [active]);

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = `translate(0,0) scale(${active ? 1.05 : 1})`;
  }, [active]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`magnetic-pill px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
        active
          ? 'bg-foreground text-background shadow-[0_0_20px_hsl(187_92%_50%/0.4)] scale-105'
          : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent'
      }`}
    >
      {label}
    </button>
  );
};

/* ── Skill Card with 3D tilt, spotlight, orbit ring, bottom bar ── */
const SkillCard = ({ skill, index, visible }: { skill: Skill; index: number; visible: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.transform = `rotateY(${x * 15}deg) rotateX(${-y * 15}deg)`;
    cardRef.current.style.setProperty('--mouse-x', `${mx}%`);
    cardRef.current.style.setProperty('--mouse-y', `${my}%`);
  }, []);

  const handleLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
    setHovered(false);
  }, []);

  const IconComp = skill.Icon;

  return (
    <div
      className="skill-card-perspective"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        className={`skill-card-3d skill-card-bar skill-card-spotlight glass rounded-2xl p-5 text-center cursor-default group ${visible ? 'skill-card-visible' : 'skill-card-hidden'}`}
        style={{
          '--brand-color': skill.color,
          transitionDelay: `${index * 30}ms`,
        } as React.CSSProperties}
      >
        {/* Content with translateZ for parallax */}
        <div style={{ transform: 'translateZ(30px)' }}>
          <div className="flex justify-center mb-3">
            <div className="relative">
              {/* Orbiting ring */}
              <div
                className="skill-orbit-ring absolute inset-[-6px] rounded-full border-2 pointer-events-none"
                style={{
                  borderColor: hovered ? skill.color : 'transparent',
                  opacity: hovered ? 1 : 0,
                  transition: 'opacity 0.3s, border-color 0.3s',
                }}
              />
              <div
                className="bg-primary/10 rounded-xl p-2 transition-colors duration-300"
                style={{ backgroundColor: hovered ? `${skill.color}20` : undefined }}
              >
                <IconComp
                  size={28}
                  className="transition-all duration-300"
                  style={{
                    color: hovered ? skill.color : undefined,
                    filter: hovered ? `drop-shadow(0 0 8px ${skill.color}99)` : undefined,
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className="text-sm font-semibold transition-colors duration-300"
            style={{ color: hovered ? skill.color : undefined }}
          >
            {skill.name}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Main Skills Section ── */
const Skills = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [animating, setAnimating] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const scrollRef = useScrollAnimation();
  const filtered = activeTab === 'All' ? allSkills : allSkills.filter((s) => s.cat === activeTab);

  const switchCategory = (cat: string) => {
    if (cat === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(cat);
      setRenderKey((k) => k + 1);
      // Let new cards mount, then reveal
      requestAnimationFrame(() => setAnimating(false));
    }, 200);
  };

  return (
    <section id="skills" className="py-24 relative" ref={scrollRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-gradient text-center mb-10 animate-on-scroll">Technical Core</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-on-scroll stagger-1">
          {categories.map((cat) => (
            <MagneticPill key={cat} label={cat} active={activeTab === cat} onClick={() => switchCategory(cat)} />
          ))}
        </div>
        <div
          key={renderKey}
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 transition-opacity duration-200 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          style={{ transition: 'opacity 0.2s, transform 0.2s' }}
        >
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} visible={!animating} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
