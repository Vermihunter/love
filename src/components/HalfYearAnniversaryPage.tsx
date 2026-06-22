export default function HalfYearAnniversaryPage() {
  const reasons = [
    "a mosolyod és ahogy rám nézel",
    "ahogy melletted nyugodtabb lesz minden",
    "a végtelen nőiességed",
    "hogy milyen jó csapat vagyunk",
  ];

  return (
    <main className="anniversary-page">
      <div className="anniversary-bg">
        <span className="floating-heart heart-one">♡</span>
        <span className="floating-heart heart-two">❤</span>
        <span className="floating-heart heart-three">♡</span>
        <span className="floating-heart heart-four">❤</span>
      </div>

      <section className="anniversary-card">
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
    </main>
  );
}
