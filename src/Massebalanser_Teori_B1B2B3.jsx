import React, { useState } from "react";
import {
  Boxes,
  Layers,
  FlaskConical,
  Target,
  GitBranch,
  Repeat,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Lightbulb,
  Table,
} from "lucide-react";

/* ============================================================
   IMAK2005 — Massebalanser (Teori) — B1 + B2 + B3 (Del B)
   Part 1 of 4. Accent: #6366F1 (indigo)
   ============================================================ */

const C = {
  bg: "#0F172A",
  card: "#1E293B",
  border: "#334155",
  text: "#F8FAFC",
  sub: "#94A3B8",
  accent: "#6366F1",
  accentSoft: "rgba(99,102,241,0.12)",
  formulaBg: "rgba(255,255,255,0.05)",
};

const FONT_HEAD = "'Plus Jakarta Sans', sans-serif";
const FONT_BODY = "'Source Sans 3', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

/* ---------- Reusable pieces ---------- */

function Term({ children }) {
  return (
    <span
      style={{
        color: C.accent,
        background: C.accentSoft,
        borderLeft: `3px solid ${C.accent}`,
        padding: "1px 7px",
        borderRadius: 4,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function Formula({ children, label }) {
  return (
    <div style={{ margin: "14px 0" }}>
      <div
        style={{
          fontFamily: FONT_MONO,
          background: C.formulaBg,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          padding: "14px 18px",
          color: C.text,
          fontSize: 15.5,
          lineHeight: 1.7,
          overflowX: "auto",
        }}
      >
        {children}
      </div>
      {label && (
        <div style={{ color: C.sub, fontSize: 13, marginTop: 6, fontStyle: "italic" }}>
          {label}
        </div>
      )}
    </div>
  );
}

function Mono({ children }) {
  return <span style={{ fontFamily: FONT_MONO, color: C.text }}>{children}</span>;
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: 24,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({ icon: Icon, label, title }) {
  return (
    <div style={{ borderLeft: `4px solid ${C.accent}`, paddingLeft: 16, margin: "8px 0 22px" }}>
      <div
        style={{
          color: C.accent,
          fontFamily: FONT_HEAD,
          fontWeight: 700,
          letterSpacing: 2,
          fontSize: 13,
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {Icon && <Icon size={16} />}
        {label}
      </div>
      <h2 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 28, margin: "6px 0 0", color: C.text }}>
        {title}
      </h2>
    </div>
  );
}

function SubHead({ tag, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0 14px" }}>
      <span
        style={{
          fontFamily: FONT_MONO,
          fontSize: 13,
          fontWeight: 700,
          color: C.bg,
          background: C.accent,
          padding: "3px 10px",
          borderRadius: 6,
        }}
      >
        {tag}
      </span>
      <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 21, margin: 0, color: C.text }}>
        {children}
      </h3>
    </div>
  );
}

function Tabeller({ children }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        background: "rgba(245,158,11,0.08)",
        border: "1px solid rgba(245,158,11,0.35)",
        borderRadius: 10,
        padding: "12px 16px",
        margin: "14px 0",
        color: "#FCD34D",
        fontSize: 14.5,
        lineHeight: 1.55,
      }}
    >
      <Table size={18} style={{ flexShrink: 0, marginTop: 2 }} />
      <div>{children}</div>
    </div>
  );
}

function Tip({ children }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        background: C.accentSoft,
        border: `1px solid ${C.accent}`,
        borderRadius: 10,
        padding: "12px 16px",
        margin: "14px 0",
        color: C.text,
        fontSize: 14.5,
        lineHeight: 1.55,
      }}
    >
      <Lightbulb size={18} style={{ flexShrink: 0, marginTop: 2, color: C.accent }} />
      <div>{children}</div>
    </div>
  );
}

const P = { color: C.text, fontSize: 16, lineHeight: 1.7, margin: "0 0 14px" };
const LI = { color: C.text, fontSize: 16, lineHeight: 1.65, marginBottom: 8 };

/* ---------- SVG diagrams ---------- */

function FlytskjemaSVG() {
  return (
    <svg viewBox="0 0 460 200" width="100%" style={{ maxWidth: 460 }}>
      {/* kontrollvolum dashed */}
      <rect x="120" y="55" width="200" height="90" rx="10" fill="none"
        stroke={C.accent} strokeWidth="1.5" strokeDasharray="6 5" opacity="0.7" />
      <text x="220" y="48" fill={C.accent} fontSize="12" fontFamily={FONT_MONO} textAnchor="middle">
        kontrollvolum
      </text>
      {/* enhet */}
      <rect x="170" y="78" width="100" height="44" rx="8" fill={C.accent} opacity="0.9" />
      <text x="220" y="105" fill="#0F172A" fontSize="14" fontWeight="700" fontFamily={FONT_HEAD} textAnchor="middle">
        Enhet
      </text>
      {/* inn arrow */}
      <line x1="40" y1="100" x2="168" y2="100" stroke={C.sub} strokeWidth="2" markerEnd="url(#ah)" />
      <text x="60" y="90" fill={C.text} fontSize="13" fontFamily={FONT_MONO}>ṁ₁ , x₁</text>
      <text x="40" y="125" fill={C.sub} fontSize="12">strøm inn</text>
      {/* ut arrow */}
      <line x1="270" y1="100" x2="420" y2="100" stroke={C.sub} strokeWidth="2" markerEnd="url(#ah)" />
      <text x="320" y="90" fill={C.text} fontSize="13" fontFamily={FONT_MONO}>ṁ₂ , x₂</text>
      <text x="360" y="125" fill={C.sub} fontSize="12">strøm ut</text>
      <defs>
        <marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill={C.sub} />
        </marker>
      </defs>
    </svg>
  );
}

function RecycleSVG() {
  const box = (x, label) => (
    <g>
      <rect x={x} y="50" width="80" height="40" rx="7" fill={C.accent} opacity="0.9" />
      <text x={x + 40} y="75" fill="#0F172A" fontSize="12.5" fontWeight="700" fontFamily={FONT_HEAD} textAnchor="middle">
        {label}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 480 170" width="100%" style={{ maxWidth: 480 }}>
      {/* fresh feed */}
      <line x1="10" y1="70" x2="118" y2="70" stroke={C.sub} strokeWidth="2" markerEnd="url(#ah2)" />
      <text x="14" y="60" fill={C.text} fontSize="12" fontFamily={FONT_MONO}>fersk føde (1)</text>
      {/* mix point */}
      <circle cx="125" cy="70" r="7" fill="none" stroke={C.text} strokeWidth="1.5" />
      <text x="125" y="44" fill={C.sub} fontSize="11" textAnchor="middle">mix</text>
      {/* gross feed to reactor */}
      <line x1="132" y1="70" x2="158" y2="70" stroke={C.sub} strokeWidth="2" markerEnd="url(#ah2)" />
      {box(160, "Reaktor")}
      <line x1="240" y1="70" x2="278" y2="70" stroke={C.sub} strokeWidth="2" markerEnd="url(#ah2)" />
      <text x="248" y="62" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>(3)</text>
      {box(280, "Separator")}
      {/* product */}
      <line x1="360" y1="70" x2="470" y2="70" stroke={C.sub} strokeWidth="2" markerEnd="url(#ah2)" />
      <text x="395" y="60" fill={C.text} fontSize="12" fontFamily={FONT_MONO}>produkt (5)</text>
      {/* recycle loop */}
      <polyline points="320,90 320,140 125,140 125,77" fill="none" stroke={C.accent}
        strokeWidth="2" markerEnd="url(#ahA)" />
      <text x="200" y="156" fill={C.accent} fontSize="12" fontFamily={FONT_MONO} textAnchor="middle">
        resirkulering (4)
      </text>
      <defs>
        <marker id="ah2" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill={C.sub} />
        </marker>
        <marker id="ahA" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill={C.accent} />
        </marker>
      </defs>
    </svg>
  );
}

function SplitMixBypassSVG() {
  return (
    <svg viewBox="0 0 500 150" width="100%" style={{ maxWidth: 500 }}>
      {/* SPLITT */}
      <text x="55" y="18" fill={C.accent} fontSize="12" fontWeight="700" fontFamily={FONT_HEAD} textAnchor="middle">SPLITT</text>
      <line x1="15" y1="60" x2="55" y2="60" stroke={C.sub} strokeWidth="2" />
      <circle cx="58" cy="60" r="5" fill={C.accent} />
      <line x1="58" y1="60" x2="98" y2="38" stroke={C.sub} strokeWidth="2" markerEnd="url(#a3)" />
      <line x1="58" y1="60" x2="98" y2="82" stroke={C.sub} strokeWidth="2" markerEnd="url(#a3)" />
      <text x="40" y="118" fill={C.sub} fontSize="10.5" textAnchor="middle">samme x,</text>
      <text x="40" y="132" fill={C.sub} fontSize="10.5" textAnchor="middle">delt strøm</text>

      {/* MIX */}
      <text x="245" y="18" fill={C.accent} fontSize="12" fontWeight="700" fontFamily={FONT_HEAD} textAnchor="middle">MIX</text>
      <line x1="200" y1="38" x2="240" y2="58" stroke={C.sub} strokeWidth="2" />
      <line x1="200" y1="82" x2="240" y2="62" stroke={C.sub} strokeWidth="2" />
      <circle cx="244" cy="60" r="5" fill={C.accent} />
      <line x1="244" y1="60" x2="290" y2="60" stroke={C.sub} strokeWidth="2" markerEnd="url(#a3)" />
      <text x="245" y="118" fill={C.sub} fontSize="10.5" textAnchor="middle">strømmer</text>
      <text x="245" y="132" fill={C.sub} fontSize="10.5" textAnchor="middle">slås sammen</text>

      {/* BYPASS */}
      <text x="430" y="18" fill={C.accent} fontSize="12" fontWeight="700" fontFamily={FONT_HEAD} textAnchor="middle">BYPASS</text>
      <line x1="350" y1="45" x2="388" y2="45" stroke={C.sub} strokeWidth="2" />
      <rect x="390" y="32" width="44" height="26" rx="5" fill={C.accent} opacity="0.9" />
      <text x="412" y="49" fill="#0F172A" fontSize="9.5" fontWeight="700" textAnchor="middle">enhet</text>
      <line x1="434" y1="45" x2="472" y2="45" stroke={C.sub} strokeWidth="2" markerEnd="url(#a3)" />
      <polyline points="360,45 360,90 460,90 460,52" fill="none" stroke={C.accent} strokeWidth="2" markerEnd="url(#a3A)" />
      <text x="410" y="118" fill={C.sub} fontSize="10.5" textAnchor="middle">del av føden</text>
      <text x="410" y="132" fill={C.sub} fontSize="10.5" textAnchor="middle">går utenom</text>
      <defs>
        <marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.sub} />
        </marker>
        <marker id="a3A" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={C.accent} />
        </marker>
      </defs>
    </svg>
  );
}

/* ---------- Worked example block ---------- */

function Eksempel({ n, title, children }) {
  return (
    <Card style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontWeight: 700,
            fontSize: 14,
            color: "#0F172A",
            background: C.accent,
            width: 34,
            height: 34,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {n}
        </span>
        <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 19, margin: 0, color: C.text }}>
          {title}
        </h3>
      </div>
      {children}
    </Card>
  );
}

function Steg({ children }) {
  return (
    <div
      style={{
        borderLeft: `2px solid ${C.border}`,
        paddingLeft: 16,
        marginLeft: 6,
        marginBottom: 10,
        color: C.text,
        fontSize: 15.5,
        lineHeight: 1.65,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Flashcard quiz ---------- */

const CARDS = [
  {
    q: "Skriv den generelle balanseligningen og forklar hvert ledd.",
    a: "dB/dt = Ḃ_inn − Ḃ_ut + Ḃ_dannet − Ḃ_tapt. B er en balanserbar størrelse (total masse, komponentmasse, molmengde eller energi — IKKE volum, konsentrasjon, temperatur eller trykk). Ved stasjonær drift er dB/dt = 0.",
  },
  {
    q: "Hva forenkles balanseligningen til ved stasjonær tilstand uten reaksjon?",
    a: "Akkumulering = 0 og dannet = forbrukt = 0, så Ḃ_inn = Ḃ_ut. Inn = Ut for både total masse og hver komponent.",
  },
  {
    q: "Hvordan regner du ut antall frihetsgrader, og hva betyr resultatet?",
    a: "n_fg = (antall ukjente) − (antall uavhengige ligninger). n_fg = 0 → løsbart. n_fg > 0 → underspesifisert (mangler info). n_fg < 0 → overspesifisert (motstridende info).",
  },
  {
    q: "Du har 3 komponenter i en enhet. Hvor mange UAVHENGIGE balanser kan du sette opp?",
    a: "3 totalt. Du kan velge 3 komponentbalanser, ELLER 2 komponentbalanser + 1 totalbalanse. Du kan IKKE bruke alle 3 komponentbalansene + totalbalansen samtidig — totalbalansen er da ikke uavhengig (den er summen av komponentbalansene).",
  },
  {
    q: "Hva er forskjellen på single-pass og total (overall) omdanningsgrad i en prosess med resirkulering?",
    a: "Single-pass = omdanning per gang strømmen passerer reaktoren (basert på reaktorføde = fersk føde + resirkulering). Total/overall = omdanning sett på hele prosessen (basert på fersk føde inn og netto produkt ut). Overall er alltid høyere fordi uomsatt reaktant resirkuleres og får nye sjanser.",
  },
  {
    q: "Hva er en begrensende reaktant, og hvordan finner du den?",
    a: "Den reaktanten som tar slutt først og dermed begrenser hvor mye produkt som dannes. Finn den ved å dele tilført molmengde på den støkiometriske koeffisienten for hver reaktant — den med lavest forhold er begrensende.",
  },
  {
    q: "Definer reaksjonsomfang ξ og skriv komponentbalansen basert på det.",
    a: "ξ (extent of reaction) måler hvor langt reaksjonen har gått [mol/s]. Komponentbalanse: ṅ_i,ut = ṅ_i,inn + ν_i · ξ, der ν_i er støkiometrisk koeffisient (negativ for reaktant, positiv for produkt). Samme ξ gjelder for ALLE komponenter i samme reaksjon.",
  },
  {
    q: "Forklar forskjellen på omdanningsgrad, utbytte og selektivitet.",
    a: "Omdanningsgrad X = mol reagert / mol i føde (av en reaktant). Utbytte = mol ønsket produkt dannet / maks mulig mol ønsket produkt. Selektivitet = mol ønsket produkt / mol uønsket produkt (biprodukt).",
  },
  {
    q: "Regneoppgave: Luft (96 % tørrluft, 4 % vann) avfuktes til 1,7 % vann. Produktet er 100 mol/s. Finn føderaten ṅ₁ (kun overall-balanse).",
    a: "Tørrluft er inert (passerer uendret). Overall TL-balanse: 0,96·ṅ₁ = 0,983·100 = 98,3 → ṅ₁ = 102,4 mol/s. (Totalbalanse gir så kondensat ṅ₃ = ṅ₁ − 100 = 2,4 mol/s.)",
  },
  {
    q: "Hva er en 'basis' i et massebalanseproblem, og hvorfor velger vi en?",
    a: "Et selvvalgt beregningsgrunnlag (f.eks. 100 kg føde, eller 1 time/1 s drift). Det gir et konkret tall å regne med når ingen absolutt mengde er oppgitt. Til slutt SKALERER du svaret tilbake til faktiske mengder hvis nødvendig.",
  },
];

function Quiz() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const go = (d) => {
    setFlipped(false);
    setI((p) => (p + d + CARDS.length) % CARDS.length);
  };
  const c = CARDS[i];
  return (
    <div>
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{ perspective: 1400, cursor: "pointer", marginBottom: 18 }}
      >
        <div
          style={{
            position: "relative",
            minHeight: 230,
            transition: "transform 0.55s cubic-bezier(.4,.2,.2,1)",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "none",
          }}
        >
          {/* FRONT */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: C.card,
              border: `1px solid ${C.border}`,
              borderTop: `3px solid ${C.accent}`,
              borderRadius: 14,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ color: C.accent, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, fontFamily: FONT_MONO, marginBottom: 12 }}>
              SPØRSMÅL
            </div>
            <div style={{ color: C.text, fontSize: 18, lineHeight: 1.6, fontWeight: 600 }}>{c.q}</div>
            <div style={{ color: C.sub, fontSize: 13, marginTop: 18 }}>Klikk for å snu →</div>
          </div>
          {/* BACK */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "#172033",
              border: `1px solid ${C.accent}`,
              borderRadius: 14,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ color: C.accent, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, fontFamily: FONT_MONO, marginBottom: 12 }}>
              SVAR
            </div>
            <div style={{ color: C.text, fontSize: 16, lineHeight: 1.6, fontFamily: c.a.length > 200 ? FONT_BODY : FONT_BODY }}>
              {c.a}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => go(-1)} style={navBtn}>
          <ChevronLeft size={18} /> Forrige
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ color: C.sub, fontFamily: FONT_MONO, fontSize: 14 }}>
            {i + 1} / {CARDS.length}
          </span>
          <button onClick={() => { setI(0); setFlipped(false); }} style={{ ...navBtn, padding: "9px 12px" }} title="Tilbakestill">
            <RotateCcw size={16} />
          </button>
        </div>
        <button onClick={() => go(1)} style={navBtn}>
          Neste <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

const navBtn = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  background: C.card,
  color: C.text,
  border: `1px solid ${C.border}`,
  borderRadius: 9,
  padding: "9px 16px",
  fontSize: 14.5,
  fontFamily: FONT_BODY,
  fontWeight: 600,
  cursor: "pointer",
};

/* ============================================================
   MAIN
   ============================================================ */

export default function MassebalanserTeori() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: FONT_BODY }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        button:hover { border-color: ${C.accent} !important; transform: translateY(-1px); }
        button { transition: all .15s ease; }
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* ===== HEADER ===== */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{
              background: C.accent, color: "#0F172A", fontWeight: 700, fontSize: 13,
              padding: "5px 12px", borderRadius: 7, fontFamily: FONT_HEAD,
            }}>
              DEL B · Kjemisk prosessteknologi
            </span>
            <span style={{
              border: `1px solid ${C.accent}`, color: C.accent, fontWeight: 700, fontSize: 13,
              padding: "5px 12px", borderRadius: 7, fontFamily: FONT_MONO,
            }}>
              B1 / B2 / B3
            </span>
            <span style={{
              border: `1px solid ${C.border}`, color: C.sub, fontWeight: 600, fontSize: 13,
              padding: "5px 12px", borderRadius: 7,
            }}>
              Del 1 av 4 · Teori
            </span>
          </div>
          <h1 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 44, margin: "0 0 10px", color: C.text, lineHeight: 1.1 }}>
            Massebalanser — Teori
          </h1>
          <p style={{ color: C.sub, fontSize: 19, margin: 0, lineHeight: 1.5 }}>
            Balanseprinsippet, flertrinn og reaktive systemer. Del B er ~40 % av eksamen og er ren
            beregning — dette er fundamentet alt annet hviler på.
          </p>
        </div>

        {/* ===== LÆRINGSMÅL ===== */}
        <SectionHeader icon={GraduationCap} label="Læringsmål" title="Hva du skal kunne" />
        <Card style={{ marginBottom: 48 }}>
          <ul style={{ margin: 0, paddingLeft: 22 }}>
            <li style={LI}>
              Beskrive og forklare hvordan massebalanser beregnes, og utføre kvantitative beregninger i et
              kjemisk <Term>stasjonært system</Term> — både med og uten reaktor og resirkulasjon.
            </li>
            <li style={{ ...LI, marginBottom: 0 }}>
              Sette opp og tolke <Term>flytskjema</Term> og utføre <Term>frihetsgradsanalyse</Term>, samt
              sette opp relevante balanseligninger basert på skjemaet.
            </li>
          </ul>
        </Card>

        {/* ===== TEORI ===== */}
        <SectionHeader icon={Boxes} label="Teori" title="Massebalansens grunnlag" />

        {/* ---- DEL I ---- */}
        <Card style={{ marginBottom: 22 }}>
          <SubHead tag="B1">Balanseprinsippet og flytskjema</SubHead>
          <p style={{ ...P, color: C.sub, marginTop: -4 }}>F&amp;R 4.2–4.3</p>

          <p style={P}>
            En <Term>massebalanse</Term> er bare regnskap: masse er bevart. Vi setter en grense (et{" "}
            <Term>kontrollvolum</Term>) rundt systemet og fører regnskap over hva som krysser den. Den
            generelle balanseligningen per tidsenhet er:
          </p>

          <Formula label="B = balanserbar størrelse. Prikk (Ḃ) betyr rate. Akkumulering = venstre side.">
            dB/dt = Ḃ<sub>inn</sub> − Ḃ<sub>ut</sub> + Ḃ<sub>dannet</sub> − Ḃ<sub>tapt</sub>
          </Formula>

          <p style={P}>
            <b>B kan være:</b> total masse, komponentmasse, molmengde (total eller komponent), eller energi.{" "}
            <b>B kan IKKE være:</b> volum, konsentrasjon, temperatur eller trykk — disse er ikke bevart.
          </p>

          <p style={P}>
            Ved <Term>stasjonær tilstand</Term> (steady state) endres ingenting med tiden, så{" "}
            <Mono>dB/dt = 0</Mono>. Total masse og energi er dessuten <Term>konserverte størrelser</Term>{" "}
            (Ḃ<sub>dannet</sub> = Ḃ<sub>tapt</sub> = 0). Da blir det enkelt:
          </p>

          <Formula label="Uten reaksjon (eller for total masse): alt som går inn må komme ut.">
            Ḃ<sub>inn</sub> = Ḃ<sub>ut</sub>
          </Formula>
          <Formula label="Med kjemisk reaksjon: komponenter dannes/forbrukes, men atomene bevares.">
            Ḃ<sub>inn</sub> + Ḃ<sub>dannet</sub> = Ḃ<sub>ut</sub> + Ḃ<sub>forbrukt</sub>
          </Formula>

          <div style={{ height: 1, background: C.border, margin: "24px 0" }} />

          <h4 style={hd4}>Differensial vs. integrert balanse</h4>
          <p style={P}>
            <Term>Differensial balanse</Term> er hastighetsbasert (mengde per tid, f.eks. mol/s) og brukes på{" "}
            <b>kontinuerlige</b> prosesser ved steady state. <Term>Integrert balanse</Term> er mengdebasert
            (total mengde over et tidsrom) og brukes på <b>batch</b>-prosesser (mengde inn ved start, ut ved slutt).
          </p>

          <h4 style={hd4}>Flytskjema og prosessvariable</h4>
          <p style={P}>
            Et <Term>flytskjema</Term> tegner prosessenheter som bokser og strømmer som piler. På hver strøm
            noterer du alt du vet og setter symboler på det du ikke vet:
          </p>
          <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 18px" }}>
            <FlytskjemaSVG />
          </div>
          <ul style={{ margin: "0 0 14px", paddingLeft: 22 }}>
            <li style={LI}><Term>massestrøm</Term> ṁ [kg/s], <Term>molstrøm</Term> ṅ [mol/s], volumstrøm [m³/s]</li>
            <li style={LI}><Term>massebrøk</Term> x<sub>i</sub> og <Term>molbrøk</Term> y<sub>i</sub> — summerer alltid til 1 per strøm</li>
            <li style={{ ...LI, marginBottom: 0 }}>Per strøm gjelder: <Mono>Σ x<sub>i</sub> = 1</Mono> og <Mono>ṁ<sub>i</sub> = x<sub>i</sub> · ṁ</Mono></li>
          </ul>

          <h4 style={hd4}>Basis og skalering</h4>
          <p style={P}>
            Mangler du en absolutt mengde? Velg en <Term>basis</Term> — et beregningsgrunnlag som 100 kg føde
            eller 1 time drift. Regn ut alt relativt til basisen, og <Term>skaler</Term> til slutt opp/ned til
            faktiske mengder hvis oppgaven krever det.
          </p>

          <div style={{ height: 1, background: C.border, margin: "24px 0" }} />

          <h4 style={hd4}>Frihetsgradsanalyse — den viktigste ferdigheten</h4>
          <p style={P}>
            Før du regner: kan problemet i det hele tatt løses? <Term>Frihetsgradsanalyse</Term> svarer på det.
          </p>
          <Formula label="Uavhengige ligninger = massebalanser + tilleggsspesifikasjoner (oppgitte sammensetninger, ratioer osv.).">
            n<sub>fg</sub> = (antall ukjente) − (antall uavhengige ligninger)
          </Formula>
          <ul style={{ margin: "0 0 14px", paddingLeft: 22 }}>
            <li style={LI}><Mono>n<sub>fg</sub> = 0</Mono> → løsbart ✓</li>
            <li style={LI}><Mono>n<sub>fg</sub> &gt; 0</Mono> → underspesifisert (du mangler opplysninger)</li>
            <li style={{ ...LI, marginBottom: 0 }}><Mono>n<sub>fg</sub> &lt; 0</Mono> → overspesifisert (for mye / motstridende info)</li>
          </ul>
          <Tip>
            <b>Felle:</b> med N komponenter får du bare <b>N</b> uavhengige balanser per kontrollvolum.
            Velger du alle N komponentbalanser, er totalbalansen <i>ikke</i> uavhengig (den er summen av dem).
            Tell aldri begge deler.
          </Tip>

          <h4 style={hd4}>Kontrollvolum: helhet vs. enkeltenhet</h4>
          <p style={P}>
            Du kan legge kontrollvolumet rundt <b>hele prosessen</b> (overall balance — interne strømmer
            forsvinner, ofte enklest å starte med) eller rundt <b>én enhet</b> av gangen. Velg det
            kontrollvolumet som gir <Mono>n<sub>fg</sub> = 0</Mono> først.
          </p>

          <Tabeller>
            <b>Tabeller på eksamen:</b> for å gå mellom masse og mol trenger du molmasser — bruk{" "}
            <i>SI Chemical Data (Aylward &amp; Findlay)</i>. Luftsammensetning (21 % O₂ / 79 % N₂ på molbasis)
            er standard antagelse i forbrenningsoppgaver.
          </Tabeller>
        </Card>

        {/* ---- DEL II ---- */}
        <Card style={{ marginBottom: 22 }}>
          <SubHead tag="B2">Flertrinnsprosesser</SubHead>
          <p style={{ ...P, color: C.sub, marginTop: -4 }}>F&amp;R 4.4–4.5</p>

          <p style={P}>
            Virkelige prosesser har flere enheter. Prinsippet er identisk — du kan sette opp en balanse rundt{" "}
            <b>hver enhet</b> <i>og</i> rundt <b>totalen</b>. Tre byggeklosser dukker stadig opp:
          </p>
          <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 18px" }}>
            <SplitMixBypassSVG />
          </div>
          <ul style={{ margin: "0 0 18px", paddingLeft: 22 }}>
            <li style={LI}><Term>splitt</Term> (splitting point): én strøm deles i to+ — alle grener har <b>samme sammensetning</b>, bare mengden deles.</li>
            <li style={LI}><Term>mix</Term> (blandingspunkt): flere strømmer slås sammen.</li>
            <li style={{ ...LI, marginBottom: 0 }}><Term>bypass</Term>: en del av føden ledes utenom enheten og blandes inn igjen etterpå.</li>
          </ul>

          <h4 style={hd4}>Resirkulering (recycle)</h4>
          <p style={P}>
            Ved <Term>resirkulering</Term> føres en del av utstrømmen tilbake til inngangen. Vanlig for å
            gjenvinne uomsatt reaktant eller katalysator (i bioprosesser: celler).
          </p>
          <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 18px" }}>
            <RecycleSVG />
          </div>
          <ul style={{ margin: "0 0 14px", paddingLeft: 22 }}>
            <li style={LI}><Term>fersk føde</Term> (fresh feed) = ny strøm inn i prosessen.</li>
            <li style={LI}><Term>brutto føde</Term> (gross feed) = fersk føde + resirkulering = det reaktoren faktisk ser.</li>
            <li style={LI}><Term>resirkuleringsforhold</Term> = resirkulert strøm / fersk føde.</li>
            <li style={{ ...LI, marginBottom: 0 }}>
              <Term>overall balanse</Term> (rundt hele prosessen) vs. <Term>single-pass balanse</Term> (rundt reaktoren):
              resirkuleringsstrømmen krysser ikke den ytre grensen, så overall-balansen blir ofte den enkleste å starte med.
            </li>
          </ul>

          <h4 style={hd4}>Purge</h4>
          <p style={P}>
            <Term>Purge</Term> er en liten avtappingsstrøm i resirkuleringssløyfen som hindrer at inerte stoffer
            (eller biprodukter) hoper seg opp uendelig. Uten purge ville inertmengden vokse til systemet ikke
            lenger er stasjonært.
          </p>

          <h4 style={hd4}>Strategi for flertrinn</h4>
          <ol style={{ margin: "0 0 6px", paddingLeft: 22 }}>
            <li style={LI}>Tegn flytskjema med <b>alle</b> strømmer og merk ukjente.</li>
            <li style={LI}>Velg basis.</li>
            <li style={LI}>Gjør frihetsgradsanalyse for total <i>og</i> for hver delenhet.</li>
            <li style={{ ...LI, marginBottom: 0 }}>Løs i riktig rekkefølge — start med kontrollvolumet som har <Mono>n<sub>fg</sub> = 0</Mono>, bruk resultatet videre.</li>
          </ol>
        </Card>

        {/* ---- DEL III ---- */}
        <Card style={{ marginBottom: 48 }}>
          <SubHead tag="B3">Reaktive massebalanser</SubHead>
          <p style={{ ...P, color: C.sub, marginTop: -4 }}>F&amp;R 4.6–4.10</p>

          <p style={P}>
            Med reaksjon dannes og forbrukes komponenter. Total masse er fortsatt bevart, men{" "}
            <b>komponent-molmengder er det ikke</b>. Balansen blir:
          </p>
          <Formula>
            Ḃ<sub>inn</sub> + Ḃ<sub>dannet</sub> = Ḃ<sub>ut</sub> + Ḃ<sub>forbrukt</sub>
          </Formula>

          <h4 style={hd4}>Støkiometri styrer forholdene</h4>
          <p style={P}>
            Den <Term>støkiometriske koeffisienten</Term> ν<sub>i</sub> binder komponentene sammen — negativ
            for reaktanter, positiv for produkter. For 2 SO₂ + O₂ → 2 SO₃:{" "}
            <Mono>ν<sub>SO₂</sub> = −2, ν<sub>O₂</sub> = −1, ν<sub>SO₃</sub> = +2</Mono>.
          </p>

          <h4 style={hd4}>Begrensende og overskuddsreaktant</h4>
          <p style={P}>
            Den <Term>begrensende reaktanten</Term> tar slutt først (lavest forhold mol/koeffisient). Resten er{" "}
            <Term>overskuddsreaktant</Term>:
          </p>
          <Formula label="Hvor mye mer enn nødvendig en reaktant tilføres.">
            % overskudd = (tilstede − nødvendig) / nødvendig × 100
          </Formula>

          <h4 style={hd4}>Omdanningsgrad, utbytte, selektivitet</h4>
          <Formula label="Andel av en reaktant som faktisk reagerer (0–1 eller %).">
            X = (n<sub>i,inn</sub> − n<sub>i,ut</sub>) / n<sub>i,inn</sub>
          </Formula>
          <ul style={{ margin: "0 0 14px", paddingLeft: 22 }}>
            <li style={LI}><Term>utbytte</Term> = (mol ønsket produkt dannet) / (maks mulig mol ønsket produkt)</li>
            <li style={{ ...LI, marginBottom: 0 }}><Term>selektivitet</Term> = (mol ønsket produkt) / (mol uønsket biprodukt)</li>
          </ul>

          <h4 style={hd4}>Reaksjonsomfang (extent of reaction)</h4>
          <p style={P}>
            <Term>Reaksjonsomfang</Term> ξ måler hvor langt reaksjonen har gått [mol/s]. Det elegante: <b>samme
            ξ gjelder for alle komponenter</b> i reaksjonen.
          </p>
          <Formula label="νᵢ negativ for reaktant, positiv for produkt. Én ukjent (ξ) erstatter mange.">
            ṅ<sub>i,ut</sub> = ṅ<sub>i,inn</sub> + ν<sub>i</sub> · ξ
          </Formula>

          <h4 style={hd4}>To metoder å løse reaktive balanser</h4>
          <ul style={{ margin: "0 0 14px", paddingLeft: 22 }}>
            <li style={LI}><b>Metode 1 — Molekylær-/atombalanse:</b> balanser hvert grunnstoff (C, H, O, N). Atomer bevares alltid, uansett reaksjon.</li>
            <li style={{ ...LI, marginBottom: 0 }}><b>Metode 2 — Omfangsmetoden:</b> bruk ṅ<sub>i,ut</sub> = ṅ<sub>i,inn</sub> + ν<sub>i</sub>·ξ. Ofte raskest når reaksjonen er kjent.</li>
          </ul>

          <h4 style={hd4}>Reaktive systemer med resirkulering</h4>
          <p style={P}>
            Her skiller vi <Term>single-pass omdanning</Term> (per reaktorpassasje) fra <Term>total omdanning</Term>{" "}
            (hele prosessen). Resirkulering av uomsatt reaktant gjør at <b>total omdanning alltid er høyere</b> enn
            single-pass — uomsatt stoff får nye sjanser.
          </p>
          <Tip>
            Verktøykassa for reaktive oppgaver: (1) balanseligning / reaksjonsomfang, (2) Σ massebrøk = 1 eller
            Σ molbrøk = 1, (3) velg kontrollvolum, (4) frihetsgrader n<sub>fg</sub>, (5) omdanningsgrad / utbytte.
          </Tip>
        </Card>

        {/* ===== EKSEMPLER ===== */}
        <SectionHeader icon={FlaskConical} label="Eksempler" title="Gjennomregnede oppgaver" />

        {/* Eks 1 */}
        <Eksempel n="1" title="Blandetank — basis, frihetsgrader, komponentbalanse (B1)">
          <p style={P}>
            En tank blander to etanolløsninger. Strøm 1 er 1 % etanol, strøm 2 er 41 % etanol. Ut skal man ha{" "}
            <Mono>ṁ₃ = 10 kg/s</Mono> med 5 % etanol. Finn <Mono>ṁ₁</Mono> og <Mono>ṁ₂</Mono>. Stasjonær, ingen reaksjon.
          </p>
          <Steg><b>Ukjente:</b> ṁ₁, ṁ₂ → 2 ukjente. <b>Komponenter:</b> etanol + vann → 2 uavhengige balanser. <Mono>n<sub>fg</sub> = 2 − 2 = 0</Mono> ✓ løsbart.</Steg>
          <Steg><b>Total masse:</b> <Mono>ṁ₁ + ṁ₂ = 10</Mono></Steg>
          <Steg><b>Etanol:</b> <Mono>0,01·ṁ₁ + 0,41·ṁ₂ = 0,05·10 = 0,5</Mono></Steg>
          <Steg>Substituer <Mono>ṁ₁ = 10 − ṁ₂</Mono>: <Mono>0,01(10 − ṁ₂) + 0,41·ṁ₂ = 0,5</Mono> → <Mono>0,1 + 0,40·ṁ₂ = 0,5</Mono></Steg>
          <Steg><b>Svar:</b> <Mono>ṁ₂ = 1,0 kg/s</Mono>, <Mono>ṁ₁ = 9,0 kg/s</Mono>. Sjekk: 0,01·9 + 0,41·1 = 0,5 ✓</Steg>
        </Eksempel>

        {/* Eks 2 */}
        <Eksempel n="2" title="Avfukter med resirkulering — overall først, så indre CV (B2)">
          <p style={P}>
            Fuktig luft (96 % tørrluft TL, 4 % vann V) skal avfuktes. En del av strømmen ut resirkuleres og blandes
            med føden, slik at strømmen inn på avfukteren har 2,3 % vann. Produktet er{" "}
            <Mono>100 mol/s</Mono> med 1,7 % vann. Kondensat (ṅ₃) er 100 % vann. Finn føderaten ṅ₁ og resirkuleringen ṅ₅.
          </p>
          <Steg><b>Nøkkelinnsikt:</b> tørrluft er <i>inert</i> — den passerer hele prosessen uendret. Start derfor med overall-balanse (kondensat og resirkulering krysser ikke den ytre grensen for TL).</Steg>
          <Steg><b>Overall TL-balanse:</b> <Mono>0,96·ṅ₁ = 0,983·100 = 98,3</Mono> → <Mono>ṅ₁ = 102,4 mol/s</Mono></Steg>
          <Steg><b>Overall totalbalanse:</b> <Mono>ṅ₁ = 100 + ṅ₃</Mono> → <Mono>ṅ₃ = 2,4 mol/s</Mono> (kondensert vann)</Steg>
          <Steg><b>Indre CV — blandepunktet (mix):</b> ukjente ṅ₂ og ṅ₅, og 2 balanser → <Mono>n<sub>fg</sub> = 0</Mono>.</Steg>
          <Steg>Total: <Mono>102,4 + ṅ₅ = ṅ₂</Mono>. TL: <Mono>0,96·102,4 + 0,983·ṅ₅ = 0,977·ṅ₂</Mono></Steg>
          <Steg>Substituer ṅ₂: <Mono>98,3 + 0,983·ṅ₅ = 0,977(102,4 + ṅ₅)</Mono> → <Mono>(0,983 − 0,977)·ṅ₅ ≈ 0,977·102,4 − 98,3</Mono></Steg>
          <Steg><b>Svar:</b> <Mono>ṅ₅ ≈ 290 mol/s</Mono>. Resirkuleringsforholdet ṅ₅/ṅ₁ ≈ 2,8 — mye luft sirkuleres for å treffe 2,3 %-spec'en.</Steg>
          <Tip>Dette mønsteret (inert komponent + overall-balanse først, indre CV etterpå) er <b>nesten identisk med Oppgave 1 på eksamen V2023</b> (klimaanlegg). Øv på det til det sitter.</Tip>
        </Eksempel>

        {/* Eks 3 */}
        <Eksempel n="3" title="SO₃-dannelse — omfangsmetoden (B3)">
          <p style={P}>
            <Mono>2 SO₂ + O₂ → 2 SO₃</Mono>. Inn: 100 mol/s SO₂, 50 mol/s O₂, 0 SO₃. Omdanningsgrad av SO₂ er 80 %.
            Finn utløpsstrømmene med reaksjonsomfang.
          </p>
          <Steg><b>SO₂ reagert:</b> <Mono>X·ṅ<sub>SO₂,inn</sub> = 0,80·100 = 80 mol/s</Mono></Steg>
          <Steg><b>Finn ξ:</b> <Mono>ṅ<sub>SO₂,ut</sub> = 100 + (−2)·ξ = 20</Mono> → <Mono>ξ = 40 mol/s</Mono></Steg>
          <Steg><b>O₂:</b> <Mono>ṅ<sub>O₂,ut</sub> = 50 + (−1)·40 = 10 mol/s</Mono></Steg>
          <Steg><b>SO₃:</b> <Mono>ṅ<sub>SO₃,ut</sub> = 0 + (+2)·40 = 80 mol/s</Mono></Steg>
          <Steg><b>Svar ut:</b> SO₂ 20, O₂ 10, SO₃ 80 mol/s. Poenget: én ukjent (ξ) ga alle tre strømmene.</Steg>
        </Eksempel>

        {/* Eks 4 */}
        <Eksempel n="4" title="Akrylonitril — begrensende reaktant + omdanning (B3)">
          <p style={P}>
            <Mono>C₃H₆ + NH₃ + 1½ O₂ → C₃H₃N + 3 H₂O</Mono>. Inn: 100 mol/s med 10 % C₃H₆, 12 % NH₃, 78 % luft
            (luft = 21 % O₂, 79 % N₂). Omdanning av begrensende reaktant er 30 %. Finn utløpet.
          </p>
          <Steg><b>Mol inn:</b> C₃H₆ = 10, NH₃ = 12, O₂ = 0,21·78 = 16,4, N₂ = 0,79·78 = 61,6 mol/s (N₂ inert).</Steg>
          <Steg><b>Begrensende reaktant</b> (forhold mol/koeffisient): C₃H₆ → 10/1 = 10; NH₃ → 12/1 = 12; O₂ → 16,4/1,5 = 10,9. Lavest = <b>C₃H₆</b> → begrensende.</Steg>
          <Steg><b>C₃H₆ reagert:</b> 0,30·10 = 3 → <Mono>ξ = 3 mol/s</Mono> (siden ν<sub>C₃H₆</sub> = −1).</Steg>
          <Steg><b>Utløp via ṅ<sub>i,ut</sub> = ṅ<sub>i,inn</sub> + ν<sub>i</sub>·ξ:</b></Steg>
          <Steg>
            C₃H₆: 10 − 3 = <b>7</b> · NH₃: 12 − 3 = <b>9</b> · O₂: 16,4 − 1,5·3 = <b>11,9</b><br />
            C₃H₃N: 0 + 3 = <b>3</b> · H₂O: 0 + 3·3 = <b>9</b> · N₂: <b>61,6</b> (inert) [mol/s]
          </Steg>
          <Steg>Sjekk total: 7+9+11,9+3+9+61,6 = 101,5 mol/s. Mol øker (reaksjonen gir flere mol enn den bruker) — det er greit, kun <i>masse</i> er bevart.</Steg>
        </Eksempel>

        {/* ===== SAMMENHENGER ===== */}
        <div style={{ marginTop: 28 }}>
          <SectionHeader icon={GitBranch} label="Viktige sammenhenger" title="Hvordan dette henger sammen" />
        </div>
        <Card style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 14, marginBottom: 18, alignItems: "flex-start" }}>
            <Layers size={20} style={{ color: "#06B6D4", flexShrink: 0, marginTop: 3 }} />
            <div>
              <div style={{ fontWeight: 700, color: C.text, fontSize: 17, marginBottom: 4, fontFamily: FONT_HEAD }}>
                → A4 · Materialbalanse og støkiometri (bio)
              </div>
              <p style={{ ...P, margin: 0 }}>
                Bio-siden bruker <b>nøyaktig samme balanseprinsipp</b>, men pakker reaksjonen inn i en
                «black-box»-ligning (én samlet vekstligning med utbyttekoeffisienter) i stedet for ren støkiometri.
                Kjenner du B1–B3 godt, er A4 i stor grad gjenbruk.
              </p>
            </div>
          </div>
          <div style={{ height: 1, background: C.border, margin: "18px 0" }} />
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <Target size={20} style={{ color: "#FBBF24", flexShrink: 0, marginTop: 3 }} />
            <div>
              <div style={{ fontWeight: 700, color: C.text, fontSize: 17, marginBottom: 4, fontFamily: FONT_HEAD }}>
                → B4–B6 · Energibalanser
              </div>
              <p style={{ ...P, margin: 0 }}>
                Energibalanser <b>bygger direkte på massebalansene</b> — du trenger strømmene (ṁ, ṅ) før du kan
                regne entalpi. Du <b>må</b> beherske masse først; en feil massestrøm forplanter seg rett inn i
                energiregnestykket. Reaksjonsomfang ξ går igjen i reaktive energibalanser (B6).
              </p>
            </div>
          </div>
        </Card>

        {/* ===== QUIZ ===== */}
        <SectionHeader icon={Repeat} label="Quiz" title="Test deg selv" />
        <p style={{ ...P, color: C.sub, marginTop: -10, marginBottom: 22 }}>
          Klikk kortet for å snu. Blanding av konsept- og regneoppgaver i eksamenstil.
        </p>
        <Quiz />

        <div style={{ textAlign: "center", marginTop: 56, color: C.sub, fontSize: 13, fontFamily: FONT_MONO }}>
          IMAK2005 · Del B · B1/B2/B3 · Massebalanser (Teori) · Del 1 av 4
        </div>
      </div>
    </div>
  );
}

const hd4 = {
  fontFamily: FONT_HEAD,
  fontWeight: 700,
  fontSize: 17,
  color: C.accent,
  margin: "20px 0 8px",
};
