import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  src: string;
  title: string;
  body: string;
  reverse?: boolean;
};

export function SceneSplit({ src, title, body, reverse }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.0, 1.05]);
  const txtY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className={`relative min-h-screen flex items-center px-6 md:px-16 py-24 ${reverse ? "md:flex-row-reverse" : ""}`}>
      <div className={`grid md:grid-cols-2 gap-10 md:gap-20 items-center max-w-7xl mx-auto w-full ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <motion.div style={{ y: imgY, scale: imgScale }} className="relative aspect-[3/4] overflow-hidden rounded-2xl photo-frame">
          <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(180deg, transparent 60%, oklch(0.08 0.04 270 / 0.4))"
          }}/>
        </motion.div>
        <motion.div style={{ y: txtY }} className="space-y-6">
          <h3 className="font-display text-4xl md:text-6xl font-light leading-[1.05] gradient-text text-glow">
            {title}
          </h3>
          <p className="text-base md:text-lg text-muted-foreground leading-[1.9] max-w-lg">
            {body}
          </p>
          <div className="h-px w-16 bg-gradient-to-r from-accent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
