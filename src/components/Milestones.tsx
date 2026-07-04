import { Award, GraduationCap, Zap, Star, Trophy, Rocket } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const milestones = [
  { icon: Star, title: 'Reliance Foundation Scholar', desc: 'Reliance Foundation Undergraduate Scholar (2023–2027) — merit-based national scholarship.', accent: 'text-primary' },
  { icon: Trophy, title: 'SAP × Great Lakes Hackfest 2026', desc: 'Top 30 teams among 500+ participating teams nationally.', accent: 'text-yellow-400' },
  { icon: Rocket, title: 'NASA Space Apps Challenge 2025', desc: 'Awarded Galactic Problem Solver Recognition for innovative solution design.', accent: 'text-purple-400' },
  { icon: Zap, title: 'Nallas CodeXcelerate 2025', desc: 'National-Level Hackathon Finalist recognized for technical excellence.', accent: 'text-emerald-400' },
  { icon: Award, title: 'PSG iTech Project Expo 2025', desc: 'Special Mention Award for standout technical implementation.', accent: 'text-orange-400' },
  { icon: GraduationCap, title: 'BITS Pilani Hyderabad', desc: 'Presented AgriChain-Nizamabad at the Innovation Showcase.', accent: 'text-cyan-400' },
];

const certifications = [
  'Oracle Cloud Infrastructure 2025 AI Foundations Associate',
  'Oracle Cloud Infrastructure 2025 Foundations Associate',
  'NPTEL Elite — Google Cloud Computing Foundations',
  'Oracle Generative AI Internship Certificate',
  'NASA Space Apps 2025 Galactic Problem Solver',
];

const Milestones = () => {
  const scrollRef = useScrollAnimation();

  return (
    <section id="milestones" className="py-24 relative" ref={scrollRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-gradient text-center mb-12 animate-on-scroll">Achievements & Certifications</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
          {milestones.map((m, i) => {
            const IconComp = m.icon;
            return (
              <div key={i} className={`animate-on-scroll stagger-${Math.min(i + 1, 5)} glass rounded-2xl p-6 hover:scale-105 hover:-translate-y-1 transition-all duration-300`}>
                <IconComp className={`${m.accent} mb-3`} size={28} />
                <h3 className="font-bold text-foreground mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto glass rounded-2xl p-8 animate-on-scroll">
          <h3 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
            <Award className="text-primary" size={22} /> Certifications
          </h3>
          <ul className="grid sm:grid-cols-2 gap-3">
            {certifications.map((c, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Milestones;
