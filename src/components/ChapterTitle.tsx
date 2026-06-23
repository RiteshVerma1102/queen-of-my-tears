import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  number: string;
  title: string;
  subtitle?: string;
};

export function ChapterTitle({ number, title, subtitle }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.05]);

  return (
    <section ref={ref} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-50" style={{
        background: "radial-gradient(ellipse at center, oklch(0.18 0.14 260 / 0.6), transparent 60%)"
      }}/>
      <motion.div style={{ y, opacity, scale }} className="text-center px-6 relative z-10 max-w-4xl">
        <motion.p className="font-script text-xl md:text-2xl text-accent/80 mb-6 tracking-wider text-glow-soft">
          Chapter {number}
        </motion.p>
        <h2 className="font-display text-6xl md:text-9xl font-light tracking-tight gradient-text text-glow leading-[0.95]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-8 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed italic">
            {subtitle}
          </p>
        )}
        <div className="mt-12 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
      </motion.div>
    </section>
  );
}
