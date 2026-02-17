import { ArrowDown, Github, Linkedin, Mail, Terminal } from 'lucide-react';
import profileImg from '@/assets/profile.jpeg';

const codeSnippets = [
  "model.fit(X_train, y_train)",
  "blockchain.verify()",
  "git commit -m 'feat: NLP'",
  "npm run build",
  "useEffect(() => {}, [])",
];

const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Animated gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-float-medium" />
    </div>

    {/* Floating code snippets */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeSnippets.map((text, i) => (
        <div
          key={i}
          className={`absolute font-mono text-xs text-primary/20 ${i % 2 === 0 ? 'animate-float-slow' : 'animate-float-medium'}`}
          style={{
            top: `${15 + i * 18}%`,
            left: i % 2 === 0 ? `${5 + i * 3}%` : `${75 - i * 5}%`,
            animationDelay: `${i * 0.8}s`,
          }}
        >
          <Terminal size={12} className="inline mr-1" />{text}
        </div>
      ))}
    </div>

    <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      {/* Text */}
      <div className="flex-1 text-center lg:text-left space-y-6">
        <div className="inline-block px-4 py-1.5 glass rounded-full text-xs font-semibold tracking-widest text-primary uppercase animate-fade-in">
          Full-Stack & AI Systems
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gradient leading-tight" style={{ animationDelay: '0.2s' }}>
          Saiprasath M
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0" style={{ animationDelay: '0.4s' }}>
          Building intelligent systems and scalable web applications with clean, modern development practices.
        </p>
        <div className="flex gap-4 justify-center lg:justify-start pt-2">
          <a href="#projects" className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 transition-transform glow-cyan-sm">
            View Showcase
          </a>
          <a href="#contact" className="px-8 py-3 glass font-bold rounded-2xl text-foreground hover:bg-secondary transition-all hover:scale-105">
            Let's Connect
          </a>
        </div>
        <div className="flex gap-5 justify-center lg:justify-start pt-4">
          <a href="https://github.com/Saiprasath-12" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-125">
            <Github size={22} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-all hover:scale-125">
            <Linkedin size={22} />
          </a>
          <a href="mailto:saiprasath161@gmail.com" className="text-muted-foreground hover:text-primary transition-all hover:scale-125">
            <Mail size={22} />
          </a>
        </div>
      </div>

      {/* Profile Photo */}
      <div className="flex-shrink-0 relative">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          {/* Rotating ring */}
          <div className="absolute inset-0 rounded-full profile-ring" style={{
            background: 'conic-gradient(from 0deg, hsl(187 92% 50%), transparent 40%, hsl(217 92% 60%), transparent 80%, hsl(187 92% 50%))',
            padding: '3px',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px))',
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

export default Hero;
