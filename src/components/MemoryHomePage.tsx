import { Link } from "react-router-dom";

const memories = [
  {
    path: "/valentine",
    date: "Február 14.",
    title: "Valentin-nap",
    emoji: "💌",
    description:
      "Az első, amit neked készítettem — sok szeretettel, rólad és neked.",
  },
  {
    path: "/womens-day",
    date: "Március 8.",
    title: "Nőnap",
    emoji: "🌷",
    description:
      "Hogy emlékeztesselek: mennyire különleges, gyönyörű és értékes vagy.",
  },
  {
    path: "/half-year",
    date: "Június 23",
    title: "Fél éves évforduló",
    emoji: "❤️",
    description: "A storying első fél évének margójára...",
  },
];

export default function MemoryHomePage() {
  return (
    <main className="memory-home-page">
      <div className="memory-home-bg">
        <span className="memory-sparkle sparkle-one">✦</span>
        <span className="memory-sparkle sparkle-two">♡</span>
        <span className="memory-sparkle sparkle-three">✧</span>
        <span className="memory-sparkle sparkle-four">❤</span>
      </div>

      <section className="memory-hero">
        <p className="memory-kicker">a mi kis emlékeink</p>

        <h1>Szeretetbomba</h1>

        <p className="memory-intro">
          Itt összegyűjtöttem azokat a kis meglepetéseket, amiket eddig neked
          csináltam. Mindegyik egy apró darab abból, amit érzek irántad.
        </p>
      </section>

      <section className="memory-card-grid" aria-label="Korábbi oldalak">
        {memories.map((memory) => (
          <Link to={memory.path} className="memory-card" key={memory.path}>
            <div className="memory-card-top">
              <span className="memory-emoji">{memory.emoji}</span>
              <span className="memory-date">{memory.date}</span>
            </div>

            <h2>{memory.title}</h2>
            <p>{memory.description}</p>

            <span className="memory-open">
              Megnyitás <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </section>

      <p className="memory-footer-note">
        És ez még csak a kezdet. Remélem, még sok ilyen közös emlékünk lesz.
      </p>
    </main>
  );
}
