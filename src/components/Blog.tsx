import { BookOpen, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Blog = () => {
  const scrollRef = useScrollAnimation();

  return (
    <section className="py-24 relative" ref={scrollRef}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-gradient text-center mb-10 animate-on-scroll">Technical Insights</h2>
        <a
          href="https://saiprasathblog01.hashnode.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="animate-on-scroll stagger-1 block max-w-xl mx-auto glass rounded-2xl p-8 hover:scale-105 hover:glow-cyan-sm transition-all duration-300 group"
        >
          <BookOpen className="text-primary mb-4" size={32} />
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            saiprasathblog01.hashnode.dev
            <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Deep dives into Full-Stack engineering, AI integrations, and modern developer workflows.
          </p>
        </a>
      </div>
    </section>
  );
};

export default Blog;
