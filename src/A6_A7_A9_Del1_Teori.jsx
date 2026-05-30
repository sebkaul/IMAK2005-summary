import React from "react";

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

export default function A6A7A9Del1() {
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
