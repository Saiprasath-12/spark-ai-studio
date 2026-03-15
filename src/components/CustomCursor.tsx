import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-[9998] pointer-events-none"
      style={{ willChange: 'transform' }}
    />
  );
};

export default CustomCursor;
