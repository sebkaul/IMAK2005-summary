import React, { useState } from "react";

// ============================================================
//  IMAK2005 — A5/A8 · Røring, lufttilførsel og reaktordesign
//  Kombinert side: Teori + Eksempler & Quiz (klikkbare faner).
//  Begge delene er pakket i hver sin scope (IIFE) slik at de
//  delte hjelpe-komponentene ikke kolliderer.
// ============================================================

const WRAP_ACCENT = "#8B5CF6";
const WRAP_BG = "#0F172A";
const WRAP_BORDER = "#334155";
const WRAP_TXT = "#F8FAFC";
const WRAP_SUB = "#94A3B8";

const TeoriPage = (() => {
// ============================================================
// IMAK2005 — A5/A8: Røring, lufttilførsel og reaktordesign
// Part 1 av 2: Header, Læringsmål, Teori, Viktige sammenhenger
// Accent: #8B5CF6 (violet)
// ============================================================

const ACCENT = "#8B5CF6";
const ACCENT_BG = "rgba(139,92,246,0.10)";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const T1 = "#F8FAFC";
const T2 = "#94A3B8";

const fontHead = "'Plus Jakarta Sans', sans-serif";
const fontBody = "'Source Sans 3', sans-serif";
const fontMono = "'JetBrains Mono', monospace";

// ---------- Reusable bits ----------
const Term = ({ children }) => (
  <span
    style={{
      color: ACCENT,
      background: ACCENT_BG,
      borderLeft: `3px solid ${ACCENT}`,
      padding: "1px 6px 1px 6px",
      borderRadius: 4,
      fontWeight: 600,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const Formula = ({ children }) => (
  <div
    style={{
      fontFamily: fontMono,
      background: "rgba(255,255,255,0.05)",
      border: `1px solid ${BORDER}`,
      borderRadius: 8,
      padding: "14px 18px",
      margin: "14px 0",
      color: T1,
      fontSize: 15,
      lineHeight: 1.6,
      overflowX: "auto",
    }}
  >
    {children}
  </div>
);

const Card = ({ children, style }) => (
  <div
    style={{
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: 12,
      padding: 24,
      marginBottom: 18,
      ...style,
    }}
  >
    {children}
  </div>
);

const SectionLabel = ({ children }) => (
  <div
    style={{
      borderLeft: `4px solid ${ACCENT}`,
      paddingLeft: 14,
      margin: "48px 0 22px 0",
    }}
  >
    <div
      style={{
        fontFamily: fontHead,
        textTransform: "uppercase",
        letterSpacing: 2,
        fontSize: 13,
        color: ACCENT,
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  </div>
);

const SubHeader = ({ children, tag }) => (
  <h3
    style={{
      fontFamily: fontHead,
      fontSize: 21,
      fontWeight: 700,
      color: T1,
      margin: "30px 0 10px 0",
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}
  >
    {tag && (
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 12,
          color: ACCENT,
          border: `1px solid ${ACCENT}`,
          borderRadius: 6,
          padding: "2px 7px",
        }}
      >
        {tag}
      </span>
    )}
    {children}
  </h3>
);

const Bullet = ({ children }) => (
  <li style={{ marginBottom: 8, lineHeight: 1.65 }}>{children}</li>
);

const Divider = ({ label }) => (
  <div style={{ margin: "56px 0 10px 0", textAlign: "center" }}>
    <div
      style={{
        display: "inline-block",
        fontFamily: fontHead,
        fontWeight: 800,
        fontSize: 15,
        letterSpacing: 1,
        color: ACCENT,
        border: `2px solid ${ACCENT}`,
        borderRadius: 999,
        padding: "8px 24px",
        background: ACCENT_BG,
      }}
    >
      {label}
    </div>
    <div style={{ height: 2, background: BORDER, marginTop: 16 }} />
  </div>
);

// ---------- Inline SVG diagrams ----------
const OTRDiagram = () => (
  <svg viewBox="0 0 560 230" style={{ width: "100%", height: "auto" }}>
    <defs>
      <marker id="arr" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={ACCENT} />
      </marker>
    </defs>
    {/* gas bubble */}
    <circle cx="70" cy="115" r="46" fill="none" stroke={ACCENT} strokeWidth="2" />
    <text x="70" y="110" textAnchor="middle" fill={T1} fontFamily={fontHead} fontSize="14" fontWeight="700">Gass</text>
    <text x="70" y="128" textAnchor="middle" fill={T2} fontFamily={fontMono} fontSize="12">O₂-boble</text>
    {/* liquid */}
    <rect x="180" y="40" width="180" height="150" rx="8" fill="rgba(139,92,246,0.07)" stroke={BORDER} strokeWidth="1.5" />
    <text x="270" y="35" textAnchor="middle" fill={T2} fontFamily={fontHead} fontSize="13">Væskefase (medium)</text>
    <text x="270" y="100" textAnchor="middle" fill={T1} fontFamily={fontMono} fontSize="13">C*  →  C_L</text>
    <text x="270" y="124" textAnchor="middle" fill={T2} fontFamily={fontMono} fontSize="11">drivkraft (C*−C_L)</text>
    {/* cell */}
    <circle cx="480" cy="115" r="46" fill="none" stroke={ACCENT} strokeWidth="2" />
    <text x="480" y="110" textAnchor="middle" fill={T1} fontFamily={fontHead} fontSize="14" fontWeight="700">Celle</text>
    <text x="480" y="128" textAnchor="middle" fill={T2} fontFamily={fontMono} fontSize="11">forbruk (OUR)</text>
    {/* arrows */}
    <line x1="118" y1="115" x2="176" y2="115" stroke={ACCENT} strokeWidth="2.5" markerEnd="url(#arr)" />
    <line x1="364" y1="115" x2="432" y2="115" stroke={ACCENT} strokeWidth="2.5" markerEnd="url(#arr)" />
    <text x="147" y="105" textAnchor="middle" fill={ACCENT} fontFamily={fontMono} fontSize="11">K_L·a</text>
    <text x="398" y="105" textAnchor="middle" fill={ACCENT} fontFamily={fontMono} fontSize="11">diffusjon</text>
  </svg>
);

const STRDiagram = () => (
  <svg viewBox="0 0 360 320" style={{ width: "100%", maxWidth: 340, height: "auto" }}>
    {/* jacket */}
    <rect x="55" y="55" width="250" height="230" rx="14" fill="none" stroke={T2} strokeWidth="2" />
    {/* vessel */}
    <rect x="70" y="70" width="220" height="200" rx="10" fill="rgba(139,92,246,0.06)" stroke={ACCENT} strokeWidth="2" />
    {/* liquid level */}
    <line x1="70" y1="105" x2="290" y2="105" stroke={T2} strokeDasharray="5 4" strokeWidth="1.5" />
    <text x="298" y="100" fill={T2} fontFamily={fontMono} fontSize="10">70–80 %</text>
    {/* motor */}
    <rect x="160" y="18" width="40" height="26" rx="4" fill={ACCENT} />
    <text x="180" y="36" textAnchor="middle" fill="#0F172A" fontFamily={fontHead} fontSize="11" fontWeight="700">M</text>
    {/* shaft */}
    <line x1="180" y1="44" x2="180" y2="240" stroke={T1} strokeWidth="3" />
    {/* impellers (Rushton discs) */}
    {[160, 215].map((y) => (
      <g key={y}>
        <line x1="140" y1={y} x2="220" y2={y} stroke={ACCENT} strokeWidth="4" />
        <circle cx="180" cy={y} r="7" fill={ACCENT} />
      </g>
    ))}
    {/* baffles */}
    <rect x="74" y="120" width="9" height="120" fill={T2} opacity="0.7" />
    <rect x="277" y="120" width="9" height="120" fill={T2} opacity="0.7" />
    {/* sparger ring */}
    <ellipse cx="180" cy="252" rx="40" ry="8" fill="none" stroke={ACCENT} strokeWidth="2.5" />
    {/* air in */}
    <line x1="180" y1="290" x2="180" y2="260" stroke={ACCENT} strokeWidth="2" markerEnd="url(#arr)" />
    {/* labels */}
    <text x="305" y="160" fill={T2} fontFamily={fontHead} fontSize="11">baffle</text>
    <text x="228" y="160" fill={ACCENT} fontFamily={fontHead} fontSize="11">impeller</text>
    <text x="200" y="270" fill={ACCENT} fontFamily={fontHead} fontSize="11">sparger</text>
    <text x="186" y="300" fill={T2} fontFamily={fontHead} fontSize="11">luft inn</text>
    <text x="20" y="180" fill={T2} fontFamily={fontHead} fontSize="11" transform="rotate(-90 20 180)">kjølekappe</text>
  </svg>
);

const AirliftDiagram = () => (
  <svg viewBox="0 0 360 300" style={{ width: "100%", maxWidth: 340, height: "auto" }}>
    {/* outer vessel */}
    <rect x="80" y="40" width="200" height="220" rx="12" fill="rgba(139,92,246,0.06)" stroke={ACCENT} strokeWidth="2" />
    {/* draft tube (inner loop) */}
    <rect x="150" y="70" width="60" height="160" fill="none" stroke={T2} strokeWidth="2" />
    <text x="180" y="150" textAnchor="middle" fill={T2} fontFamily={fontHead} fontSize="10">stigningsrør</text>
    <text x="180" y="164" textAnchor="middle" fill={T2} fontFamily={fontHead} fontSize="10">(luftrik)</text>
    {/* downcomer labels */}
    <text x="112" y="150" textAnchor="middle" fill={T2} fontFamily={fontHead} fontSize="10">avløp</text>
    <text x="248" y="150" textAnchor="middle" fill={T2} fontFamily={fontHead} fontSize="10">avløp</text>
    {/* circulation arrows */}
    <path d="M180 222 L180 88" stroke={ACCENT} strokeWidth="2.5" markerEnd="url(#arr)" fill="none" />
    <path d="M120 88 L120 222" stroke={ACCENT} strokeWidth="2" markerEnd="url(#arr)" fill="none" />
    <path d="M240 88 L240 222" stroke={ACCENT} strokeWidth="2" markerEnd="url(#arr)" fill="none" />
    {/* sparger */}
    <ellipse cx="180" cy="240" rx="22" ry="6" fill="none" stroke={ACCENT} strokeWidth="2.5" />
    <line x1="180" y1="280" x2="180" y2="248" stroke={ACCENT} strokeWidth="2" markerEnd="url(#arr)" />
    <text x="186" y="292" fill={T2} fontFamily={fontHead} fontSize="11">luft inn</text>
    {/* air out */}
    <line x1="180" y1="40" x2="180" y2="18" stroke={ACCENT} strokeWidth="2" markerEnd="url(#arr)" />
    <text x="186" y="20" fill={T2} fontFamily={fontHead} fontSize="11">luft ut</text>
  </svg>
);

// ---------- Interactive OTR calculator ----------
const OTRCalc = () => {
  const [kla, setKla] = useState(0.15); // s⁻¹
  const [cstar, setCstar] = useState(0.25); // mmol/dm³
  const [cl, setCl] = useState(0.05); // mmol/dm³
  const driv = Math.max(0, cstar - cl);
  const otr = (kla * driv).toFixed(4);

  const Row = ({ label, val, set, min, max, step, unit }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: fontMono, fontSize: 13, color: T1, marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ color: ACCENT }}>{val} {unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val}
        onChange={(e) => set(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: ACCENT }} />
    </div>
  );

  return (
    <Card style={{ borderColor: ACCENT }}>
      <div style={{ fontFamily: fontHead, fontWeight: 700, color: T1, marginBottom: 14, fontSize: 16 }}>
        🧮 Interaktiv: OTR = K_L·a · (C* − C_L)
      </div>
      <Row label="K_L·a" val={kla} set={setKla} min={0.02} max={0.25} step={0.01} unit="s⁻¹" />
      <Row label="C* (metning)" val={cstar} set={setCstar} min={0.05} max={0.35} step={0.01} unit="mmol/dm³" />
      <Row label="C_L (løst O₂)" val={cl} set={setCl} min={0} max={0.35} step={0.01} unit="mmol/dm³" />
      <div style={{ marginTop: 16, padding: 14, background: "rgba(255,255,255,0.05)", borderRadius: 8, border: `1px solid ${BORDER}`, fontFamily: fontMono }}>
        <div style={{ color: T2, fontSize: 13 }}>Drivkraft (C*−C_L) = <span style={{ color: cl > cstar ? "#EF4444" : ACCENT }}>{driv.toFixed(2)}</span> mmol/dm³</div>
        <div style={{ color: T1, fontSize: 18, marginTop: 6 }}>OTR = <span style={{ color: ACCENT, fontWeight: 700 }}>{otr}</span> mmol·dm⁻³·s⁻¹</div>
        {cl >= cstar && <div style={{ color: "#EF4444", fontSize: 12, marginTop: 6 }}>C_L kan ikke overstige C* — ingen overføring.</div>}
      </div>
    </Card>
  );
};

// ============================================================
function App() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: T1, fontFamily: fontBody, fontSize: 16, lineHeight: 1.6 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ul { padding-left: 22px; margin: 8px 0; }
        a { color: ${ACCENT}; }
        input[type=range] { cursor: pointer; }
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 22px 80px 22px" }}>

        {/* ============ 1. HEADER ============ */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
          <span style={{ background: ACCENT, color: "#0F172A", fontFamily: fontHead, fontWeight: 800, fontSize: 13, padding: "4px 12px", borderRadius: 999 }}>DEL A · BIOTEK</span>
          <span style={{ border: `1px solid ${ACCENT}`, color: ACCENT, fontFamily: fontMono, fontSize: 13, padding: "3px 12px", borderRadius: 999 }}>A5 / A8</span>
          <span style={{ color: T2, fontFamily: fontMono, fontSize: 12 }}>Del 1 av 2 — Teori</span>
        </div>
        <h1 style={{ fontFamily: fontHead, fontSize: 38, fontWeight: 800, lineHeight: 1.15, margin: "0 0 12px 0" }}>
          Røring, lufttilførsel og reaktordesign
        </h1>
        <p style={{ color: T2, fontSize: 18, margin: 0 }}>
          Hvordan oksygen overføres fra luftboble til celle (K_La, OTR, OUR) — og hvordan bioreaktoren bygges for å få det til.
        </p>

        {/* ============ 2. LÆRINGSMÅL ============ */}
        <SectionLabel>Læringsmål</SectionLabel>
        <Card>
          <ul style={{ margin: 0 }}>
            <Bullet>Kan beregne <b>utbytte, oksygenbehov og oksygenoverføring</b> i en biologisk produksjonsprosess.</Bullet>
            <Bullet>Kan beskrive og forklare prinsippene for og utvikling av en <b>fermenteringsprosess</b>.</Bullet>
            <Bullet>Har kunnskap om hvordan sette opp og kjøre et <b>labskala bioreaktorforsøk</b>, samt tolke måledata.</Bullet>
          </ul>
        </Card>

        {/* ============ 3. TEORI ============ */}
        <SectionLabel>Teori</SectionLabel>

        {/* ---------- DEL I ---------- */}
        <Divider label="DEL I · RØRING OG LUFTTILFØRSEL (A5)" />

        <SubHeader>Hvorfor oksygen er kritisk</SubHeader>
        <Card>
          <ul style={{ margin: 0 }}>
            <Bullet>I <Term>aerobe prosesser</Term> er oksygen ofte den <b>begrensende faktoren</b> — ikke fordi cellene trenger mye, men fordi O₂ er svært <b>lite løselig i vann</b> og derfor må tilføres kontinuerlig.</Bullet>
            <Bullet>Tilføres som <b>luft (~21 % O₂)</b>, sjelden som ren O₂ (kostnad + brannfare). Lufta <b>sterilfiltreres</b> inn.</Bullet>
            <Bullet>Mediet påvirker O₂-tilgangen: rask metabolisme → stort behov; <b>reologi/viskositet</b> påvirker hvordan O₂ transporteres; <b>skumdempende midler</b> kan redusere overføringen.</Bullet>
          </ul>
        </Card>

        <SubHeader>Oksygenoverføring: gass → væske → celle</SubHeader>
        <Card>
          <p style={{ marginTop: 0 }}>O₂ må vandre fra luftboble, gjennom væskefasen, til celleoverflaten. Hvert trinn har motstand; den samlede væskesidemotstanden uttrykkes ved <Term>K_L</Term>.</p>
          <OTRDiagram />
          <p style={{ color: T2, fontSize: 14, marginBottom: 0 }}>Drivkraften gjennom hele kjeden er forskjellen mellom metning og faktisk konsentrasjon: <b>(C* − C_L)</b>.</p>
        </Card>

        <SubHeader>OTR — Oxygen Transfer Rate</SubHeader>
        <Card>
          <Formula>
            OTR = dC_L/dt = K_L·a · (C* − C_L)   [mmol·dm⁻³·t⁻¹]
          </Formula>
          <ul style={{ margin: "10px 0 0 0" }}>
            <Bullet><Term>C*</Term> = metningskonsentrasjon (likevekt) av løst O₂ i mediet [mmol·dm⁻³]. Må være <b>eksakt</b> — (C*−C_L) er liten, så små feil gir store utslag.</Bullet>
            <Bullet><Term>C_L</Term> = faktisk løst O₂-konsentrasjon [mmol·dm⁻³]. På lab oppgis den ofte i <b>% av C_L,max</b> (billigste måling).</Bullet>
            <Bullet><Term>K_L</Term> = massetransportkoeffisient [cm·t⁻¹] — sum av all motstand i transporten fra gass til væske.</Bullet>
            <Bullet><b>a</b> = gass–væske grensesnittareal per volum [cm²·cm⁻³].</Bullet>
            <Bullet><Term>K_L·a</Term> = <b>volumetrisk masseoverføringskoeffisient</b> [t⁻¹]. K_L og a er hver for seg vanskelig å måle, så de slås sammen. <b>K_La er målet på bioreaktorens lufttilførselkapasitet</b> — jo høyere K_La, jo høyere kapasitet. Ligger typisk i <b>0,02–0,25 s⁻¹</b>.</Bullet>
          </ul>
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid #EF4444", borderRadius: 8, fontSize: 14 }}>
            ⚠️ <b>Eksamenfelle (V2024 2.3):</b> K_La ligger <b>ikke</b> i 0,01–0,02. Og det er <b>(C* − C_L)</b>, ikke (C* + C_L).
          </div>
        </Card>

        <OTRCalc />

        <SubHeader>Faktorer som påvirker K_La</SubHeader>
        <Card>
          <ul style={{ margin: 0 }}>
            <Bullet><Term>Lufttilførselhastighet</Term> (gass-flow) — mer luft → mer grenseflate.</Bullet>
            <Bullet><Term>Grad av røring</Term> (mekanisk / ikke-mekanisk) — bryter bobler.</Bullet>
            <Bullet><Term>Reologi/viskositet</Term> i kulturen (inkl. biomassekonsentrasjon og morfologi) — viskøst medium hemmer transport.</Bullet>
            <Bullet><Term>Skumdempende midler</Term> — overflateaktive, <b>reduserer</b> K_La/OTR.</Bullet>
            <Bullet><Term>Oppskalering / nedskalering</Term> av produksjon.</Bullet>
          </ul>
        </Card>

        <SubHeader>Kritisk oksygenkonsentrasjon (C_crit)</SubHeader>
        <Card>
          <p style={{ marginTop: 0 }}>Respirasjonshastigheten <Term>Q_O₂</Term> (spesifikk, [mmol O₂·g⁻¹·t⁻¹]) øker med løst O₂ <b>opp til et punkt</b> — over <Term>kritisk oksygenkonsentrasjon</Term> gir mer O₂ ingen økt respirasjon.</p>
          <ul style={{ margin: 0 }}>
            <Bullet>Q_O₂ er direkte proporsjonal med <b>spesifikk veksthastighet μ</b> → påvirker biomassevekst.</Bullet>
            <Bullet>For maks biomasse må <b>C_L holdes over C_crit</b>.</Bullet>
            <Bullet>Under C_crit → metabolismen forstyrres og veksten begrenses.</Bullet>
          </ul>
        </Card>

        <SubHeader>OUR og steady-state</SubHeader>
        <Card>
          <p style={{ marginTop: 0 }}><Term>OUR</Term> (Oxygen Uptake Rate) = cellens forbrukshastighet. Ved <Term>steady-state</Term> er tilførsel = forbruk:</p>
          <Formula>OUR = OTR  ⟹  dC_L/dt = 0</Formula>
          <p>OUR kan også uttrykkes via massebalanse over gassfasen:</p>
          <Formula>OUR = (F / V) · (x_inn − x_ut)</Formula>
          <ul style={{ margin: 0 }}>
            <Bullet>F = luft-flow inn [L/min], V = mediumvolum [L]</Bullet>
            <Bullet>x_inn, x_ut = molfraksjon O₂ inn/ut (oppgis i % i datasett)</Bullet>
            <Bullet>Alternativt: <span style={{ fontFamily: fontMono }}>OUR = Q_O₂ · x</span> (x = biomassekons.)</Bullet>
          </ul>
          <p style={{ marginBottom: 0 }}><Term>CER</Term> (CO₂ Evolution Rate): <span style={{ fontFamily: fontMono }}>CER = RQ · OUR</span>, der <Term>RQ</Term> (respirasjonskvotient) = mol CO₂ produsert / mol O₂ forbrukt (dimensjonsløs).</p>
        </Card>

        <SubHeader>Bestemmelse av K_La</SubHeader>
        <Card>
          <p style={{ marginTop: 0 }}><b>1) Dynamisk utgassingsmetode (gassing out):</b></p>
          <ul style={{ margin: 0 }}>
            <Bullet>DO₂-sensor (<b>polarografisk eller optisk</b>) måler løst O₂ underveis.</Bullet>
            <Bullet>Lufttilførsel <b>slås av</b> (punkt A): OTR = 0, så <span style={{ fontFamily: fontMono }}>dC_L/dt = −OUR</span>. Stigningstallet til C_L mot tid gir <b>−OUR</b>.</Bullet>
            <Bullet>Lufttilførsel <b>slås på igjen</b> (B): kulturen går fra steady-state → ubalanse → steady-state.</Bullet>
            <Bullet>K_La finnes fra et plott av <span style={{ fontFamily: fontMono }}>ln((C_L′−C_L,t1)/(C_L′−C_L,t2))</span> mot (t₂−t₁) → rett linje med <b>stigningstall = K_La</b>.</Bullet>
          </ul>
          <div style={{ marginTop: 12, padding: "10px 14px", background: ACCENT_BG, border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 14 }}>
            <b>3 antakelser</b> for dynamisk metode: (1) væsken er godt blandet, (2) elektrodens responstid ≪ 1/K_La, (3) målinger ved <b>høy rørehastighet</b>.
          </div>
          <p style={{ marginTop: 14 }}><b>2) Oksygenbalansemetoden:</b> måles under selve fermenteringen. Krever inn-/ut-flow (Q_i, Q_o), trykk (P_i, P_o), temp (T_i, T_o) og molfraksjon O₂ (y_i, y_o) → gir OTR direkte, deretter K_La = OTR/(C*−C_L).</p>
          <p style={{ marginBottom: 0, color: T2, fontSize: 14 }}>NB: utgassings-/sulfittmetodene egner seg kun på <b>liten skala</b> og <b>ikke i viskøse systemer</b> (små bobler &lt;1 mm gir forlenget oppholdstid).</p>
        </Card>

        <SubHeader>Impellere (rørere)</SubHeader>
        <Card>
          <p style={{ marginTop: 0 }}>To hovedfunksjoner:</p>
          <ul style={{ margin: "0 0 14px 0" }}>
            <Bullet>Minske <b>boblestørrelsen</b> → større grenseflate for OTR + kortere diffusjonsvei.</Bullet>
            <Bullet>Oppnå et <b>homogent miljø</b> (jevn fordeling av næring, celler og O₂).</Bullet>
          </ul>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ color: ACCENT, textAlign: "left", fontFamily: fontHead }}>
                <th style={{ padding: "8px 6px", borderBottom: `1px solid ${BORDER}` }}>Impeller</th>
                <th style={{ padding: "8px 6px", borderBottom: `1px solid ${BORDER}` }}>Flow</th>
                <th style={{ padding: "8px 6px", borderBottom: `1px solid ${BORDER}` }}>Kjennetegn</th>
              </tr>
            </thead>
            <tbody style={{ color: T1 }}>
              <tr><td style={{ padding: "8px 6px", borderBottom: `1px solid ${BORDER}` }}><b>Rushton-turbin</b> (skiveturbin)</td><td style={{ padding: "8px 6px", borderBottom: `1px solid ${BORDER}` }}>Radial</td><td style={{ padding: "8px 6px", borderBottom: `1px solid ${BORDER}` }}>Vanligst; høyt power-number (~5–6,5); ⅓ av tankdiameter; bryter luftstrøm uten å «flooded».</td></tr>
              <tr><td style={{ padding: "8px 6px", borderBottom: `1px solid ${BORDER}` }}><b>Marinepropell</b></td><td style={{ padding: "8px 6px", borderBottom: `1px solid ${BORDER}` }}>Aksial</td><td style={{ padding: "8px 6px", borderBottom: `1px solid ${BORDER}` }}>Pumper langs akse (opp/ned).</td></tr>
              <tr><td style={{ padding: "8px 6px", borderBottom: `1px solid ${BORDER}` }}><b>Skråbladet / åpen turbin</b></td><td style={{ padding: "8px 6px", borderBottom: `1px solid ${BORDER}` }}>Aksial</td><td style={{ padding: "8px 6px", borderBottom: `1px solid ${BORDER}` }}>Variabel pitch.</td></tr>
              <tr><td style={{ padding: "8px 6px" }}><b>Hydrofoil</b> (A315, Prochem)</td><td style={{ padding: "8px 6px" }}>Aksial</td><td style={{ padding: "8px 6px" }}>Lavt power-number → økonomisk; skånsom; bra for viskøse / skjærsensitive kulturer.</td></tr>
            </tbody>
          </table>
        </Card>

        <SubHeader>Effektforbruk (power)</SubHeader>
        <Card>
          <Formula>
            Power-number:  N_p = P / (ρ·N³·D⁵){"\n"}
            Turbulent flow:  P = N_p·ρ·N³·D⁵{"\n"}
            Viskøs flow:     P = c·μ·N²·D³
          </Formula>
          <ul style={{ margin: 0 }}>
            <Bullet>N = rotasjonshastighet, D = impellerdiameter, ρ = tetthet, μ = viskositet.</Bullet>
            <Bullet><b>Aerert effekt &lt; uaerert effekt:</b> luftbobler gjør væsken mindre tett + gassfylte kaviteter bak bladene reduserer motstand.</Bullet>
            <Bullet>⚠️ <b>Motoren må dimensjoneres for uaerert drift</b> (f.eks. under in-situ sterilisering eller hvis lufta svikter), ellers overbelastes den.</Bullet>
          </ul>
        </Card>

        <SubHeader>Strømbrytere (baffles)</SubHeader>
        <Card>
          <ul style={{ margin: 0 }}>
            <Bullet>Hindrer <Term>vorteks</Term> og forbedrer effektiviteten av røring/lufttilførsel.</Bullet>
            <Bullet>Typisk <b>3–4 stk</b>; i reaktorer &gt;3 dm³ kan <b>6–8</b> brukes.</Bullet>
            <Bullet>Metallstrimler ~<b>1/10 av tankdiameteren</b>, montert med gap til veggen (scouring hindrer mikrobiell vekst bak baffelen).</Bullet>
          </ul>
        </Card>

        <SubHeader>Sparger (luftfordeler)</SubHeader>
        <Card>
          <ul style={{ margin: 0 }}>
            <Bullet><Term>Porøs sparger</Term> (sintret glass/keramikk/metall): labskala; bobler 10–100× porestørrelsen; kan <b>tettes</b> av cellevekst.</Bullet>
            <Bullet><Term>Orifice/ring-sparger</Term> (perforert rør): plasseres under impelleren, ~¾ av impellerdiameter, hull på undersiden.</Bullet>
            <Bullet><Term>Nozzle-sparger</Term> (åpent/delvis lukket rør).</Bullet>
          </ul>
        </Card>

        <SubHeader>Skumdannelse</SubHeader>
        <Card>
          <ul style={{ margin: 0 }}>
            <Bullet><b>Årsaker:</b> proteiner i mediet + kraftig røring. Høyere rørehastighet → mer skum.</Bullet>
            <Bullet><b>Problemer:</b> tap av innhold, fuktige utløpsfilter → tetting og <b>kontaminasjonsfare</b>.</Bullet>
            <Bullet><b>Løsninger:</b> mekanisk (skumskjærer/skumoppsamler) + kjemisk (<Term>antiskummidler</Term>). Men antiskum er overflateaktivt og <b>reduserer OTR/K_La</b> — en avveining.</Bullet>
          </ul>
        </Card>

        {/* ---------- DEL II ---------- */}
        <Divider label="DEL II · REAKTORDESIGN (A8)" />

        <SubHeader>Krav til en bioreaktor</SubHeader>
        <Card>
          <p style={{ marginTop: 0 }}>Bioreaktoren skal gi et <b>kontrollert vekstmiljø</b> der ønsket produkt kan dannes. Ytelsen avhenger av nøkkelfaktorene: rørehastighet, O₂-overføring, temperatur, skumdannelse og pH. De 13 designkravene:</p>
          <ol style={{ margin: 0, paddingLeft: 22, lineHeight: 1.6 }}>
            <li>Kan opereres <b>aseptisk</b> hele prosessen (dager–måneder). ★</li>
            <li>Aerobe: nok lufttilførsel + røring uten å skade cellene / med minimalt skum. ★</li>
            <li>Lavest mulig energiforbruk.</li>
            <li>Temperaturen kan kontrolleres (sterilisering + fermentering).</li>
            <li>pH-kontroll + andre parametre (løst O₂, redoks …).</li>
            <li>Mulig å ta ut prøver (sterilt).</li>
            <li>Minimalt væsketap som damp.</li>
            <li>Drift, høsting, vasking og vedlikehold enklest mulig.</li>
            <li>Ideelt allsidig — begrenses av kontamineringsfare.</li>
            <li>Alle indre overflater glatte, uten groper/sprekker.</li>
            <li>Lik geometri på tvers av størrelser → enklere oppskalering.</li>
            <li>Rimeligst mulig materialer som likevel tilfredsstiller kravene.</li>
            <li>Tilstrekkelige serviceavtaler for anlegget.</li>
          </ol>
          <p style={{ marginBottom: 0, color: T2, fontSize: 14 }}>★ = de to <b>viktigste</b> kravene (aseptisk drift + lufttilførsel/røring) — eksplisitt spurt i V2024 2.5.</p>
        </Card>

        <SubHeader>Røretanken (STR — stirred tank reactor)</SubHeader>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "flex-start" }}>
          <Card style={{ flex: "1 1 300px" }}>
            <p style={{ marginTop: 0 }}>Den vanligste bioreaktoren. Sylindrisk beholder av <Term>glass</Term> og/eller <Term>rustfritt stål</Term> (&gt;4 % krom → tynn, selvreparerende hydroksidfilm mot korrosjon).</p>
            <p><b>Komponenter:</b> sentral akse + en/flere impellere (motor), kjølekappe, baffles, sparger.</p>
            <ul style={{ margin: 0 }}>
              <Bullet><b>H : D-forhold</b> = 1:1 til 1:3.</Bullet>
              <Bullet><b>Arbeidsvolum</b> = 70–80 % av reaktorvolum.</Bullet>
            </ul>
          </Card>
          <Card style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <STRDiagram />
          </Card>
        </div>

        <Card>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 240px" }}>
              <div style={{ color: ACCENT, fontFamily: fontHead, fontWeight: 700, marginBottom: 6 }}>✓ Fordeler</div>
              <ul style={{ margin: 0 }}>
                <Bullet>Åpent/lukket system; kan kjøres kontinuerlig.</Bullet>
                <Bullet>Enkel konstruksjon, lett å bruke.</Bullet>
                <Bullet>God blanding, høy fortynningshastighet.</Bullet>
                <Bullet>God temperaturkontroll; robust og driftssikker.</Bullet>
                <Bullet>Lett å rengjøre; tåler gjentatte dampsteriliseringer.</Bullet>
                <Bullet>Lave driftskostnader.</Bullet>
              </ul>
            </div>
            <div style={{ flex: "1 1 240px" }}>
              <div style={{ color: "#EF4444", fontFamily: fontHead, fontWeight: 700, marginBottom: 6 }}>✗ Ulemper</div>
              <ul style={{ margin: 0 }}>
                <Bullet>Behov for pakninger/lagre rundt røreakselen.</Bullet>
                <Bullet>Størrelsesbegrensning på motor, akselengde og vekt.</Bullet>
              </ul>
            </div>
          </div>
        </Card>

        <SubHeader>Størrelsesskala og sterilisering</SubHeader>
        <Card>
          <ul style={{ margin: 0 }}>
            <Bullet><b>Labskala</b> 1–30 dm³ · <b>pilot</b> 50–5000 dm³ · <b>fabrikk</b> opptil 1,5 millioner dm³.</Bullet>
            <Bullet><b>Lab, to typer:</b> (1) glass m/ avtakbar stål-topplate, maks Ø60 cm → <Term>autoklavering</Term>; (2) glass m/ stål topp+bunn → <Term>in situ dampsterilisering</Term>, maks Ø30 cm (arbeidstrykk).</Bullet>
            <Bullet><b>Pilot/stor skala:</b> rustfritt stål, <b>in situ</b> dampsterilisering (~121 °C).</Bullet>
          </ul>
          <div style={{ marginTop: 12, padding: "10px 14px", background: ACCENT_BG, border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 14 }}>
            <b>Aseptiske forhold:</b> in situ damp må nå <i>overalt</i> (fortrenge all luft), glatte overflater, alt utstyr + medium steriliseres sammen. Tilført luft og avgass <b>sterilfiltreres</b>. Sterile porter for inokulum/næring (≤150 L → sterilfiltrering) og prøveuttak. Tette O-ringer.
          </div>
        </Card>

        <SubHeader>Airlift-reaktor</SubHeader>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "flex-start" }}>
          <Card style={{ flex: "1 1 300px" }}>
            <ul style={{ margin: 0 }}>
              <Bullet><b>Ingen mekanisk røring</b> eller bevegelige deler → veldig <b>skånsom</b> mot celler, ingen varmeutvikling fra røring.</Bullet>
              <Bullet>Røring skjer ved <b>sirkulering av luft</b> i et loop-system.</Bullet>
              <Bullet><b>Drivkraft:</b> tetthetsforskjell mellom luftrik del (<Term>stigningsrør</Term>) og luftfattig del (<Term>avløpsrør</Term>) → definert væskestrøm.</Bullet>
              <Bullet>Kan ha <b>indre eller ytre loop</b>.</Bullet>
              <Bullet>Brukes til plante-/dyreceller og encelleprotein (C-kilde metanol).</Bullet>
            </ul>
          </Card>
          <Card style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <AirliftDiagram />
          </Card>
        </div>

        <SubHeader>Andre reaktortyper</SubHeader>
        <Card>
          <ul style={{ margin: 0 }}>
            <Bullet><Term>Boblekolonne</Term>: enkel, ingen mekanisk røring; røring via porøs sparger i bunn. H:D 3:1 (bakegjær), ellers ≥6:1. <b>Homogen flow</b> (lav hastighet, bobler stiger jevnt, lite blanding) vs <b>heterogen flow</b> (høy hastighet, kaotisk/sirkulerende, god blanding). Brukes bl.a. til sitronsyre.</Bullet>
            <Bullet><Term>Tårnfermentor</Term> — høy H:D, lufttilførsel gir turbulens.</Bullet>
            <Bullet><Term>Pakket seng</Term> (packed-bed) og <Term>fluidisert seng</Term> — for immobiliserte/partikulære biokatalysatorer (celler/enzymer).</Bullet>
            <Bullet><Term>Trickle-bed</Term> og <Term>fotobioreaktor</Term> — spesialtyper.</Bullet>
          </ul>
        </Card>

        <SubHeader>Engangsreaktorer (single-use / biobags)</SubHeader>
        <Card>
          <ul style={{ margin: 0 }}>
            <Bullet>Plastposer av <b>flere lag polymerfilm</b> (polyetylen nærmest cellene), festet i et stålstativ.</Bullet>
            <Bullet><b>Fordeler:</b> <Term>reduserer krysskontaminering</Term>, ingen sterilisering nødvendig.</Bullet>
            <Bullet>Brukes til medie-/buffertillaging, cellehøsting, filtrering, rensing, virusinaktivering.</Bullet>
            <Bullet>2019: ~60 % av farmasøytiske bedrifter har gått over til engangsreaktorer.</Bullet>
          </ul>
        </Card>

        <SubHeader>Instrumentering og oppskalering</SubHeader>
        <Card>
          <p style={{ marginTop: 0 }}><b>Sensorer:</b> løst O₂ (DO₂), pH, temperatur, trykk, CO₂, samt skumkontroll. Temperatur reguleres med kjøle-/varmekappe eller spiraler (varme kommer fra mikrobiell aktivitet + røring).</p>
          <p style={{ marginBottom: 0 }}><b>Oppskalering</b> bygger på <Term>geometrisk likhet</Term> og bevaring av en nøkkelparameter. Holder man <b>lik effekt per volum (P/V)</b>:</p>
          <Formula>N_L = N_sm · (V_sm / V_L)^(2/9)   ;   D_sm/D_L = (V_sm/V_L)^(1/3)</Formula>
          <p style={{ marginBottom: 0, color: T2, fontSize: 14 }}>Utfordring: viskøse/ikke-Newtonske kulturer gjør at turbulent flow (uavhengig av viskositet) er vanskelig å oppnå.</p>
        </Card>

        {/* ============ 4. VIKTIGE SAMMENHENGER ============ */}
        <SectionLabel>Viktige sammenhenger</SectionLabel>
        <Card>
          <ul style={{ margin: 0 }}>
            <Bullet><b>A2 (Vekstkinetikk):</b> μ begrenses av O₂-tilgang. Når C_L &lt; C_crit stopper veksten — Q_O₂ ∝ μ knytter oksygenoverføring direkte til kinetikken.</Bullet>
            <Bullet><b>A3 (Industrielle medier):</b> antiskummidler reduserer K_La; mediets viskositet/reologi styrer hvor godt O₂ transporteres.</Bullet>
            <Bullet><b>A4 (Materialbalanse & støkiometri):</b> oksygenforbruket beregnet fra grad av reduksjon / støkiometri bestemmer nødvendig OTR og dermed K_La.</Bullet>
            <Bullet><b>A6 (Inokulum & preservering):</b> sterilisering av reaktoren og sterilt tilsatt inokulum henger sammen med de aseptiske designkravene.</Bullet>
          </ul>
        </Card>

        {/* Tabeller note */}
        <Card style={{ background: "rgba(139,92,246,0.06)" }}>
          <div style={{ fontFamily: fontHead, fontWeight: 700, color: ACCENT, marginBottom: 8 }}>📑 Tabeller på eksamen</div>
          <ul style={{ margin: 0 }}>
            <Bullet>Formlene for <b>OTR, OUR, K_La, RQ/CER</b> ligger i formelsamlingen — slå dem opp i stedet for å pugge eksakt notasjon.</Bullet>
            <Bullet>For O₂-behov fra støkiometri: bruk <b>grad av reduksjon (γ)</b>-tabellen (kobler til A4).</Bullet>
            <Bullet><b>SI Chemical Data</b> (Aylward &amp; Findlay) gir O₂-løselighet/C*-verdier ved gitt temperatur.</Bullet>
          </ul>
        </Card>

        <div style={{ marginTop: 40, textAlign: "center", color: T2, fontFamily: fontMono, fontSize: 13 }}>
          Del 1 av 2 ferdig · Eksempler + quiz kommer i Del 2
        </div>
      </div>
    </div>
  );
}


return App;
})();

const EksemplerQuizPage = (() => {
// ============================================================
// IMAK2005 — A5/A8: Røring, lufttilførsel og reaktordesign
// Part 2 av 2: Eksempler + Quiz (flashcards)
// Accent: #8B5CF6 (violet)
// ============================================================

const ACCENT = "#8B5CF6";
const ACCENT_BG = "rgba(139,92,246,0.10)";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const T1 = "#F8FAFC";
const T2 = "#94A3B8";

const fontHead = "'Plus Jakarta Sans', sans-serif";
const fontBody = "'Source Sans 3', sans-serif";
const fontMono = "'JetBrains Mono', monospace";

// ---------- Reusable bits ----------
const Term = ({ children }) => (
  <span style={{ color: ACCENT, background: ACCENT_BG, borderLeft: `3px solid ${ACCENT}`, padding: "1px 6px", borderRadius: 4, fontWeight: 600, whiteSpace: "nowrap" }}>
    {children}
  </span>
);

const Formula = ({ children }) => (
  <div style={{ fontFamily: fontMono, background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "14px 18px", margin: "14px 0", color: T1, fontSize: 15, lineHeight: 1.7, whiteSpace: "pre-wrap", overflowX: "auto" }}>
    {children}
  </div>
);

const Card = ({ children, style }) => (
  <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, marginBottom: 18, ...style }}>
    {children}
  </div>
);

const SectionLabel = ({ children }) => (
  <div style={{ borderLeft: `4px solid ${ACCENT}`, paddingLeft: 14, margin: "48px 0 22px 0" }}>
    <div style={{ fontFamily: fontHead, textTransform: "uppercase", letterSpacing: 2, fontSize: 13, color: ACCENT, fontWeight: 700 }}>{children}</div>
  </div>
);

const ExHeader = ({ tag, children }) => (
  <h3 style={{ fontFamily: fontHead, fontSize: 20, fontWeight: 700, color: T1, margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: 10 }}>
    <span style={{ fontFamily: fontMono, fontSize: 13, color: "#0F172A", background: ACCENT, borderRadius: 6, padding: "3px 9px", fontWeight: 700 }}>{tag}</span>
    {children}
  </h3>
);

const Step = ({ n, children }) => (
  <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
    <div style={{ flex: "0 0 24px", height: 24, borderRadius: "50%", background: ACCENT_BG, border: `1px solid ${ACCENT}`, color: ACCENT, fontFamily: fontMono, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{n}</div>
    <div style={{ flex: 1, lineHeight: 1.6 }}>{children}</div>
  </div>
);

const Answer = ({ children }) => (
  <div style={{ marginTop: 14, padding: "12px 16px", background: ACCENT_BG, border: `1px solid ${ACCENT}`, borderRadius: 8, fontFamily: fontMono, fontSize: 15, color: T1 }}>
    <span style={{ color: ACCENT, fontWeight: 700 }}>Svar: </span>{children}
  </div>
);

const Bullet = ({ children }) => <li style={{ marginBottom: 7, lineHeight: 1.6 }}>{children}</li>;

// ============================================================
// QUIZ DATA — inspired by V2024 2.3/2.5, V2023 3a, V2025 5c (not copied)
// ============================================================
const CARDS = [
  {
    q: "Sant eller usant: K_La ligger typisk i området 0,01–0,02 s⁻¹.",
    a: "USANT. K_La ligger normalt i 0,02–0,25 s⁻¹. (0,01–0,02 er en klassisk distraktor på MC.) K_La er målet på bioreaktorens lufttilførselkapasitet — jo høyere, jo bedre.",
  },
  {
    q: "Hva er de to viktigste designkravene til en bioreaktor?",
    a: "1) Reaktoren må kunne opereres ASEPTISK hele prosessen (dager–måneder).\n2) Aerobe prosesser: nok lufttilførsel + røring til mikrobens metabolske behov, UTEN å skade cellene / med minimalt skum.",
  },
  {
    q: "Hva er impellerens to hovedfunksjoner?",
    a: "1) Minske boblestørrelsen → større gass–væske-grenseflate (bedre OTR) + kortere diffusjonsvei.\n2) Oppnå et homogent miljø — jevn fordeling av næring, celler og O₂.",
  },
  {
    q: "Sant eller usant: Røretanken har typisk H:D-forhold på 1:2.",
    a: "SANT — det ligger i intervallet. STR har H:D fra 1:1 til 1:3 avhengig av bruk. Arbeidsvolum er 70–80 % av reaktorvolumet.",
  },
  {
    q: "Hva er forskjellen mellom en airlift med ytre og indre loop?",
    a: "Begge drives av tetthetsforskjellen mellom luftrik stigningsrør og luftfattig avløpsrør (ingen mekanisk røring). Forskjellen er hvor sirkulasjonen skjer: YTRE loop har et eksternt rør utenfor hovedbeholderen; INDRE loop har et innvendig sentralt rør (draft tube). Prinsippet er likt.",
  },
  {
    q: "Forklar OTR = K_La·(C* − C_L) og hva hvert ledd betyr.",
    a: "OTR = oksygenoverføringshastighet [mmol·dm⁻³·t⁻¹].\nK_La = volumetrisk masseoverføringskoeffisient [t⁻¹] = lufttilførselkapasitet.\nC* = metningskonsentrasjon av løst O₂.\nC_L = faktisk løst O₂.\n(C* − C_L) = drivkraften. NB: minus, ikke pluss!",
  },
  {
    q: "Nevn fordeler med engangsreaktorer (biobags).",
    a: "Reduserer risiko for KRYSSKONTAMINERING; ingen sterilisering nødvendig; raskere omstilling mellom batcher; lavere investering. Plast (flere lag polymerfilm, polyetylen nærmest cellene) festet i stålstativ. ~60 % av farma brukte dem i 2019.",
  },
  {
    q: "Hvorfor er strømbrytere (baffles) nødvendige i en røretank?",
    a: "De hindrer at det dannes en VORTEKS (virvel) ved røring, og forbedrer effektiviteten av røring og lufttilførsel. Typisk 3–4 stk (6–8 i reaktorer >3 dm³), metallstrimler ~1/10 av tankdiameteren, montert med gap til veggen.",
  },
  {
    q: "Sant eller usant: Air-lift-reaktor og tårnreaktor er samme type bioreaktor.",
    a: "USANT. Begge mangler mekanisk røring, men de er ulike. Airlift har et definert loop-system (stigningsrør/avløpsrør) drevet av tetthetsforskjell; tårn-/boblekolonne blandes mindre definert via bobler fra sparger i bunn.",
  },
  {
    q: "Hva er sammenhengen mellom K_La, OTR og OUR ved steady-state?",
    a: "Ved steady-state er tilførsel = forbruk: OTR = OUR og dC_L/dt = 0. Da kan K_La finnes som K_La = OTR/(C*−C_L). Cellens O₂-opptak (OUR) bestemmer hvor mye som må overføres.",
  },
  {
    q: "Hva er kritisk oksygenkonsentrasjon (C_crit)?",
    a: "Konsentrasjonen av løst O₂ der respirasjonshastigheten Q_O₂ slutter å øke. Q_O₂ ∝ spesifikk veksthastighet μ. C_L må holdes OVER C_crit for maks biomasse; under C_crit forstyrres metabolismen og veksten begrenses.",
  },
  {
    q: "Hvordan bestemmes K_La og OUR med den dynamiske utgassingsmetoden?",
    a: "DO₂-sensor måler C_L. 1) Slå AV lufta (OTR=0): dC_L/dt = −OUR → stigningstall gir OUR. 2) Slå PÅ lufta igjen → C_L stiger; et plott av ln((C_L′−C_L,t1)/(C_L′−C_L,t2)) mot (t₂−t₁) gir rett linje med stigningstall = K_La. Antakelser: godt blandet, rask elektrode, høy rørehastighet.",
  },
  {
    q: "Sant eller usant: Aerert (gasset) effektforbruk er høyere enn uaerert.",
    a: "USANT — det er lavere. Luftbobler gjør væsken mindre tett og gassfylte kaviteter bak bladene reduserer motstanden. Derfor må motoren dimensjoneres for UAERERT drift (sterilisering / luftsvikt), ellers overbelastes den.",
  },
  {
    q: "Sant eller usant: Glass egner seg ikke som materiale i reaktorer over 50 dm³.",
    a: "SANT. Glass brukes i labskala (maks ~Ø60 cm, eller Ø30 cm ved in-situ-trykk). Pilot- og stor skala bruker rustfritt stål (>4 % krom) som tåler steriliseringstrykk og korrosjon.",
  },
  {
    q: "Når velger du STR vs. airlift?",
    a: "STR: robuste mikrober/sopp, høyt O₂-behov, behov for kraftig blanding og god temp.kontroll. AIRLIFT: skjærsensitive celler (plante-/dyreceller, encelleprotein) der mekanisk røring ville skadet cellene, og når man vil unngå varmeutvikling/bevegelige deler.",
  },
];

// ---------- Flashcard component ----------
const Flashcard = () => {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const c = CARDS[i];

  const go = (d) => {
    setFlipped(false);
    setI((prev) => (prev + d + CARDS.length) % CARDS.length);
  };

  const navBtn = {
    fontFamily: fontHead, fontWeight: 700, fontSize: 15, color: T1,
    background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10,
    padding: "10px 20px", cursor: "pointer",
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, fontFamily: fontMono, fontSize: 14, color: T2 }}>
        <span>Kort {i + 1} av {CARDS.length}</span>
        <span style={{ color: ACCENT }}>{flipped ? "SVAR" : "SPØRSMÅL"} · klikk for å snu</span>
      </div>

      <div
        onClick={() => setFlipped((f) => !f)}
        style={{ perspective: 1200, cursor: "pointer", marginBottom: 18 }}
      >
        <div style={{
          position: "relative", width: "100%", minHeight: 260,
          transition: "transform 0.55s", transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>
          {/* FRONT */}
          <div style={{
            position: flipped ? "absolute" : "relative", inset: 0,
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            background: CARD, border: `1px solid ${BORDER}`, borderTop: `4px solid ${ACCENT}`,
            borderRadius: 14, padding: "34px 28px", display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center", textAlign: "center",
          }}>
            <div style={{ fontFamily: fontMono, fontSize: 12, color: ACCENT, marginBottom: 14, letterSpacing: 1 }}>A5 / A8 · SPØRSMÅL</div>
            <div style={{ fontFamily: fontHead, fontSize: 21, fontWeight: 600, lineHeight: 1.4, color: T1 }}>{c.q}</div>
          </div>
          {/* BACK */}
          <div style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#19223a", border: `1px solid ${ACCENT}`, borderRadius: 14,
            padding: "30px 28px", display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <div style={{ fontFamily: fontMono, fontSize: 12, color: ACCENT, marginBottom: 12, letterSpacing: 1 }}>SVAR</div>
            <div style={{ fontFamily: fontBody, fontSize: 16, lineHeight: 1.6, color: T1, whiteSpace: "pre-wrap" }}>{c.a}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <button style={navBtn} onClick={(e) => { e.stopPropagation(); go(-1); }}>← Forrige</button>
        <button
          onClick={(e) => { e.stopPropagation(); setFlipped((f) => !f); }}
          style={{ ...navBtn, background: ACCENT_BG, borderColor: ACCENT, color: ACCENT }}
        >
          {flipped ? "Vis spørsmål" : "Vis svar"}
        </button>
        <button style={navBtn} onClick={(e) => { e.stopPropagation(); go(1); }}>Neste →</button>
      </div>

      {/* progress dots */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 18, justifyContent: "center" }}>
        {CARDS.map((_, idx) => (
          <div key={idx}
            onClick={() => { setFlipped(false); setI(idx); }}
            style={{ width: 9, height: 9, borderRadius: "50%", cursor: "pointer", background: idx === i ? ACCENT : BORDER }} />
        ))}
      </div>
    </div>
  );
};

// ============================================================
function App() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: T1, fontFamily: fontBody, fontSize: 16, lineHeight: 1.6 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ul { padding-left: 22px; margin: 8px 0; }
        button:hover { filter: brightness(1.15); }
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 22px 80px 22px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
          <span style={{ background: ACCENT, color: "#0F172A", fontFamily: fontHead, fontWeight: 800, fontSize: 13, padding: "4px 12px", borderRadius: 999 }}>DEL A · BIOTEK</span>
          <span style={{ border: `1px solid ${ACCENT}`, color: ACCENT, fontFamily: fontMono, fontSize: 13, padding: "3px 12px", borderRadius: 999 }}>A5 / A8</span>
          <span style={{ color: T2, fontFamily: fontMono, fontSize: 12 }}>Del 2 av 2 — Eksempler &amp; Quiz</span>
        </div>
        <h1 style={{ fontFamily: fontHead, fontSize: 34, fontWeight: 800, lineHeight: 1.15, margin: "0 0 12px 0" }}>
          Røring, lufttilførsel og reaktordesign — Eksempler og Quiz
        </h1>
        <p style={{ color: T2, fontSize: 18, margin: 0 }}>
          Regneeksempler i eksamensstil + flashcards som driller de MC-/sant–usant-påstandene som dukker opp hvert år.
        </p>

        {/* ============ EKSEMPLER ============ */}
        <SectionLabel>Eksempler</SectionLabel>

        {/* Eksempel A */}
        <Card>
          <ExHeader tag="A">K_La via utgassingsmetoden</ExHeader>
          <p style={{ marginTop: 0 }}>En kultur kjøres i steady-state. Under K_La-bestemmelse slås lufta på igjen og C_L måles mot tid. Metningsverdien er C* = 0,25 mmol·dm⁻³. To målepunkter:</p>
          <Formula>{`t₁ = 20 s   →   C_L = 0,05 mmol·dm⁻³
t₂ = 30 s   →   C_L = 0,15 mmol·dm⁻³`}</Formula>
          <p>Når lufta er på antar vi OUR ≈ K_La·(C*−C_L′) med C_L′ = C* og bruker den integrerte formen:</p>
          <Step n="1">Sett opp ligningen: <span style={{ fontFamily: fontMono }}>K_La = ln[(C*−C_L,t1)/(C*−C_L,t2)] / (t₂−t₁)</span></Step>
          <Step n="2">Teller: <span style={{ fontFamily: fontMono }}>(0,25−0,05)/(0,25−0,15) = 0,20/0,10 = 2,0</span></Step>
          <Step n="3"><span style={{ fontFamily: fontMono }}>ln(2,0) = 0,693</span></Step>
          <Step n="4">Del på Δt: <span style={{ fontFamily: fontMono }}>0,693 / (30−20) s = 0,693/10</span></Step>
          <Answer>K_La ≈ 0,069 s⁻¹ — innenfor det forventede området 0,02–0,25 s⁻¹.</Answer>
          <p style={{ color: T2, fontSize: 14, marginBottom: 0 }}>Tips: i en figur leser du heller av stigningstallet til den rette linja (ln-uttrykk mot tid) = K_La. OUR finner du fra fasen der lufta er AV: stigningstall av C_L mot t = −OUR.</p>
        </Card>

        {/* Eksempel B */}
        <Card>
          <ExHeader tag="B">OTR-beregning — er kapasiteten nok?</ExHeader>
          <p style={{ marginTop: 0 }}>En reaktor har K_La = 0,12 s⁻¹, metning C* = 0,24 mmol·dm⁻³ og holder C_L = 0,06 mmol·dm⁻³. Cellene har spesifikt opptak Q_O₂ = 4,0 mmol O₂·g⁻¹·t⁻¹ ved en biomasse x = 6 g·dm⁻³. Er O₂-overføringen tilstrekkelig?</p>
          <Step n="1">OTR = K_La·(C*−C_L) = 0,12 · (0,24−0,06) = 0,12 · 0,18</Step>
          <Step n="2"><span style={{ fontFamily: fontMono }}>OTR = 0,0216 mmol·dm⁻³·s⁻¹ → ×3600 = 77,8 mmol·dm⁻³·t⁻¹</span></Step>
          <Step n="3">Cellenes behov: OUR = Q_O₂·x = 4,0 · 6 = 24 mmol·dm⁻³·t⁻¹</Step>
          <Answer>OTR (≈78) ≫ OUR (24) ⟹ overføringen er rikelig. C_L vil holde seg over C_crit og veksten er ikke O₂-begrenset.</Answer>
          <p style={{ color: T2, fontSize: 14, marginBottom: 0 }}>Hvis OUR &gt; OTR ville C_L falt under C_crit, og du måtte øke K_La (mer røring/luft) eller redusere x.</p>
        </Card>

        {/* Eksempel C */}
        <Card>
          <ExHeader tag="C">Beskriv STR (slik eksamen forventer)</ExHeader>
          <p style={{ marginTop: 0 }}>Modellsvar på «beskriv røretanken mht. fordeler, materialvalg, sterilisering, størrelse og viktigste utstyr» (jf. V2024 2.5):</p>
          <ul style={{ margin: 0 }}>
            <Bullet><b>Konstruksjon:</b> sylindrisk beholder av glass og/eller rustfritt stål (stor skala), med mekanisk røreenhet (akse + impellere), kjølekappe, strømbrytere og luftspreder.</Bullet>
            <Bullet><b>Materialvalg:</b> glatte overflater, lette å rengjøre; rustfritt stål (&gt;4 % krom) tåler gjentatte dampsteriliseringer og korrosjon.</Bullet>
            <Bullet><b>Sterilisering:</b> varm damp ~121 °C — autoklavering (lab) eller in situ (stor skala). Engangsbeholdere (biobags) finnes også.</Bullet>
            <Bullet><b>Størrelse:</b> lab 1–30 dm³, pilot 50–5000 dm³, fabrikk inntil 1,5 mill. dm³. H:D = 1:1 til 1:3, arbeidsvolum 70–80 %.</Bullet>
            <Bullet><b>Utstyr:</b> luftspreder, sensorer for O₂, CO₂, temp, pH, evt. skumskjærer/-oppsamler.</Bullet>
            <Bullet><b>Fordeler:</b> enkel og robust, god blanding/temp.kontroll, kan kjøres kontinuerlig, lave driftskostnader. <b>Ulemper:</b> pakninger rundt akselen, størrelsesbegrensning på motor/akse/vekt.</Bullet>
          </ul>
        </Card>

        {/* Eksempel D */}
        <Card>
          <ExHeader tag="D">STR vs. airlift — når velge hva?</ExHeader>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 240px" }}>
              <div style={{ color: ACCENT, fontFamily: fontHead, fontWeight: 700, marginBottom: 8 }}>Røretank (STR)</div>
              <ul style={{ margin: 0 }}>
                <Bullet>Mekanisk røring → høy, justerbar OTR.</Bullet>
                <Bullet>Robuste mikrober/sopp, høyt O₂-behov.</Bullet>
                <Bullet>God blanding + temp.kontroll.</Bullet>
                <Bullet>Ulempe: skjærkrefter kan skade ømfintlige celler.</Bullet>
              </ul>
            </div>
            <div style={{ flex: "1 1 240px" }}>
              <div style={{ color: ACCENT, fontFamily: fontHead, fontWeight: 700, marginBottom: 8 }}>Airlift</div>
              <ul style={{ margin: 0 }}>
                <Bullet>Ingen bevegelige deler → skånsom.</Bullet>
                <Bullet>Plante-/dyreceller, encelleprotein.</Bullet>
                <Bullet>Mindre varmeutvikling, enklere mekanisk.</Bullet>
                <Bullet>Ulempe: lavere/mindre justerbar blanding ved høy viskositet.</Bullet>
              </ul>
            </div>
          </div>
          <Answer>Velg STR når du trenger kraftig O₂-overføring til robuste organismer; velg airlift når cellene er skjærsensitive og skånsom blanding er viktigere enn maksimal OTR.</Answer>
        </Card>

        {/* ============ QUIZ ============ */}
        <SectionLabel>Quiz — flashcards</SectionLabel>
        <Card style={{ background: "transparent", border: "none", padding: 0 }}>
          <p style={{ color: T2, marginTop: 0 }}>
            {CARDS.length} kort som speiler MC-/sant–usant-påstandene fra V2023 (3a), V2024 (2.3, 2.5) og V2025 (5c). Husk: feil svar gir <b>minuspoeng</b> på eksamen — vær sikker før du krysser av.
          </p>
          <Flashcard />
        </Card>

        <div style={{ marginTop: 40, textAlign: "center", color: T2, fontFamily: fontMono, fontSize: 13 }}>
          A5 / A8 fullført · Del 1 (Teori) + Del 2 (Eksempler &amp; Quiz)
        </div>
      </div>
    </div>
  );
}


return App;
})();

export default function KombinertSide() {
  const [tab, setTab] = useState("teori");
  const tabStyle = (active) => ({
    appearance: "none",
    cursor: "pointer",
    border: `1px solid ${active ? WRAP_ACCENT : WRAP_BORDER}`,
    background: active ? WRAP_ACCENT : "transparent",
    color: active ? "#0B1220" : WRAP_TXT,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    fontSize: 14,
    padding: "8px 18px",
    borderRadius: 999,
    transition: "all .15s ease",
  });
  return (
    <div style={{ background: WRAP_BG, minHeight: "100vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "12px 20px",
          background: "rgba(15,23,42,0.88)",
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${WRAP_BORDER}`,
        }}
      >
        <span
          style={{
            color: WRAP_SUB,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: 1,
          }}
        >
          A5/A8 · Røring, lufttilførsel og reaktordesign
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={tabStyle(tab === "teori")} onClick={() => setTab("teori")}>
            Teori
          </button>
          <button style={tabStyle(tab === "quiz")} onClick={() => setTab("quiz")}>
            Eksempler &amp; Quiz
          </button>
        </div>
      </div>
      <div style={{ display: tab === "teori" ? "block" : "none" }}>
        <TeoriPage />
      </div>
      <div style={{ display: tab === "quiz" ? "block" : "none" }}>
        <EksemplerQuizPage />
      </div>
    </div>
  );
}
