import { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import profileImg from '@/assets/profile.jpeg';

const codeSnippets = [
  "model.fit(X_train, y_train)",
  "blockchain.verify()",
  "git commit -m 'feat: NLP'",
  "npm run build",
  "useEffect(() => {}, [])",
];

const roles = [
  "Full-Stack Developer",
  "AI Engineer",
  "System Architect",
  "Open Source Contributor",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayed === currentRole) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }
    if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? currentRole.substring(0, displayed.length - 1)
          : currentRole.substring(0, displayed.length + 1)
      );
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating code snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets.map((text, i) => (
          <div
            key={i}
            className={`absolute font-mono text-xs text-primary/15 ${i % 2 === 0 ? 'animate-float-slow' : 'animate-float-medium'}`}
            style={{
              top: `${15 + i * 18}%`,
              left: i % 2 === 0 ? `${5 + i * 3}%` : `${75 - i * 5}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Floating code terminal */}
      <div className="absolute top-16 right-8 lg:right-24 hidden lg:block animate-float-slow z-10">
        <div className="glass rounded-xl p-4 font-mono text-xs border border-primary/20">
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

      {/* Floating symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['</>', '=>', '{ }', '[ ]', '( )'].map((sym, i) => (
          <span
            key={i}
            className={`absolute font-mono font-bold text-primary/8 text-2xl ${i % 2 === 0 ? 'animate-float-slow' : 'animate-float-medium'}`}
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 18}%`,
              animationDelay: `${i * 1.2}s`,
            }}
          >
            {sym}
          </span>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="inline-block px-4 py-1.5 glass rounded-full text-xs font-semibold tracking-widest text-primary uppercase hero-badge-enter">
            Full-Stack & AI Systems
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight hero-title-enter">
            <span className="text-gradient">Saiprasath</span>
            <br />
            <span className="text-foreground">M</span>
          </h1>
          <div className="text-lg md:text-xl text-muted-foreground hero-subtitle-enter">
            <span>{displayed}</span>
            <span className="animate-blink text-primary font-light">|</span>
          </div>
          <p className="text-base text-muted-foreground/80 max-w-lg mx-auto lg:mx-0 hero-desc-enter">
            Building intelligent systems and scalable web applications with clean, modern development practices.
          </p>
          <div className="flex gap-4 justify-center lg:justify-start pt-2 hero-buttons-enter">
            <a href="#projects" className="group relative px-8 py-3 bg-primary text-primary-foreground font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 glow-cyan-sm">
              <span className="relative z-10 flex items-center gap-2">
                View My Work <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </span>
            </a>
            <a href="#contact" className="px-8 py-3 glass font-bold rounded-2xl text-foreground hover:bg-secondary transition-all hover:scale-105 border border-border/50 hover:border-primary/30">
              Get In Touch
            </a>
          </div>
          <div className="flex gap-5 justify-center lg:justify-start pt-4 hero-socials-enter">
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

        {/* Profile Photo */}
        <div className="flex-shrink-0 relative hero-photo-enter">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-full bg-primary/5 animate-pulse-glow" />
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full profile-ring" style={{
              background: 'conic-gradient(from 0deg, hsl(187 92% 50%), transparent 40%, hsl(217 92% 60%), transparent 80%, hsl(187 92% 50%))',
              padding: '3px',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
            }} />
            {/* Second counter-rotating ring */}
            <div className="absolute -inset-2 rounded-full profile-ring-reverse opacity-30" style={{
              background: 'conic-gradient(from 180deg, hsl(187 92% 50% / 0.5), transparent 30%, hsl(260 70% 60% / 0.5), transparent 70%, hsl(187 92% 50% / 0.5))',
              padding: '2px',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px))',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 2px))',
            }} />
            {/* Glow */}
            <div className="absolute inset-2 rounded-full animate-pulse-glow" />
            {/* Photo */}
            <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-border">
              <img src={profileImg} alt="Saiprasath M" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default Hero;
