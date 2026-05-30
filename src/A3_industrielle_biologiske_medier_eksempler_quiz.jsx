import React, { useState } from "react";
import {
  ClipboardList,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Layers,
  Calculator,
  GitCompare,
  Sparkles,
} from "lucide-react";

/**
 * IMAK2005 — A3: Industrielle biologiske medier
 * PART 2 av 2: Eksempler og Quiz
 * Accent: #F59E0B (amber). Standalone artifact.
 */

const ACCENT = "#F59E0B";
const ACCENT_BG = "rgba(245,158,11,0.10)";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TXT = "#F8FAFC";
const TXT2 = "#94A3B8";

/* ---------- Gjenbrukbare byggeklosser (identiske med Del 1) ---------- */

const Fag = ({ children }) => (
  <span
    style={{
      color: ACCENT,
      background: ACCENT_BG,
      borderLeft: `3px solid ${ACCENT}`,
      padding: "1px 6px",
      borderRadius: "4px",
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
      fontFamily: "'JetBrains Mono', monospace",
      background: "rgba(255,255,255,0.05)",
      border: `1px solid ${BORDER}`,
      borderRadius: "8px",
      padding: "14px 18px",
      margin: "12px 0",
      color: TXT,
      fontSize: "15px",
      overflowX: "auto",
      lineHeight: 1.7,
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
      borderRadius: "12px",
      padding: "24px",
      ...style,
    }}
  >
    {children}
  </div>
);

const Section = ({ label, title, icon: Icon, children }) => (
  <section style={{ marginBottom: "44px" }}>
    <div style={{ borderLeft: `4px solid ${ACCENT}`, paddingLeft: "16px", marginBottom: "20px" }}>
      <div
        style={{
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontSize: "12px",
          fontWeight: 700,
          color: ACCENT,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {Icon && <Icon size={14} strokeWidth={2.5} />}
        {label}
      </div>
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "26px",
          fontWeight: 700,
          color: TXT,
          margin: "4px 0 0",
        }}
      >
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const SubTitle = ({ children, icon: Icon }) => (
  <h3
    style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: "18px",
      fontWeight: 700,
      color: TXT,
      margin: "0 0 12px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }}
  >
    {Icon && <Icon size={18} style={{ color: ACCENT }} />}
    {children}
  </h3>
);

const P = ({ children, style }) => (
  <p style={{ color: TXT, lineHeight: 1.75, margin: "0 0 12px", ...style }}>{children}</p>
);

const Li = ({ children }) => (
  <li style={{ color: TXT, lineHeight: 1.7, marginBottom: "7px" }}>{children}</li>
);

const Note = ({ children, title }) => (
  <div
    style={{
      borderLeft: `3px solid ${ACCENT}`,
      background: ACCENT_BG,
      borderRadius: "0 8px 8px 0",
      padding: "12px 16px",
      margin: "14px 0 4px",
      color: TXT,
      fontSize: "14.5px",
      lineHeight: 1.65,
    }}
  >
    {title && (
      <div style={{ color: ACCENT, fontWeight: 700, marginBottom: "4px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {title}
      </div>
    )}
    {children}
  </div>
);

/* Steg-blokk for utregninger */
const Steg = ({ n, children }) => (
  <div style={{ display: "flex", gap: "12px", marginBottom: "12px", alignItems: "flex-start" }}>
    <span
      style={{
        flexShrink: 0,
        width: "26px",
        height: "26px",
        borderRadius: "50%",
        background: ACCENT,
        color: BG,
        fontWeight: 800,
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {n}
    </span>
    <div style={{ color: TXT, lineHeight: 1.7, flex: 1 }}>{children}</div>
  </div>
);

const Table = ({ head, rows, colW }) => (
  <div style={{ overflowX: "auto", margin: "12px 0 6px" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14.5px", minWidth: "520px" }}>
      <thead>
        <tr>
          {head.map((h, i) => (
            <th
              key={i}
              style={{
                textAlign: "left",
                padding: "10px 12px",
                color: ACCENT,
                borderBottom: `2px solid ${BORDER}`,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                width: colW ? colW[i] : "auto",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td
                key={j}
                style={{
                  padding: "10px 12px",
                  color: TXT,
                  borderBottom: `1px solid ${BORDER}`,
                  verticalAlign: "top",
                  lineHeight: 1.6,
                }}
              >
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ---------- Quiz-data ---------- */

const CARDS = [
  {
    type: "Konsept",
    q: "Hva er forskjellen mellom et definert og et komplekst medium?",
    a: (
      <>
        <strong>Definert (syntetisk):</strong> kun kjente, rene kjemikalier — full kjent sammensetning.
        <br />
        <strong>Komplekst (udefinert):</strong> mindre definerte råmaterialer som ekstrakter og hydrolysater
        (korn, kjøtt, autolysert gjær). Billigere og inneholder ofte vitaminer/vekstfaktorer «gratis», men gir
        batch-variasjon og tyngre nedstrøm.
      </>
    ),
  },
  {
    type: "Anvendt",
    q: "Hvilke fordeler — og ulemper — har melasse som karbonkilde i industriell fermentering?",
    a: (
      <>
        <strong>Fordeler:</strong> billig biprodukt fra sukkerproduksjon (sukkerrør/-roer), høyt sukkerinnhold
        (sukrose), tilgjengelig i stor skala → brukes til SCP, etanol, antibiotika m.m.
        <br />
        <strong>Ulemper:</strong> krever kompliserte/dyre ekstraksjons- og rensetrinn, og varierer i
        sammensetning fra batch til batch.
      </>
    ),
  },
  {
    type: "Sammenligning",
    q: "Når ville du valgt et definert medium fremfor et komplekst?",
    a: (
      <>
        Når du trenger <strong>full kontroll og reproduserbarhet</strong> og enkel nedstrøm — typisk ved
        produksjon av <strong>vaksiner til mennesker</strong> (proteinfrie, kjemisk definerte medier), ved
        nøyaktige <strong>massebalanse-/kinetikkstudier</strong>, eller når urenheter fra komplekse råstoff ville
        forstyrre rensingen. Ulempen er høyere kostnad og ofte tregere vekst.
      </>
    ),
  },
  {
    type: "Konsept",
    q: "Hva er en forløper (precursor), og kan du gi et eksempel?",
    a: (
      <>
        En <strong>forløper</strong> er et kjemikalium som tilsettes mediet og blir <strong>direkte inkorporert
        i produktet</strong>, og dermed øker utbytte og/eller kvalitet.
        <br />
        <strong>Eksempel:</strong> <em>fenyleddiksyre</em> tilsettes ved penicillinproduksjon → bygges inn i
        sidekjeden og gir benzylpenicillin (penicillin G).
      </>
    ),
  },
  {
    type: "Eksamen-påstand",
    q: "Sant eller usant? «Jo høyere konsentrasjon av chelater i mediet, jo bedre.»",
    a: (
      <>
        <strong>Usant.</strong> Chelater (EDTA, sitronsyre, etylendiamin) hindrer utfelling av metallfosfater
        under sterilisering ved å danne komplekser som gradvis frigjøres til cellene. Men <strong>for høy
        konsentrasjon kan hemme veksten</strong>. (Fra V2023-eksamen, oppg. 3e.)
      </>
    ),
  },
  {
    type: "Eksamen-påstand",
    q: "Hvordan kan skumdempende midler påvirke oksygenoverføringen i en bioreaktor?",
    a: (
      <>
        Mange antiskummidler er <strong>overflateaktive forbindelser</strong> som legger seg i
        gass–væske-grenseflaten og <strong>reduserer K&#8202;<sub>L</sub>a / OTR</strong> — altså dårligere
        oksygenoverføring. Derfor er «skumdannelse/antiskum kan påvirke K&#8202;<sub>L</sub>a-verdien» en sann
        påstand på eksamen. (Kobling til A5.)
      </>
    ),
  },
  {
    type: "Konsept",
    q: "Hvorfor foretrekkes ofte ammonium/ammoniakk som uorganisk nitrogenkilde?",
    a: (
      <>
        Ammoniakk <strong>represserer nitratreduktase</strong> — enzymet som omdanner nitrat til ammonium. I
        praksis tas <strong>NH&#8202;<sub>4</sub><sup>+</sup> opp foretrukket</strong>, og ammoniakk/ammonium
        fungerer i tillegg som enkel, billig N-kilde og bidrar til pH-regulering.
      </>
    ),
  },
  {
    type: "Konsept",
    q: "Når brukes Plackett-Burman, og når brukes respons-overflate-metode (RSM)?",
    a: (
      <>
        <strong>Plackett-Burman</strong> brukes til å <strong>screene ut de viktigste variablene</strong> når det
        er mer enn ~5 faktorer (X forsøk → X−1 variabler, X = multiplum av 4).
        <br />
        <strong>RSM</strong> (Box &amp; Wilson) brukes <strong>etterpå</strong> for å finne det{" "}
        <strong>optimale nivået</strong> av de utvalgte nøkkelvariablene via konturkart.
      </>
    ),
  },
  {
    type: "Beregning",
    q: "En kultur starter med 0,5 g/L celler og 30 g/L glukose. Ved endt dyrking er biomassen 6,0 g/L og restglukose 2,0 g/L. Hva er Y_xs?",
    a: (
      <>
        <Formula>
          Y_xs = ΔX / ΔS = (6,0 − 0,5) / (30 − 2,0)
          <br />
          Y_xs = 5,5 / 28 = <strong>0,20 g biomasse / g glukose</strong>
        </Formula>
        Y_xs forteller hvor effektivt substratet omdannes til biomasse, og brukes videre til å finne
        biomasse-koeffisienten c i en black-box-ligning (se A4).
      </>
    ),
  },
];

/* ---------- Flashcard ---------- */

const Flashcard = () => {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const total = CARDS.length;
  const card = CARDS[idx];

  const go = (dir) => {
    setFlipped(false);
    setIdx((p) => (p + dir + total) % total);
  };

  return (
    <div>
      {/* progressbar */}
      <div style={{ display: "flex", gap: "5px", marginBottom: "14px" }}>
        {CARDS.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "4px",
              borderRadius: "2px",
              background: i === idx ? ACCENT : BORDER,
              transition: "background .2s",
            }}
          />
        ))}
      </div>

      {/* kort */}
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{ perspective: "1400px", cursor: "pointer", marginBottom: "16px" }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            minHeight: "260px",
            transition: "transform .6s cubic-bezier(.4,.2,.2,1)",
            transformStyle: "preserve-3d",
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
              borderTop: `4px solid ${ACCENT}`,
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
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: ACCENT,
                fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: "16px",
              }}
            >
              {card.type}
            </span>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "21px",
                fontWeight: 700,
                color: TXT,
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {card.q}
            </p>
            <span style={{ color: TXT2, fontSize: "13px", marginTop: "22px" }}>
              Klikk for å se svaret
            </span>
          </div>

          {/* BACK */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "#22304a",
              border: `1px solid ${ACCENT}`,
              borderRadius: "14px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflowY: "auto",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: ACCENT,
                fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginBottom: "12px",
              }}
            >
              Svar
            </span>
            <div style={{ color: TXT, fontSize: "15.5px", lineHeight: 1.7 }}>{card.a}</div>
          </div>
        </div>
      </div>

      {/* navigasjon */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <button onClick={() => go(-1)} className="a3-btn" style={navBtn}>
          <ChevronLeft size={18} /> Forrige
        </button>
        <span style={{ color: TXT2, fontSize: "14px", fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Kort {idx + 1} av {total}
        </span>
        <button onClick={() => go(1)} className="a3-btn" style={navBtn}>
          Neste <ChevronRight size={18} />
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: "14px" }}>
        <button
          onClick={() => {
            setIdx(0);
            setFlipped(false);
          }}
          className="a3-btn"
          style={{ ...navBtn, background: "transparent", color: TXT2 }}
        >
          <RotateCcw size={15} /> Start på nytt
        </button>
      </div>
    </div>
  );
};

const navBtn = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  background: CARD,
  color: TXT,
  border: `1px solid ${BORDER}`,
  borderRadius: "10px",
  padding: "10px 16px",
  fontSize: "14px",
  fontWeight: 600,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  cursor: "pointer",
};

/* ---------- Hovedkomponent ---------- */

export default function A3EksemplerQuiz() {
  return (
    <div style={{ background: BG, minHeight: "100vh", padding: "40px 20px", fontFamily: "'Source Sans 3', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .a3-btn { transition: all .15s ease; }
        .a3-btn:hover { filter: brightness(1.3); border-color: ${ACCENT}; transform: translateY(-1px); }
        .a3-btn:active { transform: translateY(0); }
        ul { margin: 6px 0 14px; padding-left: 22px; }
      `}</style>

      <div style={{ maxWidth: "880px", margin: "0 auto" }}>
        {/* HEADER */}
        <Card style={{ marginBottom: "20px", borderTop: `4px solid ${ACCENT}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
            <span style={{ background: ACCENT, color: BG, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", padding: "4px 12px", borderRadius: "8px", fontSize: "15px" }}>
              A3
            </span>
            <span style={{ border: `1px solid ${ACCENT}`, color: ACCENT, padding: "3px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Del A · Bioteknologi
            </span>
            <span style={{ color: TXT2, fontSize: "13px", fontWeight: 600 }}>Del 2 av 2 · Eksempler og Quiz</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "34px", fontWeight: 800, color: TXT, margin: "0 0 8px", lineHeight: 1.12 }}>
            Industrielle biologiske medier — Eksempler og Quiz
          </h1>
          <p style={{ color: TXT2, fontSize: "17px", margin: 0, lineHeight: 1.6 }}>
            Eksamensnære eksempler på medievalg og optimalisering, etterfulgt av flashcards inspirert av
            tidligere eksamen (V2023–V2025).
          </p>
        </Card>

        {/* EKSEMPLER */}
        <Section label="Eksempler" title="Anvendt på eksamensnivå" icon={ClipboardList}>
          {/* Eksempel 1 */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle icon={GitCompare}>Eksempel 1 — Sammenligning av karbonkilder for SCP-produksjon</SubTitle>
            <P>
              <strong>Oppgave:</strong> En bedrift skal produsere <Fag>single cell protein (SCP)</Fag> (biomasse).
              Vurder glukose, n-alkaner og metanol som karbonkilde.
            </P>
            <Table
              head={["C-kilde", "Energi / karbon", "Vurdering"]}
              colW={["24%", "30%", "46%"]}
              rows={[
                ["Glukose", "Referanse", "Lett tilgjengelig og lett å metabolisere, men dyrere pr. energienhet og gir lavere energiutbytte."],
                ["n-alkaner", "~2× karbon, ~3× energi vs. glukose", "Høyt energi-/karbonutbytte → mye biomasse. Men sterkt aerob og eksoterm prosess → krever høy O₂-overføring + kjøling."],
                ["Metanol", "Høy, ren C₁-kilde", "Billig, ren, lett å rense ned. ICI valgte metanol + ammoniakk til SCP — krevde ny air-lift-reaktor."],
              ]}
            />
            <Note title="Konklusjon">
              For ren biomasseproduksjon gir <strong>n-alkaner/metanol</strong> mest karbon og energi pr. krone,
              men <strong>medievalget bestemmer reaktordesignet</strong>: den eksoterme, svært aerobe oksidasjonen
              tvinger fram høy K&#8202;<sub>L</sub>a og god kjøling (jf. A5 og A8).
            </Note>
          </Card>

          {/* Eksempel 2 */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle icon={Layers}>Eksempel 2 — Medievalg basert på produkttype og økonomi</SubTitle>
            <P>
              <strong>Oppgave:</strong> Velg medietype for tre ulike produkter og begrunn.
            </P>
            <Table
              head={["Produkt", "Anbefalt medium", "Begrunnelse"]}
              colW={["28%", "26%", "46%"]}
              rows={[
                [
                  "Vaksine til mennesker",
                  <Fag key="d">Definert</Fag>,
                  "Krever full kontroll, reproduserbarhet og fravær av udefinerte/proteinholdige urenheter → kjemisk definert, proteinfritt medium.",
                ],
                [
                  "Antibiotikum (penicillin), storskala",
                  <Fag key="k">Komplekst</Fag>,
                  "Billige råstoff (corn steep liquor + laktose/glukose) + tilsats av forløperen fenyleddiksyre → høyt utbytte av penicillin G til lav kostnad.",
                ],
                [
                  "Biomasse / SCP",
                  <Fag key="k2">Komplekst / billig C-kilde</Fag>,
                  "Pris pr. kg biomasse er kritisk → billigste tilgjengelige C-kilde (melasse, metanol, alkaner) som gir høyt Y_xs.",
                ],
              ]}
            />
            <Note title="Generell regel">
              Jo <strong>renere/mer kontrollert</strong> produktkravet er (medisin, vaksine), desto mer trekkes
              valget mot <strong>definert</strong> medium. Jo mer <strong>kostnadsdrevet</strong> (bulk-produkt),
              desto mer trekkes valget mot <strong>komplekst</strong> medium på billige råstoff.
            </Note>
          </Card>

          {/* Eksempel 3 */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle icon={Sparkles}>Eksempel 3 — Medieoptimalisering: hvorfor ikke bare prøve alt?</SubTitle>
            <P>
              <strong>Oppgave:</strong> Du vil optimalisere <strong>6 mediekomponenter</strong>, hver på{" "}
              <strong>3 nivåer</strong> (lav/middels/høy). Hvor mange forsøk krever en full faktoriell metode, og
              hva gjør du i stedet?
            </P>
            <Steg n={1}>
              Full faktoriell metode prøver alle kombinasjoner:
              <Formula>antall forsøk = x^n = 3^6 = 729 forsøk</Formula>
              Helt uholdbart i praksis (tid og kostnad).
            </Steg>
            <Steg n={2}>
              Bruk <Fag>Plackett-Burman</Fag> til å <strong>screene</strong> hvilke faktorer som faktisk betyr
              noe. Med X forsøk evalueres X−1 variabler (X = multiplum av 4). For 6 reelle variabler velger man
              f.eks. en 8-forsøks design (evaluerer 7 variabler — de overskytende settes som «dummy» for å
              estimere feil).
            </Steg>
            <Steg n={3}>
              Ta de få <strong>viktigste</strong> faktorene videre til <Fag>respons-overflate-metode (RSM)</Fag>{" "}
              for å finne det optimale nivået av hver.
            </Steg>
            <Note title="Poenget">
              Statistisk forsøksdesign reduserer ~729 forsøk til en håndfull screening-forsøk + målrettet
              optimalisering. Industrielt mål: <strong>færrest mulig forsøk</strong>.
            </Note>
          </Card>

          {/* Eksempel 4 */}
          <Card>
            <SubTitle icon={Calculator}>Eksempel 4 — Utbyttekoeffisient og begrensende reaktant</SubTitle>
            <P>
              <strong>Oppgave:</strong> En gjærstamme dyrkes (8,0 L) med glukose. Start: 1,0 g/L celler og 40 g/L
              glukose. Ved endt dyrking er det høstet 0,40 kg biomasse, og restglukosen er 4,0 g/L. Finn Y_xs.
            </P>
            <Steg n={1}>
              Regn om biomasse til konsentrasjon: 0,40 kg = 400 g over 8,0 L →
              <Formula>X_slutt = 400 g / 8,0 L = 50 g/L</Formula>
            </Steg>
            <Steg n={2}>
              Sett inn i utbyttekoeffisienten:
              <Formula>
                Y_xs = ΔX / ΔS = (X_slutt − X_0) / (S_0 − S_rest)
                <br />
                Y_xs = (50 − 1,0) / (40 − 4,0) = 49 / 36 = <strong>1,36 g/g</strong>
              </Formula>
            </Steg>
            <Note title="Videre (kobling til A4)">
              Y_xs brukes til å finne biomasse-koeffisienten c i en black-box-ligning:
              <Formula>c = Y_xs · (M_substrat / M_celler)</Formula>
              der cellas molvekt regnes fra empirisk formel (f.eks. CH₁,₈O₀,₅N₀,₂) og korrigeres for askeinnhold
              (M_celler / (1 − ask)). For å finne <strong>begrensende reaktant</strong>: beregn teoretisk biomasse
              hvert næringsstoff kan gi — det som gir <strong>minst</strong> biomasse er begrensende.
            </Note>
          </Card>
        </Section>

        {/* QUIZ */}
        <Section label="Quiz" title="Test deg selv — flashcards" icon={Lightbulb}>
          <Card>
            <P style={{ color: TXT2, marginBottom: "18px" }}>
              {CARDS.length} kort som blander konsept, anvendelse og eksamenspåstander. Klikk kortet for å snu
              det.
            </P>
            <Flashcard />
          </Card>
        </Section>

        <div style={{ textAlign: "center", color: TXT2, fontSize: "13px", marginTop: "10px" }}>
          IMAK2005 · A3 Industrielle biologiske medier · Del 2/2 (Eksempler og Quiz)
        </div>
      </div>
    </div>
  );
}
