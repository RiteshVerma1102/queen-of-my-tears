import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";

import { Loading } from "@/components/Loading";
import { OpeningScreen } from "@/components/OpeningScreen";
import { MusicController } from "@/components/MusicController";
import { Particles } from "@/components/Particles";
import { CursorGlow } from "@/components/CursorGlow";
import { ChapterTitle } from "@/components/ChapterTitle";
import { SceneFull } from "@/components/SceneFull";
import { SceneSplit } from "@/components/SceneSplit";
import { Letter } from "@/components/Letter";
import { MemoryCounter } from "@/components/MemoryCounter";
import { Subtitle } from "@/components/Subtitle";
import { Ending } from "@/components/Ending";
import { CinematicVideo } from "@/components/CinematicVideo";
import { MasonryGallery } from "@/components/MasonryGallery";
import { PHOTOS, VIDEOS, applyOverrides, pickByTag, type PhotoMeta } from "@/lib/story-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Queen Of My Tears — Anisha & Ritesh" },
      { name: "description", content: "A cinematic love story for Anisha. Starring Anisha & Ritesh." },
      { property: "og:title", content: "The Queen Of My Tears — Anisha & Ritesh" },
      { property: "og:description", content: "A cinematic love story written by fate." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Poppins:wght@200;300;400;500&display=swap" },
    ],
  }),
  component: Index,
});

// The hero: new photo (m69) - "phli photo" the user asked to feature most
const HERO_ID = "m69";

function buildStoryAssignments(photos: PhotoMeta[]) {
  const used = new Set<string>();

  // Reserve the hero photo for opening + featured spots
  const hero = photos.find(p => p.id === HERO_ID)!;
  used.add(hero.id);

  const childhood = pickByTag(photos, "childhood", used, 7);
  const traditional = pickByTag(photos, "traditional", used, 6);
  const couple = pickByTag(photos, "couple", used, 5);
  const travel = pickByTag(photos, "travel", used, 5);
  const emotional = pickByTag(photos, "emotional", used, 7);
  const funny = pickByTag(photos, "funny", used, 6);
  const romantic = pickByTag(photos, "romantic", used, 9);
  const candid = pickByTag(photos, "candid", used, 12);

  // Catch-all leftover
  const leftover = photos.filter(p => !used.has(p.id) && p.id !== HERO_ID);
  leftover.forEach(p => used.add(p.id));

  return { hero, childhood, traditional, couple, travel, emotional, funny, romantic, candid, leftover };
}

function Index() {
  const [phase, setPhase] = useState<"loading" | "opening" | "story">("loading");

  const photos = useMemo(() => applyOverrides(PHOTOS), []);
  const a = useMemo(() => buildStoryAssignments(photos), [photos]);

  useEffect(() => {
    if (phase !== "story") return;
    const lenis = new Lenis({ duration: 1.4, smoothWheel: true, lerp: 0.08 });
    let raf = 0;
    const tick = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, [phase]);

  useEffect(() => {
    if (phase !== "story") return;
    [a.hero, ...a.couple, ...a.romantic.slice(0, 4)].forEach(p => { const i = new Image(); i.src = p.src; });
  }, [phase, a]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const pick = (arr: PhotoMeta[], i: number) => arr[i % arr.length];

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {phase === "loading" && <Loading key="load" onDone={() => setPhase("opening")} />}
        {phase === "opening" && (
          <OpeningScreen key="open" bgImage={a.hero.src} onBegin={() => setPhase("story")} />
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
        style={{
          scaleX: progress,
          background: "linear-gradient(90deg, transparent, oklch(0.7 0.22 245), oklch(0.92 0.05 250))",
          boxShadow: "0 0 20px oklch(0.7 0.22 245 / 0.6)",
        }}
      />

      <Particles density={70} />
      <CursorGlow />
      <MusicController started={phase === "story"} />

      <main className="relative z-10">
        {/* Title sting featuring the hero photo */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ scale: 1.25, opacity: 0 }}
            animate={phase === "story" ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img src={a.hero.src} alt="" className="w-full h-full object-cover"
                 style={{ filter: "brightness(0.55) saturate(1.15)" }} />
          </motion.div>
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at center, transparent 25%, oklch(0.05 0.04 270 / 0.95) 80%)"
          }} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={phase === "story" ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 2.4, delay: 1 }}
            className="relative z-10 text-center px-6"
          >
            <p className="font-script italic text-lg md:text-2xl text-accent/80 mb-6">a film of forever</p>
            <h1 className="font-display tracking-[0.06em] text-4xl md:text-8xl font-light gradient-text anim-title-glow leading-[0.95]">
              ANISHA <span className="text-accent">&amp;</span> RITESH
            </h1>
            <p className="mt-6 font-script italic text-base md:text-xl text-foreground/80 text-glow-soft max-w-md mx-auto">
              {a.hero.caption}
            </p>
            <p className="mt-10 text-[10px] md:text-xs tracking-[0.6em] uppercase text-muted-foreground">scroll · the story begins</p>
          </motion.div>
        </section>

        {/* HERO PHOTO featured large */}
        <SceneFull
          src={a.hero.src}
          caption="The frame I look at most"
          subtitle="Tum, white flower, soft smile — done deal."
          hindi={a.hero.caption}
        />
        <Subtitle text="Some stories aren't told. They are felt, frame by frame." />

        {/* CHAPTER 1 — CHILDHOOD */}
        <div className="relative">
          <div className="absolute inset-0 mood-childhood pointer-events-none" />
          <ChapterTitle number="One" title="Childhood" subtitle="Two stubborn kids — never knowing destiny was secretly writing their story." />
          <Subtitle text="We met when love didn't even exist in our minds." />
          <SceneSplit src={pick(a.childhood, 0).src} title="Before we knew the word 'forever'"
            body={`${pick(a.childhood, 0).caption}\n\nDo bachche, choti ladaiyan, badi hassi — aur destiny chupke se notes le rahi thi.`} />
          <SceneFull src={pick(a.childhood, 1).src} caption="Long before us"
            subtitle="There was already a quiet plan" hindi={pick(a.childhood, 1).caption} />
          <CinematicVideo src={VIDEOS[0].src} poster={VIDEOS[0].poster}
            caption={VIDEOS[0].caption} subtitle="Childhood, on play loop" />
          <MasonryGallery
            title="Childhood frames"
            intro="Scrapbook ke purane pages — har ek ke peeche ek kahaani hai."
            items={[...a.childhood.slice(2), ...a.traditional.slice(0, 2)].map(p => ({ type: "image" as const, src: p.src, caption: p.caption }))}
          />
        </div>

        {/* CHAPTER 2 — DESTINY & DISTANCE */}
        <div className="relative">
          <div className="absolute inset-0 mood-distance pointer-events-none" />
          <ChapterTitle number="Two" title="Destiny & Distance" subtitle="Sometimes people meet twice. Once as strangers… once as soulmates." />
          <SceneFull src={pick(a.emotional, 0).src} caption="Cities apart"
            subtitle="The same sky over both of us" hindi={pick(a.emotional, 0).caption} />
          <Subtitle text="No matter how far life pushed us… something always pulled us back together." />
          <CinematicVideo src={VIDEOS[1].src} poster={VIDEOS[1].poster}
            caption={VIDEOS[1].caption} subtitle="A clip from the in-between" />
          <SceneSplit src={pick(a.emotional, 1).src} title="Long nights, low signal, loud heart"
            body={`${pick(a.emotional, 1).caption}\n\nPhone screens lit up like lighthouses. Half conversations, full feelings.`} />
          <SceneFull src={pick(a.emotional, 2).src} caption="Some nights"
            subtitle="Missing you was a full-time job" hindi={pick(a.emotional, 2).caption} align="right" />
          <MasonryGallery
            title="The dark, beautiful in-between"
            intro="Yeh frames, jab dooriyan thi — par dil bilkul paas."
            items={[
              ...a.emotional.slice(3, 7).map(p => ({ type: "image" as const, src: p.src, caption: p.caption })),
              { type: "video" as const, src: VIDEOS[2].src, poster: VIDEOS[2].poster, caption: VIDEOS[2].caption },
              ...a.candid.slice(0, 3).map(p => ({ type: "image" as const, src: p.src, caption: p.caption })),
            ]}
          />
          <SceneSplit reverse src={pick(a.emotional, 5).src} title="My demon, my calm"
            body={`${pick(a.emotional, 5).caption}\n\nWorst nights pe tumhara naam screen pe — ek pooja jaisa lagta tha.`} />
        </div>

        {/* CHAPTER 3 — FALLING IN LOVE */}
        <div className="relative">
          <div className="absolute inset-0 mood-love pointer-events-none" />
          <ChapterTitle number="Three" title="Falling In Love" subtitle="She didn't enter my life loudly. She became peace, quietly." />
          <SceneFull src={pick(a.traditional, 2).src} caption="Pyaar ki farmaaish"
            subtitle="Aur tum, har baar, jawab" hindi={pick(a.traditional, 2).caption} />
          <CinematicVideo src={VIDEOS[3].src} poster={VIDEOS[3].poster}
            caption={VIDEOS[3].caption} subtitle="The sound of falling" />
          <SceneSplit src={pick(a.traditional, 3).src} title="The reason I started loving life itself"
            body={`${pick(a.traditional, 3).caption}\n\nMornings got softer. Music got heavier. Sab kuch behtar — sirf tumhari wajah se.`} />
          <SceneSplit reverse src={pick(a.romantic, 0).src} title="Golden hour, every hour"
            body={`${pick(a.romantic, 0).caption}\n\nTumhare paas, time bhi soft ho jaata hai.`} />
          <SceneFull src={pick(a.romantic, 1).src} caption="And just like that"
            subtitle="My heart picked a side" hindi={pick(a.romantic, 1).caption} />
          <CinematicVideo src={VIDEOS[4].src} poster={VIDEOS[4].poster}
            caption={VIDEOS[4].caption} subtitle="Background mein tum, foreground mein bhi tum" />
          <MasonryGallery
            title="Light, laughter, you"
            intro="Yeh chapter sirf tumhari wajah se warm hai."
            items={[
              ...a.romantic.slice(2, 7).map(p => ({ type: "image" as const, src: p.src, caption: p.caption })),
              ...a.funny.slice(0, 3).map(p => ({ type: "image" as const, src: p.src, caption: p.caption })),
              ...a.traditional.slice(4, 6).map(p => ({ type: "image" as const, src: p.src, caption: p.caption })),
            ]}
          />
          <SceneSplit src={pick(a.romantic, 7).src} title="Peace, in the shape of a person"
            body={`${pick(a.romantic, 7).caption}\n\nDuniya shor karti hai. Tum nahi karti. Aur shayad isi liye mera dil pehli baar ruka.`} />
        </div>

        {/* CHAPTER 4 — TRAVEL & ADVENTURES */}
        <div className="relative">
          <div className="absolute inset-0 mood-childhood pointer-events-none" />
          <ChapterTitle number="Four" title="Adventures Together" subtitle="New skies, same hand in mine." />
          <SceneFull src={pick(a.travel, 0).src} caption="Wherever, with you"
            subtitle="Maps stopped mattering" hindi={pick(a.travel, 0).caption} />
          <CinematicVideo src={VIDEOS[5].src} poster={VIDEOS[5].poster}
            caption={VIDEOS[5].caption} subtitle="On the road with you" />
          <SceneSplit src={pick(a.travel, 1).src} title="Side quests of a lifetime"
            body={`${pick(a.travel, 1).caption}\n\nDetours, wrong turns, missed buses — har galti yaad ban gayi.`} />
          <MasonryGallery
            title="Postcards from us"
            intro="Galiyon se pahaadon tak — tum thi, sab kuch tha."
            items={[
              ...a.travel.slice(2).map(p => ({ type: "image" as const, src: p.src, caption: p.caption })),
              ...a.funny.slice(3, 6).map(p => ({ type: "image" as const, src: p.src, caption: p.caption })),
              { type: "video" as const, src: VIDEOS[6].src, poster: VIDEOS[6].poster, caption: VIDEOS[6].caption },
            ]}
          />
        </div>

        {/* MEMORY WALL */}
        <div className="relative">
          <div className="absolute inset-0 mood-special pointer-events-none" />
          <ChapterTitle number="·" title="The Memory Wall" subtitle="Every picture here is proof that some moments deserve eternity." />
          <CinematicVideo src={VIDEOS[7].src} poster={VIDEOS[7].poster}
            caption={VIDEOS[7].caption} subtitle="A clip on permanent loop in my head" />
          <MasonryGallery
            title="Moments that refused to fade"
            intro="Inhi pal ne meri zindagi ko script di hai."
            items={[
              ...a.candid.slice(3, 9).map(p => ({ type: "image" as const, src: p.src, caption: p.caption })),
              { type: "video" as const, src: VIDEOS[8].src, poster: VIDEOS[8].poster, caption: VIDEOS[8].caption },
              ...a.couple.map(p => ({ type: "image" as const, src: p.src, caption: p.caption })),
              ...a.leftover.slice(0, 6).map(p => ({ type: "image" as const, src: p.src, caption: p.caption })),
            ]}
          />
          <SceneFull src={pick(a.couple, 0).src} caption="Frame by frame"
            subtitle="A whole lifetime, hiding in plain sight" hindi={pick(a.couple, 0).caption} />
          <SceneSplit reverse src={pick(a.candid, 9).src} title="The small ones run the show"
            body={`${pick(a.candid, 9).caption}\n\nA glance. A 2am text. Hand brushing mine. Bade moments highlight reel banaate hain — chote moments pyaar banaate hain.`} />
          <Subtitle text="If forever has a sound, it's the way you say my name." />
          <SceneFull src={pick(a.candid, 10).src} caption="Soft. Honest. Yours."
            subtitle="Every part of me, picked you back" hindi={pick(a.candid, 10).caption} align="left" />
          <SceneSplit src={pick(a.couple, 1).src} title="You, in every memory"
            body={`${pick(a.couple, 1).caption}\n\nMain ab purani photos mein bhi tumhe dhoondhta hoon. Tumhara na hona galat lagta hai.`} />
          <MemoryCounter />
          <Letter />
        </div>

        {/* FINAL */}
        <div className="relative">
          <div className="absolute inset-0 mood-final pointer-events-none" />
          <Subtitle text="And if I had to choose again… in every universe… in every lifetime…" />
          <SceneFull src={a.hero.src} caption="A heartbeat, slowing down"
            subtitle="So I can stay here a little longer with you" hindi="Tum hi tum, har janam mein." />
          <CinematicVideo src={VIDEOS[9].src} poster={VIDEOS[9].poster}
            caption={VIDEOS[9].caption} subtitle="Final clip, infinite love" />
          <Subtitle text="…I would still choose you." />
          <Ending images={photos.map(p => p.src)} />
          <section className="relative py-24 text-center">
            <p className="font-display tracking-[0.4em] text-xs uppercase text-accent/70 mb-3">— end title —</p>
            <h2 className="font-display tracking-[0.12em] text-3xl md:text-6xl font-light gradient-text anim-title-glow">
              FOREVER
            </h2>
            <p className="mt-6 font-script italic text-lg md:text-2xl text-foreground/80">
              Ritesh <span className="text-accent">❤</span> Anisha
            </p>
            <p className="mt-12 text-[10px] tracking-[0.4em] uppercase text-muted-foreground/50">
              made with everything I have · for you ·
              {" "}
              <a href="/tag" className="hover:text-accent transition">edit story</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
