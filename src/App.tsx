// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
//import "./App.css";
import "./styles.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoveScene from "./components/LoveScene";
import WomensDayPage from "./components/WomansDayPage.js";
import HalfYearAnniversaryPage from "./components/HalfYearAnniversaryPage";
import MemoryHomePage from "./components/MemoryHomePage";
import PasswordGate from "./components/PasswordGate";

const poem = [
  [
    "Beléptem a Coolba, mulatni indultam én,",
    "Meglátok egy lányt, szebbet sosem láttam még,",
    "Szoknyája emlékezetes - vörös, az aurája végtelen,",
    "Egy pillanat alatt eldőlt, senki más nem kell nekem.",
  ],
  [
    "Oldalra nézek - mondom nagyon bátran,",
    '"Nekem ma vele beszélnem kell, legyen bármi az ára"',
    "A szemed elkápráztatott, alig találtam a szavakat",
    "Megdicsértem a hajad, és nyújtottad a karodat.",
  ],
  [
    "Rihanna énekelt nekunk, S&M az első szám",
    "Kívülről fújtuk mindketten - éreztem valami összeállt",
    "Abban a percben tudtam, ezt soha nem felejtem el,",
    "Gyerekeimnek mesélem majd, that's how I met your mother",
  ],
];

function App() {
  return (
    <Router>
      <PasswordGate>
        <Routes>
          {/* URL: /valentine */}
          <Route path="/valentine" element={<LoveScene poem={poem} />} />
          <Route path="/womens-day" element={<WomensDayPage />} />
          <Route path="/half-year" element={<HalfYearAnniversaryPage />} />
          <Route path="/" element={<MemoryHomePage />} />
        </Routes>
      </PasswordGate>
    </Router>
  );
}

export default App;
