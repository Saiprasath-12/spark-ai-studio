const columns = Array.from({ length: 20 }, (_, i) => ({
  left: `${i * 5 + Math.random() * 3}%`,
  delay: `${Math.random() * 10}s`,
  duration: `${8 + Math.random() * 12}s`,
  bits: Array.from({ length: 20 }, () => Math.round(Math.random())).join('\n'),
}));

const BinaryRain = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.04]">
    {columns.map((col, i) => (
      <div
        key={i}
        className="absolute font-mono text-[10px] text-primary whitespace-pre leading-4 animate-binary-fall"
        style={{
          left: col.left,
          animationDelay: col.delay,
          animationDuration: col.duration,
        }}
      >
        {col.bits}
      </div>
    ))}
  </div>
);

export default BinaryRain;
