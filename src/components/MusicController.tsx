import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = { started: boolean };

export function MusicController({ started }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => { mutedRef.current = muted; }, [muted]);

  // Try playing whenever started flips, and also on the very next user gesture as a fallback (autoplay policy).
  useEffect(() => {
    if (!started) return;
    const a = audioRef.current;
    if (!a) return;

    let cancelled = false;
    let rampId: ReturnType<typeof setInterval> | null = null;

    const startRamp = () => {
      if (rampId) return;
      let v = 0;
      a.volume = 0;
      rampId = setInterval(() => {
        v = Math.min(v + 0.015, 0.45);
        a.volume = mutedRef.current ? 0 : v;
        if (v >= 0.45 && rampId) { clearInterval(rampId); rampId = null; }
      }, 90);
    };

    const tryPlay = async () => {
      try {
        await a.play();
        if (cancelled) return;
        setPlaying(true);
        startRamp();
      } catch {
        // Autoplay blocked — wait for any user gesture and retry.
        const retry = async () => {
          try {
            await a.play();
            setPlaying(true);
            startRamp();
          } catch {}
          window.removeEventListener("pointerdown", retry);
          window.removeEventListener("keydown", retry);
          window.removeEventListener("touchstart", retry);
        };
        window.addEventListener("pointerdown", retry, { once: true });
        window.addEventListener("keydown", retry, { once: true });
        window.addEventListener("touchstart", retry, { once: true });
      }
    };

    tryPlay();

    return () => {
      cancelled = true;
      if (rampId) clearInterval(rampId);
    };
  }, [started]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => { setPlaying(true); setMuted(false); a.volume = 0.45; }).catch(() => {});
    } else {
      setMuted((m) => {
        const next = !m;
        a.volume = next ? 0 : 0.45;
        return next;
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/song.mp3" loop preload="auto" playsInline />
      <AnimatePresence>
        {started && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            onClick={toggle}
            className="fixed bottom-6 right-6 z-50 glass rounded-full px-4 py-3 flex items-center gap-3 hover:scale-105 transition-transform"
            aria-label={muted || !playing ? "Play music" : "Mute"}
          >
            <span className="relative flex h-3 w-3">
              <span className={`absolute inset-0 rounded-full ${muted || !playing ? "bg-muted-foreground" : "bg-accent anim-pulse-glow"}`} />
            </span>
            <span className="text-xs tracking-[0.25em] uppercase text-foreground/80">
              {!playing ? "Tap For Music" : muted ? "Music Off" : "Pyaari Lage"}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-foreground/70">
              {muted || !playing ? (
                <path d="M3 10v4h4l5 4V6L7 10H3zm13.59 2L19 14.41 20.41 13 18 10.59 20.41 8.17 19 6.76 16.59 9.17 14.17 6.76 12.76 8.17 15.17 10.59 12.76 13l1.41 1.41L16.59 12z" fill="currentColor"/>
              ) : (
                <path d="M3 10v4h4l5 4V6L7 10H3zm12 .5v3a3 3 0 000-3zm-1-4.5v1.7a5 5 0 010 9.6v1.7a6.5 6.5 0 000-13z" fill="currentColor"/>
              )}
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
