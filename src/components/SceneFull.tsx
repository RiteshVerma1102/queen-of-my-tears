import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  src: string;
  caption?: string;
  hindi?: string;
  subtitle?: string;
  align?: "center" | "left" | "right";
};

export function SceneFull({ src, caption, hindi, subtitle, align = "center" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1.0]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [12, 0, 0, 12]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  const textY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [60, 0, -60]);
  const textOp = useTransform(scrollYProgress, [0.15, 0.4, 0.7, 0.9], [0, 1, 1, 0]);

  const alignClass = align === "left" ? "text-left items-start" : align === "right" ? "text-right items-end" : "text-center items-center";

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ scale, y, filter, opacity }} className="absolute inset-0">
        <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </motion.div>
      <div className="absolute inset-0 scrim" />
      <div className="absolute inset-0 scrim-top" />
      <motion.div
        style={{ y: textY, opacity: textOp }}
        className={`absolute inset-0 flex flex-col justify-end p-8 md:p-20 ${alignClass}`}
      >
        {caption && <p className="font-script italic text-2xl md:text-3xl text-accent/90 mb-3 text-glow-soft">{caption}</p>}
        {subtitle && (
          <h3 className="font-display text-3xl md:text-6xl font-light max-w-3xl leading-[1.1] text-glow tracking-wide">
            {subtitle}
          </h3>
        )}
        {hindi && (
          <p className="mt-4 font-script italic text-base md:text-xl text-foreground/70 max-w-xl">
            {hindi}
          </p>
        )}
      </motion.div>
    </section>
  );
}
