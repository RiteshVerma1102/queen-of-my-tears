import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  caption?: string;
  subtitle?: string;
};

export function CinematicVideo({ src, poster, caption, subtitle }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.5 });
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) { v.play().then(() => setPlaying(true)).catch(() => {}); }
    else { v.pause(); setPlaying(false); }
  }, [inView]);

  return (
    <section ref={wrapRef} className="relative min-h-screen flex items-center justify-center px-4 md:px-12 py-16">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, oklch(0.18 0.14 260 / 0.4), transparent 70%)"
      }} />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl mx-auto"
      >
        <div className="relative rounded-2xl overflow-hidden ring-glow"
             style={{ aspectRatio: "16/9" }}>
          <video
            ref={ref}
            src={src}
            poster={poster}
            muted={muted}
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(180deg, transparent 60%, oklch(0 0 0 / 0.5))"
          }} />
          <button
            onClick={() => setMuted((m) => !m)}
            className="absolute bottom-4 right-4 glass rounded-full px-4 py-2 flex items-center gap-2 text-xs tracking-[0.25em] uppercase hover:scale-105 transition-transform"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            <span className={`w-2 h-2 rounded-full ${playing ? "bg-accent anim-pulse-glow" : "bg-muted-foreground"}`} />
            {muted ? "Sound" : "Mute"}
          </button>
        </div>
        {caption && (
          <div className="mt-6 text-center">
            <p className="font-script italic text-lg md:text-2xl text-accent/80 text-glow-soft">{caption}</p>
            {subtitle && <p className="font-display text-2xl md:text-4xl mt-2 gradient-text text-glow">{subtitle}</p>}
          </div>
        )}
      </motion.div>
    </section>
  );
}
