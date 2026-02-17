import { Code, Zap, GraduationCap, Activity, Shield, Layers } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { label: 'Projects Built', value: 20, suffix: '+', icon: Code, color: 'text-primary' },
  { label: 'Hackathons', value: 7, suffix: '+', icon: Zap, color: 'text-yellow-400' },
  { label: 'B.Tech CGPA', value: 8.5, suffix: '', icon: GraduationCap, color: 'text-purple-400' },
  { label: 'Special Mentions', value: 2, suffix: '', icon: Activity, color: 'text-emerald-400' },
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const isFloat = !Number.isInteger(target);
        const steps = 40;
        let step = 0;
        const interval = setInterval(() => {
          step++;
          const val = (target / steps) * step;
          setCount(isFloat ? parseFloat(val.toFixed(1)) : Math.round(val));
          if (step >= steps) clearInterval(interval);
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const scrollRef = useScrollAnimation();

  return (
    <section id="about" className="py-24 relative" ref={scrollRef}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-gradient animate-on-scroll">Software Engineer</h2>
            <div className="space-y-4 text-muted-foreground animate-on-scroll stagger-1">
              <p>I am an aspiring Software Engineer passionate about building scalable, high-performance web applications. With a strong foundation in full-stack development, I focus on design patterns and solving real-world challenges.</p>
              <p>I thrive on turning complex logic into efficient, user-centric experiences while maintaining a rigorous standard for code integrity.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => {
                const IconComp = stat.icon;
                return (
                  <div key={i} className={`animate-on-scroll stagger-${i + 1} p-5 glass rounded-2xl text-center hover:scale-105 transition-transform`}>
                    <IconComp className={`mx-auto mb-2 ${stat.color}`} size={24} />
                    <div className="text-3xl font-black text-foreground">
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-6">
            <div className="glass rounded-2xl p-8 animate-on-scroll stagger-2">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Layers className="text-primary" size={20} /> Core Philosophy
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {['Scalable System Architecture', 'Rapid Prototyping Mindset', 'Clean Code Integrity', 'Continuous AI Integration'].map((item, i) => (
                  <li key={i} className={`animate-on-scroll stagger-${i + 1} flex items-center gap-2`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4 animate-on-scroll stagger-4">
              <div className="flex-1 glass rounded-2xl p-5 text-center hover:scale-105 transition-transform">
                <Shield className="mx-auto text-primary mb-2" size={24} />
                <span className="text-sm font-semibold text-foreground">Security Focused</span>
              </div>
              <div className="flex-1 glass rounded-2xl p-5 text-center hover:scale-105 transition-transform">
                <Code className="mx-auto text-primary mb-2" size={24} />
                <span className="text-sm font-semibold text-foreground">Full-Stack</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
