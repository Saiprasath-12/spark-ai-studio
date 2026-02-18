import { MapPin, Phone, Clock, Zap, Mail, Github, Instagram, Linkedin, Terminal } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'saiprasath161@gmail.com', sub: 'Drop me a line anytime' },
  { icon: Phone, label: 'Phone', value: '+91 90423 90940', sub: 'Mon-Sat from 8am to 10pm' },
  { icon: MapPin, label: 'Location', value: 'Available Worldwide', sub: 'Remote & on-site projects' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours', sub: 'Quick turnaround guaranteed' },
];

const services = [
  '🚀 Full-stack Web Development',
  '🤖 AI-Powered Automation Solutions',
  '🧠 Machine Learning Integration',
  '📊 Data Analysis & Visualization',
  '💡 Technical Consulting & Code Review',
  '☁️ Cloud Integration & DevOps',
  '🧪 Research & Prototype Development',
];

const socials = [
  { icon: Github, href: 'https://github.com/Saiprasath-12' },
  { icon: Instagram, href: 'https://www.instagram.com/sai.prasath.12' },
  { icon: Linkedin, href: '#' },
  { icon: Mail, href: 'mailto:saiprasath161@gmail.com' },
];

const floatingTerminals = [
  { text: 'POST /api/contact', pos: 'top-8 left-[5%]' },
  { text: '$ █', pos: 'top-20 right-[8%]' },
  { text: 'npm start', pos: 'bottom-16 left-[10%]' },
  { text: 'git commit -m "services"', pos: 'bottom-8 right-[5%]' },
];

const Connect = () => {
  const scrollRef = useScrollAnimation();

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={scrollRef}>
      {/* Floating terminal snippets */}
      {floatingTerminals.map((t, i) => (
        <div
          key={i}
          className={`absolute ${t.pos} hidden lg:flex items-center gap-2 font-mono text-xs text-primary/15 ${i % 2 === 0 ? 'animate-float-slow' : 'animate-float-medium'}`}
          style={{ animationDelay: `${i * 1.5}s` }}
        >
          <Terminal size={10} /> {t.text}
        </div>
      ))}

      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-gradient text-center mb-3 animate-on-scroll">Let's Connect</h2>
        <p className="text-center text-muted-foreground mb-4 animate-on-scroll stagger-1 text-lg font-semibold">Start Your Project</p>
        <p className="text-center text-muted-foreground/70 mb-12 max-w-xl mx-auto animate-on-scroll stagger-2">
          Ready to transform your ideas into reality? Let's discuss how we can create something amazing together.
        </p>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Left — Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((info, i) => {
              const IconComp = info.icon;
              return (
                <div
                  key={i}
                  className={`animate-on-scroll stagger-${Math.min(i + 1, 5)} glass rounded-2xl p-5 group hover:scale-105 transition-all duration-300 connect-card-glow cursor-default`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <IconComp className="text-primary" size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{info.label}</div>
                      <div className="font-bold text-foreground text-sm mt-1">{info.value}</div>
                      {info.sub && <div className="text-xs text-muted-foreground/70 mt-0.5">{info.sub}</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right — Services + Socials */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 animate-on-scroll stagger-3">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap className="text-primary" size={18} /> Services Available
              </h3>
              <ul className="space-y-2.5">
                {services.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-2 transition-all duration-300 cursor-default">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-5 flex flex-col items-center gap-3 animate-on-scroll stagger-4">
              <div className="flex gap-3">
                {socials.map((s, i) => {
                  const SIcon = s.icon;
                  return (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-primary/10 rounded-xl hover:bg-primary/20 hover:scale-125 hover:-translate-y-1 transition-all duration-300 group/social"
                    >
                      <SIcon className="text-primary group-hover/social:drop-shadow-[0_0_8px_hsl(187_92%_50%/0.6)]" size={20} />
                    </a>
                  );
                })}
              </div>
              <span className="text-xs text-muted-foreground">Follow & Message</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
