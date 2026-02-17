import { Github, Instagram, Linkedin, Mail, ArrowUp } from 'lucide-react';

const navLinks = ['Home', 'About', 'Skills', 'Showcase', 'Milestones', 'Connect'];
const socials = [
  { icon: Github, href: 'https://github.com/Saiprasath-12' },
  { icon: Instagram, href: 'https://www.instagram.com/sai.prasath.12' },
  { icon: Linkedin, href: '#' },
  { icon: Mail, href: 'mailto:saiprasath161@gmail.com' },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollTo = (name: string) => {
    const id = name === 'Home' ? 'home' : name === 'Showcase' ? 'projects' : name === 'Connect' ? 'contact' : name.toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-8">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 text-center space-y-8">
        {/* Logo */}
        <div className="text-6xl font-black text-gradient glow-cyan inline-block">S</div>
        <p className="text-muted-foreground text-sm tracking-widest uppercase">Engineered for Scalable Innovation</p>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-6">
          {navLinks.map((name) => (
            <button key={name} onClick={() => scrollTo(name)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {name}
            </button>
          ))}
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-4">
          {socials.map((s, i) => {
            const SIcon = s.icon;
            return (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="p-2.5 glass rounded-xl hover:bg-primary/10 hover:scale-110 transition-all">
                <SIcon size={18} className="text-muted-foreground hover:text-primary transition-colors" />
              </a>
            );
          })}
        </div>

        {/* Tech stack */}
        <p className="text-xs text-muted-foreground/60">Built with React • TypeScript • Tailwind</p>

        {/* Back to top */}
        <button onClick={scrollToTop} className="mx-auto flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group">
          <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" /> Back to top
        </button>

        <p className="text-xs text-muted-foreground/40">© {new Date().getFullYear()} SAIPRASATH M</p>
      </div>
    </footer>
  );
};

export default Footer;
