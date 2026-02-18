import ProjectCard from './ProjectCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const projects = [
  { title: "Fake News Detection System", description: "Full-stack NLP web application built using Flask and React to classify news articles as real or fake using TF-IDF and machine learning models.", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800", tags: ["Flask", "React", "NLP", "ML"], github: "https://github.com/Saiprasath-12/Naan-Mudhalvan-Fake-News-Detector-Project" },
  { title: "Financial Management System", description: "Full-stack web application to manage income, expenses, and budgets using React, TS, Flask, and MySQL with secure CRUD and dashboards.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800", tags: ["React", "TS", "MySQL"], github: "https://github.com/Saiprasath-12/SocietyFinanceManagement" },
  { title: "Virus Hunter", description: "Antivirus simulation system implementing signature-based scanning logic to identify malware payloads in a modular architecture.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800", tags: ["Cybersecurity", "Python", "Signature-Scanning"], github: "https://github.com/Saiprasath-12/Virus-Hunter" },
  { title: "Vitals Monitoring AI", description: "AI-powered webcam system detecting respiratory and heart rates using real-time video processing and CV algorithms.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800", tags: ["AI", "OpenCV", "HealthTech"], github: "https://github.com/Saiprasath-12/Respiratory-rate-using-ai-webcam" },
  { title: "AgriChain-Nizamabad", description: "Decentralized regional blockchain implementation securing agricultural supply chain records for enhanced transparency.", image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800", tags: ["Solidity", "Blockchain", "Web3"], github: "https://github.com/Saiprasath-12/AgriChain-Nizamabad" },
  { title: "MentisAI", description: "Intelligent NLP-driven application focused on mental health support and cognitive assistance using advanced language models.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800", tags: ["NLP", "LLM", "React", "AI"], github: "https://github.com/Saiprasath-12/MentisAI" },
];

const floatingSnippets = [
  { text: '{ }', className: 'top-12 left-[8%] animate-float-slow text-2xl' },
  { text: '</>', className: 'top-24 right-[10%] animate-float-medium text-xl' },
  { text: '=>', className: 'bottom-20 left-[15%] animate-float-slow text-2xl' },
  { text: '[ ]', className: 'top-[40%] right-[5%] animate-float-medium text-lg' },
  { text: '( )', className: 'bottom-32 right-[18%] animate-float-slow text-xl' },
];

const ProjectShowcase = () => {
  const scrollRef = useScrollAnimation();

  return (
    <section id="projects" className="py-24 relative overflow-hidden" ref={scrollRef}>
      {/* Floating decorative code elements */}
      {floatingSnippets.map((s, i) => (
        <span
          key={i}
          className={`absolute font-mono font-bold text-primary/10 pointer-events-none select-none ${s.className}`}
          style={{ animationDelay: `${i * 0.8}s` }}
        >
          {s.text}
        </span>
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-black text-gradient text-center mb-4 animate-on-scroll">Project Showcase</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-on-scroll stagger-1">
          Each project represents a unique challenge solved through innovative thinking and cutting-edge technology.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className={`animate-on-scroll stagger-${Math.min(i + 1, 8)}`}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
