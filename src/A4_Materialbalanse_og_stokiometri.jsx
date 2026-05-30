import React, { useMemo, useState } from "react";
import { ArrowRight, Atom, Beaker, BookOpen, Boxes, Calculator, CheckCircle2, ChevronLeft, ChevronRight, ClipboardList, GitBranch, Info, Lightbulb, RotateCw, Scale, Sigma, Target, Wind } from "lucide-react";

// ============================================================
//  IMAK2005 — A4 · Materialbalanse og støkiometri
//  Kombinert side: Teori + Eksempler & Quiz (klikkbare faner).
//  Begge delene er pakket i hver sin scope (IIFE) slik at de
//  delte hjelpe-komponentene ikke kolliderer.
// ============================================================

const WRAP_ACCENT = "#06B6D4";
const WRAP_BG = "#0F172A";
const WRAP_BORDER = "#334155";
const WRAP_TXT = "#F8FAFC";
const WRAP_SUB = "#94A3B8";

const TeoriPage = (() => {
/**
 * IMAK2005 — A4: Materialbalanse og støkiometri (bio)
 * Del 1 av 2: Header · Læringsmål · Teori · Viktige sammenhenger
 * Del 2 (eget artifact): Eksempler · Quiz
 *
 * Single-file, default export. Tailwind (base utilities) + inline styles for theme colors.
 * Consistent with A1/A2/A3. Accent: #06B6D4 (cyan).
 */

const ACCENT = "#06B6D4";
const ACCENT_BG = "rgba(6,182,212,0.1)";
const ACCENT_BORDER = "rgba(6,182,212,0.35)";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TXT = "#F8FAFC";
const TXT2 = "#94A3B8";
const FORMULA_BG = "rgba(255,255,255,0.05)";

const fontHead = "'Plus Jakarta Sans', sans-serif";
const fontBody = "'Source Sans 3', sans-serif";
const fontMono = "'JetBrains Mono', monospace";

/* ---------- Reusable bits ---------- */

function Fagbegrep({ children }) {
  return (
    <span
      style={{
        color: ACCENT,
        background: ACCENT_BG,
        borderLeft: `3px solid ${ACCENT}`,
        padding: "1px 6px 1px 6px",
        borderRadius: "3px",
        fontWeight: 600,
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
          fontFamily: fontMono,
          background: FORMULA_BG,
          border: `1px solid ${BORDER}`,
          borderRadius: "8px",
          padding: "14px 18px",
          color: TXT,
          fontSize: "15px",
          lineHeight: 1.7,
          overflowX: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {children}
      </div>
      {label && (
        <div style={{ color: TXT2, fontSize: "13px", marginTop: "5px", fontStyle: "italic" }}>
          {label}
        </div>
      )}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: "12px",
        padding: "24px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Section({ icon: Icon, label, children }) {
  return (
    <section style={{ marginBottom: "40px" }}>
      <div
        style={{
          borderLeft: `4px solid ${ACCENT}`,
          paddingLeft: "16px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {Icon && <Icon size={22} color={ACCENT} />}
        <h2
          style={{
            fontFamily: fontHead,
            fontWeight: 800,
            fontSize: "13px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: TXT,
            margin: 0,
          }}
        >
          {label}
        </h2>
      </div>
      {children}
    </section>
  );
}

function SubHead({ children }) {
  return (
    <h3
      style={{
        fontFamily: fontHead,
        fontWeight: 700,
        fontSize: "18px",
        color: TXT,
        margin: "0 0 10px 0",
      }}
    >
      {children}
    </h3>
  );
}

function P({ children, style }) {
  return (
    <p style={{ color: TXT, fontSize: "16px", lineHeight: 1.7, margin: "0 0 12px 0", ...style }}>
      {children}
    </p>
  );
}

function Callout({ title, children, tone = ACCENT }) {
  return (
    <div
      style={{
        background: "rgba(6,182,212,0.06)",
        border: `1px solid ${ACCENT_BORDER}`,
        borderRadius: "10px",
        padding: "16px 18px",
        margin: "16px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: tone,
          fontFamily: fontHead,
          fontWeight: 700,
          fontSize: "14px",
          marginBottom: "6px",
        }}
      >
        <Info size={16} /> {title}
      </div>
      <div style={{ color: TXT, fontSize: "15px", lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

/* ---------- Diagrams (inline SVG) ---------- */

function BlackBoxDiagram() {
  const inLabels = ["Substrat  CwHxOyNz", "aO₂", "bH₃N  (NH₃, N-kilde)"];
  const outLabels = ["cCHαOβNδ  (biomasse)", "dCO₂", "eH₂O", "fCjHkOlNm  (produkt)"];
  return (
    <Card style={{ overflowX: "auto" }}>
      <svg viewBox="0 0 760 300" style={{ width: "100%", minWidth: "560px" }}>
        {/* box */}
        <rect x="300" y="90" width="160" height="120" rx="10" fill="#0B1220" stroke={ACCENT} strokeWidth="2" />
        <text x="380" y="145" textAnchor="middle" fill={TXT} fontFamily={fontHead} fontWeight="700" fontSize="16">
          CELLE
        </text>
        <text x="380" y="168" textAnchor="middle" fill={TXT2} fontFamily={fontBody} fontSize="12">
          (black box)
        </text>
        {/* inputs */}
        {inLabels.map((l, i) => {
          const y = 110 + i * 40;
          return (
            <g key={`in-${i}`}>
              <text x="40" y={y + 4} fill={ACCENT} fontFamily={fontMono} fontSize="13">
                {l}
              </text>
              <line x1="250" y1={y} x2="295" y2={y} stroke={TXT2} strokeWidth="2" markerEnd="url(#arrow)" />
            </g>
          );
        })}
        {/* outputs */}
        {outLabels.map((l, i) => {
          const y = 105 + i * 32;
          return (
            <g key={`out-${i}`}>
              <line x1="465" y1={y} x2="510" y2={y} stroke={TXT2} strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="520" y={y + 4} fill={i === 3 ? TXT2 : ACCENT} fontFamily={fontMono} fontSize="13">
                {l}
              </text>
            </g>
          );
        })}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={TXT2} />
          </marker>
        </defs>
        <text x="60" y="40" fill={TXT} fontFamily={fontHead} fontWeight="700" fontSize="14">
          INN
        </text>
        <text x="700" y="40" fill={TXT} fontFamily={fontHead} fontWeight="700" fontSize="14" textAnchor="end">
          UT
        </text>
      </svg>
      <P style={{ fontSize: "14px", color: TXT2, margin: "10px 0 0 0" }}>
        Black-box-modellen ser bort fra alle indre metabolske trinn og balanserer bare det som går{" "}
        <Fagbegrep>inn</Fagbegrep> mot det som kommer <Fagbegrep>ut</Fagbegrep>. Produktleddet{" "}
        <span style={{ fontFamily: fontMono }}>fCjHkOlNm</span> droppes når biomasse er eneste produkt.
      </P>
    </Card>
  );
}

function ElementBalanceFlow() {
  const steps = [
    { t: "Skriv black-box-ligning", s: "Sett inn kjente formler for substrat, N-kilde og biomasse" },
    { t: "Sett opp 4 elementbalanser", s: "C · H · O · N — én ligning per grunnstoff" },
    { t: "Tilfør 1 ekstra ligning", s: "RQ = d/a  ELLER  elektronbalanse (grad av reduksjon)" },
    { t: "Løs for a, b, c, d, e", s: "5 ukjente, 5 ligninger" },
    { t: "Kontroll", s: "Sjekk C- og N-balanse på nytt — alt skal stemme" },
  ];
  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {steps.map((st, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div
              style={{
                flexShrink: 0,
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: ACCENT_BG,
                border: `1px solid ${ACCENT}`,
                color: ACCENT,
                fontFamily: fontHead,
                fontWeight: 700,
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {i + 1}
            </div>
            <div>
              <div style={{ color: TXT, fontWeight: 600, fontSize: "15px" }}>{st.t}</div>
              <div style={{ color: TXT2, fontSize: "14px" }}>{st.s}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------- Interactive: grad av reduksjon + O2-krav ---------- */

function GammaCalculator() {
  const [w, setW] = useState(6);
  const [x, setX] = useState(12);
  const [y, setY] = useState(6);
  const [z, setZ] = useState(0);

  const electrons = useMemo(() => 4 * w + x - 2 * y - 3 * z, [w, x, y, z]);
  const gammaPerC = useMemo(() => (w !== 0 ? electrons / w : 0), [electrons, w]);

  const field = (val, set, lab) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label style={{ color: TXT2, fontSize: "12px", fontFamily: fontMono }}>{lab}</label>
      <input
        type="number"
        step="0.01"
        value={val}
        onChange={(e) => set(parseFloat(e.target.value) || 0)}
        style={{
          width: "70px",
          background: "#0B1220",
          border: `1px solid ${BORDER}`,
          borderRadius: "6px",
          color: TXT,
          padding: "6px 8px",
          fontFamily: fontMono,
          fontSize: "14px",
          outline: "none",
        }}
      />
    </div>
  );

  return (
    <Card style={{ borderColor: ACCENT_BORDER }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <Calculator size={18} color={ACCENT} />
        <SubHead>Interaktiv: grad av reduksjon</SubHead>
      </div>
      <P style={{ fontSize: "14px", color: TXT2 }}>
        Skriv inn subskriptene for et molekyl <span style={{ fontFamily: fontMono }}>CwHxOyNz</span> (N-kilde =
        NH₃ antatt). Eks: glukose w=6, x=12, y=6, z=0.
      </P>
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", margin: "12px 0" }}>
        {field(w, setW, "w (C)")}
        {field(x, setX, "x (H)")}
        {field(y, setY, "y (O)")}
        {field(z, setZ, "z (N)")}
      </div>
      <div
        style={{
          fontFamily: fontMono,
          fontSize: "15px",
          color: TXT,
          background: FORMULA_BG,
          border: `1px solid ${BORDER}`,
          borderRadius: "8px",
          padding: "14px 16px",
        }}
      >
        <div>tilgjengelige e⁻ = 4w + x − 2y − 3z = {electrons.toFixed(2)}</div>
        <div style={{ marginTop: "6px", color: ACCENT }}>
          γ = (4w + x − 2y − 3z) / w = {gammaPerC.toFixed(3)}
        </div>
      </div>
      <P style={{ fontSize: "13px", color: TXT2, margin: "10px 0 0 0" }}>
        For biomasse (w = 1) er γB = 4 + x − 2y − 3z. Glukose gir γ = 4,0; etanol γ = 6,0.
      </P>
    </Card>
  );
}

/* ---------- Degree of reduction reference table (Tabell 4.3 / 4.11) ---------- */

function GammaTable() {
  const rows = [
    ["Escherichia coli", "CH₁.₇₇O₀.₄₉N₀.₂₄", "4,07", "Bakterie"],
    ["Aerobacter aerogenes", "CH₁.₈₃O₀.₅₅N₀.₂₅", "3,98", "Bakterie"],
    ["Klebsiella aerogenes", "CH₁.₇₅O₀.₄₃N₀.₂₂", "4,23", "Bakterie"],
    ["Pseudomonas C₁₂B", "CH₂.₀₀O₀.₅₂N₀.₂₃", "4,27", "Bakterie"],
    ["Candida utilis", "CH₁.₈₃O₀.₅₄N₀.₁₀", "4,45", "Gjær/sopp"],
    ["Saccharomyces cerevisiae", "CH₁.₆₄O₀.₅₂N₀.₁₆", "4,12", "Gjær/sopp"],
    ["Gjennomsnitt", "CH₁.₇₉O₀.₅₀N₀.₂₀", "4,19", "(σ ≈ 3 %)"],
  ];
  return (
    <Card style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "520px" }}>
        <thead>
          <tr style={{ color: ACCENT, fontFamily: fontHead, textAlign: "left" }}>
            <th style={{ padding: "8px 10px", borderBottom: `1px solid ${BORDER}` }}>Organisme</th>
            <th style={{ padding: "8px 10px", borderBottom: `1px solid ${BORDER}`, fontFamily: fontMono }}>
              Empirisk formel
            </th>
            <th style={{ padding: "8px 10px", borderBottom: `1px solid ${BORDER}` }}>γB</th>
            <th style={{ padding: "8px 10px", borderBottom: `1px solid ${BORDER}` }}>Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              style={{
                color: i === rows.length - 1 ? ACCENT : TXT,
                fontWeight: i === rows.length - 1 ? 700 : 400,
              }}
            >
              <td style={{ padding: "7px 10px", borderBottom: `1px solid ${BORDER}` }}>{r[0]}</td>
              <td style={{ padding: "7px 10px", borderBottom: `1px solid ${BORDER}`, fontFamily: fontMono }}>
                {r[1]}
              </td>
              <td style={{ padding: "7px 10px", borderBottom: `1px solid ${BORDER}`, fontFamily: fontMono }}>
                {r[2]}
              </td>
              <td style={{ padding: "7px 10px", borderBottom: `1px solid ${BORDER}`, color: TXT2 }}>{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <P style={{ fontSize: "13px", color: TXT2, margin: "10px 0 0 0" }}>
        Utdrag av <Fagbegrep>Tabell 4.3 / 4.11</Fagbegrep> (Roels, 1980). Denne tabellen ligger i{" "}
        <strong style={{ color: TXT }}>Tabeller.pdf på eksamen</strong> — du slipper å pugge γB og biomasseformel,
        men du må kunne <em>finne</em> riktig organisme og bruke verdiene.
      </P>
    </Card>
  );
}

/* ---------- RQ interpretation ---------- */

function RQBar() {
  const zones = [
    { label: "RQ < 1", txt: "Oksiderer fettsyrer · høy respirasjon · O₂-overmetning/stress", col: "#3B82F6" },
    { label: "RQ ≈ 1", txt: "Full aerob oksidasjon av karbohydrat", col: ACCENT },
    { label: "RQ > 1", txt: "Fermenteringsprodukter (etanol/acetat) · delvis anaerob / O₂-begrenset", col: "#F97316" },
  ];
  const subs = [
    ["Karbohydrater", "≈ 1,0"],
    ["Proteiner", "≈ 0,7–0,9"],
    ["Organiske syrer", "≈ 1,3"],
  ];
  return (
    <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr", marginTop: "8px" }}>
      <Card>
        <div style={{ display: "grid", gap: "10px" }}>
          {zones.map((z, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div
                style={{
                  flexShrink: 0,
                  fontFamily: fontMono,
                  fontWeight: 700,
                  color: z.col,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${z.col}`,
                  borderRadius: "6px",
                  padding: "4px 10px",
                  minWidth: "72px",
                  textAlign: "center",
                }}
              >
                {z.label}
              </div>
              <div style={{ color: TXT, fontSize: "15px", lineHeight: 1.5 }}>{z.txt}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SubHead>Forventet RQ per substrattype</SubHead>
        <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
          {subs.map((s, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: TXT2, fontSize: "14px" }}>{s[0]}</span>
              <span style={{ color: ACCENT, fontFamily: fontMono, fontSize: "18px", fontWeight: 700 }}>{s[1]}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------- Connections ---------- */

function ConnCard({ code, color, title, children }) {
  return (
    <Card style={{ borderColor: color }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        <span
          style={{
            fontFamily: fontHead,
            fontWeight: 800,
            fontSize: "13px",
            color: "#0B1220",
            background: color,
            borderRadius: "6px",
            padding: "3px 9px",
          }}
        >
          {code}
        </span>
        <span style={{ color: TXT, fontFamily: fontHead, fontWeight: 700, fontSize: "16px" }}>{title}</span>
      </div>
      <div style={{ color: TXT, fontSize: "15px", lineHeight: 1.6 }}>{children}</div>
    </Card>
  );
}

/* ---------- Main ---------- */

function A4MaterialbalanseDel1() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: TXT, fontFamily: fontBody }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0.4; }
      `}</style>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* ---------- HEADER ---------- */}
        <header style={{ marginBottom: "44px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: fontHead,
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "0.08em",
                color: "#0B1220",
                background: ACCENT,
                borderRadius: "6px",
                padding: "4px 10px",
              }}
            >
              A4
            </span>
            <span
              style={{
                fontFamily: fontHead,
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: ACCENT,
                border: `1px solid ${ACCENT}`,
                borderRadius: "6px",
                padding: "4px 10px",
              }}
            >
              Del A · Biotek
            </span>
            <span
              style={{
                fontFamily: fontMono,
                fontSize: "12px",
                color: TXT2,
                border: `1px solid ${BORDER}`,
                borderRadius: "6px",
                padding: "4px 10px",
              }}
            >
              Del 1/2 · Teori
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Boxes size={36} color={ACCENT} />
            <h1
              style={{
                fontFamily: fontHead,
                fontWeight: 800,
                fontSize: "34px",
                lineHeight: 1.1,
                margin: 0,
                color: TXT,
              }}
            >
              Materialbalanse og støkiometri (bio)
            </h1>
          </div>
          <p style={{ color: TXT2, fontSize: "17px", marginTop: "14px", maxWidth: "640px", lineHeight: 1.6 }}>
            Hvordan beskrive en hel bioprosess med én balansert ligning — og bruke den til å regne ut utbytte,
            oksygenbehov og hva cellene faktisk gjør med karbonet. Dette er det mest testede regnetemaet på
            eksamen.
          </p>
        </header>

        {/* ---------- LÆRINGSMÅL ---------- */}
        <Section icon={Target} label="Læringsmål">
          <Card>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <ArrowRight size={20} color={ACCENT} style={{ flexShrink: 0, marginTop: "3px" }} />
              <P style={{ margin: 0 }}>
                Studenten kan <strong style={{ color: TXT }}>beregne utbytte, oksygenbehov og oksygenoverføring</strong>{" "}
                i en biologisk produksjonsprosess.
              </P>
            </div>
            <P style={{ fontSize: "14px", color: TXT2, margin: "14px 0 0 0" }}>
              I praksis betyr det: sette opp en black-box-ligning, balansere koeffisientene (a–e), regne ut Yxs / Yps,
              RQ og oksygenkravet — og kunne sjekke svaret med en atombalanse.
            </P>
          </Card>
        </Section>

        {/* ---------- TEORI ---------- */}
        <Section icon={BookOpen} label="Teori">
          {/* 1. Massebalanse */}
          <SubHead>1 · Massebalanseprinsippet</SubHead>
          <P>
            Grunnregelen er enkel: <Fagbegrep>masse er bevart til enhver tid</Fagbegrep> i bioprosessering. For en
            valgt <Fagbegrep>balanserbar størrelse</Fagbegrep> B (total masse, komponentmasse, molmengde eller energi
            — men <em>ikke</em> volum, konsentrasjon, temperatur eller trykk) settes balansen opp over et{" "}
            <Fagbegrep>kontrollvolum</Fagbegrep>:
          </P>
          <Formula label="Generell balanseligning per tidsenhet (akkumulering = endring inne i systemet).">
            {`inn − ut + dannet − forbrukt = akkumulering

B_inn − B_ut + B_dannet − B_forbrukt = dB/dt`}
          </Formula>
          <P>
            Et system i balanse kan ikke ha opphopning av masse. Ved <Fagbegrep>steady-state</Fagbegrep> er alle
            systemegenskaper konstante (endrer seg ikke over tid), så akkumuleringsleddet faller bort:
          </P>
          <Formula label="Steady-state: kontinuerlig prosess med reaksjon.">
            {`masse inn + masse dannet = masse ut + masse forbrukt

B_inn + B_dannet = B_ut + B_forbrukt`}
          </Formula>
          <Formula label="For total massebalanse, atombalanse (C, N, O …), eller når reaksjonen ikke skjer.">
            {`B_inn = B_ut`}
          </Formula>

          <Callout title="Differensial vs. integrert balanse">
            <span style={{ display: "block", marginBottom: "6px" }}>
              <Fagbegrep>Differensial balanse</Fagbegrep> — basert på <strong style={{ color: TXT }}>hastighet</strong>{" "}
              (flow inn − ut), enheter som kg/t eller mol/t. Brukes på kontinuerlige prosesser.
            </span>
            <span>
              <Fagbegrep>Integrert balanse</Fagbegrep> — basert på en{" "}
              <strong style={{ color: TXT }}>tidsperiode</strong> (tilført − høstet), totale mengder. Brukes på batch.
            </span>
          </Callout>

          <P>
            Prosesstyper du må kjenne igjen:{" "}
            <Fagbegrep>batch</Fagbegrep> (lukket system, men gass kan gå inn/ut),{" "}
            <Fagbegrep>fed-batch</Fagbegrep> (kun tilførsel, volumet øker),{" "}
            <Fagbegrep>kontinuerlig</Fagbegrep> (både inn- og utstrøm, konstant volum). Ved steady-state antas at
            masseflow-hastigheter og sammensetninger ikke endrer seg, og at systemet ikke lekker (sjekkes etterpå).
          </P>

          {/* 2. Black-box */}
          <SubHead>2 · Den generelle black-box-ligningen</SubHead>
          <P>
            <Fagbegrep>Black-box-modellen</Fagbegrep> behandler cellen som en svart boks: vi balanserer bare det som
            går inn mot det som kommer ut, uten å bry oss om de indre metabolske trinnene. Den generelle ligningen for
            aerob cellevekst er:
          </P>
          <Formula label="a, b, c, d, e (og f for produkt) = støkiometriske koeffisienter. Produktleddet droppes når biomasse er eneste produkt.">
            {`CwHxOyNz + a O₂ + b HgOhNi  →  c CHαOβNδ + d CO₂ + e H₂O  ( + f CjHkOlNm )

substrat      O₂    N-kilde       biomasse      CO₂     vann      produkt`}
          </Formula>
          <BlackBoxDiagram />
          <P style={{ marginTop: "16px" }}>
            <span style={{ fontFamily: fontMono }}>CwHxOyNz</span> er substratet (C-kilde), f.eks. glukose{" "}
            <span style={{ fontFamily: fontMono }}>C₆H₁₂O₆</span>. N-kilden er som regel{" "}
            <Fagbegrep>ammoniakk NH₃</Fagbegrep> — da blir leddet{" "}
            <span style={{ fontFamily: fontMono }}>b H₃N</span> (g = 3, h = 0, i = 1). Koeffisienten{" "}
            <Fagbegrep>c</Fagbegrep> representerer den totale biomassen som dannes.
          </P>

          {/* 3. Biomasseformel + ash */}
          <SubHead>3 · Empirisk biomasseformel og ash</SubHead>
          <P>
            En mikroorganisme består av <Fagbegrep>90–95 % C, H, O og N</Fagbegrep> og{" "}
            <Fagbegrep>5–10 % «ash»</Fagbegrep> (uorganisk aske: P, S, K, salter osv.). Den biologiske delen
            beskrives med en empirisk formel basert på <strong style={{ color: TXT }}>ett karbonatom</strong>:
          </P>
          <Formula label="Generell gjennomsnittsformel for tørr biomasse (ekskl. ash).">
            {`Generell formel:  CH₁.₈O₀.₅N₀.₂      Mm ≈ 24,6 g/mol`}
          </Formula>
          <Callout title="Slik korrigerer du for ash">
            Regn først ut molvekten fra den organiske formelen, og del deretter på (1 − ash-fraksjon):
            <div style={{ fontFamily: fontMono, marginTop: "8px", color: ACCENT }}>
              Mm(celler) = Mm(organisk) / (1 − ash)
            </div>
            <span style={{ display: "block", marginTop: "6px", color: TXT2, fontSize: "14px" }}>
              Eks: Mm(organisk) = 23,9 g/mol med 5 % ash → 23,9 / 0,95 = 25,16 g/mol. Glemmer du dette, blir både c og
              Yxs feil.
            </span>
          </Callout>

          {/* 4. Koeffisientene + elementbalanse */}
          <SubHead>4 · Bestemme koeffisientene med elementbalanse</SubHead>
          <P>
            Med kjent biomasseformel har vi <Fagbegrep>5 ukjente koeffisienter</Fagbegrep> (a, b, c, d, e). Vi setter
            opp én balanse per grunnstoff — det gir 4 ligninger (C, H, O, N). For NH₃ som N-kilde:
          </P>
          <Formula label="Elementbalanser. Biomasseleddet bidrar med α, β, δ ganget med c.">
            {`C:   w        = c + d
H:   x + 3b   = α·c + 2e
O:   y + 2a   = β·c + 2d + e
N:   z + b    = δ·c`}
          </Formula>
          <P>
            Fire ligninger, fem ukjente → vi trenger <Fagbegrep>én ligning til</Fagbegrep>. Den kommer enten fra{" "}
            <Fagbegrep>RQ = d/a</Fagbegrep> (eksperimentell måling) eller fra{" "}
            <Fagbegrep>elektronbalansen</Fagbegrep> (grad av reduksjon). Ofte gir oppgaven i stedet en
            utbyttekoeffisient Yxs som låser c direkte.
          </P>
          <ElementBalanceFlow />

          {/* 5. Utbyttekoeffisienter */}
          <SubHead style={{ marginTop: "24px" }}>5 · Utbyttekoeffisienter (yields)</SubHead>
          <P>
            En <Fagbegrep>utbyttekoeffisient</Fagbegrep> Y forteller hvor mye av noe du får per enhet substrat
            forbrukt. Den brukes til å bestemme hvor mye biomasse/produkt man kan få fra en gitt mengde substrat.
          </P>
          <Formula label="Biomasseutbytte fra substrat. Kan oppgis i g/g eller mol/mol.">
            {`Yxs = biomasse produsert / substrat forbrukt = X/S

    = c · Mm(celler) / Mm(substrat)`}
          </Formula>
          <Formula label="Produktutbytte fra substrat.">
            {`Yps = produkt produsert / substrat forbrukt = P/S

    = f · Mm(produkt) / Mm(substrat)`}
          </Formula>
          <Formula label="Biomasseutbytte fra oksygen.">
            {`Yxo₂ = g biomasse / g oksygen forbrukt`}
          </Formula>
          <Callout title="Den viktigste sammenhengen på eksamen">
            Når Yxs er konstant gjennom vekstperioden kan en eksperimentell Yxs-verdi brukes til å regne ut
            koeffisienten c — løs Yxs-ligningen for c:
            <div style={{ fontFamily: fontMono, marginTop: "8px", color: ACCENT }}>
              c = Yxs · Mm(substrat) / Mm(celler)
            </div>
            <span style={{ display: "block", marginTop: "6px", color: TXT2, fontSize: "14px" }}>
              Pass på enhetene: g/g gir en dimensjonsløs c (mol biomasse per mol substrat) når Mm-ene er i g/mol. Dette
              er kjernen i V2024 oppg. 2.8, V2023 oppg. 4b og V2025 oppg. 4d.
            </span>
          </Callout>

          {/* 6. RQ */}
          <SubHead>6 · Respiratorisk kvotient (RQ)</SubHead>
          <P>
            <Fagbegrep>RQ</Fagbegrep> er et dimensjonsløst tall fra eksperimentelle gassmålinger som forteller{" "}
            <em>hvilket materiale</em> som respireres/metaboliseres:
          </P>
          <Formula label="RQ kobles direkte til black-box-koeffisientene.">
            {`RQ = mol CO₂ produsert / mol O₂ forbrukt = d / a`}
          </Formula>
          <RQBar />
          <Callout title="RQ vs. Yxs — ikke bland dem">
            <Fagbegrep>Yxs</Fagbegrep> er et masseforhold (biomasse/substrat) som sier hvor effektivt substratet blir
            til celler. <Fagbegrep>RQ</Fagbegrep> er et gassforhold (CO₂/O₂) som sier noe om{" "}
            <em>tilstanden</em> til metabolismen. Begge er utbytte-/forholdstall, men de svarer på helt forskjellige
            spørsmål.
          </Callout>

          {/* 7. Grad av reduksjon */}
          <SubHead>7 · Grad av reduksjon (gradtall, γ)</SubHead>
          <P>
            <Fagbegrep>Grad av reduksjon</Fagbegrep> γ (også skrevet δ i noen eksamener) er antall ekvivalenter
            tilgjengelige elektroner i den mengden materiale som inneholder ett gram-atom karbon. Den bygger på at{" "}
            <strong style={{ color: TXT }}>N-kilden er ammoniakk</strong>, og at forbrenning av substrat til CO₂, H₂O
            og NH₃ frigjør elektroner som overføres til O₂.
          </P>
          <Formula label="Antall tilgjengelige elektroner og grad av reduksjon for et substrat CwHxOyNz.">
            {`Antall e⁻ = 4w + x − 2y − 3z

γS = (4w + x − 2y − 3z) / w`}
          </Formula>
          <P>
            For biomasse (formel basert på <strong style={{ color: TXT }}>w = 1</strong>) blir{" "}
            <span style={{ fontFamily: fontMono }}>γB = 4 + α − 2β − 3δ</span> — som du leser rett ut av tabellen.{" "}
            <Fagbegrep>CO₂, H₂O og NH₃ har γ = 0</Fagbegrep> (red-oks-nøytrale).
          </P>
          <GammaCalculator />
          <div style={{ height: "16px" }} />
          <GammaTable />

          {/* 8. Elektronbalanse + oksygenkrav */}
          <SubHead style={{ marginTop: "24px" }}>8 · Elektronbalanse og teoretisk oksygenkrav</SubHead>
          <P>
            Tilgjengelige elektroner bevares under metabolismen. Det gir en{" "}
            <Fagbegrep>elektronbalanse</Fagbegrep> som er den femte ligningen — og samtidig en direkte vei til
            oksygenkravet (koeffisient a), siden O₂ er den endelige elektronakseptoren og tar opp 4 elektroner:
          </P>
          <Formula label="Uten produkt (biomasse eneste produkt).">
            {`w·γS − 4a = c·γB

→  a = ¼ · (w·γS − c·γB)`}
          </Formula>
          <Formula label="Med ekstracellulært produkt (j = antall C, γp = produktets grad av reduksjon).">
            {`w·γS − 4a = c·γB + f·j·γp

→  a = ¼ · (w·γS − c·γB − f·j·γp)`}
          </Formula>
          <Callout title="Hvorfor dette er gull på eksamen">
            <Fagbegrep>Oksygen er ofte den begrensende faktoren</Fagbegrep> i aerobe prosesser. Med kjent c (fra Yxs)
            og γ-verdier fra tabellen får du oksygenkravet a uten å løse hele ligningssystemet. Dette er nøyaktig det
            V2023 oppg. 4b(iv) og V2025 oppg. 4d(iii) ber om.
          </Callout>

          {/* 9. Sammenheng + sjekk + spesialtilfeller */}
          <SubHead>9 · Hvordan brikkene henger sammen</SubHead>
          <P>
            Du har to veier til å lukke ligningssystemet, og de gir samme svar:
          </P>
          <div style={{ display: "grid", gap: "12px", marginBottom: "16px" }}>
            <Card>
              <div style={{ color: ACCENT, fontFamily: fontHead, fontWeight: 700, marginBottom: "4px" }}>
                Vei 1 · Element + RQ
              </div>
              <P style={{ margin: 0, fontSize: "15px" }}>
                4 elementbalanser + RQ = d/a. Bra når oppgaven oppgir RQ eller produktledd.
              </P>
            </Card>
            <Card>
              <div style={{ color: ACCENT, fontFamily: fontHead, fontWeight: 700, marginBottom: "4px" }}>
                Vei 2 · Yxs + elektronbalanse
              </div>
              <P style={{ margin: 0, fontSize: "15px" }}>
                Yxs gir c, elektronbalansen gir a, og resten (b, d, e) faller ut av C-, N- og H-balansen. Vanligst på
                eksamen.
              </P>
            </Card>
          </div>
          <P>
            Bruk alltid <Fagbegrep>karbonbalansen</Fagbegrep> (w = c + d) og{" "}
            <Fagbegrep>nitrogenbalansen</Fagbegrep> (z + b = δc) til å <strong style={{ color: TXT }}>sjekke</strong>{" "}
            svaret til slutt — stemmer ikke C eller N, har du regnet feil et sted.
          </P>
          <Callout title="Spesielle tilfeller">
            <span style={{ display: "block", marginBottom: "5px" }}>
              <Fagbegrep>Anaerob prosess</Fagbegrep>: ingen O₂ tilgjengelig → a = 0. Elektronene må gå til et organisk
              produkt i stedet (fermentering).
            </span>
            <span style={{ display: "block", marginBottom: "5px" }}>
              <Fagbegrep>Alt karbon → biomasse</Fagbegrep>: ingen CO₂ dannes → d = 0.
            </span>
            <span>
              <Fagbegrep>Red-oks-nøytrale forbindelser</Fagbegrep> (CO₂, H₂O, NH₃) har alltid γ = 0 og bidrar ikke i
              elektronbalansen.
            </span>
          </Callout>
        </Section>

        {/* ---------- VIKTIGE SAMMENHENGER ---------- */}
        <Section icon={GitBranch} label="Viktige sammenhenger">
          <div style={{ display: "grid", gap: "14px" }}>
            <ConnCard code="A2" color="#10B981" title="Mikrobiell vekstkinetikk">
              <Scale size={15} color="#10B981" style={{ verticalAlign: "-2px", marginRight: "6px" }} />
              Yxs kobler støkiometrien til kinetikken: spesifikt substratopptak og oksygenopptak skrives som
              Q_O₂ = μ / Yxo₂. I en kjemostat ved <strong style={{ color: TXT }}>steady-state</strong> antas Yxs
              konstant, slik at biomasseproduksjonen kan beregnes fra substratforbruket.
            </ConnCard>
            <ConnCard code="A3" color="#F59E0B" title="Industrielle biologiske medier">
              <Atom size={15} color="#F59E0B" style={{ verticalAlign: "-2px", marginRight: "6px" }} />
              Valget av C-kilde og N-kilde bestemmer substratformelen CwHxOyNz — og dermed γS, RQ og hele
              støkiometrien. Sammensetningen av mediet er inngangsdataene til black-box-ligningen.
            </ConnCard>
            <ConnCard code="A5" color="#8B5CF6" title="Røring og lufttilførsel">
              <Wind size={15} color="#8B5CF6" style={{ verticalAlign: "-2px", marginRight: "6px" }} />
              Oksygenkravet (koeffisient a) fra støkiometrien er nettopp det luftsystemet må levere. Ved steady-state
              er OUR = OTR, og a setter dimensjoneringskravet til KLa og luftflow.
            </ConnCard>
            <ConnCard code="A8" color="#F97316" title="Reaktordesign">
              <Boxes size={15} color="#F97316" style={{ verticalAlign: "-2px", marginRight: "6px" }} />
              Massebalansen settes opp over hele reaktoren som kontrollvolum. Oksygenforbruket og varmeutviklingen
              (Q_met) i energibalansen er begge knyttet til den samme støkiometrien.
            </ConnCard>
          </div>

          <Callout title="Tabeller.pdf på eksamen" tone={ACCENT}>
            <span style={{ display: "block", marginBottom: "5px" }}>
              · <strong style={{ color: TXT }}>Tabell 4.3 / 4.11</strong> — empirisk formel og γB for organismer
              (E. coli, Candida utilis, S. cerevisiae m.fl.). Slå opp i stedet for å pugge.
            </span>
            <span>
              · Molekyl-/atomvekter til Mm-utregninger ligger i SI Chemical Data (Aylward & Findlay) og
              formelsamlingen. Husk ash-korreksjonen <em>etter</em> at du har slått opp atomvektene.
            </span>
          </Callout>

          <Card style={{ marginTop: "16px", borderColor: ACCENT_BORDER }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sigma size={18} color={ACCENT} />
              <span style={{ color: TXT, fontFamily: fontHead, fontWeight: 700 }}>Neste: Del 2</span>
            </div>
            <P style={{ margin: "8px 0 0 0", color: TXT2, fontSize: "15px" }}>
              Del 2 tar de fullstendige regneeksemplene (Cellulomonas/Candida black-box, Yxs → c, RQ-beregning,
              oksygenkrav) og flashcard-quiz basert på V2023/V2024/V2025.
            </P>
          </Card>
        </Section>

        <footer style={{ color: TXT2, fontSize: "13px", textAlign: "center", marginTop: "40px" }}>
          IMAK2005 · A4 Materialbalanse og støkiometri (bio) · Del 1/2 · Kilde: Forelesning 4 + Stanbury kap. 4 +
          eksamen V2023–V2025
        </footer>
      </div>
    </div>
  );
}


return A4MaterialbalanseDel1;
})();

const EksemplerQuizPage = (() => {
/**
 * IMAK2005 — A4: Materialbalanse og støkiometri (bio)
 * Del 2 av 2: Eksempler · Quiz   (standalone)
 * Accent: #06B6D4 (cyan). Konsistent med Del 1 (A1–A3).
 */

const ACCENT = "#06B6D4";
const ACCENT_BG = "rgba(6,182,212,0.1)";
const ACCENT_BORDER = "rgba(6,182,212,0.35)";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TXT = "#F8FAFC";
const TXT2 = "#94A3B8";
const FORMULA_BG = "rgba(255,255,255,0.05)";

const fontHead = "'Plus Jakarta Sans', sans-serif";
const fontBody = "'Source Sans 3', sans-serif";
const fontMono = "'JetBrains Mono', monospace";

/* ---------- bits ---------- */

function Card({ children, style }) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: "12px",
        padding: "24px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Section({ icon: Icon, label, children }) {
  return (
    <section style={{ marginBottom: "44px" }}>
      <div
        style={{
          borderLeft: `4px solid ${ACCENT}`,
          paddingLeft: "16px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {Icon && <Icon size={22} color={ACCENT} />}
        <h2
          style={{
            fontFamily: fontHead,
            fontWeight: 800,
            fontSize: "13px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: TXT,
            margin: 0,
          }}
        >
          {label}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Mono({ children, label }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <div
        style={{
          fontFamily: fontMono,
          background: FORMULA_BG,
          border: `1px solid ${BORDER}`,
          borderRadius: "8px",
          padding: "14px 18px",
          color: TXT,
          fontSize: "14.5px",
          lineHeight: 1.75,
          overflowX: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {children}
      </div>
      {label && (
        <div style={{ color: TXT2, fontSize: "13px", marginTop: "5px", fontStyle: "italic" }}>{label}</div>
      )}
    </div>
  );
}

function StepLabel({ n, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "16px 0 4px" }}>
      <span
        style={{
          flexShrink: 0,
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: ACCENT_BG,
          border: `1px solid ${ACCENT}`,
          color: ACCENT,
          fontFamily: fontHead,
          fontWeight: 700,
          fontSize: "13px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {n}
      </span>
      <span style={{ color: TXT, fontFamily: fontHead, fontWeight: 700, fontSize: "15px" }}>{children}</span>
    </div>
  );
}

function Answer({ children }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
        background: ACCENT_BG,
        border: `1px solid ${ACCENT}`,
        borderRadius: "10px",
        padding: "14px 16px",
        margin: "16px 0 8px",
      }}
    >
      <CheckCircle2 size={20} color={ACCENT} style={{ flexShrink: 0, marginTop: "2px" }} />
      <div style={{ color: TXT, fontSize: "15.5px", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function Interpret({ children }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
        color: TXT2,
        fontSize: "14.5px",
        lineHeight: 1.6,
        marginTop: "6px",
      }}
    >
      <Lightbulb size={18} color={TXT2} style={{ flexShrink: 0, marginTop: "2px" }} />
      <div>{children}</div>
    </div>
  );
}

function Example({ tag, icon: Icon, title, oppgave, children }) {
  return (
    <Card style={{ marginBottom: "22px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <span
          style={{
            fontFamily: fontHead,
            fontWeight: 800,
            fontSize: "12px",
            color: "#0B1220",
            background: ACCENT,
            borderRadius: "6px",
            padding: "3px 9px",
          }}
        >
          {tag}
        </span>
        {Icon && <Icon size={18} color={ACCENT} />}
        <span style={{ color: TXT, fontFamily: fontHead, fontWeight: 700, fontSize: "17px" }}>{title}</span>
      </div>

      <div
        style={{
          background: "#0B1220",
          border: `1px solid ${BORDER}`,
          borderLeft: `3px solid ${ACCENT}`,
          borderRadius: "8px",
          padding: "14px 16px",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            color: ACCENT,
            fontFamily: fontHead,
            fontWeight: 700,
            fontSize: "12px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          Oppgave
        </div>
        <div style={{ color: TXT, fontSize: "15px", lineHeight: 1.6 }}>{oppgave}</div>
      </div>

      {children}
    </Card>
  );
}

/* ---------- Quiz flashcards ---------- */

const CARDS = [
  {
    type: "Konsept",
    q: "Hva er den generelle black-box-ligningen for en aerob bioprosess?",
    a: (
      <>
        <div style={{ fontFamily: fontMono, fontSize: "14px", lineHeight: 1.7 }}>
          CwHxOyNz + a O₂ + b H₃N → c CHαOβNδ + d CO₂ + e H₂O ( + f CjHkOlNm )
        </div>
        <div style={{ marginTop: "8px" }}>
          Substrat + oksygen + N-kilde (NH₃) → biomasse + CO₂ + vann (+ evt. produkt). a–f er støkiometriske
          koeffisienter; c representerer total biomasse.
        </div>
      </>
    ),
  },
  {
    type: "Beregning",
    q: "Beregn Yxs: 0,7 g/L startceller, 35 g/L glukose, 0,35 kg biomasse høstet (5 L), 1,2 g/L restglukose.",
    a: (
      <>
        <div style={{ fontFamily: fontMono, fontSize: "13.5px", lineHeight: 1.7 }}>
          Xslutt = 350 g / 5 L = 70 g/L{"\n"}
          Yxs = ΔX/ΔS = (70 − 0,7)/(35 − 1,2){"\n"}
          = 69,3 / 33,8 = 2,05 g/g
        </div>
        <div style={{ marginTop: "8px" }}>Svar: Yxs ≈ 2,05 g biomasse per g glukose.</div>
      </>
    ),
  },
  {
    type: "Konsept",
    q: "Hva betyr RQ = 1,2?",
    a: (
      <>
        RQ = mol CO₂ / mol O₂ &gt; 1. Cellene produserer fermenteringsprodukter (f.eks. etanol eller acetat), og
        prosessen er trolig delvis anaerob eller O₂-begrenset — det dannes mer CO₂ enn ren aerob oksidasjon av
        karbohydrat tilsier (RQ ≈ 1).
      </>
    ),
  },
  {
    type: "Konsept",
    q: "Hvorfor korrigerer vi for ash når vi beregner biomasse-koeffisienten?",
    a: (
      <>
        Den empiriske formelen CHαOβNδ dekker bare den organiske delen (90–95 %). De resterende 5–10 % er «ash»
        (uorganiske salter). Reell molvekt er derfor høyere:
        <div style={{ fontFamily: fontMono, fontSize: "14px", marginTop: "8px", color: ACCENT }}>
          Mm(celler) = Mm(organisk) / (1 − ash)
        </div>
        <div style={{ marginTop: "6px" }}>Glemmer du dette blir Mm for lav, og både c og Yxs blir feil.</div>
      </>
    ),
  },
  {
    type: "Beregning",
    q: "Sett opp C-balansen for: C₆H₁₂O₆ + b NH₃ → c CH₁.₈O₀.₅N₀.₂ + d CO₂ + e H₂O",
    a: (
      <>
        Karbon inn = karbon ut. Substratet har 6 C; biomasse har 1 C per formelenhet (×c), CO₂ har 1 (×d):
        <div style={{ fontFamily: fontMono, fontSize: "15px", marginTop: "8px", color: ACCENT }}>
          C: 6 = c + d
        </div>
      </>
    ),
  },
  {
    type: "Beregning",
    q: "Beregn grad av reduksjon γS for glukose (C₆H₁₂O₆).",
    a: (
      <>
        <div style={{ fontFamily: fontMono, fontSize: "14px", lineHeight: 1.7 }}>
          γS = (4w + x − 2y − 3z)/w{"\n"}
          = (4·6 + 12 − 2·6 − 0)/6{"\n"}
          = (24 + 12 − 12)/6 = 24/6 = 4,0
        </div>
        <div style={{ marginTop: "8px" }}>Svar: γS = 4,0 (typisk for karbohydrat).</div>
      </>
    ),
  },
  {
    type: "Konsept",
    q: "Anaerob prosess der alt karbon går til biomasse — hvilke koeffisienter blir null?",
    a: (
      <>
        <strong style={{ color: TXT }}>a = 0</strong> (ingen O₂ tilført under anaerobe forhold) og{" "}
        <strong style={{ color: TXT }}>d = 0</strong> (ingen CO₂ dannes når alt karbon ender i biomasse).
        Ligningen reduseres til: substrat + b NH₃ → c biomasse + e H₂O.
      </>
    ),
  },
  {
    type: "Beregning",
    q: "Skriv formelen for teoretisk oksygenkrav a (uten produkt), og forklar tallet 4.",
    a: (
      <>
        <div style={{ fontFamily: fontMono, fontSize: "15px", color: ACCENT }}>
          a = ¼ · (w·γS − c·γB)
        </div>
        <div style={{ marginTop: "8px" }}>
          Den følger av elektronbalansen w·γS − 4a = c·γB. Tallet 4 fordi ett O₂-molekyl tar opp 4 elektroner (O₂ er
          endelig elektronakseptor).
        </div>
      </>
    ),
  },
  {
    type: "Konsept",
    q: "Hva er forskjellen på Yxs og RQ?",
    a: (
      <>
        <strong style={{ color: TXT }}>Yxs</strong> er et masseforhold (g biomasse / g substrat) — hvor effektivt
        substratet omdannes til celler. <strong style={{ color: TXT }}>RQ</strong> er et gassforhold (mol CO₂ / mol
        O₂) — forteller om <em>tilstanden</em> til metabolismen. Begge er forholdstall, men svarer på ulike spørsmål.
      </>
    ),
  },
  {
    type: "Beregning",
    q: "Beregn c når Yxs = 0,27 g/g, Mm(metanol) = 32,04 g/mol, Mm(biomasse m/ash) = 23,97 g/mol.",
    a: (
      <>
        <div style={{ fontFamily: fontMono, fontSize: "14px", lineHeight: 1.7 }}>
          c = Yxs · Mm(substrat)/Mm(celler){"\n"}
          = 0,27 · 32,04 / 23,97{"\n"}
          = 0,36
        </div>
        <div style={{ marginTop: "8px" }}>Svar: c ≈ 0,36 mol biomasse per mol metanol.</div>
      </>
    ),
  },
];

function Quiz() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = CARDS[i];

  const go = (dir) => {
    setFlipped(false);
    setI((p) => (p + dir + CARDS.length) % CARDS.length);
  };

  return (
    <div>
      <div style={{ perspective: "1600px", marginBottom: "16px" }}>
        <div
          onClick={() => setFlipped((f) => !f)}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "260px",
            cursor: "pointer",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRONT */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderTop: `3px solid ${ACCENT}`,
              borderRadius: "14px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                fontFamily: fontMono,
                fontSize: "11px",
                color: card.type === "Beregning" ? ACCENT : TXT2,
                border: `1px solid ${card.type === "Beregning" ? ACCENT : BORDER}`,
                borderRadius: "6px",
                padding: "2px 8px",
              }}
            >
              {card.type}
            </span>
            <div style={{ color: TXT, fontFamily: fontHead, fontWeight: 700, fontSize: "19px", lineHeight: 1.45 }}>
              {card.q}
            </div>
            <div style={{ position: "absolute", bottom: "16px", display: "flex", alignItems: "center", gap: "6px", color: TXT2, fontSize: "13px" }}>
              <RotateCw size={14} /> Klikk for å snu
            </div>
          </div>

          {/* BACK */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "#0B1220",
              border: `1px solid ${ACCENT_BORDER}`,
              borderTop: `3px solid ${ACCENT}`,
              borderRadius: "14px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflowY: "auto",
            }}
          >
            <div style={{ color: ACCENT, fontFamily: fontHead, fontWeight: 800, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
              Svar
            </div>
            <div style={{ color: TXT, fontSize: "15.5px", lineHeight: 1.6 }}>{card.a}</div>
          </div>
        </div>
      </div>

      {/* controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <button
          onClick={() => go(-1)}
          style={navBtn}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = ACCENT)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = BORDER)}
        >
          <ChevronLeft size={18} /> Forrige
        </button>
        <span style={{ color: TXT2, fontFamily: fontMono, fontSize: "14px" }}>
          Kort {i + 1} av {CARDS.length}
        </span>
        <button
          onClick={() => go(1)}
          style={navBtn}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = ACCENT)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = BORDER)}
        >
          Neste <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

const navBtn = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  background: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: "10px",
  color: TXT,
  fontFamily: fontHead,
  fontWeight: 600,
  fontSize: "14px",
  padding: "10px 16px",
  cursor: "pointer",
  transition: "border-color 0.2s",
};

/* ---------- Main ---------- */

function A4MaterialbalanseDel2() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: TXT, fontFamily: fontBody }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* HEADER */}
        <header style={{ marginBottom: "44px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span style={{ fontFamily: fontHead, fontWeight: 800, fontSize: "13px", letterSpacing: "0.08em", color: "#0B1220", background: ACCENT, borderRadius: "6px", padding: "4px 10px" }}>
              A4
            </span>
            <span style={{ fontFamily: fontHead, fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: ACCENT, border: `1px solid ${ACCENT}`, borderRadius: "6px", padding: "4px 10px" }}>
              Del A · Biotek
            </span>
            <span style={{ fontFamily: fontMono, fontSize: "12px", color: TXT2, border: `1px solid ${BORDER}`, borderRadius: "6px", padding: "4px 10px" }}>
              Del 2/2 · Eksempler & Quiz
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Calculator size={34} color={ACCENT} />
            <h1 style={{ fontFamily: fontHead, fontWeight: 800, fontSize: "32px", lineHeight: 1.1, margin: 0, color: TXT }}>
              Materialbalanse og støkiometri — Eksempler og Quiz
            </h1>
          </div>
          <p style={{ color: TXT2, fontSize: "17px", marginTop: "14px", maxWidth: "660px", lineHeight: 1.6 }}>
            Fem fullt utregnede eksempler i eksamensformat — hver eneste steg er vist — etterfulgt av flashcard-quiz.
            Metode og tall følger løsningsforslagene fra V2023–V2025.
          </p>
        </header>

        {/* EKSEMPLER */}
        <Section icon={ClipboardList} label="Eksempler">
          {/* a) Yxs */}
          <Example
            tag="a"
            icon={Beaker}
            title="Beregne utbyttekoeffisient Yxs"
            oppgave={
              <>
                Candida utilis dyrkes i en kontinuerlig kultur på <strong style={{ color: TXT }}>5,0 L</strong> med
                glukose som karbonkilde. Prosessen startet med <strong style={{ color: TXT }}>0,7 g/L</strong> celler
                og <strong style={{ color: TXT }}>35 g/L</strong> glukose. Det ble høstet{" "}
                <strong style={{ color: TXT }}>0,35 kg</strong> biomasse, og restglukosen var{" "}
                <strong style={{ color: TXT }}>1,2 g/L</strong>. Bestem Yxs.
              </>
            }
          >
            <StepLabel n="1">Gjør alle størrelser om til samme enhet (g/L)</StepLabel>
            <Mono label="Total biomasse / volum gir sluttkonsentrasjonen.">
              {`Volum: V = 5,0 L
Biomasse start:  X₀ = 0,7 g/L
Biomasse høstet: 0,35 kg = 350 g  →  Xₜ = 350 g / 5,0 L = 70 g/L
Glukose start:   S₀ = 35 g/L
Glukose slutt:   Sₜ = 1,2 g/L`}
            </Mono>

            <StepLabel n="2">Sett inn i definisjonen Yxs = forbrukt biomasse / forbrukt substrat</StepLabel>
            <Mono label="ΔX = produsert biomasse, ΔS = forbrukt substrat. Volumet forkortes bort.">
              {`Yxs = ΔX / ΔS = (Xₜ − X₀) / (S₀ − Sₜ)
    = (70 − 0,7) g/L / (35 − 1,2) g/L
    = 69,3 / 33,8
    = 2,05 g/g`}
            </Mono>

            <Answer>
              <strong>Yxs ≈ 2,05 g biomasse per g glukose.</strong>
            </Answer>
            <Interpret>
              Yxs sier hvor mye biomasse du får per gram substrat — bruk den til å forutsi utbytte eller til å regne ut
              koeffisienten c (se eksempel c). Merk at volumet alltid forkortes vekk i et g/g-utbytte.
            </Interpret>
          </Example>

          {/* b) Komplett black-box (anaerob) */}
          <Example
            tag="b"
            icon={Sigma}
            title="Komplett black-box-ligning via elementbalanser"
            oppgave={
              <>
                Cellulomonas (<span style={{ fontFamily: fontMono }}>CH₁.₅₆O₀.₅₄N₀.₁₆</span>) dyrkes{" "}
                <strong style={{ color: TXT }}>anaerobt</strong> på glukose (
                <span style={{ fontFamily: fontMono }}>C₆H₁₂O₆</span>). N-kilden er ammoniakk, og{" "}
                <strong style={{ color: TXT }}>alt karbon</strong> fra substratet omdannes til biomasse. Sett opp en
                balansert reaksjonsligning.
              </>
            }
          >
            <StepLabel n="1">Skriv skjelettligningen og bruk de spesielle betingelsene</StepLabel>
            <Mono label="Anaerob → ingen O₂ → a = 0.  Alt karbon → biomasse → ingen CO₂ → d = 0.">
              {`C₆H₁₂O₆ + b NH₃  →  c CH₁.₅₆O₀.₅₄N₀.₁₆ + d CO₂ + e H₂O

a = 0  (anaerob),   d = 0  (alt C → biomasse)`}
            </Mono>

            <StepLabel n="2">Sett opp én elementbalanse per grunnstoff</StepLabel>
            <Mono>
              {`C:  6        = c + d        (= c, siden d = 0)
H:  12 + 3b  = 1,56·c + 2e
O:  6        = 0,54·c + 2d + e   (= 0,54c + e)
N:  b        = 0,16·c`}
            </Mono>

            <StepLabel n="3">Løs ligningene i rekkefølge</StepLabel>
            <Mono label="C-balansen gir c direkte; deretter O-balansen, så N, og H til slutt.">
              {`C:  c = 6
N:  b = 0,16 · 6 = 0,96
O:  6 = 0,54·6 + e  →  6 = 3,24 + e  →  e = 2,76`}
            </Mono>

            <StepLabel n="4">Kontroller med H-balansen</StepLabel>
            <Mono label="Venstre = høyre → ligningen er korrekt balansert.">
              {`H venstre: 12 + 3·0,96 = 12 + 2,88 = 14,88
H høyre:   1,56·6 + 2·2,76 = 9,36 + 5,52 = 14,88   ✓`}
            </Mono>

            <Answer>
              <span style={{ fontFamily: fontMono, fontSize: "14.5px" }}>
                C₆H₁₂O₆ + 0,96 NH₃ → 6 CH₁.₅₆O₀.₅₄N₀.₁₆ + 2,76 H₂O
              </span>
            </Answer>
            <Interpret>
              Strategien er alltid: identifiser spesialbetingelser (a, d = 0 her) → C-balanse gir c → så N → så O →
              bruk H som uavhengig kontroll. Hvis H ikke stemmer, har du regnet feil.
            </Interpret>
          </Example>

          {/* c) Biomasse-koeffisient c med ash */}
          <Example
            tag="c"
            icon={Calculator}
            title="Biomasse-koeffisient c med ash-korreksjon"
            oppgave={
              <>
                En organisme med biomasseformel <span style={{ fontFamily: fontMono }}>CH₁.₆₈O₀.₃₆N₀.₂₂</span> dyrkes
                på metanol (<span style={{ fontFamily: fontMono }}>CH₃OH</span>). Målt{" "}
                <strong style={{ color: TXT }}>Yxs = 0,27 g/g</strong>, og cellene inneholder{" "}
                <strong style={{ color: TXT }}>6 % ash</strong>. Beregn biomasse-koeffisienten c.
              </>
            }
          >
            <StepLabel n="1">Regn ut molvekten til substratet</StepLabel>
            <Mono label="Atomvekter: C 12,01 · H 1,008 · O 16,00 (slå opp i SI Chemical Data på eksamen).">
              {`Mm(CH₃OH) = 12,01 + 4·1,008 + 16,00 = 32,04 g/mol`}
            </Mono>

            <StepLabel n="2">Regn ut organisk molvekt for biomassen (per 1 C-atom)</StepLabel>
            <Mono>
              {`Mm(organisk) = 12,01 + 1,68·1,008 + 0,36·16,00 + 0,22·14,01
             = 12,01 + 1,69 + 5,76 + 3,08
             ≈ 22,53 g/mol`}
            </Mono>

            <StepLabel n="3">Korriger for ash</StepLabel>
            <Mono label="Den organiske formelen dekker bare 94 % av massen ved 6 % ash.">
              {`Mm(celler) = Mm(organisk) / (1 − ash)
           = 22,53 / (1 − 0,06)
           = 22,53 / 0,94
           = 23,97 g/mol`}
            </Mono>

            <StepLabel n="4">Løs Yxs-ligningen for c</StepLabel>
            <Mono label="Yxs = c·Mm(celler)/Mm(substrat)  →  c = Yxs·Mm(substrat)/Mm(celler).">
              {`c = Yxs · Mm(substrat) / Mm(celler)
  = 0,27 · 32,04 / 23,97
  = 0,27 · 1,337
  = 0,36`}
            </Mono>

            <Answer>
              <strong>c ≈ 0,36</strong> mol biomasse per mol metanol.
            </Answer>
            <Interpret>
              Rekkefølgen er kritisk: regn organisk molvekt <em>først</em>, korriger så for ash (deler på 1−ash → øker
              molvekten), og sett til slutt inn i c-formelen. Ash-korreksjonen senker c — hopper du over den, blir c
              for høy.
            </Interpret>
          </Example>

          {/* d) RQ fra gassmålinger */}
          <Example
            tag="d"
            icon={Wind}
            title="RQ-beregning fra gassmålinger"
            oppgave={
              <>
                Innluften er tørr og inneholder <strong style={{ color: TXT }}>20,9 % O₂</strong>,{" "}
                <strong style={{ color: TXT }}>79,1 % N₂</strong> (CO₂ ≈ 0). Avgassen måles til{" "}
                <strong style={{ color: TXT }}>17,2 % O₂</strong>, <strong style={{ color: TXT }}>4,0 % CO₂</strong>{" "}
                og <strong style={{ color: TXT }}>78,8 % N₂</strong>. Beregn RQ.
              </>
            }
          >
            <StepLabel n="1">Bruk N₂ som inert «tie element»</StepLabel>
            <Mono label="N₂ verken dannes eller forbrukes → mol N₂ inn = mol N₂ ut. Velg basis 100 mol avgass.">
              {`Basis: 100 mol avgass
N₂ ut = 78,8 mol   →   N₂ inn = 78,8 mol  (inert, bevart)`}
            </Mono>

            <StepLabel n="2">Finn molstrømmene av O₂ og CO₂ på begge sider</StepLabel>
            <Mono label="Totalstrøm inn finnes fra N₂-andelen i innluften.">
              {`Total inn = N₂ inn / 0,791 = 78,8 / 0,791 = 99,6 mol
O₂ inn   = 0,209 · 99,6 = 20,8 mol
CO₂ inn  ≈ 0

O₂ ut    = 17,2 mol   (av 100 mol avgass)
CO₂ ut   = 4,0 mol`}
            </Mono>

            <StepLabel n="3">Regn ut forbrukt O₂ og produsert CO₂</StepLabel>
            <Mono>
              {`O₂ forbrukt   = O₂ inn − O₂ ut = 20,8 − 17,2 = 3,6 mol
CO₂ produsert = CO₂ ut − CO₂ inn = 4,0 − 0 = 4,0 mol`}
            </Mono>

            <StepLabel n="4">Sett inn i RQ-definisjonen</StepLabel>
            <Mono>
              {`RQ = mol CO₂ produsert / mol O₂ forbrukt = 4,0 / 3,6 = 1,11`}
            </Mono>

            <Answer>
              <strong>RQ ≈ 1,1.</strong>
            </Answer>
            <Interpret>
              RQ litt over 1 tyder på begynnende fermentering / O₂-begrensning — det dannes mer CO₂ enn ren aerob
              oksidasjon (RQ ≈ 1) skulle tilsi. Nøkkelgrepet er N₂-tie-element-metoden: siden inn- og utstrøm ikke er
              like store, kan du ikke trekke molfraksjoner rett fra hverandre.
            </Interpret>
          </Example>

          {/* e) Oksygenkrav */}
          <Example
            tag="e"
            icon={Wind}
            title="Teoretisk oksygenkrav via grad av reduksjon"
            oppgave={
              <>
                For samme metanol-prosess som i eksempel c (substrat{" "}
                <span style={{ fontFamily: fontMono }}>CH₃OH</span>, biomasse{" "}
                <span style={{ fontFamily: fontMono }}>CH₁.₆₈O₀.₃₆N₀.₂₂</span>, c = 0,36): beregn oksygenkravet a (mol
                O₂ per mol substrat).
              </>
            }
          >
            <StepLabel n="1">Regn ut grad av reduksjon for substrat og biomasse</StepLabel>
            <Mono label="Metanol som CH₄O: w=1, x=4, y=1, z=0. Biomasse har w=1.">
              {`γS = (4w + x − 2y − 3z)/w = (4 + 4 − 2 − 0)/1 = 6,0
γB = 4 + 1,68 − 2·0,36 − 3·0,22 = 4 + 1,68 − 0,72 − 0,66 = 4,30`}
            </Mono>

            <StepLabel n="2">Bruk elektronbalansen (uten produkt)</StepLabel>
            <Mono label="O₂ tar opp 4 e⁻, derfor faktoren ¼.">
              {`w·γS − 4a = c·γB
→ a = ¼·(w·γS − c·γB)
    = ¼·(1·6,0 − 0,36·4,30)
    = ¼·(6,0 − 1,55)
    = ¼·4,45
    = 1,1`}
            </Mono>

            <Answer>
              <strong>a ≈ 1,1 mol O₂ per mol metanol.</strong>
            </Answer>
            <Interpret>
              Med kjent c (fra Yxs) og γ-verdier fra tabellen får du oksygenkravet uten å løse hele
              ligningssystemet. Dette oksygenkravet er det luftsystemet (KLa, OTR) i A5 må klare å levere.
            </Interpret>
          </Example>
        </Section>

        {/* QUIZ */}
        <Section icon={Lightbulb} label="Quiz — flashcards">
          <p style={{ color: TXT2, fontSize: "15px", marginBottom: "18px", lineHeight: 1.6 }}>
            Klikk kortet for å snu. Blanding av konsept- og regnespørsmål, inspirert av V2023–V2025.
          </p>
          <Quiz />
        </Section>

        <footer style={{ color: TXT2, fontSize: "13px", textAlign: "center", marginTop: "44px" }}>
          IMAK2005 · A4 Materialbalanse og støkiometri (bio) · Del 2/2 · Eksempler etter LF V2023–V2025
        </footer>
      </div>
    </div>
  );
}


return A4MaterialbalanseDel2;
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
          A4 · Materialbalanse og støkiometri
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
