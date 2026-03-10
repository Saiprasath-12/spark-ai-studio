import { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import profileImg from '@/assets/profile.jpeg';

const roles = [
  'Developer',
  'AI Engineer',
  'Architect',
  'Creator',
];

interface HeroProps {
  entered?: boolean;
}

const Hero = ({ entered = true }: HeroProps) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (!entered) return;
    const interval = setInterval(() => {
      setRoleIndex((p) => (p + 1) % roles.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [entered]);

  const base = entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
  const t = 'transition-all duration-700 ease-out';

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background blurs */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] animate-float-medium" />

      {/* Floating code terminal */}
      <div className="absolute top-20 right-8 lg:right-24 hidden lg:block animate-float-slow z-10">
        <div className={`glass rounded-xl p-4 font-mono text-xs border border-primary/20 ${t} ${base}`} style={{ transitionDelay: '1.4s' }}>
          <div className="flex gap-1.5 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="text-muted-foreground">
            <span className="text-purple-400">const</span>{' '}
            <span className="text-primary">developer</span>{' = { '}
            <br />
            {'  '}skills: [<span className="text-emerald-400">'React'</span>,{' '}
            <span className="text-emerald-400">'AI'</span>,{' '}
            <span className="text-emerald-400">'Python'</span>]
            <br />
            {'};'}
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-20">
        {/* Left: Typography */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          {/* Greeting */}
          <p className={`text-base md:text-lg text-muted-foreground font-light ${t} ${base}`} style={{ transitionDelay: '0.1s' }}>
            Hello! I'm
          </p>

          {/* Giant Name */}
          <h1 className="leading-[0.9] tracking-tighter font-black">
            <span
              className={`block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gradient ${t} ${base}`}
              style={{ transitionDelay: '0.25s' }}
            >
              SAIPRASATH
            </span>
            <span
              className={`block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground ${t} ${base}`}
              style={{ transitionDelay: '0.4s' }}
            >
              M
            </span>
          </h1>

          {/* Role flipper */}
          <div className={`flex items-baseline gap-3 justify-center lg:justify-start ${t} ${base}`} style={{ transitionDelay: '0.55s' }}>
            <span className="text-lg md:text-xl text-muted-foreground">A Full-Stack</span>
            <div className="h-8 md:h-10 overflow-hidden relative w-40 md:w-52">
              {roles.map((role, i) => (
                <span
                  key={role}
                  className="absolute left-0 top-0 text-lg md:text-xl font-bold text-primary transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  style={{
                    transform: `translateY(${(i - roleIndex) * 100}%)`,
                    opacity: i === roleIndex ? 1 : 0,
                  }}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className={`text-base text-muted-foreground/80 max-w-lg mx-auto lg:mx-0 ${t} ${base}`} style={{ transitionDelay: '0.7s' }}>
            Building intelligent systems and scalable web applications with clean, modern development practices.
          </p>

          {/* CTAs */}
          <div className={`flex gap-4 justify-center lg:justify-start pt-2 ${t} ${base}`} style={{ transitionDelay: '0.85s' }}>
            <a
              href="#projects"
              className="group relative px-8 py-3 bg-primary text-primary-foreground font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 glow-cyan-sm"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </span>
            </a>
            <a
              href="#contact"
              className="px-8 py-3 glass font-bold rounded-2xl text-foreground hover:bg-secondary transition-all hover:scale-105 border border-border/50 hover:border-primary/30"
            >
              Get In Touch
            </a>
          </div>

          {/* Socials */}
          <div className={`flex gap-5 justify-center lg:justify-start pt-4 ${t} ${base}`} style={{ transitionDelay: '1s' }}>
            {[
              { icon: Github, href: 'https://github.com/Saiprasath-12' },
              { icon: Linkedin, href: '#' },
              { icon: Mail, href: 'mailto:saiprasath161@gmail.com' },
              { icon: Instagram, href: 'https://www.instagram.com/sai.prasath.12' },
            ].map((s, i) => {
              const SIcon = s.icon;
              return (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-all hover:scale-125 hover:-translate-y-1"
                >
                  <SIcon size={22} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right: Profile Photo */}
        <div className={`flex-shrink-0 relative ${t} ${base}`} style={{ transitionDelay: '0.6s' }}>
          <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <div className="absolute -inset-4 rounded-full bg-primary/5 animate-pulse-glow" />
            <div
              className="absolute inset-0 rounded-full profile-ring"
              style={{
                background:
                  'conic-gradient(from 0deg, hsl(187 92% 50%), transparent 40%, hsl(217 92% 60%), transparent 80%, hsl(187 92% 50%))',
                padding: '3px',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
              }}
            />
            <div
              className="absolute -inset-2 rounded-full profile-ring-reverse opacity-30"
              style={{
                background:
                  'conic-gradient(from 180deg, hsl(187 92% 50% / 0.5), transparent 30%, hsl(260 70% 60% / 0.5), transparent 70%, hsl(187 92% 50% / 0.5))',
                padding: '2px',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px))',
              }}
            />
            <div className="absolute inset-2 rounded-full animate-pulse-glow" />
            <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-border">
              <img src={profileImg} alt="Saiprasath M" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce ${t} ${base}`} style={{ transitionDelay: '1.2s' }}>
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default Hero;
