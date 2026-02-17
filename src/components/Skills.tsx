import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const categories = ['All', 'Languages', 'AI Ecosystem', 'Full Stack', 'Database', 'DevOps & Tools'];
const allSkills = [
  { name: 'Java', cat: 'Languages', icon: '☕' },
  { name: 'Python', cat: 'Languages', icon: '🐍' },
  { name: 'C', cat: 'Languages', icon: '🔤' },
  { name: 'TypeScript', cat: 'Languages', icon: 'TS' },
  { name: 'Gemini', cat: 'AI Ecosystem', icon: '✨' },
  { name: 'DeepSeek', cat: 'AI Ecosystem', icon: '🐋' },
  { name: 'Claude AI', cat: 'AI Ecosystem', icon: '🎭' },
  { name: 'Nanobana', cat: 'AI Ecosystem', icon: '🍌' },
  { name: 'Flow', cat: 'AI Ecosystem', icon: '🌊' },
  { name: 'Antigravity', cat: 'AI Ecosystem', icon: '🛰️' },
  { name: 'React', cat: 'Full Stack', icon: '⚛️' },
  { name: 'Flask', cat: 'Full Stack', icon: '🧪' },
  { name: 'Tailwind CSS', cat: 'Full Stack', icon: '🎨' },
  { name: 'HTML5', cat: 'Full Stack', icon: '🌐' },
  { name: 'CSS3', cat: 'Full Stack', icon: '🎨' },
  { name: 'MySQL', cat: 'Database', icon: '🐬' },
  { name: 'Firebase', cat: 'Database', icon: '🔥' },
  { name: 'MongoDB', cat: 'Database', icon: '🍃' },
  { name: 'Vercel', cat: 'DevOps & Tools', icon: '▲' },
  { name: 'Git', cat: 'DevOps & Tools', icon: '🌿' },
  { name: 'GitHub', cat: 'DevOps & Tools', icon: '🐙' },
  { name: 'Docker', cat: 'DevOps & Tools', icon: '🐳' },
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
          {filtered.map((skill, i) => (
            <div
              key={skill.name}
              className="glass rounded-2xl p-5 text-center hover:scale-110 hover:glow-cyan-sm transition-all duration-300 cursor-default"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="text-3xl mb-2">{skill.icon}</div>
              <div className="text-sm font-semibold text-foreground">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
