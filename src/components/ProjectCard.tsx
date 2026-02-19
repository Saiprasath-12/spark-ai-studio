import { useRef, useState, useCallback } from 'react';
import { Github, Sparkles, Loader2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [deepDive, setDeepDive] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
    setIsHovered(false);
  };

  const handleAnalysis = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('saibot-chat', {
        body: {
          messages: [{ role: 'user', content: `Provide a brief 1-paragraph architectural analysis of this project: ${project.title} - ${project.description}. Tags: ${project.tags.join(', ')}` }],
          mode: 'analysis',
        },
      });
      if (error) throw error;
      setDeepDive(data?.reply || 'Analysis unavailable.');
    } catch {
      setDeepDive('Analysis unavailable at the moment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="perspective-container group/card">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="tilt-card project-card-shine relative h-[500px] glass rounded-3xl overflow-hidden cursor-default"
        >
          {/* Cursor spotlight overlay */}
          <div
            className="absolute inset-0 z-[2] pointer-events-none rounded-3xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 250px at ${mousePos.x}% ${mousePos.y}%, hsl(187 92% 50% / 0.08), transparent 70%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Hover border glow */}
          <div
            className="absolute inset-0 rounded-3xl z-[3] pointer-events-none transition-opacity duration-500"
            style={{
              boxShadow: 'inset 0 0 0 1px hsl(187 92% 50% / 0.3), 0 0 30px hsl(187 92% 50% / 0.1)',
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Background image with parallax zoom */}
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            style={{
              opacity: isHovered ? 0.5 : 0.3,
              transform: isHovered ? 'scale(1.15)' : 'scale(1)',
              transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

          {/* Animated corner accents */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-primary/0 rounded-tl-lg transition-all duration-500 group-hover/card:border-primary/40 group-hover/card:w-12 group-hover/card:h-12" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-primary/0 rounded-br-lg transition-all duration-500 group-hover/card:border-primary/40 group-hover/card:w-12 group-hover/card:h-12" />

          {/* Content */}
          <div
            className="relative h-full flex flex-col justify-end p-6 space-y-3 transition-transform duration-500 group-hover/card:-translate-y-2"
            style={{ transform: 'translateZ(50px)' }}
          >
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t, i) => (
                <span
                  key={t}
                  className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20 transition-all duration-300 group-hover/card:bg-primary/20 group-hover/card:border-primary/40"
                  style={{
                    transitionDelay: isHovered ? `${i * 50}ms` : '0ms',
                    transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
                    opacity: isHovered ? 1 : 0.8,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-black text-foreground transition-colors duration-300 group-hover/card:text-primary">{project.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
            <div className="flex gap-3 pt-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 glass rounded-xl hover:bg-secondary transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_hsl(187_92%_50%/0.2)]"
              >
                <Github size={18} />
              </a>
              <button
                onClick={handleAnalysis}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-xs font-semibold hover:bg-secondary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_hsl(187_92%_50%/0.2)] disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={14} className="animate-spin" /> : <><Sparkles size={14} className="text-primary" /> Analysis ✨</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Modal */}
      {deepDive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setDeepDive(null)}>
          <div className="glass rounded-3xl p-8 max-w-lg w-full relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setDeepDive(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-2 hover:bg-secondary rounded-full transition-colors">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-foreground mb-4">{project.title} Review</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{deepDive}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
