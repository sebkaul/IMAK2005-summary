import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";

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

export default function A6A7A9Del2() {
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
