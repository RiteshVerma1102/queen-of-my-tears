import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PHOTOS, TAG_LABELS, type Tag, loadOverrides, saveOverrides } from "@/lib/story-data";

export const Route = createFileRoute("/tag")({
  head: () => ({ meta: [{ title: "Tag Memories — Story Editor" }] }),
  component: TagEditor,
});

const ALL_TAGS: Tag[] = ["romantic", "travel", "funny", "emotional", "candid", "traditional", "childhood", "couple"];

function TagEditor() {
  const [overrides, setOverrides] = useState<Record<string, Tag[]>>({});
  const [filter, setFilter] = useState<Tag | "all">("all");
  const [saved, setSaved] = useState(false);

  useEffect(() => { setOverrides(loadOverrides()); }, []);

  const merged = PHOTOS.map(p => ({ ...p, tags: overrides[p.id] ?? p.tags }));
  const filtered = filter === "all" ? merged : merged.filter(p => p.tags.includes(filter));

  const toggleTag = (id: string, tag: Tag) => {
    const cur = overrides[id] ?? PHOTOS.find(p => p.id === id)!.tags;
    const next = cur.includes(tag) ? cur.filter(t => t !== tag) : [...cur, tag];
    const newOv = { ...overrides, [id]: next };
    setOverrides(newOv);
    saveOverrides(newOv);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  const reset = () => {
    if (!confirm("Reset all tags to default?")) return;
    setOverrides({});
    saveOverrides({});
  };

  return (
    <div className="min-h-screen p-4 md:p-10">
      <header className="max-w-7xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-5xl gradient-text text-glow">Story Editor</h1>
          <p className="text-sm text-muted-foreground mt-1">Tag photos to control where they appear in the story.</p>
        </div>
        <div className="flex gap-2 items-center">
          {saved && <span className="text-xs text-accent anim-pulse-glow">saved ✓</span>}
          <button onClick={reset} className="glass rounded-full px-4 py-2 text-xs uppercase tracking-wider hover:scale-105 transition">Reset</button>
          <Link to="/" className="glass rounded-full px-4 py-2 text-xs uppercase tracking-wider hover:scale-105 transition">View Story →</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2">
        <FilterBtn active={filter === "all"} onClick={() => setFilter("all")}>All ({merged.length})</FilterBtn>
        {ALL_TAGS.map(t => (
          <FilterBtn key={t} active={filter === t} onClick={() => setFilter(t)}>
            {TAG_LABELS[t]} ({merged.filter(p => p.tags.includes(t)).length})
          </FilterBtn>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
        {filtered.map(p => (
          <div key={p.id} className="glass rounded-xl overflow-hidden group">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img src={p.src} alt={p.id} loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 glass rounded-full px-2 py-0.5 text-[10px] tracking-wider">{p.id}</div>
            </div>
            <div className="p-3">
              <div className="flex flex-wrap gap-1.5">
                {ALL_TAGS.map(t => {
                  const on = p.tags.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => toggleTag(p.id, t)}
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition ${
                        on
                          ? "bg-accent text-accent-foreground border-accent"
                          : "border-border text-muted-foreground hover:border-accent/60"
                      }`}
                    >
                      {TAG_LABELS[t]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-full px-4 py-2 text-xs uppercase tracking-wider transition ${
      active ? "bg-accent text-accent-foreground" : "glass hover:scale-105"
    }`}>{children}</button>
  );
}
