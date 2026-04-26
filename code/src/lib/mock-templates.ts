/**
 * Minimalne szablony mockowe — fallback gdy Gemini API niedostępne (429/błąd).
 * Port uproszczony z js/templates.js (1 szablon per ton × platforma).
 */
import type { GenerateRequest, GenerateResult, Hashtag } from "@/types/generator";

const CAPTIONS_PL: Record<string, string[]> = {
  inspirational: [
    "✨ {topic} — to nie tylko chwila, to krok w stronę swojej najlepszej wersji. Zacznij dziś. 💪",
    "🌟 {topic} zmienia perspektywę. Co Ty robisz, żeby rozwijać się każdego dnia? Napisz w komentarzu!",
    "💡 Wiesz, że {topic} może zmienić wszystko? Zacznij od małego kroku — i nie zatrzymuj się. 🚀",
  ],
  professional: [
    "📊 {topic} to temat, który zmienia zasady gry w branży {niche}. Oto kluczowe wnioski:",
    "🎯 Profesjonaliści z branży {niche} wiedzą, że {topic} jest fundamentem sukcesu. Dowiedz się więcej:",
    "💼 {topic} — strategiczne podejście, które wyróżnia liderów branży {niche}. Szczegóły poniżej.",
  ],
  casual: [
    "😎 Ok, muszę Wam powiedzieć o {topic} — dosłownie zmieniło to moje życie! A u Was jak?",
    "Hej, dziś o {topic}! Szczerze? Nie spodziewałam się, że tak to polubię 😂 A Wy co sądzicie?",
    "Porozmawiajmy o {topic}! Kto jeszcze przez to przeszedł? Drop 🙋 w komentarzach!",
  ],
  humorous: [
    "😂 {topic}... czyli mnie oficjalnie nie ma w pobliżu lodówki przez następną godzinę. Ktoś śledzi?",
    "Gdyby {topic} było sportem olimpijskim, właśnie zdobyłabym złoto 🥇 Albo przynajmniej dyplom uczestnictwa.",
    "Niepodważalny fakt naukowy: {topic} sprawia, że życie jest lepsze. Źródło: ja. 📚✨",
  ],
  educational: [
    "📚 Wiedziałeś, że {topic}? Oto 3 fakty, które warto znać w branży {niche}:",
    "🔍 Lekcja dnia: {topic}. Kluczowe elementy, które każdy w branży {niche} powinien rozumieć:",
    "💡 Przewodnik dla każdego w {niche}: {topic} — od podstaw do zaawansowanych technik.",
  ],
};

const CAPTIONS_EN: Record<string, string[]> = {
  inspirational: [
    "✨ {topic} — this isn't just a moment, it's a step toward your best self. Start today. 💪",
    "🌟 {topic} changes perspective. What are you doing to grow every day? Drop it in the comments!",
    "💡 Did you know {topic} can change everything? Start small — and don't stop. 🚀",
  ],
  professional: [
    "📊 {topic} is reshaping the {niche} industry. Here are the key takeaways:",
    "🎯 Leaders in {niche} know that {topic} is the foundation of success. Learn more:",
    "💼 {topic} — the strategic approach that sets {niche} leaders apart. Details below.",
  ],
  casual: [
    "😎 Ok, I HAVE to tell you about {topic} — it literally changed my life! How about you?",
    "Hey, today's topic is {topic}! Honestly? Didn't expect to love it this much 😂 What do you think?",
    "Let's talk about {topic}! Who else has been through this? Drop 🙋 in the comments!",
  ],
  humorous: [
    "😂 {topic}... officially means I'm staying away from the fridge for the next hour. Anyone else?",
    "If {topic} were an Olympic sport, I'd totally win gold 🥇 Or at least a participation medal.",
    "Undeniable scientific fact: {topic} makes life better. Source: me. 📚✨",
  ],
  educational: [
    "📚 Did you know about {topic}? Here are 3 facts every {niche} professional should know:",
    "🔍 Lesson of the day: {topic}. Key elements everyone in {niche} should understand:",
    "💡 A guide for {niche} enthusiasts: {topic} — from basics to advanced techniques.",
  ],
};

const HASHTAGS_BY_NICHE: Record<string, Hashtag[]> = {
  fitness: [
    { tag: "#fitness", reach: "large" },
    { tag: "#motivation", reach: "large" },
    { tag: "#workout", reach: "large" },
    { tag: "#fitnessmotivation", reach: "medium" },
    { tag: "#healthylifestyle", reach: "medium" },
    { tag: "#treningPL", reach: "small" },
    { tag: "#fitnessPL", reach: "small" },
  ],
  tech: [
    { tag: "#technology", reach: "large" },
    { tag: "#innovation", reach: "large" },
    { tag: "#ai", reach: "large" },
    { tag: "#techtrends", reach: "medium" },
    { tag: "#startup", reach: "medium" },
    { tag: "#techPL", reach: "small" },
  ],
  default: [
    { tag: "#instagood", reach: "large" },
    { tag: "#photooftheday", reach: "large" },
    { tag: "#lifestyle", reach: "large" },
    { tag: "#inspiration", reach: "medium" },
    { tag: "#content", reach: "medium" },
    { tag: "#polska", reach: "medium" },
    { tag: "#polskikontent", reach: "small" },
  ],
};

const REACH_LABELS: Record<string, Record<string, string>> = {
  large: { pl: "🔥 Duży zasięg", en: "🔥 High reach" },
  medium: { pl: "📈 Średni zasięg", en: "📈 Medium reach" },
  small: { pl: "🎯 Niszowy", en: "🎯 Niche" },
};

function fillTemplate(template: string, params: GenerateRequest): string {
  return template
    .replace(/\{topic\}/g, params.topic)
    .replace(/\{niche\}/g, params.niche || "ogólna");
}

export function generateMockResult(params: GenerateRequest): GenerateResult {
  const lang = params.language;
  const templates = lang === "en" ? CAPTIONS_EN : CAPTIONS_PL;
  const toneTemplates = templates[params.tone] ?? templates["inspirational"] ?? [];

  const captions = toneTemplates.map((tmpl, i) => ({
    id: i + 1,
    text: fillTemplate(tmpl, params),
    variant: lang === "en" ? `Variant ${i + 1}` : `Wariant ${i + 1}`,
  }));

  const nicheKey = Object.keys(HASHTAGS_BY_NICHE).find((k) =>
    params.niche?.toLowerCase().includes(k)
  );
  const rawHashtags =
    HASHTAGS_BY_NICHE[nicheKey ?? "default"] ?? HASHTAGS_BY_NICHE["default"] ?? [];

  const hashtags: Hashtag[] = rawHashtags.map((h) => ({
    ...h,
    label: REACH_LABELS[h.reach]?.[lang] ?? h.reach,
  }));

  return {
    captions,
    hashtags,
    platform: params.platform,
    tone: params.tone,
    language: params.language,
    source: "mock",
  };
}
