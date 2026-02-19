import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Showcase', id: 'projects' },
  { name: 'Milestones', id: 'milestones' },
  { name: 'Connect', id: 'contact' },
];

const FloatingNav = () => {
  const [active, setActive] = useState('home');
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? (currentY / docHeight) * 100 : 0);
    setVisible(currentY < 100 || currentY < lastScrollY);
    setShowBackToTop(currentY > 600);
    setLastScrollY(currentY);

    for (const item of [...navItems].reverse()) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top <= 200) {
        setActive(item.id);
        break;
      }
    }
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 z-[60] bg-border/30">
        <div
          className="h-full bg-gradient-to-r from-primary via-cyan-300 to-blue-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Desktop Nav */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 glass rounded-full px-2 py-2 transition-all duration-500 shadow-lg ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}
        style={{
          boxShadow: visible ? '0 8px 32px hsl(187 92% 50% / 0.1), 0 0 0 1px hsl(187 92% 50% / 0.05)' : 'none',
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`relative px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              active === item.id
                ? 'bg-primary text-primary-foreground shadow-lg glow-cyan-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {/* Active indicator dot */}
            {active === item.id && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
            )}
            {item.name}
          </button>
        ))}
      </nav>

      {/* Mobile Nav */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-3 glass rounded-2xl text-foreground shadow-lg"
        >
          <div className="relative w-5 h-5">
            <Menu className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} size={20} />
            <X className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} size={20} />
          </div>
        </button>
        <div
          className={`absolute top-16 right-0 glass rounded-2xl overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
          }`}
        >
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full px-8 py-4 text-sm font-semibold border-b border-border/30 last:border-0 capitalize tracking-widest transition-all duration-300 ${
                active === item.id
                  ? 'text-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-primary hover:bg-secondary/50'
              }`}
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 p-3 glass rounded-full text-primary shadow-lg transition-all duration-500 hover:scale-110 glow-cyan-sm ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <ChevronUp size={20} />
      </button>
    </>
  );
};

export default FloatingNav;
