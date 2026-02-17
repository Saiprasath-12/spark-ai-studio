import { MapPin, Phone, Clock, Zap, Mail, Github, Instagram, Linkedin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const contactInfo = [
  { icon: MapPin, label: 'Location', value: 'Available Worldwide', sub: 'Remote & on-site projects' },
  { icon: Phone, label: 'Phone', value: '+91 90423 90940' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours' },
  { icon: Zap, label: 'Guarantee', value: 'Quick turnaround guaranteed' },
  { icon: Mail, label: 'Email', value: 'saiprasath161@gmail.com' },
];

const socials = [
  { icon: Github, href: 'https://github.com/Saiprasath-12' },
  { icon: Instagram, href: 'https://www.instagram.com/sai.prasath.12' },
  { icon: Linkedin, href: '#' },
];

const Connect = () => {
  const scrollRef = useScrollAnimation();

  return (
    <section id="contact" className="py-24 relative" ref={scrollRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-gradient text-center mb-4 animate-on-scroll">Let's Connect</h2>
        <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-12 animate-on-scroll stagger-1" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {contactInfo.map((info, i) => {
            const IconComp = info.icon;
            return (
              <div key={i} className={`animate-on-scroll stagger-${Math.min(i + 1, 5)} glass rounded-2xl p-5 flex items-start gap-4 hover:scale-105 transition-all duration-300 group`}>
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <IconComp className="text-primary" size={20} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{info.label}</div>
                  <div className="font-semibold text-foreground text-sm">{info.value}</div>
                  {info.sub && <div className="text-xs text-muted-foreground mt-0.5">{info.sub}</div>}
                </div>
              </div>
            );
          })}
          <div className="animate-on-scroll stagger-5 glass rounded-2xl p-5 flex flex-col items-center justify-center gap-3">
            <div className="flex gap-3">
              {socials.map((s, i) => {
                const SIcon = s.icon;
                return (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="p-3 bg-primary/10 rounded-xl hover:bg-primary/20 hover:scale-110 transition-all">
                    <SIcon className="text-primary" size={20} />
                  </a>
                );
              })}
            </div>
            <span className="text-xs text-muted-foreground">Follow & Message</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
