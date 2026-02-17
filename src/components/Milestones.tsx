import { Award, GraduationCap, Zap, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const milestones = [
  { icon: Zap, title: '7+ National Hackathons', desc: 'Presented technical solutions at prestigious venues like BITS Pilani Hyderabad and PSG iTech.', accent: 'text-yellow-400' },
  { icon: Award, title: 'OCI Certified', desc: 'Oracle Cloud Infrastructure certified professional.', accent: 'text-primary' },
  { icon: GraduationCap, title: 'NPTEL Expert', desc: 'Completed advanced NPTEL courses with excellence.', accent: 'text-purple-400' },
  { icon: Star, title: '8.5 CGPA Excellence', desc: 'Consistent academic performance at PSG iTech.', accent: 'text-emerald-400' },
  { icon: Award, title: '2x Special Mentions', desc: 'Recognized for unique technical implementation and architectural clarity in national showcases.', accent: 'text-orange-400' },
];

const Milestones = () => {
  const scrollRef = useScrollAnimation();

  return (
    <section id="milestones" className="py-24 relative" ref={scrollRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-gradient text-center mb-12 animate-on-scroll">Honors & Milestones</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
      </div>
    </section>
  );
};

export default Milestones;
