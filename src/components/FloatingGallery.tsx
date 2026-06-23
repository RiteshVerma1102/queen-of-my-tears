import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function FloatingGallery({ images, title }: { images: string[]; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-12">
      <motion.div style={{ y: headerY }} className="max-w-6xl mx-auto mb-16 text-center">
        <h3 className="font-display text-4xl md:text-6xl font-light gradient-text text-glow">{title}</h3>
        <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </motion.div>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {images.map((src, i) => (
          <Tile key={src} src={src} i={i} />
        ))}
      </div>
    </section>
  );
}

function Tile({ src, i }: { src: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60 + (i % 3) * 30, -60 - (i % 3) * 30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const aspect = i % 5 === 0 ? "aspect-[3/4]" : i % 4 === 0 ? "aspect-square" : "aspect-[4/5]";
  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      whileHover={{ scale: 1.04, transition: { duration: 0.5 } }}
      className={`relative overflow-hidden rounded-xl photo-frame ${aspect} group`}
    >
      <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" decoding="async" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
        background: "radial-gradient(circle at center, oklch(0.55 0.22 260 / 0.25), transparent 70%)"
      }} />
    </motion.div>
  );
}
