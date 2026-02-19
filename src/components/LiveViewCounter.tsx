import { usePageViews } from '@/hooks/usePageViews';
import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

const LiveViewCounter = () => {
  const viewCount = usePageViews();
  const [displayCount, setDisplayCount] = useState(0);
  const [visible, setVisible] = useState(false);

  // Animate number counting up
  useEffect(() => {
    if (viewCount === null) return;
    setVisible(true);
    const duration = 1500;
    const steps = 40;
    const increment = viewCount / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), viewCount);
      setDisplayCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [viewCount]);

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 flex items-center gap-2.5 glass rounded-full px-4 py-2.5 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Pulsing live dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
      </span>
      <Eye size={14} className="text-primary" />
      <span className="text-xs font-bold text-foreground tabular-nums">
        {displayCount.toLocaleString()}
      </span>
      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
        views
      </span>
    </div>
  );
};

export default LiveViewCounter;
