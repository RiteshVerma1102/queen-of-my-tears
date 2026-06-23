import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Item = { type: "image"; src: string; caption?: string } | { type: "video"; src: string; poster: string; caption?: string };

function MediaCard({ item, idx }: { item: Item; idx: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(wrap, { amount: 0.4 });
  useEffect(() => {
    if (item.type !== "video" || !videoRef.current) return;
    if (inView) videoRef.current.play().catch(() => {});
    else videoRef.current.pause();
  }, [inView, item.type]);

  const aspect = idx % 5 === 0 ? "aspect-[3/4]" : idx % 4 === 0 ? "aspect-square" : "aspect-[4/5]";

  return (
    <motion.div
      ref={wrap}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03 }}
      className={`relative overflow-hidden rounded-xl photo-frame ${aspect} group`}
    >
      {item.type === "image" ? (
        <img src={item.src} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
      ) : (
        <video ref={videoRef} src={item.src} poster={item.poster} muted loop playsInline preload="metadata" className="w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
        background: "linear-gradient(180deg, transparent 50%, oklch(0 0 0 / 0.7))"
      }} />
      {item.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <p className="font-script italic text-xs md:text-sm text-foreground/90 text-glow-soft">{item.caption}</p>
        </div>
      )}
      {item.type === "video" && (
        <div className="absolute top-3 right-3 glass rounded-full p-2 opacity-90">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      )}
    </motion.div>
  );
}

export function MasonryGallery({ title, intro, items }: { title: string; intro?: string; items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section ref={ref} className="relative py-32 px-4 md:px-12">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h3 className="font-display tracking-[0.05em] text-3xl md:text-6xl font-light gradient-text anim-title-glow">{title}</h3>
        {intro && <p className="mt-6 font-script italic text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{intro}</p>}
        <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>
      <div className="max-w-6xl mx-auto columns-2 md:columns-3 gap-3 md:gap-5 [&>*]:mb-3 md:[&>*]:mb-5 [&>*]:break-inside-avoid">
        {items.map((it, i) => <MediaCard key={i} item={it} idx={i} />)}
      </div>
    </section>
  );
}
