import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Subtitle({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return (
    <section ref={ref} className="relative h-[60vh] flex items-center justify-center px-6">
      <motion.p style={{ opacity, y }} className="font-display text-2xl md:text-4xl italic text-foreground/80 max-w-3xl text-center leading-relaxed text-glow-soft">
        “{text}”
      </motion.p>
    </section>
  );
}
