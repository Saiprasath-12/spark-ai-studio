import { useState, useEffect, useRef } from 'react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const marqueeWords = [
  'FULL STACK', 'AI ENGINEER', 'DEVELOPER', 'REACT', 'PYTHON',
  'TYPESCRIPT', 'MACHINE LEARNING', 'WEB APPS', 'SYSTEMS',
];

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const startTime = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    startTime.current = performance.now();
    const duration = 2500;

    const tick = (now: number) => {
      const elapsed = now - startTime.current;
      const pct = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - pct, 4);
      setProgress(Math.round(eased * 100));

      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExiting(true), 300);
        setTimeout(() => onComplete(), 1100);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        exiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Diagonal marquee bands */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -rotate-12 opacity-[0.04]">
        {[0, 1, 2, 3, 4].map((row) => (
          <div
            key={row}
            className="whitespace-nowrap text-[6rem] md:text-[8rem] font-black uppercase leading-none tracking-tighter welcome-marquee"
            style={{
              position: 'absolute',
              top: `${row * 22 - 10}%`,
              animationDuration: `${18 + row * 4}s`,
              animationDirection: row % 2 === 0 ? 'normal' : 'reverse',
            }}
          >
            {Array(4)
              .fill(marqueeWords)
              .flat()
              .map((w, i) => (
                <span key={i} className="mx-8">
                  {w}
                </span>
              ))}
          </div>
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Initials */}
        <div className="text-7xl md:text-9xl font-black tracking-tighter text-gradient welcome-initials-enter">
          SM
        </div>

        {/* Progress bar */}
        <div className="w-48 md:w-64 h-[2px] bg-border/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <span className="font-mono text-sm text-muted-foreground tabular-nums">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default WelcomeScreen;
