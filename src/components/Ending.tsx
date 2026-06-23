import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Ending({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.05, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -20]);

  return (
    <section ref={ref} className="relative min-h-[200vh] overflow-hidden">
      {/* floating background memories */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {images.slice(0, 12).map((src, i) => {
            const left = `${(i * 37) % 90 + 5}%`;
            const top = `${(i * 53) % 80 + 10}%`;
            const size = 80 + ((i * 19) % 100);
            const delay = (i * 0.7) % 6;
            return (
              <motion.div
                key={i}
                className="absolute rounded-xl overflow-hidden opacity-20 anim-drift photo-frame"
                style={{
                  left, top, width: size, height: size * 1.2,
                  animationDelay: `${delay}s`,
                  filter: "blur(1px)",
                }}
              >
                <img src={src} className="w-full h-full object-cover" alt="" loading="lazy" />
              </motion.div>
            );
          })}
        </div>

        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, oklch(0.08 0.04 270 / 0.7) 30%, oklch(0.08 0.04 270 / 0.95) 70%)"
        }} />

        <motion.div
          style={{ scale: titleScale, y: titleY }}
          className="relative z-10 text-center px-6"
        >
          <p className="font-script text-2xl md:text-4xl text-accent/90 mb-6 text-glow-soft anim-heartbeat inline-block">
            Happy Anniversary
          </p>
          <h2 className="font-display text-6xl md:text-[10rem] font-light leading-[0.9] gradient-text text-glow">
            I Love You
          </h2>
          <p className="mt-10 text-sm md:text-base tracking-[0.5em] uppercase text-muted-foreground">
            Anisha &nbsp;·&nbsp; Forever
          </p>
          <div className="mt-12 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <p className="mt-12 text-xs tracking-[0.3em] uppercase text-muted-foreground/60">— end credits —</p>
          <p className="mt-4 text-xs text-muted-foreground/40">
            Directed by your boy · Starring you, always
          </p>
        </motion.div>
      </div>
    </section>
  );
}
