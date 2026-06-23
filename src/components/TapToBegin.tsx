import { motion } from "framer-motion";

export function TapToBegin({ onBegin }: { onBegin: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2 } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="absolute inset-0 opacity-60" style={{
        background: "radial-gradient(ellipse at center, oklch(0.2 0.16 250 / 0.5), transparent 60%)"
      }} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-6 relative z-10"
      >
        <p className="font-script text-2xl md:text-3xl text-accent/80 mb-4 text-glow-soft">For my love</p>
        <h1 className="font-display text-5xl md:text-8xl font-light tracking-tight gradient-text text-glow mb-8">
          Anisha
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-12 leading-relaxed tracking-wider">
          Press play. Wear headphones if you can.<br/>
          What follows is a love letter you can scroll through.
        </p>
        <button
          onClick={onBegin}
          className="group relative inline-flex items-center gap-4 glass rounded-full px-8 py-4 hover:scale-[1.03] transition-all duration-500"
        >
          <span className="absolute inset-0 rounded-full anim-pulse-glow" style={{
            boxShadow: "0 0 60px oklch(0.7 0.22 245 / 0.4), inset 0 0 30px oklch(0.55 0.22 260 / 0.3)"
          }}/>
          <svg width="20" height="20" viewBox="0 0 24 24" className="relative text-accent">
            <path d="M8 5v14l11-7z" fill="currentColor"/>
          </svg>
          <span className="relative tracking-[0.3em] text-sm uppercase">Begin Our Story</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
