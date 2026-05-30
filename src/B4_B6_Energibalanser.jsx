import React, { useState } from "react";
import { Beaker, BookOpen, Calculator, CheckCircle2, ChevronLeft, ChevronRight, Droplets, Flame, Layers, Link2, RotateCcw, Route, Snowflake, Table2, Target } from "lucide-react";

// ============================================================
//  IMAK2005 — B4–B6 · Energibalanser
//  Kombinert side: Teori + Eksempler & Quiz (klikkbare faner).
//  Begge delene er pakket i hver sin scope (IIFE) slik at de
//  delte hjelpe-komponentene ikke kolliderer.
// ============================================================

const WRAP_ACCENT = "#FBBF24";
const WRAP_BG = "#0F172A";
const WRAP_BORDER = "#334155";
const WRAP_TXT = "#F8FAFC";
const WRAP_SUB = "#94A3B8";

const TeoriPage = (() => {
// ============================================================
// IMAK2005 — Del B, Part 3 of 4: Energibalanser (Teori)
// B4 (F&R 7.1–7.4) + B5 (8.1–8.6) + B6 (9.1–9.5)
// Accent: #FBBF24
// ============================================================

const ACCENT = "#FBBF24";
const ACCENT_TEXT = "#fcd34d"; // readable on dark bg
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TXT = "#F8FAFC";
const TXT2 = "#94A3B8";

// ---- small reusable bits -----------------------------------

const Fag = ({ children }) => (
  <span
    style={{
      color: ACCENT_TEXT,
      background: "rgba(251,191,36,0.10)",
      borderLeft: `3px solid ${ACCENT}`,
      padding: "1px 7px",
      borderRadius: 4,
      fontWeight: 600,
    }}
  >
    {children}
  </span>
);

const Formula = ({ children, label }) => (
  <div style={{ margin: "14px 0" }}>
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        background: "#0b1220",
        border: `1px solid ${BORDER}`,
        borderRadius: 10,
        padding: "14px 18px",
        color: TXT,
        fontSize: 15.5,
        lineHeight: 1.7,
        overflowX: "auto",
      }}
    >
      {children}
    </div>
    {label && (
      <div style={{ color: TXT2, fontSize: 13, marginTop: 6, fontStyle: "italic" }}>{label}</div>
    )}
  </div>
);

const Card = ({ children, style }) => (
  <div
    style={{
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: 12,
      padding: 24,
      marginBottom: 22,
      ...style,
    }}
  >
    {children}
  </div>
);

const SectionTitle = ({ icon: Icon, n, children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
    <div
      style={{
        background: ACCENT,
        color: "#1a1300",
        width: 34,
        height: 34,
        borderRadius: 9,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon size={19} />
    </div>
    <h2
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 800,
        fontSize: 25,
        color: TXT,
        margin: 0,
      }}
    >
      {n && <span style={{ color: ACCENT_TEXT, marginRight: 8 }}>{n}.</span>}
      {children}
    </h2>
  </div>
);

const SubTitle = ({ tag, children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      margin: "26px 0 12px",
      paddingBottom: 8,
      borderBottom: `1px solid ${BORDER}`,
    }}
  >
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        fontWeight: 700,
        color: "#1a1300",
        background: ACCENT,
        padding: "2px 8px",
        borderRadius: 6,
      }}
    >
      {tag}
    </span>
    <h3
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: 19,
        color: ACCENT_TEXT,
        margin: 0,
      }}
    >
      {children}
    </h3>
  </div>
);

const P = ({ children }) => (
  <p style={{ color: TXT, fontSize: 16, lineHeight: 1.75, margin: "10px 0" }}>{children}</p>
);

const Note = ({ children, type = "info" }) => {
  const colors = {
    info: { b: "#38bdf8", bg: "rgba(56,189,248,0.08)" },
    warn: { b: "#fb923c", bg: "rgba(251,146,60,0.08)" },
    table: { b: ACCENT, bg: "rgba(251,191,36,0.08)" },
  }[type];
  return (
    <div
      style={{
        borderLeft: `4px solid ${colors.b}`,
        background: colors.bg,
        borderRadius: 8,
        padding: "12px 16px",
        margin: "14px 0",
        color: TXT,
        fontSize: 15,
        lineHeight: 1.65,
      }}
    >
      {children}
    </div>
  );
};

// ---- worked example block ----------------------------------
const Step = ({ n, title, children }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 5 }}>
      <span
        style={{
          background: "rgba(251,191,36,0.15)",
          color: ACCENT_TEXT,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          fontSize: 13,
          width: 24,
          height: 24,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {n}
      </span>
      <span style={{ color: TXT, fontWeight: 700, fontSize: 15.5 }}>{title}</span>
    </div>
    <div style={{ paddingLeft: 33, color: TXT2, fontSize: 15, lineHeight: 1.65 }}>{children}</div>
  </div>
);

// ============================================================
// SVG 1 — Energibalanse-oversikt (Q = ΔH)
// ============================================================
const EnergyBalanceSVG = () => (
  <svg viewBox="0 0 640 230" style={{ width: "100%", height: "auto", maxWidth: 640 }}>
    <defs>
      <marker id="arr" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
        <path d="M0,0 L9,4.5 L0,9 Z" fill={TXT2} />
      </marker>
      <marker id="arrA" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
        <path d="M0,0 L9,4.5 L0,9 Z" fill={ACCENT} />
      </marker>
    </defs>
    {/* prosessenhet */}
    <rect x="250" y="70" width="140" height="90" rx="10" fill="rgba(251,191,36,0.12)" stroke={ACCENT} strokeWidth="2" />
    <text x="320" y="120" fill={ACCENT_TEXT} fontSize="16" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans'">Prosessenhet</text>
    {/* inn */}
    <line x1="120" y1="115" x2="248" y2="115" stroke={TXT2} strokeWidth="2" markerEnd="url(#arr)" />
    <text x="125" y="105" fill={TXT} fontSize="14" fontFamily="'JetBrains Mono'">inn: ṅᵢ, Tᵢₙₙ</text>
    {/* ut */}
    <line x1="392" y1="115" x2="520" y2="115" stroke={TXT2} strokeWidth="2" markerEnd="url(#arr)" />
    <text x="430" y="105" fill={TXT} fontSize="14" fontFamily="'JetBrains Mono'">ut: ṅᵢ, Tᵤₜ</text>
    {/* Q */}
    <line x1="320" y1="160" x2="320" y2="205" stroke={ACCENT} strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrA)" />
    <text x="332" y="200" fill={ACCENT_TEXT} fontSize="18" fontWeight="700" fontFamily="'JetBrains Mono'">Q̇</text>
    {/* eq */}
    <text x="320" y="35" fill={TXT} fontSize="20" fontWeight="700" textAnchor="middle" fontFamily="'JetBrains Mono'">Q̇ = ΔḢ</text>
    <text x="320" y="55" fill={TXT2} fontSize="12.5" textAnchor="middle" fontFamily="'Source Sans 3'">(stasjonært, Ẇₛ = 0, ΔĖₖ ≈ ΔĖₚ ≈ 0)</text>
  </svg>
);

// ============================================================
// SVG 2 — Hypotetisk prosessvei (state function)
// ============================================================
const HypotheticalPathSVG = () => {
  const box = (x, y, label, sub, color) => (
    <g>
      <rect x={x} y={y} width="120" height="52" rx="9" fill={color} stroke={BORDER} strokeWidth="1.5" />
      <text x={x + 60} y={y + 22} fill={TXT} fontSize="13.5" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans'">{label}</text>
      <text x={x + 60} y={y + 40} fill={TXT2} fontSize="11.5" textAnchor="middle" fontFamily="'JetBrains Mono'">{sub}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" style={{ width: "100%", height: "auto", maxWidth: 660 }}>
      <defs>
        <marker id="p1" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 Z" fill="#ef4444" />
        </marker>
        <marker id="p2" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 Z" fill={ACCENT} />
        </marker>
      </defs>
      {/* direkte (rød) - what we want */}
      {box(40, 30, "Tilstand 1", "T₁, fase 1", "rgba(239,68,68,0.13)")}
      {box(500, 30, "Tilstand 2", "T₂, fase 2", "rgba(239,68,68,0.13)")}
      <line x1="160" y1="56" x2="500" y2="56" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#p1)" />
      <text x="330" y="44" fill="#f87171" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="'JetBrains Mono'">ΔĤ (ukjent, vanskelig)</text>

      {/* hypotetisk vei (gul) */}
      <line x1="100" y1="82" x2="100" y2="150" stroke={ACCENT} strokeWidth="2" markerEnd="url(#p2)" />
      <line x1="540" y1="150" x2="540" y2="82" stroke={ACCENT} strokeWidth="2" markerEnd="url(#p2)" />
      {box(40, 152, "varm/kjøl", "∫Cp dT", "rgba(251,191,36,0.10)")}
      {box(210, 152, "faseovergang", "±ΔHfus/vap", "rgba(251,191,36,0.10)")}
      {box(380, 152, "reaksjon", "ξ·ΔHr°", "rgba(251,191,36,0.10)")}
      {box(500, 152, "varm/kjøl", "∫Cp dT", "rgba(251,191,36,0.10)")}
      <line x1="160" y1="178" x2="208" y2="178" stroke={ACCENT} strokeWidth="2" markerEnd="url(#p2)" />
      <line x1="330" y1="178" x2="378" y2="178" stroke={ACCENT} strokeWidth="2" markerEnd="url(#p2)" />
      <line x1="500" y1="178" x2="502" y2="178" stroke={ACCENT} strokeWidth="2" />
      {/* trick: connect step3 to step4 */}
      <line x1="455" y1="178" x2="498" y2="178" stroke={ACCENT} strokeWidth="2" markerEnd="url(#p2)" />

      <text x="330" y="245" fill={ACCENT_TEXT} fontSize="15" fontWeight="700" textAnchor="middle" fontFamily="'JetBrains Mono'">ΔĤ = Σ ΔĤ(delsteg)</text>
      <text x="330" y="270" fill={TXT2} fontSize="13" textAnchor="middle" fontFamily="'Source Sans 3'">Entalpi er en tilstandsfunksjon → uavhengig av vei (Hess' lov)</text>
    </svg>
  );
};

// ============================================================
// FLASHCARD QUIZ
// ============================================================
const FLASHCARDS = [
  {
    q: "Hva forenkles den generelle energibalansen Q̇ − Ẇₛ = ΔḢ + ΔĖₖ + ΔĖₚ til for en typisk kjemisk prosessenhet, og hvilke antagelser brukes?",
    a: "Q̇ = ΔḢ.  Antagelser: stasjonær drift, ingen akselbeid (Ẇₛ = 0), og kinetisk + potensiell energi neglisjerbar (ΔĖₖ ≈ ΔĖₚ ≈ 0). Varmeleddet og entalpileddet dominerer.",
  },
  {
    q: "Forklar hvorfor vi kan dele en kompleks prosess opp i hypotetiske prosesstrinn for å beregne ΔĤ.",
    a: "Entalpi er en TILSTANDSFUNKSJON — endringen ΔĤ avhenger bare av start- og slutt­tilstand, ikke av veien mellom dem (Hess' lov). Vi kan derfor velge en kunstig, enkel vei (oppvarming → faseovergang → reaksjon → oppvarming) og summere: ΔĤ = Σ ΔĤ(delsteg).",
  },
  {
    q: "Skriv formelen for standard reaksjonsentalpi ΔHr° uttrykt ved standard dannelsesentalpier, og forklar fortegnet for eksoterm reaksjon.",
    a: "ΔHr° = Σ(νᵢ·ΔHf°)ₚᵣₒdᵤₖₜ − Σ(νᵢ·ΔHf°)ᵣₑₐₖₜₐₙₜ.  Eksoterm reaksjon: ΔHr° < 0 (frigjør varme). Endoterm: ΔHr° > 0 (krever varme).",
  },
  {
    q: "En adiabatisk blander mottar vanndamp ved 200 °C og 3 kg/s vann ved 15 °C, og leverer vann ved 85 °C. Cp,væske = 4,18, Cp,damp = 1,87 kJ/kg·K, ΔHvap = 2257 kJ/kg. Hvor mye damp m₁ trengs?",
    a: "Adiabatisk → Q = 0 → ΣṁĤ_inn = ṁĤ_ut. Velg referanse = væske 85 °C. Ĥ_damp = 4,18·15 + 2257 + 1,87·100 = 2506,7 kJ/kg. Ĥ_kaldtvann = 4,18·(15−85) = −292,6 kJ/kg. Balanse: m₁·2506,7 + 3·(−292,6) = 0 → m₁ ≈ 0,35 kg/s.",
  },
  {
    q: "Hva er forskjellen mellom reaksjonsentalpimetoden og dannelsesentalpimetoden?",
    a: "Begge gir samme Q, men velger ulik referansetilstand. Reaksjonsentalpimetoden: referanse = reaktanter/produkter ved 25 °C — du trenger ΔHr°. Dannelsesentalpimetoden: referanse = grunnstoffer (elementer) ved 25 °C — du trenger ΔHf° for hver komponent. Cp-verdier og faseovergangsentalpier inngår i BEGGE metodene.",
  },
  {
    q: "I dannelsesentalpimetoden: hvordan settes spesifikk entalpi Ĥᵢ opp for hver komponent, og hva er energibalansen?",
    a: "Ĥᵢ = ΔHf°,ᵢ + ∫₂₅→T Cp,ᵢ dT  (dannelse fra grunnstoffer ved 25 °C + sensibel oppvarming/kjøling til strømtemperatur). Energibalanse: Q = ΔḢ = Σ(ṅᵢĤᵢ)_ut − Σ(ṅᵢĤᵢ)_inn.",
  },
  {
    q: "Hvorfor får vi minustegn (fortegnsbytte) når vi regner ΔHr° fra forbrenningsentalpier ΔHc°?",
    a: "ΔHr° = Σ(νᵢ·ΔHc°)ᵣₑₐₖₜₐₙₜ − Σ(νᵢ·ΔHc°)ₚᵣₒdᵤₖₜ. Motsatt fortegn enn dannelses­formelen fordi ΔHc° beskriver forbrenning AV stoffet — produktene (CO₂, H₂O) er allerede 'forbrent' og bidrar med 0 (eller med sin egen ΔHc° hvis de kan forbrennes videre).",
  },
  {
    q: "Hvilke tabeller i formelsamlingen (F&R Appendiks B) bruker du til en reaktiv energibalanse, og hva inneholder de?",
    a: "B.1: standard dannelsesentalpier ΔHf° (kJ/mol). B.2: Cp-polynomer Cp = a + bT + cT² + dT³ (kJ/mol·°C). B.8: spesifikke entalpier Ĥ for gasser direkte (kJ/mol, ref. gass 1 atm, 25 °C) — sparer deg for å integrere Cp. B.5–B.7: damptabeller (Ĥ for vann/damp i kJ/kg).",
  },
];

const Flashcard = () => {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const go = (d) => {
    setFlipped(false);
    setTimeout(() => setI((p) => (p + d + FLASHCARDS.length) % FLASHCARDS.length), 120);
  };
  const c = FLASHCARDS[i];
  return (
    <div>
      <style>{`
        .imak-flip { perspective: 1600px; }
        .imak-inner { transition: transform 0.55s cubic-bezier(.4,.2,.2,1); transform-style: preserve-3d; position: relative; }
        .imak-inner.f { transform: rotateY(180deg); }
        .imak-face { position:absolute; inset:0; backface-visibility:hidden; -webkit-backface-visibility:hidden; display:flex; flex-direction:column; }
        .imak-back { transform: rotateY(180deg); }
        .imak-nav:hover { background:#475569 !important; }
        .imak-flip:hover .imak-hint { opacity:1; }
      `}</style>

      <div className="imak-flip" style={{ minHeight: 270 }} onClick={() => setFlipped((f) => !f)}>
        <div
          className={"imak-inner" + (flipped ? " f" : "")}
          style={{ minHeight: 270, cursor: "pointer" }}
        >
          {/* FRONT */}
          <div
            className="imak-face"
            style={{
              background: CARD,
              border: `2px solid ${ACCENT}`,
              borderRadius: 14,
              padding: 28,
              minHeight: 270,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: "#1a1300", background: ACCENT, padding: "3px 10px", borderRadius: 6, fontWeight: 700 }}>
                SPØRSMÅL
              </span>
              <span style={{ color: TXT2, fontSize: 13, fontFamily: "'JetBrains Mono'" }}>
                {i + 1} / {FLASHCARDS.length}
              </span>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <p style={{ color: TXT, fontSize: 17, lineHeight: 1.6, margin: 0 }}>{c.q}</p>
            </div>
            <div className="imak-hint" style={{ color: TXT2, fontSize: 12.5, textAlign: "center", opacity: 0.55, transition: "opacity .3s" }}>
              Klikk for å snu kortet
            </div>
          </div>

          {/* BACK */}
          <div
            className="imak-face imak-back"
            style={{
              background: "#172033",
              border: `2px solid ${ACCENT_TEXT}`,
              borderRadius: 14,
              padding: 28,
              minHeight: 270,
            }}
          >
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: ACCENT_TEXT, background: "rgba(251,191,36,0.12)", padding: "3px 10px", borderRadius: 6, fontWeight: 700, border: `1px solid ${ACCENT}` }}>
                SVAR
              </span>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <p style={{ color: TXT, fontSize: 15.5, lineHeight: 1.65, margin: 0, fontFamily: c.a.match(/[ΔΣ∫]/) ? "'Source Sans 3'" : "'Source Sans 3'" }}>{c.a}</p>
            </div>
          </div>
        </div>
      </div>

      {/* nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, justifyContent: "center" }}>
        <button
          className="imak-nav"
          onClick={() => go(-1)}
          style={{ display: "flex", alignItems: "center", gap: 6, background: BORDER, color: TXT, border: "none", borderRadius: 9, padding: "10px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}
        >
          <ChevronLeft size={17} /> Forrige
        </button>
        <button
          className="imak-nav"
          onClick={() => { setFlipped(false); setTimeout(() => setI(0), 120); }}
          style={{ display: "flex", alignItems: "center", gap: 6, background: BORDER, color: TXT2, border: "none", borderRadius: 9, padding: "10px 14px", cursor: "pointer", fontSize: 13 }}
        >
          <RotateCcw size={15} />
        </button>
        <button
          className="imak-nav"
          onClick={() => go(1)}
          style={{ display: "flex", alignItems: "center", gap: 6, background: BORDER, color: TXT, border: "none", borderRadius: 9, padding: "10px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}
        >
          Neste <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};

// ============================================================
// MAIN
// ============================================================
function EnergibalanserTeori() {
  return (
    <div style={{ background: BG, minHeight: "100vh", padding: "0 0 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 22px", fontFamily: "'Source Sans 3', sans-serif" }}>

        {/* ===== HEADER ===== */}
        <div style={{ paddingTop: 48, paddingBottom: 8 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ background: ACCENT, color: "#1a1300", fontFamily: "'JetBrains Mono'", fontWeight: 700, fontSize: 13, padding: "4px 12px", borderRadius: 7 }}>
              Del B · Kjemisk prosessteknologi
            </span>
            <span style={{ border: `1px solid ${ACCENT}`, color: ACCENT_TEXT, fontFamily: "'JetBrains Mono'", fontWeight: 700, fontSize: 13, padding: "4px 12px", borderRadius: 7 }}>
              B4 / B5 / B6
            </span>
            <span style={{ color: TXT2, fontSize: 13, fontFamily: "'JetBrains Mono'" }}>Part 3 av 4 · F&R kap. 7–9</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 44, color: TXT, margin: "0 0 10px", lineHeight: 1.1 }}>
            Energibalanser <span style={{ color: ACCENT_TEXT }}>— Teori</span>
          </h1>
          <p style={{ color: TXT2, fontSize: 18, margin: 0, lineHeight: 1.5 }}>
            Entalpi, faseovergang, hypotetiske prosesstrinn og reaksjonsvarme.
          </p>
          <Note type="warn">
            <strong>Forutsetning:</strong> Du må mestre massebalanser (B1–B3) før dette. Strømmene
            ṅᵢ fra massebalansen er <em>input</em> til energibalansen.
          </Note>
        </div>

        {/* ===== 1. LÆRINGSMÅL ===== */}
        <Card>
          <SectionTitle icon={Target} n="1">Læringsmål</SectionTitle>
          <P>
            Studenten kan <Fag>beskrive og forklare hvordan energibalanser beregnes</Fag>, og kan
            utføre <Fag>kvantitative beregninger i et kjemisk stasjonært system</Fag>, både med og
            uten reaktor.
          </P>
        </Card>

        {/* ===== 2. TEORI ===== */}
        <SectionTitle icon={BookOpen} n="2">Teori</SectionTitle>

        {/* -------- DEL I -------- */}
        <Card>
          <SubTitle tag="B4">Del I — Energibalanser uten reaksjon (F&R 7.1–7.4)</SubTitle>

          <P>
            Vi starter fra den <Fag>generelle energibalanseligninga</Fag> for et åpent system. Den
            kommer fra det generelle balanseprinsippet med B = total energi E:
          </P>
          <Formula label="Generell energibalanse for et åpent system. Q̇ > 0 = varme TILFØRT systemet, Ẇₛ = akselarbeid (rotasjon, pumpe …).">
            Q̇ − Ẇₛ = ΔḢ + ΔĖₖ + ΔĖₚ
          </Formula>

          <P>
            For de aller fleste kjemiske prosesser gjør vi tre forenklinger: stasjonær drift, ingen
            akselarbeid (<Fag>Ẇₛ = 0</Fag>), og kinetisk/potensiell energi er neglisjerbar
            (<Fag>ΔĖₖ ≈ ΔĖₚ ≈ 0</Fag>). Da kollapser hele ligninga til ett ledd — varmeleddet
            balanserer entalpiendringen:
          </P>

          <EnergyBalanceSVG />

          <Note>
            Dette er <strong>kjernen</strong> i hele Del B-energidelen: nesten hver oppgave reduseres
            til <strong>Q = ΔH</strong>. Jobben din blir å regne ut ΔH for prosessen.
          </Note>

          <P>
            <Fag>Entalpi</Fag> er en funksjon av tilstand: H = f(T, P, fase, sammensetning). Vi kan
            ikke måle absolutt entalpi, så vi velger en <Fag>referansetilstand</Fag> (T_ref, P_ref,
            fase_ref) og regner alle entalpier <em>relativt</em> til den. Som regel: gass ved 1 atm,
            25 °C, eller grunnstoffene ved 25 °C (i reaktive systemer).
          </P>

          <P><strong style={{ color: ACCENT_TEXT }}>Sensibel varme (temperaturendring):</strong></P>
          <Formula label="Cp-polynom (F&R Form 1). a, b, c, d slås opp i tabell. Husk: T i °C eller K må matche tabellen.">
            ΔĤ = ∫ Cp dT ,   Cp = a + bT + cT² + dT³
          </Formula>

          <P><strong style={{ color: ACCENT_TEXT }}>Faseoverganger (skjer ved konstant T):</strong></P>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, margin: "12px 0" }}>
            {[
              ["Smelting", "ΔĤfus", "fast → væske"],
              ["Fordampning", "ΔĤvap", "væske → gass"],
              ["Sublimering", "ΔĤsub", "fast → gass"],
            ].map(([t, s, d]) => (
              <div key={t} style={{ background: "#0b1220", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Snowflake size={15} color={ACCENT} />
                  <span style={{ color: TXT, fontWeight: 700 }}>{t}</span>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono'", color: ACCENT_TEXT, fontSize: 15, marginTop: 6 }}>{s}</div>
                <div style={{ color: TXT2, fontSize: 13, marginTop: 2 }}>{d}</div>
              </div>
            ))}
          </div>
          <Note type="warn">
            <Fag>ΔĤvap</Fag> avhenger av temperatur. Tabellverdier oppgis ofte ved kokepunktet (f.eks.
            vann: 40,66 kJ/mol = 2257 kJ/kg ved 100 °C). Skal du fordampe ved annen T, bygg en
            hypotetisk vei (se Del II).
          </Note>

          <P><strong style={{ color: ACCENT_TEXT }}>Blandingsvarme:</strong></P>
          <P>
            Når stoffer blandes endres entalpien — <Fag>blandingsvarme ΔĤmix (fortynning)</Fag>.
            Viktigst for sterke syrer/baser i vann (f.eks. H₂SO₄ + H₂O frigjør mye varme). For
            ideelle blandinger settes ΔĤmix ≈ 0.
          </P>

          <Note type="table">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <Table2 size={17} color={ACCENT} /> <strong>Tabeller på eksamen (F&R Appendiks B)</strong>
            </div>
            <ul style={{ margin: "4px 0 0", paddingLeft: 20, lineHeight: 1.7 }}>
              <li><strong>Tabell B.2</strong> — Cp-polynomer (a, b, c, d), kJ/mol·°C.</li>
              <li><strong>Tabell B.8</strong> — spesifikke entalpier Ĥ for gasser <em>direkte</em> (kJ/mol, ref. gass 1 atm, 25 °C). Sparer deg for å integrere Cp!</li>
              <li><strong>Tabell B.5–B.7</strong> — damptabeller for vann (Ĥ i kJ/kg, mettet + overopphetet damp).</li>
            </ul>
          </Note>
        </Card>

        {/* -------- DEL II -------- */}
        <Card>
          <SubTitle tag="B5">Del II — Hypotetiske prosesstrinn (F&R 8.1–8.6)</SubTitle>

          <P>
            <Fag>Entalpi er en tilstandsfunksjon</Fag> → ΔĤ er <Fag>uavhengig av prosessveien</Fag>.
            Dette er <Fag>Hess' lov</Fag>: vi kan erstatte den virkelige (ofte umulige å regne på)
            prosessen med en kunstig <Fag>hypotetisk prosessvei</Fag> av enkle trinn, og bare summere:
          </P>
          <Formula>ΔĤ_total = Σ ΔĤ(delsteg)</Formula>

          <HypotheticalPathSVG />

          <P>En typisk hypotetisk vei (referansetemperatur ofte 25 °C):</P>
          <ol style={{ color: TXT, fontSize: 16, lineHeight: 1.85, paddingLeft: 22 }}>
            <li>Varm/kjøl reaktantene til referansetemperatur (∫Cp dT)</li>
            <li>Faseovergang ved riktig temperatur (±ΔĤfus / ΔĤvap)</li>
            <li>Bland/skill komponenter (ΔĤmix)</li>
            <li>Reaksjon ved referansetemperatur (ξ·ΔHr°)</li>
            <li>Varm/kjøl produktene til sluttemperatur (∫Cp dT)</li>
            <li>Faseovergang om nødvendig</li>
          </ol>

          <Note>
            <strong>Praktisk grep:</strong> Tegn et lite prosessvei-diagram. Skriv tilstanden (fase, T,
            P) i hver boks. Regn ΔĤ for hver pil. Summer. Multipliser med molstrømmen ṅ for hver
            komponent og legg sammen for å få Q̇.
          </Note>
        </Card>

        {/* -------- DEL III -------- */}
        <Card>
          <SubTitle tag="B6">Del III — Reaktive energibalanser (F&R 9.1–9.5)</SubTitle>

          <P>
            Kjemiske reaksjoner bryter og danner bindinger → stor energioverføring. Reaksjoner som
            frigjør energi er <Fag>eksoterme (ΔHr° &lt; 0)</Fag>; de som krever energi er
            <Fag>endoterme (ΔHr° &gt; 0)</Fag>. Entalpiendringene er normalt store og gir strenge
            krav til kjøling/oppvarming.
          </P>

          <P><strong style={{ color: ACCENT_TEXT }}>Standard reaksjonsentalpi fra dannelsesentalpier:</strong></P>
          <P>
            <Fag>Standard dannelsesentalpi ΔHf°</Fag> = entalpien for å danne 1 mol av et stoff fra
            grunnstoffene i standardtilstand (25 °C, 1 atm). Grunnstoffer har per definisjon ΔHf° = 0.
          </P>
          <Formula label="νᵢ = støkiometrisk koeffisient. Summér produkter minus reaktanter.">
            ΔHr° = Σ(νᵢ·ΔHf°)ₚᵣₒdᵤₖₜ − Σ(νᵢ·ΔHf°)ᵣₑₐₖₜₐₙₜ
          </Formula>

          <P><strong style={{ color: ACCENT_TEXT }}>Fra forbrenningsentalpier:</strong></P>
          <P>
            <Fag>Standard forbrenningsentalpi ΔHc°</Fag> = entalpi ved fullstendig forbrenning av 1 mol
            stoff. Merk <Fag>fortegnsbyttet</Fag> i forhold til dannelsesformelen:
          </P>
          <Formula>ΔHr° = Σ(νᵢ·ΔHc°)ᵣₑₐₖₜₐₙₜ − Σ(νᵢ·ΔHc°)ₚᵣₒdᵤₖₜ</Formula>

          <P><strong style={{ color: ACCENT_TEXT }}>Reaksjonsvarme ved annen temperatur (Kirchhoffs lov):</strong></P>
          <Formula label="I praksis håndteres dette i kurset via hypotetiske trinn: kjøl reaktanter til 25 °C, reager, varm produkter til T.">
            ΔHr(T) = ΔHr° + ∫₂₅→T ΔCp dT ,   ΔCp = Σν Cp(prod) − Σν Cp(react)
          </Formula>

          <P><strong style={{ color: ACCENT_TEXT }}>To metoder for å inkludere reaksjonsvarme:</strong></P>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 14, margin: "14px 0" }}>
            <div style={{ background: "#0b1220", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
              <div style={{ color: ACCENT_TEXT, fontWeight: 700, marginBottom: 6 }}>① Reaksjonsentalpimetoden</div>
              <div style={{ color: TXT2, fontSize: 14.5, lineHeight: 1.6 }}>
                Referanse = reaktanter/produkter ved 25 °C. Trenger <strong>ΔHr°</strong>. Egnet for én/få reaksjoner med kjent ΔHr°.
              </div>
            </div>
            <div style={{ background: "#0b1220", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
              <div style={{ color: ACCENT_TEXT, fontWeight: 700, marginBottom: 6 }}>② Dannelsesentalpimetoden</div>
              <div style={{ color: TXT2, fontSize: 14.5, lineHeight: 1.6 }}>
                Referanse = grunnstoffer ved 25 °C. Trenger <strong>ΔHf°</strong> for hver komponent. Egnet for flere reaksjoner samtidig (eksamensfavoritt).
              </div>
            </div>
          </div>
          <Note type="warn">
            Begge gir <strong>samme Q</strong>. <Fag>Cp-verdier og faseovergangsentalpier inngår i
            BEGGE metodene</Fag> (for å flytte strømmer fra/til 25 °C-referansen).
          </Note>

          <P><strong style={{ color: ACCENT_TEXT }}>Energibalanse med reaksjon (dannelsesentalpimetoden):</strong></P>
          <Formula label="Ĥᵢ = ΔHf°,ᵢ + ∫25→T Cp,ᵢ dT (eller Ĥ direkte fra tabell B.8 for gasser).">
            Q̇ = ΔḢ = Σ(ṅᵢ·Ĥᵢ)_ut − Σ(ṅᵢ·Ĥᵢ)_inn
          </Formula>

          <Note type="table">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <Table2 size={17} color={ACCENT} /> <strong>Tabeller for reaktive energibalanser</strong>
            </div>
            <ul style={{ margin: "4px 0 0", paddingLeft: 20, lineHeight: 1.7 }}>
              <li><strong>Tabell B.1</strong> — standard dannelsesentalpier ΔHf° (kJ/mol).</li>
              <li><strong>Tabell B.2</strong> — Cp-polynomer for sensibel varme.</li>
              <li><strong>Tabell B.8</strong> — spesifikke entalpier Ĥ for gasser (kJ/mol) ved ulike T. Bruk denne i stedet for å integrere Cp på eksamen.</li>
            </ul>
          </Note>
        </Card>

        {/* ===== 3. EKSEMPLER ===== */}
        <SectionTitle icon={Calculator} n="3">Eksempler</SectionTitle>

        {/* Eksempel 1 */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ background: "rgba(251,191,36,0.15)", color: ACCENT_TEXT, fontFamily: "'JetBrains Mono'", fontWeight: 700, fontSize: 12, padding: "3px 9px", borderRadius: 6 }}>B4</span>
            <strong style={{ color: TXT, fontSize: 17 }}>Adiabatisk damp-innblåsing (V2025-stil)</strong>
          </div>
          <P>
            Vanndamp ved 200 °C (strøm 1) blandes med ṁ₂ = 3 kg/s vann ved 15 °C (strøm 2) for å lage
            vann ved 85 °C (strøm 3). Cp,væske = 4,18 kJ/kg·K, Cp,damp = 1,87 kJ/kg·K, ΔĤvap(100 °C) =
            2257 kJ/kg. Finn ṁ₁.
          </P>
          <Step n="1" title="Forenkle energibalansen">
            Adiabatisk → Q = 0. Ẇₛ = 0, ΔĖₖ = ΔĖₚ = 0 → ΔḢ = 0 → <strong>Σ(ṁĤ)_inn = Σ(ṁĤ)_ut</strong>.
          </Step>
          <Step n="2" title="Massebalanse">
            ṁ₃ = ṁ₁ + ṁ₂ = ṁ₁ + 3.
          </Step>
          <Step n="3" title="Velg referanse = væske ved 85 °C">
            Da blir Ĥ₃ = 0 (produktet er på referansen).
          </Step>
          <Step n="4" title="Spesifikke entalpier (bygg fra referansen)">
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 14, lineHeight: 1.8, color: TXT }}>
              Ĥ_damp = 4,18·(100−85) + 2257 + 1,87·(200−100)<br />
              &nbsp;&nbsp;= 62,7 + 2257 + 187 = <span style={{ color: ACCENT_TEXT }}>2506,7 kJ/kg</span><br />
              Ĥ_kaldtvann = 4,18·(15−85) = <span style={{ color: ACCENT_TEXT }}>−292,6 kJ/kg</span>
            </div>
          </Step>
          <Step n="5" title="Løs energibalansen">
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 14, lineHeight: 1.8, color: TXT }}>
              ṁ₁·2506,7 + 3·(−292,6) = ṁ₃·0 = 0<br />
              ṁ₁ = 877,8 / 2506,7 ≈ <span style={{ color: ACCENT_TEXT, fontWeight: 700 }}>0,35 kg/s</span>
            </div>
          </Step>
        </Card>

        {/* Eksempel 2 */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ background: "rgba(251,191,36,0.15)", color: ACCENT_TEXT, fontFamily: "'JetBrains Mono'", fontWeight: 700, fontSize: 12, padding: "3px 9px", borderRadius: 6 }}>B5</span>
            <strong style={{ color: TXT, fontSize: 17 }}>Hypotetisk vei med faseovergang</strong>
          </div>
          <P>
            Finn ΔĤ for å varme 1 mol vann fra væske ved 25 °C til damp ved 150 °C (1 atm). Tb = 100 °C.
            Cp,væske ≈ 0,0754 kJ/mol·°C, Cp,damp ≈ 0,03346 + 0,688·10⁻⁵·T (kJ/mol·°C), ΔĤvap = 40,66 kJ/mol.
          </P>
          <Step n="1" title="Sensibel oppvarming væske 25 → 100 °C">
            <span style={{ fontFamily: "'JetBrains Mono'" }}>ΔĤ₁ = 0,0754·(100−25) = 5,66 kJ/mol</span>
          </Step>
          <Step n="2" title="Fordampning ved 100 °C">
            <span style={{ fontFamily: "'JetBrains Mono'" }}>ΔĤ₂ = ΔĤvap = 40,66 kJ/mol</span>
          </Step>
          <Step n="3" title="Sensibel oppvarming damp 100 → 150 °C">
            <span style={{ fontFamily: "'JetBrains Mono'" }}>ΔĤ₃ = ∫₁₀₀¹⁵⁰ Cp dT = 0,03346·50 + 0,688·10⁻⁵·(150²−100²)/2 ≈ 1,72 kJ/mol</span>
          </Step>
          <Step n="4" title="Summér (Hess' lov)">
            <span style={{ fontFamily: "'JetBrains Mono'", color: ACCENT_TEXT, fontWeight: 700 }}>ΔĤ = 5,66 + 40,66 + 1,72 ≈ 48,0 kJ/mol</span>
          </Step>
        </Card>

        {/* Eksempel 3 */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ background: "rgba(251,191,36,0.15)", color: ACCENT_TEXT, fontFamily: "'JetBrains Mono'", fontWeight: 700, fontSize: 12, padding: "3px 9px", borderRadius: 6 }}>B6</span>
            <Flame size={18} color={ACCENT} />
            <strong style={{ color: TXT, fontSize: 17 }}>Forbrenningsreaktor — dannelsesentalpimetoden</strong>
          </div>
          <P>
            Propan brennes: C₃H₈(g) + 5 O₂(g) → 3 CO₂(g) + 4 H₂O(damp). Inn: 100 mol/s C₃H₈ ved 25 °C
            + 600 mol/s O₂ og 2256 mol/s N₂ ved 300 °C. Ut ved 1000 °C: 100 O₂, 2256 N₂, 300 CO₂,
            400 H₂O(damp) (mol/s). Finn Q̇.
          </P>
          <Step n="1" title="Metode + referanse">
            Dannelsesentalpimetoden, referanse = grunnstoffer ved 25 °C. Q̇ = Σ(ṅĤ)_ut − Σ(ṅĤ)_inn,
            der Ĥᵢ = ΔHf°,ᵢ + Ĥ_sensibel(T) (sensibel del fra <strong>Tabell B.8</strong>).
          </Step>
          <Step n="2" title="Data (Tabell B.1 og B.8)">
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 13.5, lineHeight: 1.75, color: TXT }}>
              ΔHf°: C₃H₈ = −103,8 · CO₂ = −393,5 · H₂O(g) = −241,83 · O₂ = N₂ = 0 (kJ/mol)<br />
              Ĥ @300 °C: O₂ 8,47 · N₂ 8,12 · &nbsp; Ĥ @1000 °C: O₂ 32,47 · N₂ 30,56 · CO₂ 48,60 · H₂O 37,69
            </div>
          </Step>
          <Step n="3" title="Entalpi inn">
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 13.5, lineHeight: 1.75, color: TXT }}>
              C₃H₈: 100·(−103,8) = −10380<br />
              O₂:&nbsp; 600·(0+8,47) = 5082<br />
              N₂:&nbsp; 2256·(0+8,12) = 18319<br />
              Σ_inn = <span style={{ color: ACCENT_TEXT }}>13021 kJ/s</span>
            </div>
          </Step>
          <Step n="4" title="Entalpi ut">
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 13.5, lineHeight: 1.75, color: TXT }}>
              O₂:&nbsp; 100·(0+32,47) = 3247<br />
              N₂:&nbsp; 2256·(0+30,56) = 68943<br />
              CO₂: 300·(−393,5+48,60) = −103470<br />
              H₂O: 400·(−241,83+37,69) = −81656<br />
              Σ_ut = <span style={{ color: ACCENT_TEXT }}>−112936 kJ/s</span>
            </div>
          </Step>
          <Step n="5" title="Resultat">
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 14, lineHeight: 1.8, color: TXT }}>
              Q̇ = −112936 − 13021 = <span style={{ color: ACCENT_TEXT, fontWeight: 700 }}>≈ −1,26·10⁵ kJ/s (−126 MW)</span>
            </div>
            <div style={{ color: TXT2, fontSize: 14, marginTop: 6 }}>
              Q̇ &lt; 0 → varme må <strong>fjernes</strong> — sterkt eksoterm forbrenning. ✓
            </div>
          </Step>
        </Card>

        {/* ===== 4. VIKTIGE SAMMENHENGER ===== */}
        <Card>
          <SectionTitle icon={Link2} n="4">Viktige sammenhenger</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["B1 / B2 / B3", "#22D3EE", "Massebalansen MÅ løses først. Strømmene ṅᵢ (og ξ fra reaktive balanser, B3) er direkte input til energibalansen. Uten kjente strømmer kan du ikke regne ΔH."],
              ["B5 → B6", ACCENT, "Hypotetiske prosesstrinn (B5) er verktøyet du bruker for å bygge opp den reaktive energibalansen (B6): kjøl til 25 °C → reager → varm til T."],
              ["A4", "#06B6D4", "Bio-massebalanse og støkiometri — konseptuelt likt oppsett (inn = ut + akkumulering + reaksjon), bare med biologiske strømmer og utbyttekoeffisienter."],
            ].map(([code, col, txt]) => (
              <div key={code} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#0b1220", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 14 }}>
                <span style={{ background: col, color: "#0b1220", fontFamily: "'JetBrains Mono'", fontWeight: 700, fontSize: 13, padding: "4px 10px", borderRadius: 7, whiteSpace: "nowrap" }}>{code}</span>
                <span style={{ color: TXT, fontSize: 15, lineHeight: 1.6 }}>{txt}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* ===== 5. QUIZ ===== */}
        <Card style={{ paddingBottom: 30 }}>
          <SectionTitle icon={Layers} n="5">Quiz — flashcards</SectionTitle>
          <P>Klikk kortet for å snu. Blandet konseptuelt + beregning, inspirert av eksamen V2023–V2025.</P>
          <Flashcard />
        </Card>

        <div style={{ textAlign: "center", color: TXT2, fontSize: 13, marginTop: 30, fontFamily: "'JetBrains Mono'" }}>
          IMAK2005 · Del B · Energibalanser (B4/B5/B6) · Part 3 av 4
        </div>
      </div>
    </div>
  );
}


return EnergibalanserTeori;
})();

const EksemplerQuizPage = (() => {
// ============================================================
// IMAK2005 — Del B, Part 4 of 4
// Energibalanser — EKSEMPLER OG QUIZ  (B4/B5/B6)
// Accent: #FBBF24
// ============================================================

const ACCENT = "#FBBF24";
const ACCENT_TEXT = "#fcd34d";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TXT = "#F8FAFC";
const TXT2 = "#94A3B8";
const MONO = "'JetBrains Mono', monospace";

// ---------- reusable bits ----------
const Fag = ({ children }) => (
  <span style={{ color: ACCENT_TEXT, background: "rgba(251,191,36,0.10)", borderLeft: `3px solid ${ACCENT}`, padding: "1px 7px", borderRadius: 4, fontWeight: 600 }}>
    {children}
  </span>
);

const Card = ({ children, style }) => (
  <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, marginBottom: 22, ...style }}>{children}</div>
);

const P = ({ children }) => <p style={{ color: TXT, fontSize: 16, lineHeight: 1.75, margin: "10px 0" }}>{children}</p>;

const Mono = ({ children, hl }) => (
  <div style={{ fontFamily: MONO, background: "#0b1220", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px", color: TXT, fontSize: 14.5, lineHeight: 1.8, overflowX: "auto", margin: "10px 0" }}>
    {children}
  </div>
);

const Note = ({ children, type = "info" }) => {
  const c = { info: { b: "#38bdf8", bg: "rgba(56,189,248,0.08)" }, warn: { b: "#fb923c", bg: "rgba(251,146,60,0.08)" }, table: { b: ACCENT, bg: "rgba(251,191,36,0.08)" }, good: { b: "#34d399", bg: "rgba(52,211,153,0.08)" } }[type];
  return <div style={{ borderLeft: `4px solid ${c.b}`, background: c.bg, borderRadius: 8, padding: "12px 16px", margin: "14px 0", color: TXT, fontSize: 15, lineHeight: 1.65 }}>{children}</div>;
};

const Step = ({ n, title, children }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 5 }}>
      <span style={{ background: "rgba(251,191,36,0.15)", color: ACCENT_TEXT, fontFamily: MONO, fontWeight: 700, fontSize: 13, width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</span>
      <span style={{ color: TXT, fontWeight: 700, fontSize: 15.5 }}>{title}</span>
    </div>
    <div style={{ paddingLeft: 33, color: TXT2, fontSize: 15, lineHeight: 1.65 }}>{children}</div>
  </div>
);

const Answer = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(52,211,153,0.08)", border: "1px solid #34d399", borderRadius: 10, padding: "12px 16px", marginTop: 10 }}>
    <CheckCircle2 size={20} color="#34d399" style={{ flexShrink: 0 }} />
    <span style={{ color: TXT, fontFamily: MONO, fontSize: 15, fontWeight: 700 }}>{children}</span>
  </div>
);

const ExampleHeader = ({ tag, icon: Icon, title }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
    <span style={{ background: ACCENT, color: "#1a1300", fontFamily: MONO, fontWeight: 700, fontSize: 12, padding: "3px 10px", borderRadius: 6 }}>{tag}</span>
    <Icon size={19} color={ACCENT} />
    <strong style={{ color: TXT, fontSize: 18 }}>{title}</strong>
  </div>
);

const TableRef = ({ children }) => (
  <Note type="table">
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
      <Table2 size={17} color={ACCENT} style={{ marginTop: 2, flexShrink: 0 }} />
      <div>{children}</div>
    </div>
  </Note>
);

// ============================================================
// Reusable PATH diagram (states + step arrows)
// states: [{label, sub}] ; steps: [string]
// ============================================================
const PathDiagram = ({ states, steps, caption }) => {
  const n = states.length;
  const W = 700;
  const boxW = 96;
  const gap = (W - boxW * n) / (n - 1);
  return (
    <svg viewBox={`0 0 ${W} 150`} style={{ width: "100%", height: "auto", maxWidth: W }}>
      <defs>
        <marker id="pa" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 Z" fill={ACCENT} />
        </marker>
      </defs>
      {states.map((s, i) => {
        const x = i * (boxW + gap);
        return (
          <g key={i}>
            <rect x={x} y={45} width={boxW} height={50} rx={9} fill="rgba(251,191,36,0.10)" stroke={ACCENT} strokeWidth="1.5" />
            <text x={x + boxW / 2} y={66} fill={TXT} fontSize="12.5" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans'">{s.label}</text>
            <text x={x + boxW / 2} y={83} fill={TXT2} fontSize="11" textAnchor="middle" fontFamily={MONO}>{s.sub}</text>
            {i < n - 1 && (
              <>
                <line x1={x + boxW} y1={70} x2={x + boxW + gap} y2={70} stroke={ACCENT} strokeWidth="2" markerEnd="url(#pa)" />
                <text x={x + boxW + gap / 2} y={36} fill={ACCENT_TEXT} fontSize="11" fontWeight="700" textAnchor="middle" fontFamily={MONO}>{steps[i]}</text>
              </>
            )}
          </g>
        );
      })}
      {caption && <text x={W / 2} y={130} fill={TXT2} fontSize="12.5" textAnchor="middle" fontFamily="'Source Sans 3'">{caption}</text>}
    </svg>
  );
};

// Flow diagram (inn / boks / ut / Q)
const FlowDiagram = ({ inn, ut, box }) => (
  <svg viewBox="0 0 660 210" style={{ width: "100%", height: "auto", maxWidth: 660 }}>
    <defs>
      <marker id="fa" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill={TXT2} /></marker>
      <marker id="fq" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill={ACCENT} /></marker>
    </defs>
    <rect x="265" y="60" width="130" height="80" rx="10" fill="rgba(251,191,36,0.12)" stroke={ACCENT} strokeWidth="2" />
    <text x="330" y="105" fill={ACCENT_TEXT} fontSize="15" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans'">{box}</text>
    <line x1="120" y1="100" x2="263" y2="100" stroke={TXT2} strokeWidth="2" markerEnd="url(#fa)" />
    {inn.map((t, i) => <text key={i} x="124" y={80 + i * 16} fill={TXT} fontSize="12.5" fontFamily={MONO}>{t}</text>)}
    <line x1="397" y1="100" x2="540" y2="100" stroke={TXT2} strokeWidth="2" markerEnd="url(#fa)" />
    {ut.map((t, i) => <text key={i} x="430" y={80 + i * 16} fill={TXT} fontSize="12.5" fontFamily={MONO}>{t}</text>)}
    <line x1="330" y1="140" x2="330" y2="185" stroke={ACCENT} strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#fq)" />
    <text x="343" y="180" fill={ACCENT_TEXT} fontSize="17" fontWeight="700" fontFamily={MONO}>Q̇</text>
  </svg>
);

// ============================================================
// FLASHCARDS (min 8)
// ============================================================
const FLASHCARDS = [
  {
    q: "Hva er en referansetilstand, og hvorfor velger vi den?",
    a: "Vi kan ikke måle absolutt entalpi, bare ENDRINGER. Referansetilstanden (T_ref, P_ref, fase_ref) er nullpunktet alle entalpier måles relativt til. Vi velger den fritt — gjerne en tilstand som gjør regningen enkel (f.eks. der en strøm allerede ligger, eller 25 °C for reaktive systemer). Resultatet (Q) er uavhengig av valget.",
  },
  {
    q: "Skriv formelen for ΔHr° fra standard dannelsesentalpier.",
    a: "ΔHr° = Σ(νᵢ·ΔHf°)ₚᵣₒdᵤₖₜ − Σ(νᵢ·ΔHf°)ᵣₑₐₖₜₐₙₜ.  νᵢ = støkiometrisk koeffisient. Grunnstoffer har ΔHf° = 0.",
  },
  {
    q: "Hva er forskjellen mellom ΔHf° og ΔHc°?",
    a: "ΔHf° (dannelsesentalpi) = entalpi for å DANNE 1 mol stoff fra grunnstoffene (25 °C, 1 atm). ΔHc° (forbrenningsentalpi) = entalpi for å FORBRENNE 1 mol stoff fullstendig (til CO₂ + H₂O). De gir to ulike veier til samme ΔHr°.",
  },
  {
    q: "Beregn ΔHr° for CH₄ + 2O₂ → CO₂ + 2H₂O(g). Gitt ΔHf° (kJ/mol): CH₄ −74,85, CO₂ −393,5, H₂O(g) −241,83, O₂ 0.",
    a: "ΔHr° = [(−393,5) + 2·(−241,83)] − [(−74,85) + 2·0] = −877,16 + 74,85 = −802,3 kJ/mol. Eksoterm (frigjør varme).",
  },
  {
    q: "Hva sier Kirchhoffs lov?",
    a: "Reaksjonsentalpien endrer seg med temperatur: ΔHr(T) = ΔHr° + ∫₂₅→T ΔCp dT, der ΔCp = Σν·Cp(produkter) − Σν·Cp(reaktanter). I praksis håndteres dette via hypotetiske trinn: kjøl reaktanter til 25 °C, reager, varm produkter til T.",
  },
  {
    q: "Tegn en hypotetisk prosessvei for oppvarming av is fra −10 °C til damp ved 150 °C (1 atm).",
    a: "5 trinn: (1) varm is −10→0 °C [Cp,is]; (2) smelt ved 0 °C [+ΔHfus]; (3) varm væske 0→100 °C [Cp,væske]; (4) fordamp ved 100 °C [+ΔHvap]; (5) varm damp 100→150 °C [Cp,damp]. ΔĤ = sum av alle fem.",
  },
  {
    q: "Eksoterm reaksjon: er ΔHr positiv eller negativ? Hva betyr det for Q?",
    a: "Eksoterm → ΔHr < 0 (frigjør varme). I en isoterm reaktor må denne varmen FJERNES, så Q < 0 (varme ut av systemet). Endoterm → ΔHr > 0, Q > 0 (varme må tilføres).",
  },
  {
    q: "Hvorfor er fortegnskonvensjonen viktig i energibalanser?",
    a: "Konvensjonen i kurset (F&R): Q̇ − Ẇₛ = ΔḢ + … der Q > 0 betyr varme TILFØRT systemet. Et positivt svar ⇒ du må VARME prosessen; negativt svar ⇒ du må KJØLE. Bytter du fortegn feil et sted (f.eks. ut−inn vs inn−ut), snur hele konklusjonen — derfor må du være konsekvent.",
  },
  {
    q: "I dannelsesentalpimetoden: hva inngår i den spesifikke entalpien Ĥᵢ for hver komponent?",
    a: "Ĥᵢ = ΔHf°,ᵢ + ∫₂₅→T Cp,ᵢ dT (sensibel del) + evt. faseovergangsentalpier. For gasser kan sensibel del leses direkte fra Tabell B.8. Energibalanse: Q = Σ(ṅᵢĤᵢ)_ut − Σ(ṅᵢĤᵢ)_inn.",
  },
  {
    q: "Hvorfor får du fortegnsbytte når du regner ΔHr° fra forbrenningsentalpier i stedet for dannelsesentalpier?",
    a: "ΔHr° = Σ(ν·ΔHc°)ᵣₑₐₖₜₐₙₜ − Σ(ν·ΔHc°)ₚᵣₒdᵤₖₜ — altså REAKTANTER minus produkter (motsatt av dannelsesformelen). Det skyldes at ΔHc° måler veien NEDOVER til forbrente produkter; reaktantene har 'lenger å falle' enn produktene.",
  },
];

const Flashcard = () => {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const go = (d) => { setFlipped(false); setTimeout(() => setI((p) => (p + d + FLASHCARDS.length) % FLASHCARDS.length), 120); };
  const c = FLASHCARDS[i];
  return (
    <div>
      <style>{`
        .p4-flip{perspective:1600px;}
        .p4-inner{transition:transform .55s cubic-bezier(.4,.2,.2,1);transform-style:preserve-3d;position:relative;}
        .p4-inner.f{transform:rotateY(180deg);}
        .p4-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;}
        .p4-back{transform:rotateY(180deg);}
        .p4-nav:hover{background:#475569 !important;}
        .p4-flip:hover .p4-hint{opacity:1;}
      `}</style>
      <div className="p4-flip" style={{ minHeight: 280 }} onClick={() => setFlipped((f) => !f)}>
        <div className={"p4-inner" + (flipped ? " f" : "")} style={{ minHeight: 280, cursor: "pointer" }}>
          <div className="p4-face" style={{ background: CARD, border: `2px solid ${ACCENT}`, borderRadius: 14, padding: 28, minHeight: 280 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontFamily: MONO, fontSize: 12, color: "#1a1300", background: ACCENT, padding: "3px 10px", borderRadius: 6, fontWeight: 700 }}>SPØRSMÅL</span>
              <span style={{ color: TXT2, fontSize: 13, fontFamily: MONO }}>Kort {i + 1} av {FLASHCARDS.length}</span>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <p style={{ color: TXT, fontSize: 17, lineHeight: 1.55, margin: 0 }}>{c.q}</p>
            </div>
            <div className="p4-hint" style={{ color: TXT2, fontSize: 12.5, textAlign: "center", opacity: 0.55, transition: "opacity .3s" }}>Klikk for å snu kortet</div>
          </div>
          <div className="p4-face p4-back" style={{ background: "#172033", border: `2px solid ${ACCENT_TEXT}`, borderRadius: 14, padding: 28, minHeight: 280 }}>
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontFamily: MONO, fontSize: 12, color: ACCENT_TEXT, background: "rgba(251,191,36,0.12)", padding: "3px 10px", borderRadius: 6, fontWeight: 700, border: `1px solid ${ACCENT}` }}>SVAR</span>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", overflowY: "auto" }}>
              <p style={{ color: TXT, fontSize: 15, lineHeight: 1.6, margin: 0 }}>{c.a}</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, justifyContent: "center" }}>
        <button className="p4-nav" onClick={() => go(-1)} style={{ display: "flex", alignItems: "center", gap: 6, background: BORDER, color: TXT, border: "none", borderRadius: 9, padding: "10px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}><ChevronLeft size={17} /> Forrige</button>
        <button className="p4-nav" onClick={() => { setFlipped(false); setTimeout(() => setI(0), 120); }} style={{ display: "flex", alignItems: "center", gap: 6, background: BORDER, color: TXT2, border: "none", borderRadius: 9, padding: "10px 14px", cursor: "pointer", fontSize: 13 }}><RotateCcw size={15} /></button>
        <button className="p4-nav" onClick={() => go(1)} style={{ display: "flex", alignItems: "center", gap: 6, background: BORDER, color: TXT, border: "none", borderRadius: 9, padding: "10px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Neste <ChevronRight size={17} /></button>
      </div>
    </div>
  );
};

// ============================================================
// MAIN
// ============================================================
function EnergibalanserEksempler() {
  return (
    <div style={{ background: BG, minHeight: "100vh", padding: "0 0 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;}
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 22px", fontFamily: "'Source Sans 3', sans-serif" }}>

        {/* ===== HEADER ===== */}
        <div style={{ paddingTop: 48, paddingBottom: 8 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ background: ACCENT, color: "#1a1300", fontFamily: MONO, fontWeight: 700, fontSize: 13, padding: "4px 12px", borderRadius: 7 }}>Del B · Kjemisk prosessteknologi</span>
            <span style={{ border: `1px solid ${ACCENT}`, color: ACCENT_TEXT, fontFamily: MONO, fontWeight: 700, fontSize: 13, padding: "4px 12px", borderRadius: 7 }}>B4 / B5 / B6</span>
            <span style={{ color: TXT2, fontSize: 13, fontFamily: MONO }}>Part 4 av 4</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 44, color: TXT, margin: "0 0 10px", lineHeight: 1.1 }}>
            Energibalanser <span style={{ color: ACCENT_TEXT }}>— Eksempler og Quiz</span>
          </h1>
          <p style={{ color: TXT2, fontSize: 18, margin: 0, lineHeight: 1.5 }}>
            Fem fullstendig løste eksamensnivå-eksempler + flashcards. Drill metodikken — det er der folk taper poeng.
          </p>
          <Note type="warn">
            Energibalanser er verdt <strong>~20 poeng</strong> på eksamen. Studenter stryker fordi de
            hopper over systematikken. <strong>Fast oppskrift:</strong> flytskjema → forenkle
            energibalansen → velg referanse → prosessvei + tabellverdier → regn trinn for trinn →
            svar med <strong>enhet og fortegn</strong>.
          </Note>
        </div>

        {/* ===== EKSEMPLER ===== */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, marginTop: 10 }}>
          <div style={{ background: ACCENT, color: "#1a1300", width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}><Calculator size={19} /></div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 27, color: TXT, margin: 0 }}>Eksempler</h2>
        </div>

        {/* ---- Eksempel A ---- */}
        <Card>
          <ExampleHeader tag="A · B4" icon={Droplets} title="Oppvarming med faseovergang (uten reaksjon)" />
          <P>
            En strøm på ṁ = 2,0 kg/s flytende vann ved 20 °C varmes til overopphetet damp ved 200 °C
            (1 atm) i en varmeveksler. Finn nødvendig varmetilførsel Q̇.
          </P>
          <FlowDiagram box="Varmeveksler" inn={["væske", "2,0 kg/s", "20 °C"]} ut={["damp", "2,0 kg/s", "200 °C"]} />

          <TableRef>
            <strong>Tabellverdier (Tabeller.pdf):</strong> Cp,væske = 4,18 kJ/kg·K · ΔĤvap(100 °C) =
            2257 kJ/kg · Cp,damp ≈ 1,96 kJ/kg·K. (Alternativt kan damptabell B.6/B.7 brukes for å lese
            Ĥ direkte i kJ/kg.)
          </TableRef>

          <Step n="1" title="Forenkle">Stasjonær, Ẇₛ = 0, ΔĖₖ ≈ ΔĖₚ ≈ 0 → Q̇ = ΔḢ = ṁ·ΔĤ.</Step>
          <Step n="2" title="Prosessvei (3 trinn)">
            <PathDiagram
              states={[{ label: "væske", sub: "20 °C" }, { label: "væske", sub: "100 °C" }, { label: "damp", sub: "100 °C" }, { label: "damp", sub: "200 °C" }]}
              steps={["Cp,v", "ΔĤvap", "Cp,g"]}
            />
          </Step>
          <Step n="3" title="ΔĤ per kg">
            <Mono>
              ΔĤ₁ = 4,18·(100−20) = 334,4 kJ/kg{"\n"}
              ΔĤ₂ = 2257 kJ/kg{"\n"}
              ΔĤ₃ = 1,96·(200−100) = 196 kJ/kg{"\n"}
              ΔĤ = 334,4 + 2257 + 196 = 2787,4 kJ/kg
            </Mono>
          </Step>
          <Step n="4" title="Skaler med massestrøm">
            <Mono>Q̇ = ṁ·ΔĤ = 2,0 · 2787,4 = 5574,8 kJ/s</Mono>
          </Step>
          <Answer>Q̇ ≈ +5,57·10³ kJ/s (+5,57 MW) — positivt ⇒ varme må TILFØRES.</Answer>
        </Card>

        {/* ---- Eksempel B ---- */}
        <Card>
          <ExampleHeader tag="B · B4" icon={Beaker} title="Blandingsvarme — fortynning av syre" />
          <P>
            100 mol/s konsentrert svovelsyre (H₂SO₄) ved 25 °C blandes med vann (25 °C) slik at det
            dannes en løsning med molforhold ≈ 1 mol H₂SO₄ per 10 mol H₂O. Prosessen er adiabatisk.
            Hvor mye varme frigjøres, og hva blir omtrentlig temperaturøkning i produktstrømmen?
          </P>
          <FlowDiagram box="Blander" inn={["H₂SO₄ + H₂O", "25 °C"]} ut={["H₂SO₄(aq)", "T = ?"]} />

          <TableRef>
            <strong>Tabell for integral løsningsvarme (F&R Tabell B.11 / SI Chemical Data):</strong>{" "}
            for H₂SO₄ med 10 mol H₂O per mol syre er <Fag>ΔĤs ≈ −69 kJ/mol</Fag> (eksoterm). Slå opp
            eksakt verdi for det aktuelle molforholdet — verdien blir mer negativ jo mer fortynnet.
          </TableRef>

          <Step n="1" title="Varme frigjort ved blanding">
            <Mono>Q_frigjort = ṅ_syre · |ΔĤs| = 100 · 69 = 6900 kJ/s</Mono>
            ΔĤmix &lt; 0 → eksoterm. Hvis vi ville holdt 25 °C måtte vi fjernet Q = −6900 kJ/s.
          </Step>
          <Step n="2" title="Adiabatisk → temperaturøkning">
            Q = 0, så all blandingsvarmen går til å varme løsningen: 0 = ΔĤmix + ṁ_løsning·Cp,løsning·ΔT.
          </Step>
          <Step n="3" title="Estimer ΔT">
            <Mono>
              massestrøm ut ≈ 100·98 + 1000·18 = 27 800 g/s = 27,8 kg/s{"\n"}
              Cp,løsning ≈ 3,8 kJ/kg·K (fortynnet syre){"\n"}
              ΔT = 6900 / (27,8 · 3,8) ≈ 65 °C
            </Mono>
          </Step>
          <Answer>Q_frigjort ≈ 6,9·10³ kJ/s · adiabatisk: T_ut ≈ 25 + 65 = 90 °C.</Answer>
          <Note type="warn">
            Derfor tilsetter man <strong>alltid syre i vann</strong>, aldri omvendt — den store
            eksoterme blandingsvarmen kan ellers koke væsken lokalt.
          </Note>
        </Card>

        {/* ---- Eksempel C ---- */}
        <Card>
          <ExampleHeader tag="C · B5" icon={Snowflake} title="Hypotetisk prosessvei — is til damp" />
          <P>
            Beregn ΔĤ for å varme 1 mol vann fra is ved −10 °C til overopphetet damp ved 150 °C
            (1 atm). Dette er den klassiske 5-trinns prosessveien.
          </P>
          <TableRef>
            <strong>Tabellverdier (molare):</strong> Cp,is ≈ 0,0376 · Cp,væske ≈ 0,0754 · Cp,damp ≈
            0,0341 (kJ/mol·°C) · ΔĤfus = 6,01 kJ/mol · ΔĤvap = 40,66 kJ/mol.
          </TableRef>
          <Step n="1" title="Tegn prosessveien (5 trinn)">
            <PathDiagram
              states={[{ label: "is", sub: "−10 °C" }, { label: "is", sub: "0 °C" }, { label: "væske", sub: "0 °C" }, { label: "væske", sub: "100 °C" }, { label: "damp", sub: "100 °C" }, { label: "damp", sub: "150 °C" }]}
              steps={["Cp,is", "ΔHfus", "Cp,v", "ΔHvap", "Cp,g"]}
              caption="Faseoverganger (smelting, fordampning) skjer ved konstant T."
            />
          </Step>
          <Step n="2" title="ΔĤ for hvert trinn">
            <Mono>
              1) is −10→0:&nbsp;&nbsp; 0,0376·(0−(−10)) = 0,376 kJ/mol{"\n"}
              2) smelt @0:&nbsp;&nbsp;&nbsp; +6,01 kJ/mol{"\n"}
              3) væske 0→100: 0,0754·100 = 7,54 kJ/mol{"\n"}
              4) fordamp @100: +40,66 kJ/mol{"\n"}
              5) damp 100→150: 0,0341·50 = 1,705 kJ/mol
            </Mono>
          </Step>
          <Step n="3" title="Summér (Hess' lov)">
            <Mono>ΔĤ = 0,376 + 6,01 + 7,54 + 40,66 + 1,705 = 56,29 kJ/mol</Mono>
          </Step>
          <Answer>ΔĤ ≈ +56,3 kJ/mol — domineres av fordampningsvarmen (40,66).</Answer>
        </Card>

        {/* ---- Eksempel D ---- */}
        <Card>
          <ExampleHeader tag="D · B6" icon={Flame} title="Reaktiv energibalanse — dannelsesentalpimetoden" />
          <P>
            10 mol/s metan (CH₄) og støkiometrisk luft mates inn ved 25 °C og forbrennes fullstendig.
            Produktene forlater ved 500 °C. Reaksjon: CH₄ + 2O₂ → CO₂ + 2H₂O(damp). Finn Q̇.
          </P>
          <Step n="1" title="Massebalanse / strømmer">
            <Mono>
              CH₄ inn: 10 → forbruker 20 O₂{"\n"}
              luft: O₂ = 20, N₂ = 20·(79/21) = 75,24 (mol/s){"\n"}
              ut @500 °C: CO₂ 10 · H₂O(g) 20 · N₂ 75,24 · O₂ 0
            </Mono>
          </Step>
          <FlowDiagram box="Reaktor" inn={["CH₄ 10, luft", "25 °C"]} ut={["CO₂,H₂O,N₂", "500 °C"]} />
          <TableRef>
            <strong>Tabell B.1</strong> ΔHf° (kJ/mol): CH₄ −74,85 · CO₂ −393,5 · H₂O(g) −241,83 ·
            O₂ = N₂ = 0. &nbsp;<strong>Tabell B.8</strong> Ĥ @500 °C (kJ/mol): O₂ 15,03 · N₂ 14,24 ·
            CO₂ 21,34 · H₂O 17,01. (Alle strømmer inn ved 25 °C → sensibel del = 0.)
          </TableRef>
          <Step n="2" title="Energibalanse">
            Q̇ = ΔḢ = Σ(ṅᵢĤᵢ)_ut − Σ(ṅᵢĤᵢ)_inn, &nbsp;Ĥᵢ = ΔHf°,ᵢ + Ĥ_sensibel(T).
          </Step>
          <Step n="3" title="Entalpi inn (alt ved 25 °C)">
            <Mono>Σ_inn = 10·(−74,85) + 20·0 + 75,24·0 = −748,5 kJ/s</Mono>
          </Step>
          <Step n="4" title="Entalpi ut (ved 500 °C)">
            <Mono>
              CO₂: 10·(−393,5 + 21,34) = −3721,6{"\n"}
              H₂O: 20·(−241,83 + 17,01) = −4496,4{"\n"}
              N₂:&nbsp; 75,24·(0 + 14,24) = +1071,4{"\n"}
              Σ_ut = −7146,6 kJ/s
            </Mono>
          </Step>
          <Step n="5" title="Q̇">
            <Mono>Q̇ = Σ_ut − Σ_inn = −7146,6 − (−748,5) = −6398,1 kJ/s</Mono>
          </Step>
          <Answer>Q̇ ≈ −6,40·10³ kJ/s (−6,40 MW) — negativt ⇒ varme må FJERNES (eksoterm).</Answer>
        </Card>

        {/* ---- Eksempel E ---- */}
        <Card>
          <ExampleHeader tag="E · B6" icon={Route} title="ΔHr° fra forbrenningsentalpier (fortegnsbytte)" />
          <P>
            Hydrogenering av etylen: C₂H₄(g) + H₂(g) → C₂H₆(g). Du har bare forbrenningsentalpier
            tilgjengelig. Beregn ΔHr°, og deretter Q̇ for en isoterm reaktor ved 25 °C som omsetter
            ξ = 5 mol/s.
          </P>
          <TableRef>
            <strong>Tabell for forbrenningsentalpier ΔHc° (kJ/mol, produkter = CO₂ + H₂O væske):</strong>{" "}
            C₂H₄ −1411 · H₂ −285,8 · C₂H₆ −1560. (Slå opp eksakte verdier i formelsamlingen.)
          </TableRef>
          <Step n="1" title="Bruk forbrennings-formelen (REAKTANTER − PRODUKTER)">
            <Mono>
              ΔHr° = Σ(ν·ΔHc°)_reaktant − Σ(ν·ΔHc°)_produkt{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;= [(−1411) + (−285,8)] − [(−1560)]{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;= −1696,8 + 1560 = −136,8 kJ/mol
            </Mono>
          </Step>
          <Note type="warn">
            <strong>Fortegnet:</strong> her er det <Fag>reaktanter minus produkter</Fag> — motsatt av
            dannelsesentalpi-formelen (produkter minus reaktanter). Bruker du feil rekkefølge får du
            +136,8 og konkluderer feil (endoterm).
          </Note>
          <Step n="2" title="Q̇ for isoterm reaktor ved 25 °C">
            Ved 25 °C inn og ut er sensibel entalpi 0, så Q̇ = ξ·ΔHr°.
            <Mono>Q̇ = 5 · (−136,8) = −684 kJ/s</Mono>
          </Step>
          <Answer>ΔHr° = −136,8 kJ/mol (eksoterm) · Q̇ = −684 kJ/s — varme må fjernes.</Answer>
        </Card>

        {/* ===== QUIZ ===== */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, marginTop: 34 }}>
          <div style={{ background: ACCENT, color: "#1a1300", width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}><Layers size={19} /></div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 27, color: TXT, margin: 0 }}>Quiz — flashcards</h2>
        </div>
        <Card style={{ paddingBottom: 30 }}>
          <P>Klikk kortet for å snu. {FLASHCARDS.length} kort, blandet konseptuelt + beregning, inspirert av eksamen V2023–V2025.</P>
          <Flashcard />
        </Card>

        <div style={{ textAlign: "center", color: TXT2, fontSize: 13, marginTop: 30, fontFamily: MONO }}>
          IMAK2005 · Del B · Energibalanser (B4/B5/B6) · Part 4 av 4
        </div>
      </div>
    </div>
  );
}


return EnergibalanserEksempler;
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
          B4–B6 · Energibalanser
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
