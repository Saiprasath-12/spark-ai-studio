import { Github, Instagram, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Showcase', id: 'projects' },
  { name: 'Milestones', id: 'milestones' },
  { name: 'Blog', id: 'blog' },
  { name: 'Connect', id: 'contact' },
];

const socials = [
  { icon: Github, href: 'https://github.com/Saiprasath-12' },
  { icon: Instagram, href: 'https://www.instagram.com/sai.prasath.12' },
  { icon: Linkedin, href: '#' },
  { icon: Mail, href: 'mailto:saiprasath161@gmail.com' },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-20 pb-8">
      {/* Gradient divider with shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-gradient" style={{ backgroundSize: '200% 100%' }} />
      </div>

      <div className="container mx-auto px-6">
        {/* Three-column layout */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="text-center md:text-left space-y-4">
            <div className="text-5xl font-black text-gradient glow-cyan inline-block">S</div>
            <h3 className="text-lg font-bold text-foreground">SAIPRASATH M</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full-Stack Developer & AI Engineer crafting intelligent, scalable systems with modern technologies.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center space-y-4">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">Navigation</h4>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors relative story-link"
                >
                  <span>{link.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right space-y-4">
            <h4 className="text-sm font-bold text-foreground uppercase tracking-widest">Get in Touch</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>saiprasath161@gmail.com</p>
              <p>+91 90423 90940</p>
              <p>Available Worldwide</p>
            </div>
            <div className="flex gap-3 justify-center md:justify-end">
              {socials.map((s, i) => {
                const SIcon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 glass rounded-xl hover:bg-primary/10 hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                  >
                    <SIcon size={16} className="text-muted-foreground hover:text-primary transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} SAIPRASATH M. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/40 flex items-center gap-1">
            Built with <Heart size={10} className="text-destructive" /> using React • TypeScript • Tailwind
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
