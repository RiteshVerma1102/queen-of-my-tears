import { motion } from "framer-motion";

type Props = { onBegin: () => void; bgImage: string };

export function OpeningScreen({ onBegin, bgImage }: Props) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.4 } }}
      className="fixed inset-0 z-[100] overflow-hidden bg-background"
    >
      {/* Blurred romantic backdrop */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img src={bgImage} alt="" className="w-full h-full object-cover"
             style={{ filter: "blur(18px) brightness(0.4) saturate(1.2)" }} />
      </motion.div>

      {/* Glass + rain layers */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, oklch(0.05 0.04 270 / 0.7), oklch(0.05 0.04 270 / 0.85))"
      }} />
      <div className="rain-overlay" />
      <div className="absolute inset-0 opacity-50" style={{
        background: "radial-gradient(ellipse at center, transparent 30%, oklch(0.05 0.04 270 / 0.95) 80%)"
      }} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.6 }}
          className="font-script italic text-base md:text-xl text-foreground/70 max-w-xl leading-relaxed mb-10"
        >
          “In a world full of temporary people…<br/>
          she became my forever.”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <p className="font-display tracking-[0.5em] text-[10px] md:text-xs uppercase text-accent/70 mb-4">
            A Love Story Presents
          </p>
          <h1 className="font-display font-light tracking-[0.08em] text-3xl md:text-7xl gradient-text anim-title-glow leading-tight">
            THE QUEEN<br className="md:hidden"/> OF MY TEARS
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.8 }}
          className="font-script italic text-sm md:text-lg text-muted-foreground mb-12 max-w-md"
        >
          A story written by fate…<br/>
          starring <span className="text-accent text-glow-soft">Anisha</span> &amp; <span className="text-accent text-glow-soft">Ritesh</span>.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 3.6 }}
          onClick={onBegin}
          className="group relative inline-flex items-center gap-4 glass rounded-full px-7 py-3.5 hover:scale-[1.04] transition-all duration-500"
        >
          <span className="absolute inset-0 rounded-full anim-pulse-glow" style={{
            boxShadow: "0 0 50px oklch(0.7 0.22 245 / 0.4), inset 0 0 24px oklch(0.55 0.22 260 / 0.25)"
          }}/>
          <svg width="16" height="16" viewBox="0 0 24 24" className="relative text-accent">
            <path d="M8 5v14l11-7z" fill="currentColor"/>
          </svg>
          <span className="relative tracking-[0.4em] text-[11px] md:text-xs uppercase">Play</span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 4.2 }}
          className="absolute bottom-8 text-[10px] tracking-[0.5em] uppercase text-muted-foreground/50"
        >
          headphones recommended
        </motion.p>
      </div>
    </motion.div>
  );
}
