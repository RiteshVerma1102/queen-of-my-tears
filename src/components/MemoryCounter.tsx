import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      className="text-center"
    >
      <div className="font-display text-6xl md:text-8xl font-light gradient-text text-glow tabular-nums">
        {val}{suffix}
      </div>
      <div className="mt-4 text-xs md:text-sm tracking-[0.4em] uppercase text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export function MemoryCounter() {
  return (
    <section className="relative min-h-screen flex items-center px-6 py-32">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 md:gap-12">
        <Counter to={150} suffix="+" label="Memories" />
        <Counter to={365} label="Days a year I choose you" />
        <Counter to={1} label="Beautiful Journey" />
        <div className="text-center">
          <div className="font-display text-6xl md:text-8xl font-light gradient-text text-glow">∞</div>
          <div className="mt-4 text-xs md:text-sm tracking-[0.4em] uppercase text-muted-foreground">Infinite Love</div>
        </div>
      </div>
    </section>
  );
}
