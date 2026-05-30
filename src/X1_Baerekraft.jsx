import React, { useState } from "react";

// ============================================================
// IMAK2005 — X1: Bærekraft i kjemisk og bioteknologisk industri
// Gjesteforelesning (Eirin Skjøndal Bar). Del X. Accent: #78716C
// ============================================================

const ACCENT = "#78716C";
const ACCENT_RGB = "120, 113, 108";

const C = {
  bg: "#0F172A",
  card: "#1E293B",
  border: "#334155",
  text: "#F8FAFC",
  sub: "#94A3B8",
  accent: ACCENT,
};

// --- Small styled helpers -----------------------------------

const Term = ({ children }) => (
  <span
    style={{
      color: C.accent,
      background: `rgba(${ACCENT_RGB}, 0.1)`,
      borderLeft: `3px solid ${C.accent}`,
      padding: "1px 6px",
      borderRadius: "4px",
      fontWeight: 600,
      fontFamily: "'Source Sans 3', sans-serif",
    }}
  >
    {children}
  </span>
);

const Formula = ({ children }) => (
  <span
    style={{
      fontFamily: "'JetBrains Mono', monospace",
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${C.border}`,
      borderRadius: "6px",
      padding: "2px 8px",
      fontSize: "0.9em",
      color: C.text,
    }}
  >
    {children}
  </span>
);

const Section = ({ tag, title, children }) => (
  <section style={{ marginBottom: "2.5rem" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          color: C.accent,
          border: `1px solid ${C.accent}`,
          borderRadius: "6px",
          padding: "3px 8px",
        }}
      >
        {tag}
      </span>
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "1.6rem",
          fontWeight: 700,
          color: C.text,
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const Card = ({ children, style }) => (
  <div
    style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: "12px",
      padding: "1.25rem 1.5rem",
      ...style,
    }}
  >
    {children}
  </div>
);

const P = ({ children, style }) => (
  <p
    style={{
      fontFamily: "'Source Sans 3', sans-serif",
      color: C.text,
      lineHeight: 1.7,
      fontSize: "1.02rem",
      margin: "0 0 0.75rem 0",
      ...style,
    }}
  >
    {children}
  </p>
);

// --- LCA system-boundary inline SVG -------------------------

const LCASvg = () => (
  <svg viewBox="0 0 520 260" style={{ width: "100%", maxWidth: 520, height: "auto" }}>
    <defs>
      <marker id="arrAcc" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={ACCENT} />
      </marker>
      <marker id="arrRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="#EF4444" />
      </marker>
    </defs>

    {/* system boundary */}
    <rect x="170" y="70" width="180" height="120" rx="10" fill="rgba(120,113,108,0.08)" stroke={ACCENT} strokeWidth="2" />
    <text x="260" y="100" textAnchor="middle" fill={C.text} fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fontWeight="700">Produktsystem</text>
    <text x="260" y="125" textAnchor="middle" fill={C.sub} fontFamily="'Source Sans 3', sans-serif" fontSize="11">(definert av</text>
    <text x="260" y="140" textAnchor="middle" fill={C.sub} fontFamily="'Source Sans 3', sans-serif" fontSize="11">systemgrense)</text>
    <text x="260" y="170" textAnchor="middle" fill={C.text} fontFamily="'JetBrains Mono', monospace" fontSize="11">funksjonell enhet</text>

    {/* inputs */}
    <text x="20" y="105" fill={C.sub} fontFamily="'Source Sans 3', sans-serif" fontSize="12">Masse / råvarer</text>
    <line x1="20" y1="115" x2="168" y2="115" stroke={ACCENT} strokeWidth="2" markerEnd="url(#arrAcc)" />
    <text x="20" y="145" fill={C.sub} fontFamily="'Source Sans 3', sans-serif" fontSize="12">Energi</text>
    <line x1="20" y1="155" x2="168" y2="155" stroke={ACCENT} strokeWidth="2" markerEnd="url(#arrAcc)" />

    {/* product output */}
    <text x="360" y="135" fill={C.text} fontFamily="'Source Sans 3', sans-serif" fontSize="12">Produkt</text>
    <line x1="352" y1="130" x2="500" y2="130" stroke={ACCENT} strokeWidth="2" markerEnd="url(#arrAcc)" />

    {/* emissions up */}
    <text x="260" y="30" textAnchor="middle" fill="#EF4444" fontFamily="'Source Sans 3', sans-serif" fontSize="11">Utslipp til luft</text>
    <line x1="260" y1="68" x2="260" y2="40" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrRed)" />

    {/* emissions down */}
    <text x="260" y="245" textAnchor="middle" fill="#EF4444" fontFamily="'Source Sans 3', sans-serif" fontSize="11">Utslipp til jord og vann</text>
    <line x1="260" y1="192" x2="260" y2="222" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrRed)" />
  </svg>
);

// --- Historical timeline inline SVG -------------------------

const Timeline = () => {
  const items = [
    ["1960", "Dilution"],
    ["1970", "End-of-pipe"],
    ["1980", "Recycling & recovery"],
    ["1990", "Cleaner production"],
    ["2000", "Life Cycle Management"],
    ["2010", "Sirkulær bioøkonomi"],
    ["2015", "Doughnut economy"],
    ["2021/22", "EUs taksonomi"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {items.map(([yr, label], i) => (
        <div key={yr} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: C.accent,
              fontSize: "0.85rem",
              width: "62px",
              textAlign: "right",
              flexShrink: 0,
            }}
          >
            {yr}
          </span>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: C.accent, flexShrink: 0 }} />
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", color: C.text, fontSize: "1rem" }}>{label}</span>
        </div>
      ))}
    </div>
  );
};

// --- Flashcard quiz -----------------------------------------

const CARDS = [
  {
    q: "Hva menes med at bærekraft er en egenskap ved et system og ikke ved et produkt?",
    a: "Bærekraft er ikke et adjektiv man fester på et produkt — det beskriver om hele systemet kan opprettholdes over tid. Et system er bærekraftig når det holder seg innenfor systemets regenerative kapasitet (hvor raskt ressurser fornyes) og absorpsjonskapasitet (hvor mye utslipp/avfall det tåler).",
  },
  {
    q: "Hva er de tre dimensjonene i \"triple bottom line\"?",
    a: "Sosial (societal), økonomisk (economic) og økologisk/miljømessig (ecological). Et tiltak må balansere alle tre for å være bærekraftig — ikke bare det økonomiske.",
  },
  {
    q: "Hva er en LCA (livsløpsanalyse), og hva er de fire fasene etter ISO 14040?",
    a: "LCA = sammenligning og evaluering av inngangsfaktorer, utgangsfaktorer og potensielle miljøpåvirkninger til et produktsystem gjennom hele livsløpet. Fire faser: (1) Hensikt og omfang, (2) Livsløpsregnskap (LCI), (3) Livsløpseffektvurdering (klassifisering + karakterisering + vekting), (4) Tolkning.",
  },
  {
    q: "Hva er en funksjonell enhet i en LCA?",
    a: "En kvantifisert beskrivelse av produktets ytelse som alt regnskapet knyttes til — den gjenspeiler produktets funksjon. Eksempel fra forelesningen: «200 g laks til konsument i Paris». Den gjør at to produkter kan sammenlignes på lik basis.",
  },
  {
    q: "Hvilke effekter tar en LCA IKKE hensyn til?",
    a: "Økonomiske og sosiale effekter vurderes ikke — en LCA ser bare på et bestemt antall miljøbelastninger. Forutsetningene og systemgrensene bestemmer hva resultatene kan brukes til.",
  },
  {
    q: "Hva betyr karakterisering i en LCA? Gi et eksempel.",
    a: "Karakterisering kobler bidragene fra de ulike inn- og utgangsfaktorene til miljøpåvirkningskategorier, og vekter dem mot hverandre. Eksempel: metan (CH₄) bidrar ~21 ganger så mye som CO₂ til global oppvarming.",
  },
  {
    q: "Hva er forskjellen mellom lineær og sirkulær økonomi?",
    a: "Lineær økonomi følger «ta–lag–kast»: råvare → produkt → avfall. Sirkulær (bio)økonomi lukker kretsløpet — avfall og biprodukter føres tilbake som ressurs (resirkulering, biogass, biobasert råstoff), slik at verdien beholdes lengst mulig.",
  },
  {
    q: "Hva er atomøkonomi, og hvorfor er den relevant for grønn kjemi?",
    a: "Atomøkonomi = andelen av reaktantenes atomer som havner i ønsket produkt (ideelt 100 %). Høy atomøkonomi betyr mindre biprodukt/avfall per produkt. Beslektet mål: E-faktor = masse avfall / masse produkt (lav E-faktor = renere prosess).",
  },
];

const Flashcards = () => {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const go = (dir) => {
    setFlipped(false);
    setI((prev) => (prev + dir + CARDS.length) % CARDS.length);
  };

  const card = CARDS[i];

  return (
    <div>
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{ perspective: "1400px", cursor: "pointer", marginBottom: "1rem" }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            minHeight: "200px",
            transition: "transform 0.5s",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* front */}
          <div
            style={{
              position: flipped ? "absolute" : "relative",
              inset: 0,
              backfaceVisibility: "hidden",
              background: C.card,
              border: `1px solid ${C.border}`,
              borderTop: `3px solid ${C.accent}`,
              borderRadius: "12px",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: C.accent, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
              SPØRSMÅL
            </span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "1.2rem", fontWeight: 600, color: C.text, lineHeight: 1.5 }}>
              {card.q}
            </span>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.8rem", color: C.sub, marginTop: "1rem" }}>
              Klikk for å snu →
            </span>
          </div>

          {/* back */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: C.card,
              border: `1px solid ${C.border}`,
              borderTop: `3px solid ${C.accent}`,
              borderRadius: "12px",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: C.accent, letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
              SVAR
            </span>
            <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "1.02rem", color: C.text, lineHeight: 1.65 }}>
              {card.a}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => go(-1)} style={navBtn}>← Forrige</button>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: C.sub, fontSize: "0.9rem" }}>
          {i + 1} / {CARDS.length}
        </span>
        <button onClick={() => go(1)} style={navBtn}>Neste →</button>
      </div>
    </div>
  );
};

const navBtn = {
  fontFamily: "'Source Sans 3', sans-serif",
  background: "transparent",
  color: ACCENT,
  border: `1px solid ${ACCENT}`,
  borderRadius: "8px",
  padding: "0.5rem 1rem",
  cursor: "pointer",
  fontSize: "0.95rem",
};

// --- Main component -----------------------------------------

export default function X1Baerekraft() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: "2.5rem 1.25rem" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        button:hover { background: rgba(${ACCENT_RGB}, 0.15) !important; }
        li { margin-bottom: 0.4rem; }
      `}</style>

      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        {/* ---------------- HEADER ---------------- */}
        <header style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", fontWeight: 500, color: C.bg, background: C.accent, borderRadius: "6px", padding: "4px 10px" }}>
              Del X · Ekstra
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: C.accent, border: `1px solid ${C.accent}`, borderRadius: "6px", padding: "4px 10px" }}>
              X1
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: C.sub, border: `1px solid ${C.border}`, borderRadius: "6px", padding: "4px 10px" }}>
              Gjesteforelesning
            </span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "2.3rem", fontWeight: 800, color: C.text, margin: "0 0 0.6rem 0", lineHeight: 1.15 }}>
            Bærekraft i kjemisk og bioteknologisk industri
          </h1>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "1.1rem", color: C.sub, margin: 0, lineHeight: 1.6 }}>
            Bærekraft er en egenskap ved hele <em>systemet</em> — ikke ved produktet — og måles
            i praksis med verktøy som livsløpsanalyse (LCA).
          </p>
        </header>

        {/* ---------------- LÆRINGSMÅL ---------------- */}
        <Section tag="01" title="Læringsmål">
          <Card>
            <P style={{ margin: 0 }}>
              Studenten kan <Term>beskrive og gi eksempler på bærekraftige, industrielle
              biologiske produksjonsprosesser</Term>.
            </P>
          </Card>
        </Section>

        {/* ---------------- TEORI ---------------- */}
        <Section tag="02" title="Teori">

          {/* Hva er bærekraft */}
          <h3 style={h3}>Hva er bærekraft?</h3>
          <Card style={{ marginBottom: "1.25rem" }}>
            <P>
              <Term>Bærekraftig utvikling</Term> handler om å forvalte naturressursene og styre
              teknologisk og institusjonell endring slik at både dagens og fremtidige
              generasjoner får dekket sine behov (FAO, 1989). John Ehrenfeld: bærekraft er
              «muligheten for at menneske- og andre livsformer kan blomstre på jorden for alltid».
            </P>
            <P style={{ margin: 0 }}>
              Et viktig poeng fra forelesningen: bærekraft er <Term>ikke en egenskap ved et
              produkt</Term>, men ved <Term>systemet</Term>. Et system er bærekraftig når det
              holder seg innenfor sin <Term>regenerative kapasitet</Term> (hvor raskt ressurser
              fornyes) og <Term>absorpsjonskapasitet</Term> (hvor mye utslipp og avfall det tåler).
            </P>
          </Card>

          {/* 3 elementer + triple bottom line */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "1.25rem" }}>
            <Card>
              <h4 style={h4}>3 essensielle elementer</h4>
              <ul style={ul}>
                <li>Verdens befolkning må kunne dekke <strong>primærbehov</strong> — de fattiges behov prioriteres.</li>
                <li>Teknologi og samfunnsutvikling skal <strong>ikke hindre</strong> at miljøet kan møte fremtidige behov.</li>
                <li><strong>Tid:</strong> hva som er bærekraftig er alltid i endring.</li>
              </ul>
            </Card>
            <Card>
              <h4 style={h4}>Triple bottom line — menneskets trivsel</h4>
              <ul style={ul}>
                <li><Term>Sosial</Term> (societal) — varer og tjenester for samfunnet</li>
                <li><Term>Økonomisk</Term> (economic) — varer og tjenester med verdi</li>
                <li><Term>Økologisk</Term> (ecological) — varer og tjenester fra naturen</li>
              </ul>
            </Card>
          </div>

          {/* SDG */}
          <h3 style={h3}>FNs bærekraftsmål & industriell bioteknologi</h3>
          <Card style={{ marginBottom: "1.25rem" }}>
            <P style={{ marginBottom: "0.6rem" }}>
              Industriell bioteknologi knyttes særlig til disse målene:
            </P>
            <ul style={ul}>
              <li><strong>Mål 2</strong> — utrydde sult, matsikkerhet, bærekraftig landbruk</li>
              <li><strong>Mål 9</strong> — bærekraftig industrialisering, infrastruktur og innovasjon</li>
              <li><strong>Mål 12</strong> — ansvarlig forbruk og produksjon</li>
              <li><strong>Mål 14 & 15</strong> — bærekraftig bruk av hav og land/økosystemer</li>
            </ul>
          </Card>

          {/* Timeline */}
          <h3 style={h3}>Historisk utvikling i miljøtenkning</h3>
          <Card style={{ marginBottom: "1.25rem" }}>
            <P style={{ marginBottom: "1rem" }}>
              Tilnærmingen har gått fra å fortynne utslipp, til å rense på slutten, til å designe
              hele systemer og kretsløp:
            </P>
            <Timeline />
          </Card>

          {/* Lineær vs sirkulær / doughnut */}
          <h3 style={h3}>Lineær vs. sirkulær økonomi</h3>
          <Card style={{ marginBottom: "1.25rem" }}>
            <P>
              <Term>Lineær økonomi</Term> følger «ta–lag–kast»: råvare → produkt → avfall.
              <Term>Sirkulær bioøkonomi</Term> lukker kretsløpet ved at avfall og biprodukter
              føres tilbake som ressurs (resirkulering, biogass, biobasert råstoff) slik at
              verdien beholdes lengst mulig.
            </P>
            <P style={{ margin: 0 }}>
              <Term>Doughnut economy</Term> (Raworth, 2015): et trygt og rettferdig handlingsrom
              mellom et <em>sosialt gulv</em> (alle får dekket grunnbehov) og et <em>økologisk
              tak</em> (planetens tålegrenser).
            </P>
          </Card>

          {/* Grønn kjemi (supplement) */}
          <h3 style={h3}>Grønn kjemi — sentrale mål</h3>
          <Card style={{ marginBottom: "1.5rem" }}>
            <P style={{ marginBottom: "0.5rem" }}>
              To kvantitative mål som ofte brukes for å vurdere hvor «grønn» en prosess er:
            </P>
            <ul style={ul}>
              <li>
                <Term>Atomøkonomi</Term> — andelen av reaktantenes atomer som havner i ønsket
                produkt: <Formula>atomøkonomi = (Mw produkt / Σ Mw reaktanter) × 100 %</Formula>.
                Høyere = mindre biprodukt.
              </li>
              <li>
                <Term>E-faktor</Term> — <Formula>E = masse avfall / masse produkt</Formula>.
                Lav E-faktor = renere prosess.
              </li>
              <li>Andre prinsipper: bruk av <strong>fornybare råvarer</strong>, mildere
                reaksjonsbetingelser, og <strong>biokatalyse</strong> (enzymer) som gir selektive
                reaksjoner ved lav temperatur.</li>
            </ul>
            <P style={{ margin: "0.5rem 0 0 0", fontSize: "0.88rem", color: C.sub }}>
              Merk: gjesteforelesningen vektla i hovedsak bærekraftsbegrepet, FNs mål og LCA —
              atomøkonomi/E-faktor er tatt med som standard støttebegreper.
            </P>
          </Card>

          {/* LCA — hovedseksjon */}
          <h3 style={{ ...h3, color: C.accent }}>Livsløpsanalyse (LCA) — kjernen i forelesningen</h3>
          <Card style={{ marginBottom: "1.25rem" }}>
            <P>
              <Term>LCA (Life Cycle Assessment)</Term> er «sammenligning og evaluering av
              inngangsfaktorer, utgangsfaktorer og de potensielle miljøpåvirkningene til et
              produktsystem gjennom dets livsløp» (<Formula>ISO 14040</Formula>).
            </P>
            <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0 0.5rem 0" }}>
              <LCASvg />
            </div>
            <P style={{ margin: 0, fontSize: "0.88rem", color: C.sub, textAlign: "center" }}>
              Systemgrensen avgrenser produktsystemet; alt knyttes til den funksjonelle enheten.
            </P>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "1.25rem" }}>
            <Card>
              <h4 style={h4}>De fire fasene (ISO 14040)</h4>
              <ol style={{ ...ul, paddingLeft: "1.2rem" }}>
                <li><Term>Hensikt og omfang</Term> — mål, funksjonell enhet, systemgrenser, forutsetninger</li>
                <li><Term>Livsløpsregnskap (LCI)</Term> — kartlegg inn- og utgangsdata (energi, råvarer, avfall, utslipp)</li>
                <li><Term>Livsløpseffektvurdering</Term> — klassifisering → karakterisering → vekting</li>
                <li><Term>Tolkning</Term> — bidrags- og følsomhetsanalyse, konklusjon og anbefalinger</li>
              </ol>
            </Card>
            <Card>
              <h4 style={h4}>Funksjonell enhet</h4>
              <P style={{ margin: 0 }}>
                Angir produktets ytelse mot et bestemt brukerkrav og gjenspeiler produktets
                funksjon. Eksempel fra forelesningen: <Formula>200 g laks til konsument i Paris</Formula>.
                Den gjør at to produkter kan sammenlignes på lik basis.
              </P>
            </Card>
            <Card>
              <h4 style={h4}>Klassifisering & karakterisering</h4>
              <P style={{ margin: 0 }}>
                Utslipp sorteres i miljøkategorier (klassifisering) og vektes mot hverandre
                (karakterisering). Eks: metan (CH₄) bidrar <Term>~21 ganger så mye som CO₂</Term> til
                global oppvarming.
              </P>
            </Card>
            <Card style={{ borderLeft: `3px solid ${C.accent}` }}>
              <h4 style={h4}>⚠ Hva LCA IKKE dekker</h4>
              <P style={{ margin: 0 }}>
                En LCA ser bare på et bestemt antall <strong>miljøbelastninger</strong>.
                <Term>Økonomiske og sosiale effekter vurderes ikke</Term>. Forutsetningene og
                systemgrensene avgjør hva resultatene kan brukes til.
              </P>
            </Card>
          </div>
        </Section>

        {/* ---------------- VIKTIGE SAMMENHENGER ---------------- */}
        <Section tag="03" title="Viktige sammenhenger">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.75rem" }}>
            <Card>
              <P style={{ margin: 0 }}>
                <Link code="A10" /> <strong>Industrielle bioprosesser</strong> — konkrete eksempler
                på bærekraftige prosesser (bioetanol, enzymer, avløpsrensing) som LCA-tankegangen
                anvendes på.
              </P>
            </Card>
            <Card>
              <P style={{ margin: 0 }}>
                <Link code="A3" /> <strong>Industrielle medier</strong> — valg av <em>fornybare
                råvarer</em> (f.eks. bioavfall, melasse) er et sentralt bærekraftsgrep i mediedesign.
              </P>
            </Card>
            <Card>
              <P style={{ margin: 0 }}>
                <Link code="A7" /> <strong>Nedstrømsprosesser</strong> — avfallshåndtering,
                resirkulering av løsemidler og energibruk i opprensing er store bidrag i en LCA.
              </P>
            </Card>
          </div>
        </Section>

        {/* ---------------- QUIZ ---------------- */}
        <Section tag="04" title="Quiz">
          <Flashcards />
        </Section>

        <footer style={{ textAlign: "center", marginTop: "3rem", paddingTop: "1.5rem", borderTop: `1px solid ${C.border}` }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: C.sub }}>
            IMAK2005 · X1 Bærekraft · Vår 2026
          </span>
        </footer>
      </div>
    </div>
  );
}

// --- shared styles ------------------------------------------

const h3 = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: "1.25rem",
  fontWeight: 700,
  color: C.text,
  margin: "0 0 0.75rem 0",
};

const h4 = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: "1.05rem",
  fontWeight: 600,
  color: C.text,
  margin: "0 0 0.6rem 0",
};

const ul = {
  fontFamily: "'Source Sans 3', sans-serif",
  color: C.text,
  lineHeight: 1.6,
  fontSize: "1rem",
  margin: 0,
  paddingLeft: "1.2rem",
};

const Link = ({ code }) => (
  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: C.accent, border: `1px solid ${C.accent}`, borderRadius: "5px", padding: "1px 6px", marginRight: "4px" }}>
    {code}
  </span>
);
