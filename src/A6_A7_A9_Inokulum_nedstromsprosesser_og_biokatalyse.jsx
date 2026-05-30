import React, { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";

// ============================================================
//  IMAK2005 — A6/A7/A9 · Inokulum, nedstrømsprosesser og biokatalyse
//  Kombinert side: Teori + Eksempler & Quiz (klikkbare faner).
//  Begge delene er pakket i hver sin scope (IIFE) slik at de
//  delte hjelpe-komponentene ikke kolliderer.
// ============================================================

const WRAP_ACCENT = "#EC4899";
const WRAP_BG = "#0F172A";
const WRAP_BORDER = "#334155";
const WRAP_TXT = "#F8FAFC";
const WRAP_SUB = "#94A3B8";

const TeoriPage = (() => {
/*
  IMAK2005 — Del A (Bioteknologisk prosessteknologi)
  A6 / A7 / A9 — Inokulum, nedstrømsprosesser og biokatalyse
  PART 1 av 2: Header, Læringsmål, Teori, Viktige sammenhenger
  Aksentfarge: #EC4899 (pink)
*/

const ACCENT = "#EC4899";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TEXT = "#F8FAFC";
const TEXT2 = "#94A3B8";

/* ---------- byggeklosser (identiske med Del 2) ---------- */

function SectionLabel({ children }) {
  return (
    <div
      style={{
        borderLeft: `4px solid ${ACCENT}`,
        paddingLeft: 14,
        marginBottom: 22,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: 13,
        color: ACCENT,
      }}
    >
      {children}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: 24,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Formula({ children }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${BORDER}`,
        borderRadius: 8,
        padding: "12px 16px",
        margin: "12px 0",
        fontSize: 15,
        color: TEXT,
        overflowX: "auto",
      }}
    >
      {children}
    </div>
  );
}

function Fag({ children }) {
  return (
    <span
      style={{
        color: ACCENT,
        background: "rgba(236,72,153,0.10)",
        borderLeft: `3px solid ${ACCENT}`,
        padding: "1px 7px",
        borderRadius: 4,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

function Pill({ children }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: ACCENT,
        color: BG,
        fontWeight: 700,
        fontSize: 12,
        padding: "3px 10px",
        borderRadius: 999,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {children}
    </span>
  );
}

function SubDivider({ part, title }) {
  return (
    <div style={{ margin: "10px 0 26px" }}>
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
          borderRadius: 3,
          marginBottom: 16,
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: ACCENT,
            fontSize: 14,
            border: `1px solid ${ACCENT}`,
            borderRadius: 8,
            padding: "4px 10px",
          }}
        >
          {part}
        </span>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 24,
            color: TEXT,
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

/* labelled bullet block */
function Block({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h4 style={h4}>{title}</h4>
      <div>{children}</div>
    </div>
  );
}

function Li({ children }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
      <span style={{ color: ACCENT, flex: "0 0 auto", lineHeight: 1.6 }}>▸</span>
      <span style={{ color: TEXT, lineHeight: 1.6, fontSize: 16 }}>{children}</span>
    </div>
  );
}

/* ---------- inline SVG: oppskaleringspyramide ---------- */

function ScaleUpSVG() {
  const stages = [
    { label: "Kryorør · 2 mL", w: 90 },
    { label: "Shake flask · 0,1 L", w: 150 },
    { label: "Frøkultur · 2 L", w: 220 },
    { label: "Seed-fermentor · 40 L", w: 300 },
    { label: "Seed-tank · 500 L  (5 %)", w: 390 },
    { label: "Produksjonsreaktor · 10 000 L", w: 470 },
  ];
  const cx = 250;
  return (
    <svg viewBox="0 0 500 320" width="100%" style={{ maxWidth: 500 }}>
      {stages.map((s, i) => {
        const y = 12 + i * 48;
        return (
          <g key={i}>
            <rect
              x={cx - s.w / 2}
              y={y}
              width={s.w}
              height={36}
              rx={7}
              fill={`rgba(236,72,153,${0.12 + i * 0.13})`}
              stroke={ACCENT}
              strokeWidth="1"
            />
            <text x={cx} y={y + 23} textAnchor="middle" fontSize="13" fill={TEXT} fontFamily="'Source Sans 3', sans-serif">
              {s.label}
            </text>
            {i < stages.length - 1 && (
              <text x={cx + s.w / 2 + 6} y={y + 56} fontSize="11" fill={TEXT2} fontFamily="'JetBrains Mono', monospace">
                ×20
              </text>
            )}
          </g>
        );
      })}
      <text x={cx} y={314} textAnchor="middle" fontSize="11" fill={TEXT2} fontFamily="'JetBrains Mono', monospace">
        hvert trinn = ~5 % inokulum av neste trinn
      </text>
    </svg>
  );
}

/* ---------- inline SVG: nedstrømsflyt (5 trinn) ---------- */

function DownstreamSVG() {
  const steps = [
    { n: 1, t: "Celleseparasjon", m: "filtrering · sentrifugering" },
    { n: 2, t: "Celleknusing", m: "kun intracellulært · homogenisator, lysozym" },
    { n: 3, t: "Grovrensing / isolering", m: "utfelling · ekstraksjon · adsorpsjon" },
    { n: 4, t: "Finrensing", m: "kromatografi · ultrafiltrering" },
    { n: 5, t: "Polering før salg", m: "krystallisering · filtrering · tørking" },
  ];
  return (
    <svg viewBox="0 0 520 360" width="100%" style={{ maxWidth: 520 }}>
      {steps.map((s, i) => {
        const y = 8 + i * 70;
        const dashed = s.n === 2;
        return (
          <g key={i}>
            <rect
              x={20}
              y={y}
              width={480}
              height={50}
              rx={9}
              fill="#172033"
              stroke={ACCENT}
              strokeWidth="1.2"
              strokeDasharray={dashed ? "6 4" : "0"}
            />
            <circle cx={48} cy={y + 25} r={15} fill="rgba(236,72,153,0.18)" />
            <text x={48} y={y + 30} textAnchor="middle" fontSize="15" fontWeight="700" fill={ACCENT} fontFamily="'JetBrains Mono', monospace">
              {s.n}
            </text>
            <text x={78} y={y + 21} fontSize="15" fontWeight="700" fill={TEXT} fontFamily="'Plus Jakarta Sans', sans-serif">
              {s.t}
            </text>
            <text x={78} y={y + 39} fontSize="12.5" fill={TEXT2} fontFamily="'Source Sans 3', sans-serif">
              {s.m}
            </text>
            {i < steps.length - 1 && (
              <path d={`M260 ${y + 50} L260 ${y + 70}`} stroke={ACCENT} strokeWidth="2" markerEnd="url(#arr)" />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arr" markerWidth="9" markerHeight="9" refX="4.5" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 z" fill={ACCENT} />
        </marker>
      </defs>
    </svg>
  );
}

/* ---------- inline SVG: ee vs omsetning (irreversibel oppløsning) ---------- */

function EeSVG() {
  // produkt: høy ee tidlig, faller; substrat: lav tidlig, stiger
  const W = 360, H = 220, x0 = 44, y0 = 180, xw = 290, yh = 150;
  const px = (c) => x0 + (c / 100) * xw;
  const py = (e) => y0 - (e / 100) * yh;
  const product = [];
  const substrate = [];
  for (let c = 0; c <= 100; c += 5) {
    product.push([px(c), py(Math.max(0, 99 - Math.pow(c / 100, 2.6) * 99))]);
    substrate.push([px(c), py(Math.min(99, Math.pow(c / 100, 2.6) * 99 + 2))]);
  }
  const toPath = (pts) => pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 380 }}>
      {/* akser */}
      <line x1={x0} y1={y0} x2={x0 + xw} y2={y0} stroke={TEXT2} strokeWidth="1" />
      <line x1={x0} y1={y0} x2={x0} y2={y0 - yh} stroke={TEXT2} strokeWidth="1" />
      <line x1={px(50)} y1={y0} x2={px(50)} y2={y0 - yh} stroke={BORDER} strokeDasharray="4 4" strokeWidth="1" />
      <text x={px(50)} y={y0 + 16} textAnchor="middle" fontSize="11" fill={TEXT2} fontFamily="'JetBrains Mono', monospace">50 %</text>
      <text x={x0 + xw / 2} y={H - 4} textAnchor="middle" fontSize="12" fill={TEXT2}>omsetning (conversion %)</text>
      <text x={12} y={y0 - yh / 2} fontSize="12" fill={TEXT2} transform={`rotate(-90 12 ${y0 - yh / 2})`} textAnchor="middle">ee (%)</text>
      {/* kurver */}
      <path d={toPath(product)} fill="none" stroke={ACCENT} strokeWidth="2.4" />
      <path d={toPath(substrate)} fill="none" stroke="#60A5FA" strokeWidth="2.4" />
      <text x={px(14)} y={py(96)} fontSize="12" fill={ACCENT} fontWeight="700">eeₚ (produkt)</text>
      <text x={px(60)} y={py(92)} fontSize="12" fill="#60A5FA" fontWeight="700">eeₛ (substrat)</text>
    </svg>
  );
}

/* ---------- inline SVG: Michaelis–Menten (IMAK2003-referanse) ---------- */

function MMSVG() {
  const W = 360, H = 210, x0 = 44, y0 = 170, xw = 290, yh = 140;
  const Vmax = 100, Km = 18;
  const px = (s) => x0 + (s / 100) * xw;
  const py = (v) => y0 - (v / Vmax) * yh;
  const pts = [];
  for (let s = 0; s <= 100; s += 2) pts.push([px(s), py((Vmax * s) / (Km + s))]);
  const path = pts.map((p, i) => (i ? "L" : "M") + p[0] + " " + p[1]).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 380 }}>
      <line x1={x0} y1={y0} x2={x0 + xw} y2={y0} stroke={TEXT2} strokeWidth="1" />
      <line x1={x0} y1={y0} x2={x0} y2={y0 - yh} stroke={TEXT2} strokeWidth="1" />
      <line x1={x0} y1={py(Vmax)} x2={x0 + xw} y2={py(Vmax)} stroke={TEXT2} strokeDasharray="4 4" strokeWidth="1" />
      <text x={x0 + xw - 4} y={py(Vmax) - 5} textAnchor="end" fontSize="11" fill={TEXT2} fontFamily="'JetBrains Mono', monospace">Vmax</text>
      <line x1={x0} y1={py(Vmax / 2)} x2={px(Km)} y2={py(Vmax / 2)} stroke={ACCENT} strokeDasharray="4 4" strokeWidth="1" />
      <line x1={px(Km)} y1={y0} x2={px(Km)} y2={py(Vmax / 2)} stroke={ACCENT} strokeDasharray="4 4" strokeWidth="1" />
      <text x={px(Km)} y={y0 + 15} textAnchor="middle" fontSize="11" fill={ACCENT} fontFamily="'JetBrains Mono', monospace">Km</text>
      <text x={x0 - 6} y={py(Vmax / 2) + 4} textAnchor="end" fontSize="10" fill={ACCENT} fontFamily="'JetBrains Mono', monospace">Vmax/2</text>
      <path d={path} fill="none" stroke={ACCENT} strokeWidth="2.4" />
      <text x={x0 + xw / 2} y={H - 2} textAnchor="middle" fontSize="12" fill={TEXT2}>[S]</text>
      <text x={12} y={y0 - yh / 2} fontSize="12" fill={TEXT2} transform={`rotate(-90 12 ${y0 - yh / 2})`} textAnchor="middle">v</text>
    </svg>
  );
}

/* ---------- HOVEDKOMPONENT ---------- */

function A6A7A9Del1() {
  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        color: TEXT,
        fontFamily: "'Source Sans 3', sans-serif",
        padding: "0 0 80px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;600&display=swap');
        ::-webkit-scrollbar { height: 8px; width: 8px; }
        ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 8px; }
        .xref:hover { border-color: ${ACCENT}; color: ${TEXT}; transform: translateY(-1px); }
      `}</style>

      {/* ---------- HEADER ---------- */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "48px 24px 8px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <Pill>DEL A · A6/A7/A9</Pill>
          <span
            style={{
              border: `1px solid ${BORDER}`,
              borderRadius: 999,
              padding: "3px 10px",
              fontSize: 12,
              color: TEXT2,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Del 1 av 2 · Teori
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 34,
            lineHeight: 1.15,
            margin: "0 0 10px",
            background: `linear-gradient(90deg, ${TEXT}, ${ACCENT})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Inokulum, nedstrømsprosesser og biokatalyse
        </h1>
        <p style={{ color: TEXT2, fontSize: 17, margin: 0, maxWidth: 660 }}>
          Hvordan en ren, aktiv kultur bygges opp og overføres til
          produksjonsskala, hvordan produktet utvinnes og renses etter
          fermenteringen, og hvordan enzymer brukes som selektive katalysatorer.
        </p>
      </div>

      {/* ---------- LÆRINGSMÅL ---------- */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px 0" }}>
        <SectionLabel>Læringsmål</SectionLabel>
        <Card>
          <Li>
            Studenten kan <b>beskrive og forklare prinsippene for og utvikling av
            en fermenteringsprosess</b>, inklusive nedstrømsprosesser.
          </Li>
          <Li>
            Studenten kan <b>beskrive og gi eksempler på bærekraftige,
            industrielle biologiske produksjonsprosesser</b>.
          </Li>
        </Card>
      </div>

      {/* ---------- TEORI ---------- */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px 0" }}>
        <SectionLabel>Teori</SectionLabel>

        {/* =================== DEL I — INOKULUM =================== */}
        <SubDivider part="A6" title="Inokulum og kulturpreservering" />

        <Card style={{ marginBottom: 22 }}>
          <Block title="Hva er et inokulum?">
            <p style={p}>
              Et <Fag>inokulum</Fag> er startkulturen som tilsettes
              produksjonsmediet for å sette i gang fermenteringen. Målet er å gi
              en stor nok, frisk og ren cellemasse slik at veksten kommer raskt
              i gang.
            </p>
          </Block>
          <Block title="Krav til et godt inokulum">
            <Li><Fag>Friskt og aktivt</Fag> — korter ned lagfasen (mindre forsinkelse før vekst).</Li>
            <Li>Tilgjengelig i <Fag>store nok volum</Fag>.</Li>
            <Li><Fag>Passende morfologisk form</Fag> (særlig viktig for sopp/mycel).</Li>
            <Li><Fag>Uten kontaminering</Fag> — ren kultur.</Li>
            <Li>Må kunne <Fag>fortsette å produsere</Fag> ønsket produkt.</Li>
          </Block>
          <Block title="Inokulumsmedium">
            <p style={p}>
              Bør i størst mulig grad være likt <Fag>produksjonsmediet</Fag> —
              da slipper cellene en ny tilvenningsfase ved overføring. Mengden er
              vanligvis <Fag>3–10 %</Fag> (ofte ~5 %) av medievolumet i neste
              trinn.
            </p>
          </Block>
        </Card>

        <Card style={{ marginBottom: 22 }}>
          <Block title="Kulturpreservering — lagring av produksjonsorganismer">
            <p style={{ ...p, color: TEXT2, fontSize: 15 }}>
              Produksjonsstammer er verdifulle; en bank av identiske{" "}
              <Fag>masterkulturer</Fag> etableres, og fra disse lages{" "}
              <Fag>arbeidskulturer</Fag> (stock-løsninger).
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 6 }}>
              <div style={methodBox}>
                <h5 style={h5}>Kortvarig (temperaturregulert)</h5>
                <Li>Kjøleskap <b>4 °C</b> / fryser <b>−20 °C</b>.</Li>
                <Li><Fag>Skråagar</Fag>: subkultivering hver 6. mnd (opptil 1 år hvis dekket med mineralolje).</Li>
              </div>
              <div style={methodBox}>
                <h5 style={h5}>Langvarig — kryopreservering (&lt; −135 °C)</h5>
                <Li>Flytende N₂ <b>−196 °C</b> eller cryofryser <b>−150 °C</b>.</Li>
                <Li>Viktig å unngå <Fag>intracellulær isdannelse</Fag> → nedfrysing i 5–10 % <b>DMSO</b> (eller glycerol).</Li>
                <Li>Forsknings-/skolelab: ofte <b>−80 °C</b>.</Li>
              </div>
              <div style={methodBox}>
                <h5 style={h5}>Lyofilisering (frysetørking)</h5>
                <Li>Godt egnet for <Fag>mikroorganismer</Fag>, <i>ikke</i> dyreceller.</Li>
                <Li>Dyrkes til <Fag>stasjonærfase</Fag>, resuspenderes i beskyttende medium (melk, serum, natriumglutamat), fryses og tørkes under vakuum (cellevannet sublimerer).</Li>
                <Li>Praktisk: tørr kultur trenger lite stell, kan sendes som «suspended animation».</Li>
              </div>
              <div style={methodBox}>
                <h5 style={h5}>Tørka kulturer</h5>
                <Li><Fag>Jordkulturer</Fag> for sporedannende og mycel-dannende organismer.</Li>
                <Li>Tørkes i romtemperatur, lagres tørt / i kjøleskap.</Li>
              </div>
            </div>
            <p style={{ ...p, fontSize: 14, color: TEXT2, marginTop: 14 }}>
              Tommelfingerregel: kulturer bør bevares med <b>minst to ulike
              metoder</b> (eller i to atskilte lokasjoner) som forsikring.
            </p>
          </Block>
        </Card>

        <Card style={{ marginBottom: 22 }}>
          <Block title="Inokulumsutvikling — trinnvis oppskalering">
            <p style={p}>
              Cellemassen bygges opp i flere trinn fra et lite kryorør til
              produksjonsreaktoren. Med ~5 % inokulum øker volumet ca.{" "}
              <Fag>20× per trinn</Fag>.
            </p>
            <div style={{ display: "flex", justifyContent: "center", margin: "14px 0" }}>
              <ScaleUpSVG />
            </div>
            <Block title="Antall generasjoner — hvorfor begrense?">
              <p style={p}>
                Over mange generasjoner kan stammen utsettes for{" "}
                <Fag>genetisk drift / degenerering</Fag> og miste
                produksjonsevnen. Derfor jobber man ut fra validerte
                masterbanker, og begrenser antall overføringer. Renhetssjekk
                gjøres på hvert trinn for å fange opp kontaminering tidlig.
              </p>
            </Block>
            <Block title="Eksempler">
              <Li><b>Bakterie (Bacillus subtilis, protease/amylase):</b> 1–2 dagers startkultur → frøkultur (~10 generasjoner) → produksjonsfermentor med 5 % inokulum høstet fra logfasen.</Li>
              <Li><b>Sopp (Penicillium chrysogenum, penicillin):</b> sporesuspensjon dyrkes i rulleflasker, sporene løses i sterilt medium og inokuleres direkte i produksjonstanken.</Li>
            </Block>
          </Block>
        </Card>

        <Card style={{ marginBottom: 22 }}>
          <Block title="Sterilisering og aseptisk teknikk ved inokulering">
            <Li>Både inokulum- og produksjonsfermentor steriliseres — inkl. <Fag>ventiler, overganger, rør/slanger</Fag>.</Li>
            <Li>Industrielt: <Fag>in situ-sterilisering</Fag> under trykk med vanndamp; dampen må fortrenge all luft, og glatte indre overflater gjør sterilisering enklere.</Li>
            <Li>Tilført luft/gass (store volum, opptil ~150 L tilsats) renses ved <Fag>sterilfiltrering</Fag>.</Li>
            <Li>Dette gjelder også senere tilsats av næringsstoffer og syre/base underveis i kjøringen.</Li>
          </Block>
        </Card>

        {/* =================== DEL II — NEDSTRØM =================== */}
        <div style={{ marginTop: 38 }}>
          <SubDivider part="A7" title="Nedstrømsprosesser (DSP)" />
        </div>

        <Card style={{ marginBottom: 22 }}>
          <Block title="Oversikt: upstream → fermentering → downstream">
            <p style={p}>
              En industriell prosess deles i <Fag>oppstrøm (USP)</Fag> —
              produksjonsorganisme, medium og selve fermenteringen — og{" "}
              <Fag>nedstrøm (DSP)</Fag>, som er alt som skjer <i>etter</i>{" "}
              fermenteringen: isolering, rensing og formulering av produktet.
            </p>
          </Block>
          <Block title="Hvorfor nedstrøm er kritisk">
            <p style={p}>
              Formålet er å <Fag>konsentrere og rense</Fag> produktet til
              ønsket kvalitet — raskest og billigst mulig. DSP utgjør typisk{" "}
              <Fag>15–70 % av de totale produksjonskostnadene</Fag>. Mange
              sekvensielle trinn, hvert med tap, gjør prosessen vanskelig å
              planlegge.
            </p>
            <p style={{ ...p, fontSize: 15, color: TEXT2 }}>
              Rensingen styres av: intra- vs ekstracellulært produkt,
              produktkonsentrasjon i fermentoren, fysiske/kjemiske egenskaper,
              fremtidig bruk, minimums renhetskrav, forurensninger i kulturen og
              produktets markedspris.
            </p>
          </Block>
          <Block title="Intracellulært vs ekstracellulært produkt">
            <Li><Fag>Ekstracellulært</Fag>: produktet er skilt ut i vekstmediet → cellene fjernes og kastes, produktet renses fra væska.</Li>
            <Li><Fag>Intracellulært</Fag>: produktet sitter inne i cellene → cellene må <b>knuses</b> for å frigjøre produktet før videre rensing.</Li>
          </Block>
        </Card>

        <Card style={{ marginBottom: 22 }}>
          <Block title="Trinnene i nedstrømsprosessen">
            <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 18px" }}>
              <DownstreamSVG />
            </div>

            <h5 style={h5}>1 · Celleseparasjon</h5>
            <Li><Fag>Filtrering</Fag> — ofte med filterhjelp som <Fag>kiselgur (diatomitt)</Fag> for bakterier; roterende tønne-vakuumfilter for store, kontinuerlige volum.</Li>
            <Li><Fag>Sentrifugering</Fag> — skiller på tetthetsforskjell; mest effektiv for store partikler, lav viskositet, stor tetthetsforskjell. Typer: kurv-, rørformet (tubular bowl, ~15 000 rpm) og DISC-sentrifuger.</Li>

            <h5 style={h5}>2 · Celleknusing (kun intracellulære produkter)</h5>
            <Li><Fag>Mekanisk</Fag>: homogenisering, kulemølle.</Li>
            <Li><Fag>Ikke-mekanisk</Fag>: kjemisk/enzymatisk (lysozym, detergenter), osmotisk sjokk.</Li>

            <h5 style={h5}>3 · Første grovrensing / isolering</h5>
            <Li>Fjerner forbindelser med egenskaper forskjellig fra produktet: <Fag>væskeekstraksjon</Fag>, <Fag>utfelling</Fag> (syre/base ved isoelektrisk punkt, salter som ammoniumsulfat, organiske løsemidler, PEG), <Fag>adsorpsjon</Fag>, flokkulering, skumseparasjon.</Li>

            <h5 style={h5}>4 · Finrensing</h5>
            <Li>Selektive enhetsoperasjoner: <Fag>kromatografi</Fag> (ionebytter — mye brukt, gelfiltrering/eksklusjon, hydrofob interaksjon (HIC), affinitet, omvendt fase) og <Fag>ultrafiltrering</Fag>.</Li>
            <Li>NB: høy konduktivitet (&gt; 5 mS/cm) og forurensninger (lipider, nukleinsyrer, cellerester) kan «klogge» kolonnen.</Li>

            <h5 style={h5}>5 · Polering / siste trinn før salg</h5>
            <Li><Fag>Krystallisering</Fag>, filtrering og <Fag>tørking</Fag> (f.eks. spray- eller frysetørking), formulering.</Li>

            <p style={{ ...p, fontSize: 15, color: TEXT2, marginTop: 12 }}>
              Hvor langt man renser avhenger av produktet: et farmasøytisk
              produkt krever langt høyere renhet enn et industrielt enzym.
            </p>
          </Block>
        </Card>

        {/* =================== DEL III — BIOKATALYSE =================== */}
        <div style={{ marginTop: 38 }}>
          <SubDivider part="A9" title="Biokatalyse og enzymatiske prosesser" />
        </div>

        <Card style={{ marginBottom: 22 }}>
          <Block title="Hva er biokatalyse?">
            <p style={p}>
              <Fag>Enzymer</Fag> er proteiner som katalyserer kjemiske
              reaksjoner i levende organismer — de fremmer reaksjonen uten selv å
              forbrukes, og kan øke reaksjonshastigheten opptil ~10¹². Mange
              trenger en <Fag>kofaktor</Fag> for å være aktive (da kalles det et{" "}
              <Fag>holoenzym</Fag>). Siden alle proteiner er bygd av{" "}
              <Fag>L-aminosyrer</Fag>, er enzymer <Fag>kirale katalysatorer</Fag>.
            </p>
            <div style={infoBox}>
              <b style={{ color: ACCENT }}>Avgrensning:</b> Selve{" "}
              <i>enzymkinetikken</i> (Michaelis-Menten, Vmax, Km) hører til
              IMAK2003. I IMAK2005 ligger vekten på{" "}
              <b>stereospesifisitet, enantioselektivitet, reversibel vs
              irreversibel katalyse, proteinengineering og immobilisering</b> —
              det er dette som testes på eksamen.
            </div>
          </Block>
        </Card>

        <Card style={{ marginBottom: 22 }}>
          <Block title="Stereospesifisitet — Ogstons modell">
            <p style={p}>
              For å skille mellom <Fag>enantiomere</Fag> må det ifølge Ogston
              (1948) være <Fag>minst tre interaksjonspunkter</Fag> mellom enzym
              og substrat (bindende eller katalytiske). Det forklarer hvorfor et
              enzym kan «se forskjell» på to speilbilder.
            </p>
          </Block>
          <Block title="Sentrale begreper">
            <Li><Fag>Enantiomere</Fag>: molekyler med lik struktur men ulik romlig orientering — speilbilder (R og S).</Li>
            <Li><Fag>Rasemisk blanding</Fag>: like mengder R og S; roterer ikke planpolarisert lys; <b>ee = 0 %</b>.</Li>
            <Li><Fag>Enantiomerisk ren</Fag>: kun én enantiomer; <b>ee = 100 %</b>.</Li>
            <Li><Fag>ee (enantiomerisk overskudd)</Fag>: ee = 40 % betyr 70 % av den ene + 30 % av den andre.</Li>
          </Block>
        </Card>

        <Card style={{ marginBottom: 22 }}>
          <Block title="Enzymatisk (kinetisk) oppløsning av enantiomere">
            <p style={p}>
              Man starter med en <Fag>rasemisk blanding</Fag>. Enzymet har et
              kiralt aktivt sete og favoriserer den ene enantiomeren —{" "}
              <Fag>kiral diskriminering / enantiomer-differensiering</Fag>. Hver
              enantiomer kan gi maks 50 % utbytte.
            </p>
            <Block title="Irreversibel reaksjon (ønskelig)">
              <Li>Enzymets <b>naturlige</b> reaksjon, f.eks. hydrolyse (høyt vanninnhold).</Li>
              <Li>Produktet har høyest ee <b>før 50 %</b> omsetning (bare én enantiomer dannes i starten).</Li>
              <Li>Substratet har høyest ee <b>etter 50 %</b> (den «gode» enantiomeren er brukt opp).</Li>
              <Li>Ideelt stopper oppløsningen rundt 50 % når enzymet er svært selektivt.</Li>
            </Block>
            <Block title="Reversibel reaksjon (uønsket)">
              <Li>Enzymet <b>tvinges</b> til motsatt reaksjon (f.eks. forestring); reaksjonen vil snu.</Li>
              <Li>Ved høy omsetning (~70 %) er det dannet nok vann til at den reverse hydrolysen starter → <b>ee synker for både produkt og substrat</b>.</Li>
              <Li>Løsning: <Fag>tving reaksjonen til irreversibilitet</Fag>, f.eks. med overskudd av kosubstrat / organisk solvent (THF).</Li>
            </Block>
            <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 4px" }}>
              <EeSVG />
            </div>
            <p style={{ ...p, fontSize: 13, color: TEXT2, textAlign: "center" }}>
              Irreversibel oppløsning: produkt-ee faller og substrat-ee stiger rundt 50 % omsetning.
            </p>
            <Block title="Enantioselektivitet, E">
              <p style={p}>
                <Fag>E (enantiomerisk forhold)</Fag> måler hvor selektivt enzymet
                er: hvor mange ganger raskere favorittenantiomeren omdannes.{" "}
                <b>E &gt; 30 regnes som god.</b> Eks: E = 53 ⇒ 53 molekyler av
                favorittenantiomeren omdannes per 1 av den andre.
              </p>
            </Block>
          </Block>
        </Card>

        <Card style={{ marginBottom: 22 }}>
          <Block title="Enzymer i organiske løsemidler & proteinengineering">
            <Li><Fag>Monofase vann-organisk løsning</Fag>: enzym/substrat/produkt løst i vann + vannløselig kosolvent (THF, dioksan), solvent ~10 %. Brukes mest for lipofile substrater.</Li>
            <Li><Fag>Proteinengineering</Fag>: genmanipulering som endrer enzymets byggesteiner for å forbedre stabilitet, renhet under ekstraksjon, kofaktorkrav, aktivitet eller spesifisitet — mål: rene, effektive, skånsomme prosesser som erstatter klassisk kjemi.</Li>
          </Block>
        </Card>

        <Card style={{ marginBottom: 22 }}>
          <Block title="Immobilisering av biokatalysatorer">
            <p style={p}>
              Frie enzymer er ofte ustabile og vanskelige å skille fra
              produktet. <Fag>Immobilisering</Fag> fester enzymet til en bærer
              eller matriks, og endrer egenskaper som stabilitet, selektivitet,
              Km, pH- og temperaturoptimum.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 4 }}>
              <div style={methodBox}>
                <h5 style={h5}>1 · Adsorpsjon / ionisk</h5>
                <Li>Van der Waals, ioniske og H-bindinger til en uløselig bærer (aktivt kull, glass, ionebytter).</Li>
                <Li><b>Fordel:</b> lite tap av enzymaktivitet; egnet i lipofile løsninger.</Li>
              </div>
              <div style={methodBox}>
                <h5 style={h5}>2 · Kovalent binding</h5>
                <Li>To trinn: aktivering av bærer med «spacer» → enzymbinding (f.eks. til cyanobromid-aktivert Sepharose).</Li>
                <Li><b>Fordel:</b> sterk, stabil festing.</Li>
              </div>
              <div style={methodBox}>
                <h5 style={h5}>3 · Kryssbinding (kovalent)</h5>
                <Li>Enzymmolekyler bindes til hverandre (glutaraldehyd); ko-kryssbinding med inaktivt protein (albumin) gir aggregater.</Li>
                <Li><b>Fordel:</b> enkel. <b>Ulempe:</b> tap av aktivitet / konformasjonsendring.</Li>
              </div>
              <div style={methodBox}>
                <h5 style={h5}>4 · Innkapsling</h5>
                <Li>Enzym/celle fanges i matriks eller membranbegrenset rom — f.eks. <Fag>gjærceller i kalsiumalginat</Fag> for etanolproduksjon.</Li>
                <Li><b>Fordel:</b> beskytter biokatalysatoren.</Li>
              </div>
            </div>
            <p style={{ ...p, fontSize: 14, color: TEXT2, marginTop: 12 }}>
              Felles gevinst: <b>gjenbruk, kontinuerlig drift og økt stabilitet</b>.
              Felles ulempe: mulige <b>masseoverføringsbegrensninger</b> og noe
              aktivitetstap. Enzymer <i>uten</i> kofaktor er lettest å
              immobilisere.
            </p>
          </Block>
        </Card>

        <Card style={{ marginBottom: 22 }}>
          <Block title="Enzymer i industrien — fordeler og ulemper">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={methodBox}>
                <h5 style={{ ...h5, color: "#34D399" }}>Fordeler</h5>
                <Li>Effektive katalysatorer under <b>milde betingelser</b>.</Li>
                <Li>Miljøvennlige, fullstendig nedbrytbare.</Li>
                <Li>Reaksjonsspesifikke → sjelden uønskede biprodukter.</Li>
                <Li>Høy <b>kjemo-, regio- og stereoselektivitet</b> (enantioselektive).</Li>
              </div>
              <div style={methodBox}>
                <h5 style={{ ...h5, color: "#F87171" }}>Ulemper</h5>
                <Li>Finnes ofte bare i én enantiomerisk form i naturen.</Li>
                <Li>Høyest aktivitet i vann.</Li>
                <Li>Kan gi substrat- eller produktinhibering.</Li>
                <Li>Avhengig av kofaktorer; kan forårsake allergi.</Li>
              </div>
            </div>
          </Block>
          <Block title="Michaelis-Menten (kort referanse — IMAK2003)">
            <Formula>v = Vmax · [S] / (Km + [S])</Formula>
            <p style={{ ...p, fontSize: 15 }}>
              Km = substratkonsentrasjonen der v = Vmax/2; lav Km = høy affinitet.
              Regneeksempler finnes i <b>Del 2 (Eksempler &amp; Quiz)</b>.
            </p>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
              <MMSVG />
            </div>
          </Block>
        </Card>
      </div>

      {/* ---------- VIKTIGE SAMMENHENGER ---------- */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "30px 24px 0" }}>
        <SectionLabel>Viktige sammenhenger</SectionLabel>
        <Card>
          <XRef code="A1" text="Inokulum, fermentering og nedstrøm er de tre leddene i hele prosesskjeden (USP → fermentering → DSP)." />
          <XRef code="A2" text="Vekstkurven: inokulumet starter i lagfasen, og et friskt/aktivt inokulum korter den ned. Sekundære metabolitter dannes i stasjonærfasen — påvirker når man høster og hvor mye produkt nedstrøm må håndtere." />
          <XRef code="A3" text="Medievalg påvirker både inokulumkvalitet og hvor vanskelig nedstrøm blir (forløpere, urenheter). Inokulumsmediet bør ligne produksjonsmediet." />
          <XRef code="A4" text="Materialbalanse og utbytte bestemmer produktkonsentrasjon og dermed volumene som må prosesseres nedstrøm." />
          <XRef code="A5 / A8" text="Reaktor → produkt → nedstrøm henger sammen; røring/lufttilførsel påvirker celletetthet og morfologi. Enzymreaktorer og membranbioreaktorer (in situ-separasjon) kobler biokatalyse til reaktordesign." />
        </Card>
        <p style={{ color: TEXT2, fontSize: 13, marginTop: 18, textAlign: "center" }}>
          Del 1 av 2 · Teori — regneeksempler og flashcard-quiz finnes i Del 2.
        </p>
      </div>
    </div>
  );
}

/* ---------- XRef-rad ---------- */
function XRef({ code, text }) {
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: 14, alignItems: "flex-start" }}>
      <span
        className="xref"
        style={{
          flex: "0 0 auto",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          color: ACCENT,
          border: `1px solid ${BORDER}`,
          borderRadius: 8,
          padding: "4px 10px",
          fontSize: 13,
          transition: "all .18s ease",
        }}
      >
        {code}
      </span>
      <span style={{ color: TEXT, lineHeight: 1.6, fontSize: 16 }}>{text}</span>
    </div>
  );
}

/* ---------- delte stiler ---------- */
const p = { color: TEXT, lineHeight: 1.65, margin: "0 0 12px", fontSize: 16 };
const h4 = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 700,
  fontSize: 18,
  color: TEXT,
  margin: "0 0 10px",
};
const h5 = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 700,
  fontSize: 15,
  color: ACCENT,
  margin: "14px 0 6px",
};
const methodBox = {
  background: "#172033",
  border: `1px solid ${BORDER}`,
  borderRadius: 10,
  padding: 16,
};
const infoBox = {
  background: "rgba(236,72,153,0.06)",
  border: `1px solid ${ACCENT}`,
  borderRadius: 10,
  padding: "14px 16px",
  color: TEXT,
  lineHeight: 1.6,
  fontSize: 15,
  marginTop: 6,
};


return A6A7A9Del1;
})();

const EksemplerQuizPage = (() => {
/*
  IMAK2005 — Del A (Bioteknologisk prosessteknologi)
  A6 / A7 / A9 — Inokulum, nedstrøm og biokatalyse
  PART 2 av 2: Eksempler og Quiz
  Aksentfarge: #EC4899 (pink)
*/

const ACCENT = "#EC4899";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TEXT = "#F8FAFC";
const TEXT2 = "#94A3B8";

/* ---------- felles små byggeklosser ---------- */

function SectionLabel({ children }) {
  return (
    <div
      style={{
        borderLeft: `4px solid ${ACCENT}`,
        paddingLeft: 14,
        marginBottom: 22,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        fontSize: 13,
        color: ACCENT,
      }}
    >
      {children}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: 24,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Formula({ children }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${BORDER}`,
        borderRadius: 8,
        padding: "12px 16px",
        margin: "12px 0",
        fontSize: 15,
        color: TEXT,
        overflowX: "auto",
      }}
    >
      {children}
    </div>
  );
}

function Fag({ children }) {
  return (
    <span
      style={{
        color: ACCENT,
        background: "rgba(236,72,153,0.10)",
        borderLeft: `3px solid ${ACCENT}`,
        padding: "1px 7px",
        borderRadius: 4,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

function Step({ n, children }) {
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
      <div
        style={{
          flex: "0 0 28px",
          height: 28,
          borderRadius: "50%",
          background: "rgba(236,72,153,0.15)",
          color: ACCENT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        {n}
      </div>
      <div style={{ flex: 1, color: TEXT, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function Pill({ children }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: ACCENT,
        color: BG,
        fontWeight: 700,
        fontSize: 12,
        padding: "3px 10px",
        borderRadius: 999,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {children}
    </span>
  );
}

/* ---------- data: Michaelis–Menten + Lineweaver–Burk ---------- */

const VMAX = 10; // µmol·L⁻¹·min⁻¹
const KM = 2; // mM

const mmData = Array.from({ length: 41 }, (_, i) => {
  const S = i * 0.5;
  return { S, v: +(VMAX * S) / (KM + S) };
});

// måledata til Lineweaver–Burk (rene punkter avledet av Vmax=10, Km=2)
const lbRaw = [
  { S: 1, v: 3.33 },
  { S: 2, v: 5.0 },
  { S: 4, v: 6.67 },
  { S: 8, v: 8.0 },
];
const lbData = lbRaw.map((d) => ({
  invS: +(1 / d.S).toFixed(4),
  invV: +(1 / d.v).toFixed(4),
}));

// lineær regresjon på (1/S, 1/v)
function linreg(pts) {
  const n = pts.length;
  const sx = pts.reduce((a, p) => a + p.invS, 0);
  const sy = pts.reduce((a, p) => a + p.invV, 0);
  const sxx = pts.reduce((a, p) => a + p.invS * p.invS, 0);
  const sxy = pts.reduce((a, p) => a + p.invS * p.invV, 0);
  const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const intercept = (sy - slope * sx) / n;
  return { slope, intercept };
}

/* ---------- flashcard-data ---------- */

const CARDS = [
  {
    tag: "A6",
    q: "Hva er typisk volumforhold mellom inokulum og neste trinn i en oppskalering?",
    a: "Inokulumet utgjør vanligvis 3–10 % (ofte ~5 %) av medievolumet i neste trinn. Et tilstrekkelig stort, friskt og aktivt inokulum korter ned lagfasen.",
  },
  {
    tag: "A7",
    q: "Hvorfor er nedstrømsprosesser ofte den dyreste delen av en bioprosess?",
    a: "DSP utgjør 15–70 % av de totale produksjonskostnadene. Årsaker: mange sekvensielle enhetsoperasjoner, lav produktkonsentrasjon i fermentorvæska, strenge renhetskrav (særlig farmasøytika) og produkttap i hvert trinn.",
  },
  {
    tag: "A7",
    q: "Nevn hovedtrinnene i nedstrømsprosessering i riktig rekkefølge.",
    a: "1) Celleseparasjon (filtrering / sentrifugering) → 2) celleknusing (kun for intracellulære produkter) → 3) første grovrensing / isolering (utfelling, væskeekstraksjon, adsorpsjon) → 4) finrensing (kromatografi, ultrafiltrering) → 5) siste trinn før salg (krystallisering, filtrering, tørking).",
  },
  {
    tag: "A9 (IMAK2003)",
    q: "Hva er Km i Michaelis-Menten-kinetikk?",
    a: "Substratkonsentrasjonen der reaksjonshastigheten er halvparten av Vmax (v = Vmax/2). Lav Km = høy affinitet for substratet. NB: selve enzymkinetikken hører til IMAK2003.",
  },
  {
    tag: "A9 (IMAK2003)",
    q: "Hva er forskjellen mellom kompetitiv og ikke-kompetitiv hemming?",
    a: "Kompetitiv: hemmeren konkurrerer om det aktive setet → Km øker, Vmax uendret (kan overvinnes med høy [S]). Ikke-kompetitiv: hemmeren binder et annet sted → Vmax synker, Km uendret.",
  },
  {
    tag: "A9",
    q: "Nevn 3 metoder for enzymimmobilisering og en fordel med hver.",
    a: "Adsorpsjon/ionisk (lite tap av enzymaktivitet) · Kovalent binding til bærer (sterk, stabil festing) · Kryssbinding (enkel å utføre) · Innkapsling i matriks/membran (beskytter enzymet). Felles gevinst: gjenbruk, kontinuerlig drift og økt stabilitet.",
  },
  {
    tag: "A6",
    q: "Hvorfor begrenser man antall generasjoner i inokulumsutvikling?",
    a: "For å unngå genetisk drift / degenerering: over mange generasjoner kan høytytende produksjonsstammer mutere og miste produksjonsevnen. Derfor jobber man ut fra en bevart masterbank med validerte arbeidskulturer.",
  },
  {
    tag: "A7",
    q: "Intracellulært produkt — hvilket ekstra trinn kreves i nedstrøm?",
    a: "Celleknusing/-lysering for å frigjøre produktet: mekanisk (homogenisering, kulemølle) eller ikke-mekanisk (lysozym, detergenter, osmotisk sjokk). Ekstracellulære produkter skilles derimot direkte ut av vekstmediet og slipper dette trinnet.",
  },
  {
    tag: "A9",
    q: "Hva er forskjellen på en reversibel og en irreversibel enzymkatalysert reaksjon — og hvorfor ønskes den ene?",
    a: "Irreversibel = enzymets naturlige reaksjon (f.eks. hydrolyse, høyt vanninnhold) → ee bygges opp, ønskelig. Reversibel = enzymet tvinges til motsatt reaksjon (f.eks. forestring); reaksjonen vil snu og senker ee for både produkt og substrat. Man tvinger derfor rx til irreversibilitet, f.eks. med overskudd av kosubstrat (THF).",
  },
  {
    tag: "A9",
    q: "Hva betyr E (enantioselektivitet), og hva er en \u00abgod\u00bb verdi?",
    a: "E = enantiomerisk forhold — hvor mange ganger raskere den favoriserte enantiomeren omdannes enn den andre. E > 30 regnes som god. F.eks. E = 53 betyr at 53 molekyler av favorittenantiomeren omdannes per 1 molekyl av den andre.",
  },
];

/* ---------- Flashcard-quiz ---------- */

function Quiz() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const total = CARDS.length;
  const card = CARDS[i];

  const go = (delta) => {
    setFlipped(false);
    setI((prev) => (prev + delta + total) % total);
  };

  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Pill>{card.tag}</Pill>
        <span
          style={{
            color: TEXT2,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
          }}
        >
          Kort {i + 1} av {total}
        </span>
      </div>

      <div
        className="flip-scene"
        onClick={() => setFlipped((f) => !f)}
        style={{ cursor: "pointer" }}
      >
        <div className={`flip-card ${flipped ? "is-flipped" : ""}`}>
          {/* front */}
          <div className="flip-face flip-front">
            <span style={{ color: TEXT2, fontSize: 12, letterSpacing: "0.1em" }}>
              SPØRSMÅL
            </span>
            <p
              style={{
                color: TEXT,
                fontSize: 19,
                lineHeight: 1.5,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                margin: "14px 0 0",
              }}
            >
              {card.q}
            </p>
            <span style={{ color: ACCENT, fontSize: 13, marginTop: 18 }}>
              Klikk for å snu →
            </span>
          </div>
          {/* back */}
          <div className="flip-face flip-back">
            <span style={{ color: TEXT2, fontSize: 12, letterSpacing: "0.1em" }}>
              SVAR
            </span>
            <p
              style={{
                color: TEXT,
                fontSize: 16,
                lineHeight: 1.6,
                margin: "14px 0 0",
              }}
            >
              {card.a}
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 18,
        }}
      >
        <button className="navbtn" onClick={() => go(-1)}>
          ← Forrige
        </button>
        <button className="navbtn flip" onClick={() => setFlipped((f) => !f)}>
          Snu kort
        </button>
        <button className="navbtn" onClick={() => go(1)}>
          Neste →
        </button>
      </div>
    </Card>
  );
}

/* ---------- Hovedkomponent ---------- */

function A6A7A9Del2() {
  const { slope, intercept } = useMemo(() => linreg(lbData), []);
  const vmaxFit = +(1 / intercept).toFixed(2);
  const kmFit = +(slope * vmaxFit).toFixed(2);

  // linje for LB-plottet
  const lbLine = [
    { invS: -0.6, invV: +(slope * -0.6 + intercept).toFixed(4) },
    { invS: 1.05, invV: +(slope * 1.05 + intercept).toFixed(4) },
  ];

  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        color: TEXT,
        fontFamily: "'Source Sans 3', sans-serif",
        padding: "0 0 80px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;600&display=swap');

        .flip-scene { perspective: 1400px; }
        .flip-card {
          position: relative;
          width: 100%;
          min-height: 230px;
          transition: transform 0.6s cubic-bezier(.4,.2,.2,1);
          transform-style: preserve-3d;
        }
        .flip-card.is-flipped { transform: rotateY(180deg); }
        .flip-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 12px;
          padding: 26px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .flip-front {
          background: #172033;
          border: 1px solid ${BORDER};
        }
        .flip-back {
          background: rgba(236,72,153,0.06);
          border: 1px solid ${ACCENT};
          transform: rotateY(180deg);
        }
        .navbtn {
          background: transparent;
          border: 1px solid ${BORDER};
          color: ${TEXT2};
          padding: 9px 16px;
          border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .navbtn:hover {
          border-color: ${ACCENT};
          color: ${TEXT};
          transform: translateY(-1px);
        }
        .navbtn.flip { color: ${ACCENT}; border-color: rgba(236,72,153,0.4); }
        ::-webkit-scrollbar { height: 8px; width: 8px; }
        ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 8px; }
      `}</style>

      {/* ---------- HEADER ---------- */}
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "48px 24px 8px",
        }}
      >
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <Pill>DEL A · A6/A7/A9</Pill>
          <span
            style={{
              border: `1px solid ${BORDER}`,
              borderRadius: 999,
              padding: "3px 10px",
              fontSize: 12,
              color: TEXT2,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Del 2 av 2 · Eksempler &amp; Quiz
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 34,
            lineHeight: 1.15,
            margin: "0 0 10px",
            background: `linear-gradient(90deg, ${TEXT}, ${ACCENT})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Inokulum, nedstrøm og biokatalyse
        </h1>
        <p style={{ color: TEXT2, fontSize: 17, margin: 0, maxWidth: 640 }}>
          Regneeksempler i eksamensformat og en flashcard-quiz som dekker
          oppskalering, valg av nedstrømstrinn og enzymatiske prosesser.
        </p>
      </div>

      {/* ---------- EKSEMPLER ---------- */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px 0" }}>
        <SectionLabel>Eksempler</SectionLabel>

        {/* a) Inokulum oppskalering */}
        <Card style={{ marginBottom: 22 }}>
          <h3 style={{ ...h3, marginTop: 0 }}>
            a) Inokulum — antall oppskaleringstrinn
          </h3>
          <p style={p}>
            En <Fag>produksjonsreaktor</Fag> på <b>10 000 L</b> skal inokuleres.
            Hvert trinn overføres med en <Fag>inokulumsandel</Fag> på <b>5 %</b>,
            og du starter i en <Fag>shake flask</Fag> med <b>100 mL = 0,1 L</b>.
            Hvor mange oppskaleringstrinn trengs?
          </p>
          <Step n={1}>
            5 % inokulum betyr at hvert trinn er <b>20×</b> volumet av det
            forrige (1 / 0,05 = 20).
          </Step>
          <Step n={2}>
            Siste seed-kultur må være ≥ 5 % av 10 000 L:
            <Formula>V_seed = 0,05 · 10 000 L = 500 L</Formula>
          </Step>
          <Step n={3}>
            Vi må vokse fra 0,1 L opp til ≥ 500 L. Nødvendig samlet faktor:
            <Formula>500 / 0,1 = 5000×</Formula>
            Antall 20×-trinn:
            <Formula>n = log₂₀(5000) = ln 5000 / ln 20 ≈ 2,84 → rund opp til 3</Formula>
          </Step>
          <Step n={4}>
            Kontroll av trinnene:
            <Formula>
              0,1 L → 2 L → 40 L → 800 L (≥ 500 ✓) → inokulerer 10 000 L
            </Formula>
            <b>Svar:</b> 3 seed-trinn, deretter inokulering av
            produksjonsreaktoren. (Sammenlign med forelesningens eksempel: 500 L
            inokulum til en 10 000 L bioreaktor.)
          </Step>
        </Card>

        {/* b) Nedstrøm prosessvalg */}
        <Card style={{ marginBottom: 22 }}>
          <h3 style={h3}>b) Nedstrøm — velg riktige trinn</h3>
          <p style={p}>
            To prosesser skal renses. Velg og begrunn rekkefølgen av trinn.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginTop: 8,
            }}
          >
            <div
              style={{
                background: "#172033",
                border: `1px solid ${BORDER}`,
                borderRadius: 10,
                padding: 16,
              }}
            >
              <Pill>Ekstracellulært</Pill>
              <p style={{ ...p, fontSize: 15 }}>
                Et sekretert enzym i vekstmediet.
              </p>
              <Formula>
                celleseparasjon → utfelling/ekstraksjon → kromatografi → tørking
              </Formula>
              <p style={{ ...p, fontSize: 14, color: TEXT2 }}>
                Produktet er allerede ute av cellene, så cellene fjernes og
                kastes — <b>ingen celleknusing</b>.
              </p>
            </div>
            <div
              style={{
                background: "#172033",
                border: `1px solid ${BORDER}`,
                borderRadius: 10,
                padding: 16,
              }}
            >
              <Pill>Intracellulært</Pill>
              <p style={{ ...p, fontSize: 15 }}>
                Et protein som blir værende inne i cellene.
              </p>
              <Formula>
                celleseparasjon → <b>celleknusing</b> → utfelling → kromatografi →
                tørking
              </Formula>
              <p style={{ ...p, fontSize: 14, color: TEXT2 }}>
                Cellene høstes, så <Fag>knuses</Fag> (homogenisering / kulemølle
                eller lysozym/detergent) for å frigjøre produktet.
              </p>
            </div>
          </div>
        </Card>

        {/* c) Michaelis–Menten */}
        <Card style={{ marginBottom: 22 }}>
          <h3 style={h3}>c) Enzymkinetikk — Michaelis-Menten</h3>
          <p style={{ ...p, color: TEXT2, fontSize: 14 }}>
            NB: MM-kinetikk hører formelt til IMAK2003, men tas med for
            fullstendighet.
          </p>
          <p style={p}>
            Gitt <Fag>Vmax = 10</Fag> µmol·L⁻¹·min⁻¹ og <Fag>Km = 2</Fag> mM.
            Beregn hastigheten ved ulike [S]:
          </p>
          <Formula>v = Vmax · [S] / (Km + [S])</Formula>
          <div style={{ overflowX: "auto", margin: "8px 0 4px" }}>
            <table style={tbl}>
              <thead>
                <tr>
                  <th style={th}>[S] (mM)</th>
                  {[0.5, 1, 2, 4, 8, 16].map((s) => (
                    <th style={th} key={s}>
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdHead}>v</td>
                  {[0.5, 1, 2, 4, 8, 16].map((s) => (
                    <td style={td} key={s}>
                      {((VMAX * s) / (KM + s)).toFixed(2)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ ...p, fontSize: 15 }}>
            Ved <b>[S] = Km = 2 mM</b> blir v = 5,0 = <b>Vmax / 2</b> — nettopp
            definisjonen på Km.
          </p>
          <div style={{ height: 280, marginTop: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mmData} margin={{ top: 10, right: 20, bottom: 28, left: 8 }}>
                <CartesianGrid stroke={BORDER} strokeDasharray="3 3" />
                <XAxis
                  dataKey="S"
                  type="number"
                  stroke={TEXT2}
                  tick={{ fontSize: 12 }}
                  label={{ value: "[S] (mM)", position: "bottom", fill: TEXT2, fontSize: 12 }}
                />
                <YAxis
                  stroke={TEXT2}
                  tick={{ fontSize: 12 }}
                  domain={[0, 10]}
                  label={{ value: "v", angle: -90, position: "insideLeft", fill: TEXT2 }}
                />
                <Tooltip
                  contentStyle={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, color: TEXT }}
                  formatter={(val) => [val.toFixed(2), "v"]}
                  labelFormatter={(l) => `[S] = ${l} mM`}
                />
                <ReferenceLine y={VMAX} stroke={TEXT2} strokeDasharray="4 4" label={{ value: "Vmax", fill: TEXT2, fontSize: 11, position: "right" }} />
                <ReferenceLine y={VMAX / 2} stroke={ACCENT} strokeDasharray="4 4" label={{ value: "Vmax/2", fill: ACCENT, fontSize: 11, position: "right" }} />
                <ReferenceLine x={KM} stroke={ACCENT} strokeDasharray="4 4" label={{ value: "Km", fill: ACCENT, fontSize: 11, position: "top" }} />
                <Line type="monotone" dataKey="v" stroke={ACCENT} strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* d) Lineweaver–Burk */}
        <Card style={{ marginBottom: 22 }}>
          <h3 style={h3}>d) Lineweaver-Burk — bestem Vmax og Km grafisk</h3>
          <p style={p}>
            Lineariser MM-ligningen ved å invertere begge sider:
          </p>
          <Formula>1/v = (Km / Vmax) · (1/[S]) + 1/Vmax</Formula>
          <p style={{ ...p, fontSize: 15 }}>
            En rett linje i (1/[S], 1/v): <Fag>stigning = Km/Vmax</Fag>,{" "}
            <Fag>skjæring y-akse = 1/Vmax</Fag>, <Fag>skjæring x-akse = −1/Km</Fag>.
          </p>
          <div style={{ overflowX: "auto", margin: "8px 0" }}>
            <table style={tbl}>
              <thead>
                <tr>
                  <th style={th}>[S] (mM)</th>
                  {lbRaw.map((d) => (
                    <th style={th} key={d.S}>{d.S}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdHead}>v</td>
                  {lbRaw.map((d) => <td style={td} key={d.S}>{d.v}</td>)}
                </tr>
                <tr>
                  <td style={tdHead}>1/[S]</td>
                  {lbData.map((d, k) => <td style={td} key={k}>{d.invS}</td>)}
                </tr>
                <tr>
                  <td style={tdHead}>1/v</td>
                  {lbData.map((d, k) => <td style={td} key={k}>{d.invV}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ height: 280, marginTop: 8 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: 28, left: 8 }}>
                <CartesianGrid stroke={BORDER} strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="invS"
                  stroke={TEXT2}
                  tick={{ fontSize: 12 }}
                  domain={[-0.6, 1.1]}
                  label={{ value: "1/[S]", position: "bottom", fill: TEXT2, fontSize: 12 }}
                />
                <YAxis
                  type="number"
                  dataKey="invV"
                  stroke={TEXT2}
                  tick={{ fontSize: 12 }}
                  domain={[0, 0.35]}
                  label={{ value: "1/v", angle: -90, position: "insideLeft", fill: TEXT2 }}
                />
                <Tooltip
                  contentStyle={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, color: TEXT }}
                  cursor={{ stroke: BORDER }}
                />
                <ReferenceLine x={0} stroke={TEXT2} />
                <ReferenceLine y={0} stroke={TEXT2} />
                <Scatter name="måledata" data={lbData} fill={ACCENT} line={false} />
                <Scatter name="regresjon" data={lbLine} fill="transparent" line={{ stroke: ACCENT, strokeWidth: 2 }} shape={() => null} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <Step n={1}>
            Lineær regresjon gir stigning ≈ <b>{slope.toFixed(2)}</b> og
            y-skjæring ≈ <b>{intercept.toFixed(2)}</b>.
          </Step>
          <Step n={2}>
            <Formula>
              Vmax = 1 / skjæring = 1 / {intercept.toFixed(2)} = {vmaxFit}{"\n"}
              Km = stigning · Vmax = {slope.toFixed(2)} · {vmaxFit} = {kmFit}
            </Formula>
            <b>Svar:</b> Vmax ≈ {vmaxFit} µmol·L⁻¹·min⁻¹ og Km ≈ {kmFit} mM —
            som forventet, siden dataene ble laget fra Vmax = 10 og Km = 2.
          </Step>
        </Card>
      </div>

      {/* ---------- QUIZ ---------- */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "30px 24px 0" }}>
        <SectionLabel>Quiz · flashcards</SectionLabel>
        <Quiz />
        <p style={{ color: TEXT2, fontSize: 13, marginTop: 14, textAlign: "center" }}>
          Spørsmålene er inspirert av eksamen V2023/V2024/V2025 og
          forelesningenes summeoppgaver — ikke kopiert ordrett.
        </p>
      </div>
    </div>
  );
}

/* ---------- delte stiler ---------- */
const h3 = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 700,
  fontSize: 19,
  color: TEXT,
  margin: "0 0 12px",
};
const p = { color: TEXT, lineHeight: 1.65, margin: "0 0 12px", fontSize: 16 };
const tbl = {
  borderCollapse: "collapse",
  width: "100%",
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 14,
};
const th = {
  border: `1px solid ${BORDER}`,
  padding: "7px 10px",
  color: ACCENT,
  background: "rgba(236,72,153,0.08)",
  textAlign: "center",
};
const td = {
  border: `1px solid ${BORDER}`,
  padding: "7px 10px",
  color: TEXT,
  textAlign: "center",
};
const tdHead = {
  border: `1px solid ${BORDER}`,
  padding: "7px 10px",
  color: TEXT2,
  textAlign: "center",
  fontWeight: 600,
};


return A6A7A9Del2;
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
          A6/A7/A9 · Inokulum, nedstrømsprosesser og biokatalyse
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
