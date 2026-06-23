// Per-photo captions and default category tags. Editable via /tag.
export type Tag = "romantic" | "travel" | "funny" | "emotional" | "candid" | "traditional" | "childhood" | "couple";

export type PhotoMeta = {
  id: string;             // "m01"
  src: string;
  caption: string;
  tags: Tag[];
};

const captions: Record<number, { c: string; t: Tag[] }> = {
  1:  { c: "Tum, dheere se muskura dena.",                       t: ["romantic", "traditional"] },
  2:  { c: "Saree, sunlight, soulmate.",                          t: ["traditional", "romantic"] },
  3:  { c: "Aaj bhi yahi photo dekhta hoon.",                     t: ["traditional", "candid"] },
  4:  { c: "Door se bhi tum, paas lagti ho.",                     t: ["candid", "romantic"] },
  5:  { c: "Pyaar bhi tumhari shakal jaisa lagta hai.",           t: ["traditional", "romantic"] },
  6:  { c: "Wo ek nazar — meri saari kavita.",                    t: ["romantic", "candid"] },
  7:  { c: "Tum hansti ho to mausam badal jaata hai.",            t: ["funny", "candid"] },
  8:  { c: "Sona dhoondh raha tha — aur tum mil gayi.",           t: ["traditional", "romantic"] },
  9:  { c: "Pheli baar dil zor se dhadka tha.",                   t: ["romantic", "emotional"] },
  10: { c: "Roshni bhi tumse seekhti hai.",                       t: ["candid", "romantic"] },
  11: { c: "Kahani ka pehla scene.",                              t: ["traditional", "couple"] },
  12: { c: "Smile chhupti nahi tum se.",                          t: ["candid", "funny"] },
  13: { c: "Yeh frame mere mood ka background hai.",              t: ["traditional", "romantic"] },
  14: { c: "Saanson mein basi ho ab.",                            t: ["romantic", "emotional"] },
  15: { c: "Tum, bina makeup, sabse khoobsurat.",                 t: ["candid", "romantic"] },
  16: { c: "Ek look — aur main tumhara.",                         t: ["romantic", "couple"] },
  17: { c: "Hum, ek frame mein, hamesha.",                        t: ["couple", "romantic"] },
  18: { c: "Travel: jahan tum ho, wahin manzil hai.",             t: ["travel", "candid"] },
  19: { c: "Pahaadon ne bhi kaha — yeh saath rahe.",              t: ["travel", "couple"] },
  20: { c: "Tumhari aankhein, mera Google Maps.",                 t: ["funny", "romantic"] },
  21: { c: "Beach, tum, aur waqt ka bhulna.",                     t: ["travel", "candid"] },
  22: { c: "Memory grid: har tile ek ehsaas.",                    t: ["candid"] },
  23: { c: "Phone ki gallery, dil ka diary.",                     t: ["candid", "emotional"] },
  24: { c: "Lock screen pe tum hi ho.",                           t: ["romantic", "candid"] },
  25: { c: "Screen bhi tumhari muskaan se light hota hai.",       t: ["funny", "romantic"] },
  26: { c: "Bachpan ki hawa, badi yaad.",                         t: ["childhood", "candid"] },
  27: { c: "Choti thi tum — heart bada tha.",                     t: ["childhood"] },
  28: { c: "Pahaad, rasta, aur ek ladki — ab meri.",              t: ["childhood", "travel"] },
  29: { c: "Ped ke neeche pehla photo, ab favourite.",            t: ["childhood", "travel"] },
  30: { c: "Dosti ke din — kismat secret me kaam kar rahi thi.",  t: ["childhood", "funny"] },
  31: { c: "Family, frame, foundation.",                          t: ["childhood", "emotional"] },
  32: { c: "Old photo — same eyes, same magic.",                  t: ["childhood", "candid"] },
  33: { c: "Raat 11 baje wali serious wali.",                     t: ["candid", "emotional"] },
  34: { c: "Awaaz na bhi ho, samajh jaata hoon main.",            t: ["emotional", "candid"] },
  35: { c: "Selfie nahi, soul-fie.",                              t: ["candid", "funny"] },
  36: { c: "Tumhari aankhein — pura ek ghar.",                    t: ["emotional", "romantic"] },
  37: { c: "Hum dono — best wala scene.",                         t: ["couple", "romantic"] },
  38: { c: "Pahli photo gallery me, ab dil me.",                  t: ["candid", "emotional"] },
  39: { c: "Bina filter wali tum, original masterpiece.",         t: ["candid", "emotional"] },
  40: { c: "Ek glance, lakh wajah.",                              t: ["romantic", "emotional"] },
  41: { c: "Hum, formal — par dil unformal.",                     t: ["couple", "romantic"] },
  42: { c: "Tumhari photo dekh ke main rukta hoon, mere photos me bhi.", t: ["candid", "emotional"] },
  43: { c: "Family love — silently the strongest.",               t: ["emotional", "childhood"] },
  44: { c: "Old chapter, soft heart.",                            t: ["emotional", "childhood"] },
  45: { c: "Pyaar dheere se aaya tha — chai jaisa.",              t: ["romantic", "candid"] },
  46: { c: "Tumhari sleep wali photo, mera peace.",               t: ["candid", "romantic"] },
  47: { c: "Closeup — sirf main, sirf tum.",                      t: ["emotional", "romantic"] },
  48: { c: "Doorway pe ruk gaya tha — tum aati ho jab.",          t: ["candid", "romantic"] },
  49: { c: "Fairy lights se zyada tumse roshni hai.",             t: ["romantic", "candid"] },
  50: { c: "Pink — tumhara colour, mera mood.",                   t: ["candid", "romantic"] },
  51: { c: "Hassi rok ke ek serious wali.",                       t: ["funny", "candid"] },
  52: { c: "Yahan main tumse pyaar karta hua dikh raha hoon.",    t: ["emotional", "romantic"] },
  53: { c: "Garden me dance — wajah tum.",                        t: ["funny", "candid"] },
  54: { c: "Glasses on, heart open.",                             t: ["funny", "candid"] },
  55: { c: "Old monastery vibes — peace + you.",                  t: ["travel", "emotional"] },
  56: { c: "Frame me tum + reflection of me, perfect.",           t: ["candid", "romantic"] },
  57: { c: "Long hair, longer love.",                             t: ["candid", "romantic"] },
  58: { c: "Hum dono ka sabse pasand wala scene.",                t: ["couple", "romantic"] },
  59: { c: "Soft tum, soft duniya.",                              t: ["candid", "emotional"] },
  60: { c: "Door rehkar bhi paas wali photo.",                    t: ["traditional", "emotional"] },
  61: { c: "Bench scene — ek pal ke liye sab ruk gaya.",          t: ["candid", "romantic"] },
  62: { c: "Ghar wali tum — meri favourite tum.",                 t: ["candid", "romantic"] },
  63: { c: "Pose ki master, mere dil ki captain.",                t: ["funny", "candid"] },
  64: { c: "Yoga + you = balance.",                               t: ["funny", "candid"] },
  65: { c: "Garden me pink kurta wali — heart attack scene.",     t: ["romantic", "candid"] },
  66: { c: "Tum jab photo lo to camera bhi shy ho jaye.",         t: ["funny", "candid"] },
  67: { c: "Yeh photo print karaani hai, frame karaani hai.",     t: ["romantic", "candid"] },
  68: { c: "Behind those eyes — mera pura forever.",              t: ["emotional", "romantic"] },
  69: { c: "Pink jaisi tum — soft, jaani-pehchaani, meri.",       t: ["romantic", "candid"] },
};

export const PHOTOS: PhotoMeta[] = Array.from({ length: 69 }, (_, i) => {
  const n = i + 1;
  const meta = captions[n] ?? { c: "Tumhari ek aur yaad.", t: ["candid"] as Tag[] };
  return {
    id: `m${String(n).padStart(2, "0")}`,
    src: `/memories/m${String(n).padStart(2, "0")}.jpg`,
    caption: meta.c,
    tags: meta.t,
  };
});

export const VIDEOS = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1;
  return {
    id: `v${String(n).padStart(2, "0")}`,
    src: `/videos/v${String(n).padStart(2, "0")}.mp4`,
    poster: `/videos/posters/v${String(n).padStart(2, "0")}.jpg`,
    caption: [
      "Tumhari hassi — slow motion mein bhi tez.",
      "Ek pal jise main loop pe rakhta hoon.",
      "Camera off karna bhool gaya — shukar hai.",
      "Yeh wala clip dil pe chalta hai.",
      "Background mein tum, foreground mein bhi tum.",
      "Bina pose wala, sabse pyaara.",
      "Yeh frame ek poori kahaani hai.",
      "Tumhari aawaz se zyada koi music nahi.",
      "Yahan tum ho — aur kuch nahi chahiye.",
      "Final clip — heart goes brrr.",
    ][i],
  };
});

export const TAG_LABELS: Record<Tag, string> = {
  romantic: "Romantic",
  travel: "Travel",
  funny: "Funny",
  emotional: "Emotional",
  candid: "Candid",
  traditional: "Traditional",
  childhood: "Childhood",
  couple: "Couple",
};

const STORAGE_KEY = "anisha-story-tags-v1";

export function loadOverrides(): Record<string, Tag[]> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}

export function saveOverrides(o: Record<string, Tag[]>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(o));
}

export function applyOverrides(photos: PhotoMeta[]): PhotoMeta[] {
  const ov = loadOverrides();
  return photos.map(p => ov[p.id] ? { ...p, tags: ov[p.id] } : p);
}

export function pickByTag(photos: PhotoMeta[], tag: Tag, used: Set<string>, limit = 8): PhotoMeta[] {
  const out: PhotoMeta[] = [];
  for (const p of photos) {
    if (out.length >= limit) break;
    if (used.has(p.id)) continue;
    if (p.tags.includes(tag)) { out.push(p); used.add(p.id); }
  }
  return out;
}
