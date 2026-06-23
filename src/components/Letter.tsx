import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const lines = [
  "My dearest Anisha,",
  "",
  "If I tried to write down everything you mean to me,",
  "I would run out of pages long before I ran out of feelings.",
  "",
  "You are my favourite chapter, my softest landing,",
  "the hand I reach for in the dark without thinking.",
  "",
  "Every laugh of yours rewires me a little.",
  "Every quiet glance feels like an entire poem.",
  "",
  "Thank you for being mine, for being you,",
  "for turning ordinary days into something I want to remember forever.",
  "",
  "Happy anniversary, my love.",
  "Here's to us — and every breath that comes next.",
  "",
  "— Forever yours.",
];

export function Letter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(i);
      if (i >= lines.length) clearInterval(id);
    }, 380);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 py-32">
      <div className="absolute inset-0 opacity-40" style={{
        background: "radial-gradient(ellipse at center, oklch(0.2 0.16 250 / 0.5), transparent 70%)"
      }} />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative glass rounded-3xl p-10 md:p-16 max-w-2xl w-full"
        style={{ boxShadow: "0 30px 100px oklch(0 0 0 / 0.6), 0 0 80px oklch(0.55 0.22 260 / 0.2)" }}
      >
        <div className="font-script text-3xl md:text-4xl text-accent text-center mb-8 text-glow-soft">A Letter</div>
        <div className="font-display text-lg md:text-xl leading-[2.1] text-foreground/90 whitespace-pre-line min-h-[60vh]">
          {lines.slice(0, shown).join("\n")}
          {shown < lines.length && <span className="anim-caret text-accent">|</span>}
        </div>
      </motion.div>
    </section>
  );
}
