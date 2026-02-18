import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  Code, Terminal, Cpu, FileCode, Sparkles, Search, Brain, Bot,
  Workflow, Rocket, Atom, FlaskConical, Paintbrush, Globe, Palette,
  Database, Flame, Leaf, Triangle, GitBranch, Github, Container,
  Cloud, Server, Send, Code2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const categories = ['All', 'Languages', 'AI Ecosystem', 'Full Stack', 'Database', 'DevOps & Tools'];

const allSkills: { name: string; cat: string; Icon: LucideIcon }[] = [
  { name: 'Java', cat: 'Languages', Icon: Code },
  { name: 'Python', cat: 'Languages', Icon: Terminal },
  { name: 'C', cat: 'Languages', Icon: Cpu },
  { name: 'TypeScript', cat: 'Languages', Icon: FileCode },
  { name: 'Gemini', cat: 'AI Ecosystem', Icon: Sparkles },
  { name: 'DeepSeek', cat: 'AI Ecosystem', Icon: Search },
  { name: 'Claude AI', cat: 'AI Ecosystem', Icon: Brain },
  { name: 'Nanobana', cat: 'AI Ecosystem', Icon: Bot },
  { name: 'Flow', cat: 'AI Ecosystem', Icon: Workflow },
  { name: 'Antigravity', cat: 'AI Ecosystem', Icon: Rocket },
  { name: 'React', cat: 'Full Stack', Icon: Atom },
  { name: 'Flask', cat: 'Full Stack', Icon: FlaskConical },
  { name: 'Tailwind CSS', cat: 'Full Stack', Icon: Paintbrush },
  { name: 'HTML5', cat: 'Full Stack', Icon: Globe },
  { name: 'CSS3', cat: 'Full Stack', Icon: Palette },
  { name: 'Node.js', cat: 'Full Stack', Icon: Server },
  { name: 'MySQL', cat: 'Database', Icon: Database },
  { name: 'Firebase', cat: 'Database', Icon: Flame },
  { name: 'MongoDB', cat: 'Database', Icon: Leaf },
  { name: 'Supabase', cat: 'Database', Icon: Cloud },
  { name: 'Vercel', cat: 'DevOps & Tools', Icon: Triangle },
  { name: 'Git', cat: 'DevOps & Tools', Icon: GitBranch },
  { name: 'GitHub', cat: 'DevOps & Tools', Icon: Github },
  { name: 'Docker', cat: 'DevOps & Tools', Icon: Container },
  { name: 'Postman', cat: 'DevOps & Tools', Icon: Send },
  { name: 'VS Code', cat: 'DevOps & Tools', Icon: Code2 },
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState('All');
  const scrollRef = useScrollAnimation();
  const filtered = activeTab === 'All' ? allSkills : allSkills.filter((s) => s.cat === activeTab);

  return (
    <section id="skills" className="py-24 relative" ref={scrollRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-gradient text-center mb-10 animate-on-scroll">Technical Core</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-on-scroll stagger-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-primary text-primary-foreground shadow-lg glow-cyan-sm scale-105'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((skill, i) => {
            const IconComp = skill.Icon;
            return (
              <div
                key={skill.name}
                className="skill-card glass rounded-2xl p-5 text-center hover:scale-110 hover:glow-cyan-sm transition-all duration-300 cursor-default group animate-on-scroll"
                style={{ animationDelay: `${i * 60}ms`, transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex justify-center mb-3">
                  <div className="bg-primary/10 rounded-xl p-2 group-hover:bg-primary/20 group-hover:animate-pulse-glow transition-colors duration-300">
                    <IconComp size={28} className="text-primary group-hover:drop-shadow-[0_0_8px_hsl(187_92%_50%/0.6)] transition-all duration-300" />
                  </div>
                </div>
                <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{skill.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
