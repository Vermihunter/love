export type AuthChallenge = {
  question: string;
  answerHash: string;
  hint?: string;
  successMessage?: string;
};

export type TimelineMemory = {
  month: string;
  title: string;
  description: string;
  prompt: string;
  icon: string;
};

export type RevealMemory = {
  clue: string;
  reveal: string;
  question: string;
  tone: "cute" | "funny" | "deep";
};

export const authChallenges: AuthChallenge[] = [
  {
    question: 'A legelső bókom neked: "Imádom a ..."',
    answerHash:
      "bf64588f59affe4736db58d0e04d7aa96dc6fbab6761c49b869c4e0ecf09e3c5",
    hint: "Az, amit már az első estén észrevettem rajtad.",
    successMessage: "Persze, hogy tudtad. Ez volt az első kis kapu hozzánk. ❤️",
  },
  {
    question: "Hol kezdődött az a bizonyos este?",
    answerHash:
      "c34045c1a1db8d1b3fca8a692198466952daae07eaf6104b4c87ed3b55b6af1b",
    hint: "A hely neve rövid, és nekünk már örökre különleges.",
    successMessage:
      "Pontosan. Ott indult el valami, amit azóta is nagyon szeretek.",
  },
  {
    question: "Melyik Rihanna számot énekeltük együtt?",
    answerHash:
      "5af308bec132bd499660594a6c127c57f910a25c18968eb4f9b976f48df8cb49",
    hint: "Írhatod írásjelek nélkül is.",
    successMessage: "Na igen. Ezt a számot már sosem fogom ugyanúgy hallgatni.",
  },
];

export const timelineMemories: TimelineMemory[] = [
  {
    month: "1. hónap",
    title: "Az este, ami után minden más lett",
    description:
      "A kezdet, amikor még nem tudtuk pontosan, mi lesz ebből, de valami már akkor is nagyon más volt.",
    prompt: "Te mire emlékszel a legélesebben a legelejéről?",
    icon: "✨",
  },
  {
    month: "2. hónap",
    title: "Amikor egyre természetesebb lettünk egymásnak",
    description:
      "A beszélgetések, a nevetések és azok a kis pillanatok, amikor elkezdett hiányozni, ha nem beszéltünk.",
    prompt: "Mikor érezted először, hogy igazán kényelmes mellettem?",
    icon: "🌙",
  },
  {
    month: "3. hónap",
    title: "A mi kis világunk",
    description:
      "Belső poénok, apró szokások, mondatok, amiket csak mi értünk igazán.",
    prompt: "Melyik a kedvenc belső poénod kettőnkből?",
    icon: "🫶",
  },
  {
    month: "4. hónap",
    title: "A gondoskodás hónapja",
    description:
      "Sokszor láttam, mennyire figyelmes, kedves és törődő vagy. Ezt nagyon szeretem benned.",
    prompt: "Volt olyan pillanat, amikor különösen szeretve érezted magad?",
    icon: "🌷",
  },
  {
    month: "5. hónap",
    title: "Mélyebb, erősebb, őszintébb",
    description:
      "Nem csak a könnyű pillanatok számítanak. Az is, hogy egyre jobban megismertük egymást.",
    prompt: "Mit tanultál rólunk ebben az időszakban?",
    icon: "💌",
  },
  {
    month: "6. hónap",
    title: "Fél év — és még csak most kezdődik",
    description:
      "Ma nem csak visszanézünk. Egy kicsit azt is megünnepeljük, hogy mennyi minden vár még ránk.",
    prompt: "Mit szeretnél, mire emlékezzünk majd a következő fél évből?",
    icon: "❤️",
  },
];

export const revealMemories: RevealMemory[] = [
  {
    clue: "Ez volt az első pillanat, amikor azt gondoltam: vele muszáj beszélnem.",
    reveal:
      "Amikor megláttalak azon az estén. Nem csak szépnek láttalak — valahogy azonnal különlegesnek is.",
    question:
      "Te mire emlékszel abból, amikor először igazán észrevettél engem?",
    tone: "deep",
  },
  {
    clue: "Egy dal, ami nekem már mindig rólunk fog szólni.",
    reveal:
      "Rihanna — S&M. Azóta ha meghallom, mindig eszembe jut, ahogy együtt énekeltük.",
    question: "Van olyan dal, ami neked is hozzánk kapcsolódik?",
    tone: "funny",
  },
  {
    clue: "Egy apró dolog rajtad, amit már az első este megdicsértem.",
    reveal:
      "A hajad. Lehet, hogy csak egy bók volt, de nekem azóta is egy nagyon kedves emlék.",
    question: "Emlékszel, mit gondoltál rólam akkor?",
    tone: "cute",
  },
  {
    clue: "Valami, amit fél év alatt újra és újra megszerettem benned.",
    reveal:
      "A gondoskodásod. Ahogy figyelsz, ahogy törődsz, és ahogy néha a legkisebb dolgokkal is melegséget hozol.",
    question: "Mi az, amit te szeretsz abban, ahogy mi törődünk egymással?",
    tone: "deep",
  },
];

export const littleUniverse = [
  "az első este története",
  "a közös zenék",
  "a hosszú beszélgetések",
  "az apró bókok",
  "a nevetések, amiket nem lehet előre megtervezni",
  "az érzés, hogy melletted jobb ember akarok lenni",
];

export const loveReasons = [
  "a mosolyod és ahogy rám nézel",
  "ahogy melletted nyugodtabb lesz minden",
  "a végtelen nőiességed",
  "hogy milyen jó csapat vagyunk",
  "a kedvességedet és a gondoskodásodat",
  "azt, hogy veled a kis dolgok is emlékekké válnak",
];

export const futureWishes = [
  "még több kis online és igazi randit",
  "közös főzéseket és filmnézéseket",
  "több fotót, amit majd évek múlva is mosolyogva nézünk vissza",
  "olyan napokat, amikor csak örülünk annak, hogy vagyunk egymásnak",
];
