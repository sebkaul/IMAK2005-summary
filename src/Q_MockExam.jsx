import React, { useState, useMemo } from "react";

/* ============================================================
   IMAK2005 — Full Mock Exam / Quiz
   Kjemisk og bioteknologisk prosessteknologi (NTNU, Vår 2026)
   Single-file JSX. Dark theme. Tailwind layout + inline colors.
   ============================================================ */

// ---- Theme ----
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TEXT = "#F8FAFC";
const SUB = "#94A3B8";

// ---- Sub-subject colors (A5/A8 merged per quiz spec) ----
const COLORS = {
  A1: "#3B82F6", A2: "#10B981", A3: "#F59E0B", A4: "#06B6D4",
  "A5/A8": "#8B5CF6", A6: "#EC4899", A7: "#EF4444", A9: "#14B8A6",
  A10: "#A855F7", B1: "#6366F1", B2: "#22D3EE", B3: "#FB923C",
  B4: "#FBBF24", B5: "#34D399", B6: "#F472B6", X1: "#78716C",
};

const LABELS = {
  A1: "Introduksjon", A2: "Vekstkinetikk", A3: "Medier", A4: "Materialbalanse",
  "A5/A8": "Røring/Reaktor", A6: "Inokulum", A7: "Nedstrøm", A9: "Biokatalyse",
  A10: "Eksempler", B1: "Balanseprinsipp", B2: "Flertrinn", B3: "Reaktive",
  B4: "Energibalanse", B5: "Hypotetiske", B6: "Reaktiv energi", X1: "Bærekraft",
};

const FILTER_ORDER = [
  "A1","A2","A3","A4","A5/A8","A6","A7","A9","A10",
  "B1","B2","B3","B4","B5","B6","X1",
];

const hexA = (hex, a) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
};

/* ============================================================
   QUESTIONS
   type: "mc" (radio), "calc" (radio, numeric), "tf" (toggle),
         "multi" (checkbox, negative marking)
   correct: index (mc/calc), boolean (tf), [indices] (multi)
   ============================================================ */
const QUESTIONS = [
  // ---------- A1 ----------
  { id: "a1-1", code: "A1", type: "mc",
    q: "Hva kjennetegner en sekundær metabolitt?",
    options: [
      "Den produseres vekstavhengig i logfasen",
      "Den produseres hovedsakelig i stasjonærfasen og er ikke nødvendig for selve celleveksten",
      "Den er alltid intracellulær",
      "Den dannes kun i kontinuerlige kulturer",
    ], correct: 1,
    exp: "Sekundære metabolitter (f.eks. antibiotika som penicillin) dannes typisk i stasjonærfasen og er ikke vekstavhengige, i motsetning til primære metabolitter." },
  { id: "a1-2", code: "A1", type: "tf",
    q: "Primære metabolitter er vekstavhengige og produseres i den eksponentielle (log)fasen.",
    correct: true,
    exp: "Riktig. Primære metabolitter er koblet til vekst og dannes i logfasen, mens sekundære metabolitter dannes i stasjonærfasen." },

  // ---------- A2 ----------
  { id: "a2-1", code: "A2", type: "mc",
    q: "Hva gjelder for spesifikk veksthastighet i en kontinuerlig kultur ved steady-state?",
    options: [
      "μ = μmax",
      "μ = D, og μ er mindre enn μmax",
      "μ er udefinert",
      "μ øker kontinuerlig med tiden",
    ], correct: 1,
    exp: "Ved steady-state i en kjemostat er μ = D (fortynningshastigheten), og denne er alltid mindre enn μmax. D kontrollerer μ." },
  { id: "a2-2", code: "A2", type: "mc",
    q: "Hvilket uttrykk gir doblingstiden td?",
    options: ["td = μ·ln2", "td = ln2 / μ", "td = μ / ln2", "td = 2 / μ"],
    correct: 1,
    exp: "Doblingstid td = ln2/μ. Den følger av integrert eksponentiell vekst x = x₀·e^(μt)." },
  { id: "a2-3", code: "A2", type: "tf",
    q: "I en batch-kultur oppnås steady-state forhold.",
    correct: false,
    exp: "Usant. Batch er et lukket system uten steady-state; det er kun kontinuerlige kulturer som oppnår steady-state." },
  { id: "a2-4", code: "A2", type: "calc",
    q: "En bakterie har doblingstid td = 30 min under optimale forhold. Hva er spesifikk veksthastighet μ?",
    options: ["0,35 h⁻¹", "0,69 h⁻¹", "1,39 h⁻¹", "2,00 h⁻¹"], correct: 2,
    exp: "μ = ln2/td = 0,693 / 0,5 h = 1,386 ≈ 1,39 h⁻¹. (NB: td må være i timer.)" },
  { id: "a2-5", code: "A2", type: "calc",
    q: "En kultur starter med x₀ = 5 g biomasse og har μ = 0,20 h⁻¹. Hvor lang tid tar det å nå 50 g?",
    options: ["5,0 t", "8,6 t", "11,5 t", "23,0 t"], correct: 2,
    exp: "x = x₀·e^(μt) ⇒ t = ln(x/x₀)/μ = ln(50/5)/0,20 = ln10/0,20 = 2,303/0,20 = 11,5 t." },
  { id: "a2-6", code: "A2", type: "calc",
    q: "30 g substrat forbrukes og det dannes 12 g biomasse. Hva er biomasseutbyttet Yxs?",
    options: ["0,25 g/g", "0,40 g/g", "0,60 g/g", "2,50 g/g"], correct: 1,
    exp: "Yxs = biomasse produsert / substrat forbrukt = 12 g / 30 g = 0,40 g/g." },

  // ---------- A3 ----------
  { id: "a3-1", code: "A3", type: "mc",
    q: "Karbon, nitrogen og hydrogen i mediet er eksempler på:",
    options: ["Mikroelementer", "Makroelementer", "Sporstoffer", "Overflateaktive stoffer"],
    correct: 1,
    exp: "C, N, H (og O, P, S) er makroelementer – kreves i store mengder. Jern, kobber, kobolt osv. er mikroelementer." },
  { id: "a3-2", code: "A3", type: "mc",
    q: "Hvordan steriliseres mediet typisk i pilot-/industriell skala?",
    options: [
      "I autoklav adskilt fra reaktoren",
      "In situ – direkte tilførsel av vanndamp til reaktoren med innhold",
      "Ved tørrsterilisering i ovn",
      "Med UV-lys i fødetanken",
    ], correct: 1,
    exp: "I stor skala steriliseres medium + reaktor + utstyr in situ ved direkte damptilførsel ved riktig temp og trykk. Autoklav brukes i labskala." },
  { id: "a3-3", code: "A3", type: "tf",
    q: "Jern, kobber og kobolt regnes som mikroelementer i et dyrkingsmedium.",
    correct: true,
    exp: "Riktig. Disse trengs i svært små mengder og klassifiseres som mikroelementer (sporstoffer)." },
  { id: "a3-4", code: "A3", type: "calc",
    q: "Et medium inneholder 40 g/L glukose som begrensende substrat. Med Yxs = 0,5 g/g, hva er maksimal biomassekonsentrasjon?",
    options: ["10 g/L", "20 g/L", "40 g/L", "80 g/L"], correct: 1,
    exp: "x_maks = Yxs · S = 0,5 g/g · 40 g/L = 20 g/L (forutsatt at all glukose forbrukes til biomasse)." },

  // ---------- A4 ----------
  { id: "a4-1", code: "A4", type: "mc",
    q: "Hvordan defineres respirasjonskvotienten (RQ)?",
    options: [
      "mol O₂ forbrukt / mol CO₂ produsert",
      "mol CO₂ produsert / mol O₂ forbrukt",
      "mol biomasse / mol substrat",
      "mol produkt / mol CO₂",
    ], correct: 1,
    exp: "RQ = mol CO₂ produsert / mol O₂ forbrukt. Den forteller noe om hvilket materiale som metaboliseres." },
  { id: "a4-2", code: "A4", type: "mc",
    q: "Hva indikerer ofte en RQ > 1 i en aerob prosess?",
    options: [
      "Høy oksygenovermetning",
      "Oksidasjon av fettsyrer",
      "Dannelse av fermenteringsprodukter / O₂-begrenset (delvis anaerob) prosess",
      "Fullstendig oksidasjon av glukose",
    ], correct: 2,
    exp: "RQ > 1 indikerer ofte dannelse av fermenteringsprodukter (etanol, acetat) og at prosessen er delvis anaerob eller O₂-begrenset." },
  { id: "a4-3", code: "A4", type: "tf",
    q: "Teoretisk oksygenkrav (koeffisient a) kan beregnes ut fra elektronbalansen.",
    correct: true,
    exp: "Riktig. Oksygenkravet er direkte relatert til elektrontilgjengeligheten: wγs − 4a = cγB + fjγp." },
  { id: "a4-4", code: "A4", type: "calc",
    q: "I et tidsintervall produseres 0,27 mol CO₂ og forbrukes 0,25 mol O₂. Hva er RQ?",
    options: ["0,93", "1,02", "1,08", "1,52"], correct: 2,
    exp: "RQ = CO₂ produsert / O₂ forbrukt = 0,27 / 0,25 = 1,08." },
  { id: "a4-5", code: "A4", type: "calc",
    q: "90 g glukose forbrukes og 36 g biomasse dannes. Hva er Yxs?",
    options: ["0,25 g/g", "0,40 g/g", "0,50 g/g", "2,50 g/g"], correct: 1,
    exp: "Yxs = 36 g / 90 g = 0,40 g/g." },
  { id: "a4-6", code: "A4", type: "calc",
    q: "Hvor mange tilgjengelige elektroner har glukose (C₆H₁₂O₆) totalt? (γ_C=4, γ_H=1, γ_O=−2)",
    options: ["12", "18", "24", "30"], correct: 2,
    exp: "Tilgjengelige elektroner = 6·4 + 12·1 + 6·(−2) = 24 + 12 − 12 = 24. Per C-atom: 24/6 = 4." },

  // ---------- A5/A8 ----------
  { id: "a58-1", code: "A5/A8", type: "mc",
    q: "Hvordan uttrykkes oksygenoverføringshastigheten (OTR)?",
    options: ["OTR = KLa·CL", "OTR = KLa·(C* − CL)", "OTR = KLa/C*", "OTR = (C* − CL)/KLa"],
    correct: 1,
    exp: "OTR = KLa·(C* − CL), der (C* − CL) er drivkraften i masseoverføringen og KLa er volumetrisk masseoverføringskoeffisient." },
  { id: "a58-2", code: "A5/A8", type: "mc",
    q: "Hva er hovedoppgaven til strømbrytere (baffles) i en røretank?",
    options: [
      "Å øke temperaturen",
      "Å hindre virveldannelse (vortex) og forbedre blanding/masseoverføring",
      "Å sterilisere mediet",
      "Å måle pH",
    ], correct: 1,
    exp: "Strømbrytere bryter opp rotasjonsstrømmen, hindrer vortex og gir bedre turbulens, blanding og oksygenoverføring." },
  { id: "a58-3", code: "A5/A8", type: "mc",
    q: "Hvordan defineres power number (Np)?",
    options: ["Np = P/(ρN³D⁵)", "Np = ρN²D/μ", "Np = N²D/g", "Np = P·ρ·N·D"],
    correct: 0,
    exp: "Np = P/(ρN³D⁵) – forholdet mellom ekstern kraft (P) og treghetskraft tilført væsken. (Re = ρND²/μ, Fr = N²D/g.)" },
  { id: "a58-4", code: "A5/A8", type: "tf",
    q: "Ved turbulent strømning (Re > 10⁴) er power number tilnærmet uavhengig av Reynolds-tallet.",
    correct: true,
    exp: "Riktig. I turbulent sone er x = 0 og Np ≈ konstant. Da gjelder P = c·ρN³D⁵." },
  { id: "a58-5", code: "A5/A8", type: "calc",
    q: "Beregn impeller-Reynolds-tallet: ρ = 1000 kg/m³, N = 2 s⁻¹, D = 0,5 m, μ = 0,001 Pa·s. (Re = ρND²/μ)",
    options: ["5,0·10³", "5,0·10⁴", "5,0·10⁵", "5,0·10⁶"], correct: 2,
    exp: "Re = ρND²/μ = 1000·2·(0,5)²/0,001 = 1000·2·0,25/0,001 = 500/0,001 = 5,0·10⁵ (turbulent)." },
  { id: "a58-6", code: "A5/A8", type: "calc",
    q: "Impeller-tuppfart ITS = πDN. Med D = 0,5 m og N = 2 s⁻¹, hva er ITS?",
    options: ["1,57 m/s", "3,14 m/s", "6,28 m/s", "0,79 m/s"], correct: 1,
    exp: "ITS = π·D·N = π·0,5·2 = π ≈ 3,14 m/s (innenfor typisk industriområde 4,7–7,6 m/s for store fermentorer)." },

  // ---------- A6 ----------
  { id: "a6-1", code: "A6", type: "mc",
    q: "Hva er hovedhensikten med en frøkultur (seed culture) før produksjonsfermenteringen?",
    options: [
      "Å produsere ferdig produkt",
      "Å produsere en aktiv, ren kultur i tilstrekkelig mengde til inokulering",
      "Å sterilisere produksjonstanken",
      "Å fjerne sekundære metabolitter",
    ], correct: 1,
    exp: "Frøkulturen bygger opp en aktiv, ren og tilstrekkelig stor cellemasse som inokuleres i produksjonstanken." },
  { id: "a6-2", code: "A6", type: "mc",
    q: "Fra hvilken vekstfase høstes inokulum vanligvis?",
    options: ["Lagfasen", "Logfasen (eksponentiell fase)", "Stasjonærfasen", "Dødsfasen"],
    correct: 1,
    exp: "Inokulum høstes typisk fra logfasen, der cellene er mest aktive og deler seg raskt (f.eks. 5 % inokulum)." },
  { id: "a6-3", code: "A6", type: "tf",
    q: "Sporesuspensjon brukes ofte som inokulum for soppkulturer, f.eks. ved penicillinproduksjon.",
    correct: true,
    exp: "Riktig. For muggsopp som Penicillium chrysogenum brukes aseksuelle sporer (sporesuspensjon), bl.a. produsert i rulleflasker." },

  // ---------- A7 ----------
  { id: "a7-1", code: "A7", type: "mc",
    q: "Hvilket trinn kommer først i en typisk nedstrømsprosess?",
    options: [
      "Kromatografi (finrensing)",
      "Krystallisering og tørking",
      "Fjerning av celler (filtrering/sentrifugering)",
      "Adsorpsjon og utfelling",
    ], correct: 2,
    exp: "Rekkefølgen er: 1) fjerning av celler (filtrering/sentrifugering), 2) grovrensing, 3) finrensing (kromatografi), 4) siste trinn (krystallisering/tørking)." },
  { id: "a7-2", code: "A7", type: "mc",
    q: "For å utvinne et intracellulært produkt må man først:",
    options: [
      "Felle ut produktet direkte fra mediet",
      "Knuse/lysere cellene for å frigjøre produktet",
      "Tørke kulturen",
      "Tilsette mer substrat",
    ], correct: 1,
    exp: "Intracellulære produkter er inne i cellene, så cellene må knuses (mekanisk/kjemisk/enzymatisk) før produktet kan isoleres." },
  { id: "a7-3", code: "A7", type: "tf",
    q: "Sentrifugering er mest effektiv ved store partikler, lav viskositet og stor tetthetsforskjell mellom partikler og væske.",
    correct: true,
    exp: "Riktig. Sentrifugalseparasjon fungerer best når disse betingelsene er oppfylt." },

  // ---------- A9 ----------
  { id: "a9-1", code: "A9", type: "mc",
    q: "Hva er en hovedfordel ved å immobilisere et enzym (biokatalysator)?",
    options: [
      "Enzymet blir vannløselig",
      "Enzymet kan gjenbrukes og lettere separeres fra produkt/substrat, ofte med økt stabilitet",
      "Enzymet får alltid høyere maksimalhastighet",
      "Substratet trenger ikke lenger diffundere",
    ], correct: 1,
    exp: "Immobilisering gjør at biokatalysatoren kan gjenbrukes, er enklere å separere og ofte blir mer stabil under reaksjonsforhold." },
  { id: "a9-2", code: "A9", type: "mc",
    q: "Hvilken immobiliseringsmetode danner høymolekylære aggregater ved at biokatalysatormolekyler bindes til hverandre?",
    options: [
      "Adsorpsjon til bærer",
      "Kovalent binding til bærer",
      "Kryssbinding (cross-linking)",
      "Innkapsling i matriks",
    ], correct: 2,
    exp: "Kryssbinding (kovalent) binder enzymmolekyler til hverandre og danner uløselige høymolekylære aggregater. Egner seg best til isolerte enzymer." },
  { id: "a9-3", code: "A9", type: "tf",
    q: "Enzymer kan ha høyere stabilitet og aktivitet i upolare løsningsmidler enn i polare.",
    correct: true,
    exp: "Riktig. Mange enzymer er mer stabile/aktive i upolare organiske løsningsmidler, men trenger noe vann tilstede for å være katalytisk aktive." },
  { id: "a9-4", code: "A9", type: "calc",
    q: "Et produkt inneholder 90 % R-enantiomer og 10 % S-enantiomer. Hva er enantiomerisk overskudd (ee)?",
    options: ["10 %", "45 %", "80 %", "90 %"], correct: 2,
    exp: "ee = (R − S)/(R + S) = (90 − 10)/(90 + 10) = 80/100 = 80 %." },

  // ---------- A10 ----------
  { id: "a10-1", code: "A10", type: "mc",
    q: "Penicillin produsert av Penicillium chrysogenum er et eksempel på:",
    options: [
      "En primær metabolitt",
      "En sekundær metabolitt",
      "Et strukturprotein",
      "Et encelleprotein (SCP)",
    ], correct: 1,
    exp: "Penicillin er en typisk sekundær metabolitt – produseres i stasjonærfasen og er ikke vekstavhengig." },
  { id: "a10-2", code: "A10", type: "tf",
    q: "Penicillinutbyttet er økt flere tusen ganger siden Flemings opprinnelige stamme, bl.a. via klassisk mutagenese og stammeseleksjon.",
    correct: true,
    exp: "Riktig. Fra ~1 mg/L (P. notatum) til >90–100 g/L i moderne prosesser – en økning på titusentalls ganger." },

  // ---------- X1 ----------
  { id: "x1-1", code: "X1", type: "mc",
    q: "Hva er en livsløpsvurdering (LCA – Life Cycle Assessment)?",
    options: [
      "En metode for å rense avløpsvann",
      "En evaluering av miljøpåvirkningene til et produktsystem gjennom hele livsløpet (ISO 14040)",
      "En metode for å beregne reaksjonsentalpi",
      "En teknikk for å sterilisere medier",
    ], correct: 1,
    exp: "LCA er en systematisk evaluering av inn-/utgangsfaktorer og potensielle miljøpåvirkninger gjennom et produkts livsløp (ISO 14040)." },
  { id: "x1-2", code: "X1", type: "tf",
    q: "«Funksjonell enhet» er et sentralt begrep ved definisjon av mål og omfang i en LCA.",
    correct: true,
    exp: "Riktig. Den funksjonelle enheten definerer referansen som inn- og utgangsdata knyttes til, og er nødvendig for sammenligning." },

  // ---------- B1 ----------
  { id: "b1-1", code: "B1", type: "mc",
    q: "For et system med 3 komponenter – hvor mange uavhengige massebalanser kan settes opp?",
    options: ["2", "3", "4", "Uendelig mange"], correct: 1,
    exp: "Maks antall uavhengige balanser = antall komponenter = 3. Totalbalansen er summen av komponentbalansene og er IKKE uavhengig av disse." },
  { id: "b1-2", code: "B1", type: "tf",
    q: "Man kan bruke alle komponentbalansene I TILLEGG til totalbalansen som uavhengige ligninger.",
    correct: false,
    exp: "Usant. Totalbalansen = sum av komponentbalansene. Bruker du alle komponentbalanser, er totalbalansen ikke uavhengig." },
  { id: "b1-3", code: "B1", type: "calc",
    q: "Et kontrollvolum har 5 ukjente størrelser, 3 uavhengige balanseligninger og 1 tilleggsopplysning. Hva er antall frihetsgrader (nfg)?",
    options: ["0", "1", "2", "4"], correct: 1,
    exp: "nfg = ukjente − uavhengige ligninger − tilleggsopplysninger = 5 − 3 − 1 = 1. (nfg = 0 ⇒ løsbart.)" },
  { id: "b1-4", code: "B1", type: "calc",
    q: "To strømmer blandes: 60 mol/s med 50 mol% A og 40 mol/s med 20 mol% A. Hva er mol% A i den blandede utgående strømmen (100 mol/s)?",
    options: ["30 %", "35 %", "38 %", "42 %"], correct: 2,
    exp: "A inn = 60·0,50 + 40·0,20 = 30 + 8 = 38 mol/s. Total ut = 100 mol/s ⇒ 38/100 = 38 mol% A." },

  // ---------- B2 ----------
  { id: "b2-1", code: "B2", type: "mc",
    q: "Hva gjelder for sammensetningen i strømmene ut av et rent splitte-knutepunkt (splitter)?",
    options: [
      "Hver utgående strøm har samme sammensetning som den innkommende",
      "Den ene strømmen er ren komponent A, den andre ren B",
      "Sammensetningen endres med splitteforholdet",
      "Det skjer en reaksjon i knutepunktet",
    ], correct: 0,
    exp: "En splitter deler strømmen i flere med IDENTISK sammensetning – kun mengden (strømningsraten) endres." },
  { id: "b2-2", code: "B2", type: "tf",
    q: "Resirkulasjon brukes bl.a. for å redusere tap av reaktant/fiber og øke den totale omsetningen i prosessen.",
    correct: true,
    exp: "Riktig. Resirkulering returnerer uomsatt materiale til prosessen, øker total utnyttelse og reduserer tap (f.eks. fiber i papirmaskin)." },
  { id: "b2-3", code: "B2", type: "calc",
    q: "Frisk luft med 4,0 mol% vann avfuktes til en produktstrøm på 100 mol/s med 1,7 mol% vann. Kondensat fjernes. Hva er fødemengden n₁? (Tørrluftbalanse)",
    options: ["98,3 mol/s", "100 mol/s", "102,4 mol/s", "104,2 mol/s"], correct: 2,
    exp: "Tørrluft bevares: n₁·0,96 = 100·0,983 ⇒ n₁ = 98,3/0,96 = 102,4 mol/s." },
  { id: "b2-4", code: "B2", type: "calc",
    q: "Samme prosess som over (n₁ = 102,4 mol/s, produkt 100 mol/s). Hvor mye vann kondenserer og fjernes?",
    options: ["1,7 mol/s", "2,4 mol/s", "4,0 mol/s", "6,4 mol/s"], correct: 1,
    exp: "Totalbalanse: kondensat = n₁ − produkt = 102,4 − 100 = 2,4 mol/s (rent vann)." },

  // ---------- B3 ----------
  { id: "b3-1", code: "B3", type: "mc",
    q: "Hvordan uttrykkes antall mol av komponent i ved hjelp av reaksjonsomfang ξ?",
    options: [
      "nᵢ = nᵢ₀ · νᵢ · ξ",
      "nᵢ = nᵢ₀ + νᵢ · ξ",
      "nᵢ = nᵢ₀ / (νᵢ · ξ)",
      "nᵢ = νᵢ · ξ − nᵢ₀",
    ], correct: 1,
    exp: "nᵢ = nᵢ₀ + νᵢ·ξ, der νᵢ er den støkiometriske koeffisienten (negativ for reaktanter, positiv for produkter)." },
  { id: "b3-2", code: "B3", type: "tf",
    q: "Den støkiometriske koeffisienten νᵢ er negativ for reaktanter og positiv for produkter.",
    correct: true,
    exp: "Riktig. Reaktanter forbrukes (νᵢ < 0), produkter dannes (νᵢ > 0)." },
  { id: "b3-3", code: "B3", type: "calc",
    q: "Reaksjon A → 2B. Inn: 100 mol A, 0 mol B. Ut: 40 mol A. Hvor mye B dannes? (Bruk reaksjonsomfang)",
    options: ["60 mol", "80 mol", "120 mol", "40 mol"], correct: 2,
    exp: "ξ = (n_A − n_A0)/ν_A = (40 − 100)/(−1) = 60. n_B = 0 + 2·60 = 120 mol B." },
  { id: "b3-4", code: "B3", type: "calc",
    q: "Samme reaksjon (A inn 100 mol, A ut 40 mol). Hva er omdanningsgraden av A?",
    options: ["40 %", "60 %", "80 %", "120 %"], correct: 1,
    exp: "Omdanningsgrad = (mol reagert)/(mol i føde) = (100 − 40)/100 = 60 %." },

  // ---------- B4 ----------
  { id: "b4-1", code: "B4", type: "mc",
    q: "For et stasjonært åpent system uten akselarbeid og med neglisjerbar kinetisk/potensiell energi, reduseres energibalansen til:",
    options: ["Q = ΔEₖ", "Q = ΔH", "Q = Wₛ", "ΔH = 0"], correct: 1,
    exp: "Med Ẇₛ = 0 og ΔEₖ ≈ ΔEₚ ≈ 0 gir energibalansen Q̇ = ΔḢ (varmeleddet/entalpiendringen dominerer)." },
  { id: "b4-2", code: "B4", type: "tf",
    q: "For en adiabatisk prosess er Q = 0.",
    correct: true,
    exp: "Riktig. Adiabatisk betyr ingen varmeutveksling med omgivelsene, altså Q = 0." },
  { id: "b4-3", code: "B4", type: "calc",
    q: "Adiabatisk blanding: strøm 1 (1150 kg/h, ĥ=2676 kJ/kg) + strøm 2 (ĥ=3278 kJ/kg) → strøm 3 (ĥ=3074 kJ/kg). Hva er raten til strøm 2?",
    options: ["≈ 1150 kg/h", "≈ 2244 kg/h", "≈ 3074 kg/h", "≈ 3394 kg/h"], correct: 1,
    exp: "Energi: 1150·2676 + m₂·3278 = (1150+m₂)·3074 ⇒ 204·m₂ = 457700 ⇒ m₂ ≈ 2244 kg/h." },
  { id: "b4-4", code: "B4", type: "calc",
    q: "Hvor mye varme kreves for å varme 100 kg vann fra 20 °C til 80 °C? (Cp = 4,18 kJ/kg·K)",
    options: ["6 270 kJ", "12 540 kJ", "25 080 kJ", "33 440 kJ"], correct: 2,
    exp: "Q = m·Cp·ΔT = 100·4,18·(80−20) = 100·4,18·60 = 25 080 kJ." },

  // ---------- B5 ----------
  { id: "b5-1", code: "B5", type: "mc",
    q: "Hvorfor kan vi bruke hypotetiske prosesstrinn til å beregne ΔH for en prosess?",
    options: [
      "Fordi ΔH alltid er null",
      "Fordi entalpi er en tilstandsfunksjon – uavhengig av veien mellom start- og sluttilstand",
      "Fordi temperaturen er konstant",
      "Fordi trykket alltid er 1 atm",
    ], correct: 1,
    exp: "Entalpi (H) er en tilstandsfunksjon. ΔH avhenger bare av start- og sluttilstand, så vi kan velge en bekvem (hypotetisk) vei." },
  { id: "b5-2", code: "B5", type: "tf",
    q: "ΔH for en prosess avhenger av hvilken vei (rekkefølge av delsteg) man velger mellom start- og sluttilstand.",
    correct: false,
    exp: "Usant. Siden H er en tilstandsfunksjon, er ΔH veiuavhengig – kun start og slutt teller." },
  { id: "b5-3", code: "B5", type: "calc",
    q: "Varm 1 mol vann fra 25 °C til 100 °C (Cp = 75,3 J/mol·K), deretter fordamp (ΔHvap = 40,7 kJ/mol). Total ΔH?",
    options: ["40,7 kJ/mol", "46,4 kJ/mol", "5,6 kJ/mol", "75,3 kJ/mol"], correct: 1,
    exp: "ΔH = Cp·ΔT + ΔHvap = 75,3·75/1000 + 40,7 = 5,65 + 40,7 ≈ 46,4 kJ/mol." },
  { id: "b5-4", code: "B5", type: "calc",
    q: "Varm 2 mol ideell gass fra 25 °C til 300 °C ved konstant trykk (Cp = 29 J/mol·K). Hva er ΔH?",
    options: ["7,98 kJ", "15,95 kJ", "29,0 kJ", "31,9 kJ"], correct: 1,
    exp: "ΔH = n·Cp·ΔT = 2·29·(300−25)/1000 = 2·29·275/1000 = 15,95 kJ." },

  // ---------- B6 ----------
  { id: "b6-1", code: "B6", type: "mc",
    q: "Hvordan beregnes standard reaksjonsentalpi ΔH°r fra dannelsesentalpier?",
    options: [
      "Σ ΔHf(reaktanter) − Σ ΔHf(produkter)",
      "Σ νᵢ·ΔHf(produkter) − Σ νᵢ·ΔHf(reaktanter)",
      "Σ ΔHf(produkter) · Σ ΔHf(reaktanter)",
      "ΔHf(produkter) / ΔHf(reaktanter)",
    ], correct: 1,
    exp: "ΔH°r = Σ νᵢ ΔHf,i = (sum dannelsesentalpier produkter) − (sum dannelsesentalpier reaktanter), vektet med støkiometriske koeffisienter." },
  { id: "b6-2", code: "B6", type: "tf",
    q: "Dannelsesentalpimetoden bruker grunnstoffene ved 25 °C som referansetilstand, mens reaksjonsentalpimetoden bruker reaktanter/produkter ved 25 °C.",
    correct: true,
    exp: "Riktig. Dette er hovedforskjellen: ulik referansetilstand. Begge kan inkludere Cp-verdier og faseovergangsentalpier." },
  { id: "b6-3", code: "B6", type: "calc",
    q: "CH₄ + 2O₂ → CO₂ + 2H₂O(g). ΔHf: CH₄ = −74,85; CO₂ = −393,5; H₂O(g) = −241,83 kJ/mol. Hva er ΔH°r?",
    options: ["−802,3 kJ/mol", "−560,5 kJ/mol", "−877,2 kJ/mol", "−282,9 kJ/mol"], correct: 0,
    exp: "ΔH°r = [(−393,5) + 2(−241,83)] − [(−74,85) + 0] = −877,16 + 74,85 = −802,3 kJ/mol." },
  { id: "b6-4", code: "B6", type: "calc",
    q: "CH₄ + O₂ → HCHO(g) + H₂O(g). ΔHf: CH₄ = −74,85; HCHO = −115,9; H₂O(g) = −241,83 kJ/mol. Hva er ΔH°r?",
    options: ["−115,9 kJ/mol", "−241,83 kJ/mol", "−282,9 kJ/mol", "−357,7 kJ/mol"], correct: 2,
    exp: "ΔH°r = [(−115,9) + (−241,83)] − [(−74,85)] = −357,73 + 74,85 = −282,9 kJ/mol." },
];

export default function MockExam() {
  const [filter, setFilter] = useState("Alle");
  const [answers, setAnswers] = useState({});   // qid -> selection
  const [revealed, setRevealed] = useState({});  // qid -> true

  const visible = useMemo(
    () => (filter === "Alle" ? QUESTIONS : QUESTIONS.filter((q) => q.code === filter)),
    [filter]
  );

  // ---- scoring ----
  const { answered, correct } = useMemo(() => {
    let a = 0, c = 0;
    for (const q of QUESTIONS) {
      const sel = answers[q.id];
      if (sel === undefined) continue;
      a++;
      const ok =
        q.type === "tf" ? sel === q.correct : sel === q.correct;
      if (ok) c++;
    }
    return { answered: a, correct: c };
  }, [answers]);

  const setAns = (qid, val) =>
    setAnswers((p) => ({ ...p, [qid]: val }));
  const reveal = (qid) =>
    setRevealed((p) => ({ ...p, [qid]: true }));

  const reset = () => { setAnswers({}); setRevealed({}); };

  const counts = useMemo(() => {
    const m = {};
    for (const q of QUESTIONS) m[q.code] = (m[q.code] || 0) + 1;
    return m;
  }, []);

  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh", padding: "0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Source+Sans+3:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .imak-h { font-family: 'Plus Jakarta Sans', sans-serif; }
        .imak-b { font-family: 'Source Sans 3', sans-serif; }
        .imak-m { font-family: 'JetBrains Mono', monospace; }
        .opt-hover { transition: all .15s ease; }
        .opt-hover:hover { border-color: var(--acc) !important; background: var(--accbg) !important; }
        .pill-hover { transition: all .15s ease; }
        .pill-hover:hover { filter: brightness(1.15); }
        .btn-hover { transition: all .15s ease; }
        .btn-hover:hover { filter: brightness(1.12); transform: translateY(-1px); }
      `}</style>

      {/* ===== Sticky header ===== */}
      <div className="imak-b" style={{
        position: "sticky", top: 0, zIndex: 20, background: hexA("#0F172A", 0.97),
        backdropFilter: "blur(8px)", borderBottom: `1px solid ${BORDER}`, padding: "16px 20px",
      }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <h1 className="imak-h" style={{ fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
                IMAK2005 — Øvingseksamen
              </h1>
              <p style={{ color: SUB, fontSize: 13, margin: "2px 0 0" }}>
                Kjemisk og bioteknologisk prosessteknologi · {QUESTIONS.length} spørsmål
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12,
                padding: "8px 16px", textAlign: "center",
              }}>
                <div className="imak-m" style={{ fontSize: 20, fontWeight: 500, color: "#34D399" }}>
                  {correct} / {answered}
                </div>
                <div style={{ fontSize: 11, color: SUB }}>riktige / besvart</div>
              </div>
              <button onClick={reset} className="btn-hover imak-b" style={{
                background: hexA("#EF4444", 0.12), color: "#EF4444", border: `1px solid ${hexA("#EF4444", 0.4)}`,
                borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>
                Nullstill
              </button>
            </div>
          </div>

          {/* progress bar */}
          <div style={{ height: 6, background: BORDER, borderRadius: 99, marginTop: 12, overflow: "hidden" }}>
            <div style={{
              width: `${(answered / QUESTIONS.length) * 100}%`, height: "100%",
              background: "linear-gradient(90deg,#10B981,#34D399)", transition: "width .3s ease",
            }} />
          </div>

          {/* filter bar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            <FilterPill active={filter === "Alle"} color="#F8FAFC" label="Alle"
              count={QUESTIONS.length} onClick={() => setFilter("Alle")} dark />
            {FILTER_ORDER.map((code) => (
              <FilterPill key={code} active={filter === code} color={COLORS[code]}
                label={`${code} · ${LABELS[code]}`} count={counts[code]}
                onClick={() => setFilter(code)} />
            ))}
          </div>
        </div>
      </div>

      {/* ===== Questions ===== */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "24px 20px 80px" }}>
        {visible.map((q, i) => {
          const overall = QUESTIONS.indexOf(q) + 1;
          return (
            <QuestionCard
              key={q.id} q={q} num={i + 1} overall={overall} total={visible.length}
              selection={answers[q.id]} revealed={!!revealed[q.id]}
              onSelect={(v) => setAns(q.id, v)} onReveal={() => reveal(q.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

function FilterPill({ active, color, label, count, onClick, dark }) {
  return (
    <button onClick={onClick} className="pill-hover imak-b" style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: active ? (dark ? hexA("#F8FAFC", 0.14) : hexA(color, 0.18)) : CARD,
      border: `1px solid ${active ? color : BORDER}`,
      color: active ? (dark ? TEXT : color) : SUB,
      borderRadius: 99, padding: "6px 12px", fontSize: 12.5, fontWeight: 600, cursor: "pointer",
    }}>
      <span style={{ width: 8, height: 8, borderRadius: 99, background: color, display: "inline-block" }} />
      {label}
      <span style={{ opacity: 0.6, fontSize: 11 }}>{count}</span>
    </button>
  );
}

function QuestionCard({ q, num, overall, total, selection, revealed, onSelect, onReveal }) {
  const acc = COLORS[q.code];
  const isAnswered = selection !== undefined;
  const isCorrect =
    isAnswered && (q.type === "tf" ? selection === q.correct : selection === q.correct);

  const typeLabel =
    q.type === "tf" ? "Sant/Usant" : q.type === "calc" ? "Beregning" : "Flervalg";

  return (
    <div style={{
      background: CARD, border: `1px solid ${revealed ? (isCorrect ? hexA("#34D399", 0.5) : hexA("#EF4444", 0.4)) : BORDER}`,
      borderLeft: `4px solid ${acc}`, borderRadius: 12, padding: "18px 20px", marginBottom: 16,
    }}>
      {/* meta row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span className="imak-h" style={{
            background: hexA(acc, 0.16), color: acc, border: `1px solid ${hexA(acc, 0.4)}`,
            borderRadius: 8, padding: "3px 10px", fontSize: 12, fontWeight: 700,
          }}>
            {q.code} · {LABELS[q.code]}
          </span>
          <span className="imak-b" style={{ color: SUB, fontSize: 12 }}>{typeLabel}</span>
        </div>
        <span className="imak-m" style={{ color: SUB, fontSize: 12 }}>
          #{overall} · {num}/{total}
        </span>
      </div>

      {/* question */}
      <p className="imak-b" style={{ fontSize: 16, fontWeight: 500, margin: "0 0 14px", lineHeight: 1.45 }}>
        {q.q}
      </p>

      {/* answers */}
      {q.type === "tf" ? (
        <ToggleTF acc={acc} selection={selection} revealed={revealed} correct={q.correct} onSelect={onSelect} />
      ) : (
        <Radio acc={acc} options={q.options} selection={selection} revealed={revealed} correct={q.correct}
          mono={q.type === "calc"} onSelect={onSelect} />
      )}

      {/* reveal button + explanation */}
      <div style={{ marginTop: 14 }}>
        {!revealed ? (
          <button onClick={onReveal} className="btn-hover imak-b" style={{
            background: hexA(acc, 0.14), color: acc, border: `1px solid ${hexA(acc, 0.4)}`,
            borderRadius: 10, padding: "9px 18px", fontSize: 13.5, fontWeight: 600, cursor: "pointer",
          }}>
            Vis svar
          </button>
        ) : (
          <div className="imak-b" style={{
            background: BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 14px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span className="imak-h" style={{
                fontSize: 12.5, fontWeight: 700,
                color: isAnswered ? (isCorrect ? "#34D399" : "#EF4444") : SUB,
              }}>
                {isAnswered ? (isCorrect ? "✓ Riktig" : "✗ Feil") : "Riktig svar"}
              </span>
              <span className="imak-m" style={{ fontSize: 12.5, color: TEXT }}>
                {q.type === "tf"
                  ? (q.correct ? "Sant" : "Usant")
                  : q.options[q.correct]}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: SUB, lineHeight: 1.5 }}>{q.exp}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Radio({ acc, options, selection, revealed, correct, mono, onSelect }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map((opt, i) => {
        const chosen = selection === i;
        const showCorrect = revealed && i === correct;
        const showWrong = revealed && chosen && i !== correct;
        let bg = BG, bd = BORDER, col = TEXT;
        if (showCorrect) { bg = hexA("#34D399", 0.14); bd = "#34D399"; }
        else if (showWrong) { bg = hexA("#EF4444", 0.12); bd = "#EF4444"; }
        else if (chosen) { bg = hexA(acc, 0.14); bd = acc; }
        return (
          <button key={i} onClick={() => !revealed && onSelect(i)} disabled={revealed}
            className={revealed ? "imak-b" : "opt-hover imak-b"}
            style={{
              "--acc": acc, "--accbg": hexA(acc, 0.08),
              display: "flex", alignItems: "center", gap: 10, textAlign: "left",
              background: bg, border: `1px solid ${bd}`, borderRadius: 10, padding: "11px 14px",
              color: col, fontSize: 14.5, cursor: revealed ? "default" : "pointer", width: "100%",
            }}>
            <span style={{
              width: 18, height: 18, borderRadius: 99, flexShrink: 0,
              border: `2px solid ${chosen || showCorrect ? (showCorrect ? "#34D399" : showWrong ? "#EF4444" : acc) : SUB}`,
              background: chosen ? (showWrong ? "#EF4444" : showCorrect ? "#34D399" : acc) : "transparent",
              display: "inline-block",
            }} />
            <span className={mono ? "imak-m" : "imak-b"} style={{ lineHeight: 1.4 }}>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function ToggleTF({ acc, selection, revealed, correct, onSelect }) {
  const opts = [{ v: true, label: "Sant" }, { v: false, label: "Usant" }];
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {opts.map((o) => {
        const chosen = selection === o.v;
        const showCorrect = revealed && o.v === correct;
        const showWrong = revealed && chosen && o.v !== correct;
        let bg = BG, bd = BORDER, col = TEXT;
        if (showCorrect) { bg = hexA("#34D399", 0.14); bd = "#34D399"; col = "#34D399"; }
        else if (showWrong) { bg = hexA("#EF4444", 0.12); bd = "#EF4444"; col = "#EF4444"; }
        else if (chosen) { bg = hexA(acc, 0.16); bd = acc; col = acc; }
        return (
          <button key={o.label} onClick={() => !revealed && onSelect(o.v)} disabled={revealed}
            className={revealed ? "imak-h" : "btn-hover imak-h"}
            style={{
              flex: 1, background: bg, border: `1px solid ${bd}`, borderRadius: 10,
              padding: "12px", fontSize: 15, fontWeight: 700, color: col,
              cursor: revealed ? "default" : "pointer",
            }}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
