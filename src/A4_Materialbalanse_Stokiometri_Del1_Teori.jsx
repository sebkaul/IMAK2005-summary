import React, { useState, useMemo } from "react";
import {
  Boxes,
  Target,
  BookOpen,
  GitBranch,
  Scale,
  Atom,
  Wind,
  Calculator,
  Sigma,
  Info,
  ArrowRight,
} from "lucide-react";

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

export default function A4MaterialbalanseDel1() {
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
