// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
//import "./App.css";
import "./styles.scss";

import LoveScene from "./components/LoveScene";

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
  return <LoveScene poem={poem} />;
}

export default App;
