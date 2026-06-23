import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { timelineMemories } from "../data/anniversary";

type MemoryCategory = "cute" | "funny" | "deep" | "important" | "random";

type MemoryMedia = {
  id: string;
  kind: "image" | "video" | "other";
  name: string;
  dataUrl: string;
  persistent: boolean;
};

type MemoryItem = {
  id: string;
  title: string;
  dateLabel: string;
  category: MemoryCategory;
  description: string;
  whyItMattered: string;
  quote: string;
  media: MemoryMedia[];
  createdAt: string;
};

type MemoryFormState = {
  title: string;
  dateLabel: string;
  category: MemoryCategory;
  description: string;
  whyItMattered: string;
  quote: string;
  media: MemoryMedia[];
};

type PromptCard = {
  label: string;
  title: string;
  question: string;
  category: MemoryCategory;
};

const STORAGE_KEY = "half-year-live-memory-builder-v1";
const MEDIA_PERSIST_LIMIT_BYTES = 1_500_000;

const categoryLabels: Record<MemoryCategory, string> = {
  cute: "cuki",
  funny: "vicces",
  deep: "mély",
  important: "fontos",
  random: "random",
};

const categoryEmojis: Record<MemoryCategory, string> = {
  cute: "💕",
  funny: "😂",
  deep: "🌙",
  important: "✨",
  random: "🫶",
};

const starterPrompts: PromptCard[] = [
  ...timelineMemories.map((memory, index) => ({
    label: memory.month,
    title: memory.title,
    question: memory.prompt,
    category: index === 2 ? "funny" : index >= 4 ? "deep" : "important",
  })) as PromptCard[],
  {
    label: "első pillanatok",
    title: "Az első pillanat, ami megmaradt",
    question: "Mi volt az első konkrét pillanat, amire mindketten emlékszünk?",
    category: "deep",
  },
  {
    label: "nevetés",
    title: "A legviccesebb közös emlékünk",
    question: "Min nevettünk úgy, hogy még most is eszünkbe jut?",
    category: "funny",
  },
  {
    label: "apróság",
    title: "Egy kicsi dolog, ami nagy lett",
    question: "Milyen apró mondat, screenshot, kép vagy szokás lett fontos nekünk?",
    category: "cute",
  },
  {
    label: "kedvenc",
    title: "A kedvenc napunk eddig",
    question: "Melyik napot tennénk biztosan a poszterre?",
    category: "important",
  },
  {
    label: "jövő",
    title: "A következő fél évre",
    question: "Mit szeretnénk, hogy biztosan megtörténjen a következő fél évben?",
    category: "deep",
  },
];

const emptyForm: MemoryFormState = {
  title: "",
  dateLabel: "",
  category: "cute",
  description: "",
  whyItMattered: "",
  quote: "",
  media: [],
};

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function downloadFile(filename: string, content: BlobPart, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function mediaKind(file: File): MemoryMedia["kind"] {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  return "other";
}

function readFileAsDataUrl(file: File): Promise<MemoryMedia> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        id: makeId(),
        kind: mediaKind(file),
        name: file.name,
        dataUrl: String(reader.result),
        persistent: file.size <= MEDIA_PERSIST_LIMIT_BYTES,
      });
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function buildPosterHtml(memories: MemoryItem[]) {
  const cards = memories
    .map((memory) => {
      const media = memory.media
        .map((item) => {
          if (item.kind === "image") {
            return `<img src="${item.dataUrl}" alt="${escapeHtml(item.name)}" />`;
          }

          if (item.kind === "video") {
            return `<video src="${item.dataUrl}" controls></video>`;
          }

          return `<p class="file-pill">${escapeHtml(item.name)}</p>`;
        })
        .join("");

      return `
        <article class="memory-card ${memory.category}">
          ${media ? `<div class="media-grid">${media}</div>` : ""}
          <p class="meta">${categoryEmojis[memory.category]} ${escapeHtml(categoryLabels[memory.category])}${memory.dateLabel ? ` · ${escapeHtml(memory.dateLabel)}` : ""}</p>
          <h2>${escapeHtml(memory.title)}</h2>
          ${memory.description ? `<p>${escapeHtml(memory.description)}</p>` : ""}
          ${memory.whyItMattered ? `<p class="why">${escapeHtml(memory.whyItMattered)}</p>` : ""}
          ${memory.quote ? `<blockquote>“${escapeHtml(memory.quote)}”</blockquote>` : ""}
        </article>
      `;
    })
    .join("\n");

  return `<!doctype html>
<html lang="hu">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Fél éve veled</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      font-family: Georgia, 'Times New Roman', serif;
      color: #712843;
      background: radial-gradient(circle at top left, #ffe4ef, transparent 32%), linear-gradient(135deg, #fff7f9, #ffdbe8 48%, #f5b5ce);
    }
    main { width: min(1120px, calc(100% - 28px)); margin: 0 auto; padding: 48px 0; }
    header { text-align: center; padding: 42px 18px; }
    .kicker { margin: 0 0 12px; color: #ad3d68; text-transform: uppercase; letter-spacing: .18em; font: 800 12px system-ui, sans-serif; }
    h1 { margin: 0; color: #8f274c; font-size: clamp(48px, 10vw, 112px); line-height: .88; }
    header p:last-child { max-width: 720px; margin: 22px auto 0; font-size: 20px; line-height: 1.6; }
    .grid { column-count: 3; column-gap: 18px; }
    .memory-card { display: inline-block; width: 100%; break-inside: avoid; margin: 0 0 18px; padding: 20px; border-radius: 28px; background: rgba(255,255,255,.74); border: 1px solid rgba(176,54,99,.16); box-shadow: 0 18px 52px rgba(133,34,73,.14); }
    .meta { margin: 0 0 8px; color: #b53b68; font: 800 12px system-ui, sans-serif; letter-spacing: .08em; text-transform: uppercase; }
    h2 { margin: 0; color: #8f274c; font-size: 30px; line-height: 1.05; }
    .memory-card p { line-height: 1.62; }
    .why { padding: 12px 14px; border-radius: 18px; background: #fff3f7; font-weight: 700; }
    blockquote { margin: 14px 0 0; padding-left: 14px; border-left: 4px solid #e889ad; font-size: 20px; color: #8f274c; }
    .media-grid { display: grid; gap: 8px; margin-bottom: 14px; }
    img, video { width: 100%; max-height: 420px; object-fit: cover; border-radius: 20px; display: block; }
    .file-pill { padding: 10px 12px; border-radius: 999px; background: #fff0f6; font: 700 13px system-ui, sans-serif; }
    footer { text-align: center; padding: 34px 0 10px; font-size: 22px; color: #8f274c; }
    @media (max-width: 900px) { .grid { column-count: 2; } }
    @media (max-width: 620px) { .grid { column-count: 1; } main { padding: 26px 0; } }
  </style>
</head>
<body>
  <main>
    <header>
      <p class="kicker">2026. június 23. · fél éves évforduló</p>
      <h1>Fél éve veled</h1>
      <p>Ezt az oldalt együtt építettük a randinkon: képekből, screenshotokból, videókból, mondatokból és azokból a kis emlékekből, amik csak a mieink.</p>
    </header>
    <section class="grid">
      ${cards || `<article class="memory-card"><h2>Még üres a poszter</h2><p>Először adjatok hozzá emlékeket a builderben.</p></article>`}
    </section>
    <footer>Boldog fél évet, szerelmem. ❤️</footer>
  </main>
</body>
</html>`;
}


function OriginalHalfYearGiftView({ onBack }: { onBack: () => void }) {
  const reasons = [
    "a mosolyod és ahogy rám nézel",
    "ahogy melletted nyugodtabb lesz minden",
    "a végtelen nőiességed",
    "hogy milyen jó csapat vagyunk",
  ];

  return (
    <>
      <section className="gift-top-bar no-print" aria-label="Ajándék navigáció">
        <button type="button" className="romantic-button ghost-button" onClick={onBack}>
          Vissza az emléképítőhöz
        </button>
      </section>

      <section className="anniversary-card original-half-year-card">
        <p className="anniversary-kicker">boldog fél éves évfordulót</p>

        <h1>Fél éve veled</h1>

        <p className="anniversary-subtitle">
          A kedvenc részem minden napból te vagy.
        </p>

        <div className="anniversary-letter">
          <p>
            Ma fél éve annak az ominózus estének, ami után eldontottuk, ez már
            hivatalosan komoly. Nagyon fontos este volt az életemben... Meg
            tudtam olyan dolgokat magamról amikre egyáltalán nem gondoltam és
            megtudtam rólad, hogy milyen gondoskodó ember vagy
          </p>

          <p>
            Szeretem, ahogy nevetsz, ahogy figyelsz rám, ahogy jelen vagy, és
            azt is, hogy melletted jobb ember akarok lenni. Nagyon értékelem
            benned a kedvességedet, az őszinteségedet, a szépségedet, és azt a
            melegséget, amit az életembe hozol.
          </p>

          <p>
            Köszönöm, hogy vagy nekem. Köszönöm a türelmedet, a mosolyodat, az
            öleléseidet, és minden apró pillanatot, amit együtt tölthetünk.
          </p>

          <p>
            Ez még csak fél év, de nekem már most nagyon sokat jelent. Remélem,
            hogy a történetünk még nagyon sok szép fejezettel folytatódik.
          </p>
        </div>

        <div className="reasons-grid">
          {reasons.map((reason) => (
            <article className="reason-card" key={reason}>
              <span>✦</span>
              <p>Szeretem {reason}.</p>
            </article>
          ))}
        </div>

        <p className="anniversary-ending">
          Boldog fél éves évfordulót, kedvesem. <span>❤️</span>
        </p>
      </section>
    </>
  );
}

function PosterMemoryCard({ memory, onDelete }: { memory: MemoryItem; onDelete: (id: string) => void }) {
  return (
    <article className={`live-memory-card live-memory-card-${memory.category}`}>
      {memory.media.length > 0 && (
        <div className="live-memory-media-grid">
          {memory.media.map((item) => {
            if (item.kind === "image") {
              return <img src={item.dataUrl} alt={item.name} key={item.id} />;
            }

            if (item.kind === "video") {
              return <video src={item.dataUrl} controls key={item.id} />;
            }

            return (
              <span className="live-file-pill" key={item.id}>
                {item.name}
              </span>
            );
          })}
        </div>
      )}

      <div className="live-memory-card-header">
        <span>{categoryEmojis[memory.category]}</span>
        <p>
          {categoryLabels[memory.category]}
          {memory.dateLabel ? ` · ${memory.dateLabel}` : ""}
        </p>
      </div>

      <h3>{memory.title}</h3>
      {memory.description && <p>{memory.description}</p>}
      {memory.whyItMattered && <p className="live-memory-why">{memory.whyItMattered}</p>}
      {memory.quote && <blockquote>“{memory.quote}”</blockquote>}

      <button type="button" className="delete-memory-button" onClick={() => onDelete(memory.id)}>
        törlés
      </button>
    </article>
  );
}

export default function HalfYearAnniversaryPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isGiftVisible, setIsGiftVisible] = useState(false);
  const [isFinalMode, setIsFinalMode] = useState(false);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    try {
      return JSON.parse(saved) as MemoryItem[];
    } catch {
      return [];
    }
  });
  const [form, setForm] = useState<MemoryFormState>(emptyForm);
  const [statusMessage, setStatusMessage] = useState("");
  const posterRef = useRef<HTMLDivElement | null>(null);

  const selectedPrompt = starterPrompts[selectedPromptIndex];

  const persistentMemories = useMemo(
    () => memories.map((memory) => ({ ...memory, media: memory.media.filter((media) => media.persistent) })),
    [memories],
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentMemories));
    } catch {
      setStatusMessage(
        "A böngésző tárhelye megtelt. A szövegek megmaradhatnak, de nagy videókat inkább a végén exportálj HTML-be.",
      );
    }
  }, [persistentMemories]);

  const updateForm = (field: keyof MemoryFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const choosePrompt = (prompt: PromptCard, index: number) => {
    setSelectedPromptIndex(index);
    setForm((current) => ({
      ...current,
      title: current.title || prompt.title,
      dateLabel: current.dateLabel || prompt.label,
      category: prompt.category,
    }));
  };

  const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    setStatusMessage("Fájlok betöltése...");

    try {
      const media = await Promise.all(files.map(readFileAsDataUrl));
      setForm((current) => ({ ...current, media: [...current.media, ...media] }));
      setStatusMessage(
        media.some((item) => !item.persistent)
          ? "Hozzáadtam. A nagy fájlok látszanak és az exportban benne lesznek, de frissítés után nem biztos, hogy megmaradnak."
          : "Hozzáadtam a fájlokat az emlékhez.",
      );
    } catch {
      setStatusMessage("Nem sikerült beolvasni az egyik fájlt. Próbáld meg újra vagy válassz kisebbet.");
    } finally {
      event.target.value = "";
    }
  };

  const removeMediaFromForm = (id: string) => {
    setForm((current) => ({ ...current, media: current.media.filter((item) => item.id !== id) }));
  };

  const addMemory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim() && !form.description.trim() && form.media.length === 0) {
      setStatusMessage("Adjunk legalább címet, szöveget vagy egy képet/videót az emlékhez.");
      return;
    }

    const memory: MemoryItem = {
      id: makeId(),
      title: form.title.trim() || "Egy közös emlék",
      dateLabel: form.dateLabel.trim(),
      category: form.category,
      description: form.description.trim(),
      whyItMattered: form.whyItMattered.trim(),
      quote: form.quote.trim(),
      media: form.media,
      createdAt: new Date().toISOString(),
    };

    setMemories((current) => [memory, ...current]);
    setForm(emptyForm);
    setStatusMessage("Felkerült a poszterre. ❤️");
  };

  const deleteMemory = (id: string) => {
    setMemories((current) => current.filter((memory) => memory.id !== id));
  };

  const clearEverything = () => {
    if (!window.confirm("Biztosan töröljük a mai posztert erről a böngészőről?")) return;
    setMemories([]);
    setForm(emptyForm);
    localStorage.removeItem(STORAGE_KEY);
    setStatusMessage("Újra tiszta lappal indulunk.");
  };

  const exportJson = () => {
    downloadFile(
      "fel-eve-veled-emlekek.json",
      JSON.stringify({ exportedAt: new Date().toISOString(), memories }, null, 2),
      "application/json;charset=utf-8",
    );
  };

  const exportHtml = () => {
    downloadFile("fel-eve-veled-poszter.html", buildPosterHtml(memories), "text/html;charset=utf-8");
  };

  const scrollToPoster = () => {
    posterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openGift = () => {
    setIsGiftVisible(true);
    setIsFinalMode(false);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  const closeGift = () => {
    setIsGiftVisible(false);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  return (
    <main className={`anniversary-page live-builder-page ${isFinalMode ? "final-poster-mode" : ""}`}>
      <div className="anniversary-bg">
        <span className="floating-heart heart-one">♡</span>
        <span className="floating-heart heart-two">❤</span>
        <span className="floating-heart heart-three">♡</span>
        <span className="floating-heart heart-four">❤</span>
      </div>

      {isGiftVisible ? (
        <OriginalHalfYearGiftView onBack={closeGift} />
      ) : !hasStarted ? (
        <section className="anniversary-hero-card live-builder-hero" id="today">
          <p className="anniversary-kicker">2026. június 23. · fél éves évforduló</p>
          <h1>Ma együtt építjük meg a poszterünket</h1>
          <p className="anniversary-subtitle">
            Nem egy kész oldalt akartam mutatni. Azt szeretném, hogy ma este végigmenjünk az első fél évünkön,
            és amit együtt felidézünk — kép, videó, screenshot, mondat vagy érzés — azt rögtön rátegyük a poszterre.
          </p>

          <div className="anniversary-actions">
            <button type="button" className="romantic-button primary-button" onClick={() => setHasStarted(true)}>
              Kezdjük az elejéről
            </button>
            <button
              type="button"
              className="romantic-button ghost-button"
              onClick={() => {
                setHasStarted(true);
                window.setTimeout(scrollToPoster, 100);
              }}
            >
              Megnézem a posztert
            </button>
            <button type="button" className="romantic-button gift-button" onClick={openGift}>
              Ajándék
            </button>
          </div>

          <div className="date-instructions" aria-label="Hogyan fogjuk használni">
            <article>
              <span>1</span>
              <h2>Felidézzük</h2>
              <p>Választunk egy kérdést, megállunk, és tényleg megpróbáljuk visszahozni azt a napot.</p>
            </article>
            <article>
              <span>2</span>
              <h2>Hozzáadjuk</h2>
              <p>Ha találunk képet, screenshotot, videót vagy egy mondatot, beírjuk az emlékhez.</p>
            </article>
            <article>
              <span>3</span>
              <h2>Elmentjük</h2>
              <p>A végén letöltjük HTML-ben vagy JSON-ben, és megmarad a közös kis digitális emlékünk.</p>
            </article>
          </div>
        </section>
      ) : (
        <>
          <section className="live-builder-toolbar" aria-label="Fél éves poszter eszközök">
            <div>
              <p className="anniversary-kicker">élő emléképítő</p>
              <h1>Fél éve veled</h1>
              <p>
                Menjünk sorban. Amikor eszünkbe jut valami, én beírom ide, és rögtön megjelenik a poszteren.
              </p>
            </div>

            <div className="toolbar-actions">
              <button type="button" className="romantic-button gift-button" onClick={openGift}>
                Ajándék
              </button>
              <button type="button" className="romantic-button ghost-button" onClick={() => setIsFinalMode((value) => !value)}>
                {isFinalMode ? "Vissza szerkesztéshez" : "Final poster mód"}
              </button>
              <button type="button" className="romantic-button ghost-button" onClick={exportHtml}>
                HTML export
              </button>
              <button type="button" className="romantic-button ghost-button" onClick={exportJson}>
                JSON backup
              </button>
              <button type="button" className="romantic-button ghost-button" onClick={() => window.print()}>
                Nyomtatás / PDF
              </button>
            </div>
          </section>

          {!isFinalMode && (
            <section className="live-builder-layout" aria-label="Emléképítő felület">
              <aside className="prompt-panel">
                <p className="anniversary-kicker">1. lépés · emlékeztetők</p>
                <h2>Kérdések, amik elindítanak</h2>
                <p>
                  Válasszunk egy kártyát, beszéljük át, és ha találunk valamit, tegyük rá a poszterre.
                </p>

                <div className="prompt-list">
                  {starterPrompts.map((prompt, index) => (
                    <button
                      type="button"
                      className={index === selectedPromptIndex ? "prompt-card active" : "prompt-card"}
                      onClick={() => choosePrompt(prompt, index)}
                      key={`${prompt.label}-${prompt.title}`}
                    >
                      <span>{prompt.label}</span>
                      <strong>{prompt.title}</strong>
                      <small>{prompt.question}</small>
                    </button>
                  ))}
                </div>
              </aside>

              <section className="memory-form-panel">
                <p className="anniversary-kicker">2. lépés · most ezt írjuk fel</p>
                <h2>{selectedPrompt.title}</h2>
                <blockquote>{selectedPrompt.question}</blockquote>

                <form className="memory-builder-form" onSubmit={addMemory}>
                  <label>
                    Cím
                    <input
                      value={form.title}
                      onChange={(event) => updateForm("title", event.target.value)}
                      placeholder="pl. Az első hosszú beszélgetésünk"
                    />
                  </label>

                  <div className="form-row">
                    <label>
                      Mikor volt?
                      <input
                        value={form.dateLabel}
                        onChange={(event) => updateForm("dateLabel", event.target.value)}
                        placeholder="pl. 1. hónap / február / az a péntek"
                      />
                    </label>

                    <label>
                      Hangulat
                      <select
                        value={form.category}
                        onChange={(event) => updateForm("category", event.target.value as MemoryCategory)}
                      >
                        {Object.entries(categoryLabels).map(([value, label]) => (
                          <option value={value} key={value}>
                            {categoryEmojis[value as MemoryCategory]} {label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label>
                    Mit idéztünk fel?
                    <textarea
                      value={form.description}
                      onChange={(event) => updateForm("description", event.target.value)}
                      placeholder="Írd le röviden, mi történt, mit mondtunk, mit éreztünk..."
                      rows={4}
                    />
                  </label>

                  <label>
                    Miért kerüljön fel a poszterre?
                    <textarea
                      value={form.whyItMattered}
                      onChange={(event) => updateForm("whyItMattered", event.target.value)}
                      placeholder="Egy mondat arról, miért fontos nekünk."
                      rows={3}
                    />
                  </label>

                  <label>
                    Idézet / belső mondat
                    <input
                      value={form.quote}
                      onChange={(event) => updateForm("quote", event.target.value)}
                      placeholder="pl. egy mondat, amit egyikünk mondott"
                    />
                  </label>

                  <label className="file-drop-label">
                    Kép, screenshot vagy videó
                    <input type="file" multiple accept="image/*,video/*" onChange={handleFiles} />
                    <span>Válassz fájlokat, vagy dobd ide később kézzel a gépről.</span>
                  </label>

                  {form.media.length > 0 && (
                    <div className="selected-media-strip" aria-label="Kiválasztott fájlok">
                      {form.media.map((item) => (
                        <div className="selected-media-item" key={item.id}>
                          {item.kind === "image" && <img src={item.dataUrl} alt={item.name} />}
                          {item.kind === "video" && <video src={item.dataUrl} />}
                          {item.kind === "other" && <span>{item.name}</span>}
                          <button type="button" onClick={() => removeMediaFromForm(item.id)}>
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {statusMessage && <p className="builder-status">{statusMessage}</p>}

                  <div className="memory-form-actions">
                    <button type="submit" className="romantic-button primary-button">
                      Felteszem a poszterre
                    </button>
                    <button type="button" className="romantic-button ghost-button" onClick={() => setForm(emptyForm)}>
                      Üres űrlap
                    </button>
                  </div>
                </form>
              </section>
            </section>
          )}

          <section className="live-poster-section" ref={posterRef} id="poster">
            <div className="live-poster-header">
              <p className="anniversary-kicker">3. lépés · a közös poszterünk</p>
              <h2>Fél éve veled</h2>
              <p>
                Ezek azok az emlékek, amiket ma este együtt választottunk ki. Nem tökéletesnek kell lennie, hanem
                a miénknek.
              </p>
            </div>

            {memories.length === 0 ? (
              <div className="empty-poster-card">
                <span>♡</span>
                <h3>Még üres a poszter</h3>
                <p>Kezdjük az első emlékkel. Elég egy mondat vagy egy kép is.</p>
              </div>
            ) : (
              <div className="live-poster-grid" aria-label="Fél éves közös poszter">
                {memories.map((memory) => (
                  <PosterMemoryCard memory={memory} onDelete={deleteMemory} key={memory.id} />
                ))}
              </div>
            )}

            <div className="poster-bottom-actions no-print">
              <button type="button" className="romantic-button ghost-button" onClick={exportHtml}>
                Letöltés HTML poszterként
              </button>
              <button type="button" className="romantic-button ghost-button" onClick={exportJson}>
                Biztonsági JSON mentés
              </button>
              <button type="button" className="romantic-button ghost-button danger-button" onClick={clearEverything}>
                Poszter törlése
              </button>
            </div>

            <p className="anniversary-ending">
              Boldog fél éves évfordulót, kedvesem. <span>❤️</span>
            </p>
          </section>
        </>
      )}
    </main>
  );
}
