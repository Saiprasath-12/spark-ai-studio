import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < 100 || currentY < lastScrollY);
      setLastScrollY(currentY);

      // Update active section
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(item.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 glass rounded-full px-2 py-2 transition-all duration-500 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}
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
              className="block w-full px-8 py-4 text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-secondary/50 border-b border-border/30 last:border-0 capitalize tracking-widest transition-all duration-300"
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
            >
              {item.name === 'Showcase' ? 'Showcase' : item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default FloatingNav;
