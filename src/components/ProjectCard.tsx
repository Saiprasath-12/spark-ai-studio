import { useRef, useState } from 'react';
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
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
      <div className="perspective-container">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="tilt-card project-card-shine relative h-[500px] glass rounded-3xl overflow-hidden group cursor-default"
        >
          {/* Background image */}
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
            style={{ transformOrigin: 'center center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

          {/* Content — slides up on hover */}
          <div
            className="relative h-full flex flex-col justify-end p-6 space-y-3 transition-transform duration-500 group-hover:-translate-y-2"
            style={{ transform: 'translateZ(50px)' }}
          >
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
                  {t}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-black text-foreground">{project.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
            <div className="flex gap-3 pt-2">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2.5 glass rounded-xl hover:bg-secondary transition-colors hover:scale-110">
                <Github size={18} />
              </a>
              <button onClick={handleAnalysis} disabled={isLoading} className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-xs font-semibold hover:bg-secondary transition-all hover:scale-105 disabled:opacity-50">
                {isLoading ? <Loader2 size={14} className="animate-spin" /> : <><Sparkles size={14} className="text-primary" /> Analysis ✨</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Modal */}
      {deepDive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={() => setDeepDive(null)}>
          <div className="glass rounded-3xl p-8 max-w-lg w-full relative" onClick={(e) => e.stopPropagation()}>
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
