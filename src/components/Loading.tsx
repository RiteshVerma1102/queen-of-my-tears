import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Loading({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 7 + 3;
      if (v >= 100) { v = 100; clearInterval(id); setTimeout(onDone, 600); }
      setPct(Math.floor(v));
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
    >
      <div className="absolute inset-0 opacity-50" style={{
        background: "radial-gradient(ellipse at center, oklch(0.16 0.14 260 / 0.6), transparent 70%)"
      }} />
      <div className="relative text-center px-6">
        <p className="font-display tracking-[0.6em] text-xs md:text-sm uppercase text-accent/80 mb-8">
          A Cinematic Memory
        </p>
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="loading-dot w-2 h-2 rounded-full bg-accent" />
          <span className="loading-dot w-2 h-2 rounded-full bg-accent" style={{ animationDelay: "0.2s" }} />
          <span className="loading-dot w-2 h-2 rounded-full bg-accent" style={{ animationDelay: "0.4s" }} />
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-light text-foreground/90 mb-8 tracking-wide">
          Loading Memories…
        </h2>
        <div className="w-64 md:w-80 h-[2px] bg-foreground/10 mx-auto overflow-hidden rounded-full">
          <motion.div
            className="h-full"
            style={{
              background: "linear-gradient(90deg, oklch(0.55 0.22 260), oklch(0.78 0.22 240))",
              width: `${pct}%`,
              boxShadow: "0 0 20px oklch(0.7 0.22 245 / 0.7)",
            }}
            transition={{ ease: "linear" }}
          />
        </div>
        <p className="mt-4 text-xs tracking-[0.4em] text-muted-foreground tabular-nums">{pct}%</p>
      </div>
    </motion.div>
  );
}
