import React, { useState } from "react";
import {
  Beaker, Target, BookOpen, Lightbulb, Network, Layers,
  ArrowRight, ChevronLeft, ChevronRight, RotateCw, FlaskConical,
  Recycle, Factory, Dna, Microscope
} from "lucide-react";

/* =========================================================================
   IMAK2005 — A1: Introduksjon til fermenteringsprosesser
   Del A (Bioteknologisk prosessteknologi) — Accent: #3B82F6
   TEMPLATE COMPONENT — all other sub-subjects follow this structure,
   changing only the accent color.
   ========================================================================= */

const ACCENT = "#3B82F6";
const ACCENT_BG = "rgba(59,130,246,0.10)";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TEXT = "#F8FAFC";
const TEXT2 = "#94A3B8";

const FONT_HEAD = "'Plus Jakarta Sans', sans-serif";
const FONT_BODY = "'Source Sans 3', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

/* ---------- Reusable pieces (shared across all sub-subjects) ---------- */

function Section({ label, title, icon, children }) {
  return (
    <section style={{ marginBottom: 56 }}>
      <div style={{ borderLeft: `4px solid ${ACCENT}`, paddingLeft: 16, marginBottom: 24 }}>
        <div style={{
          fontFamily: FONT_HEAD, fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
          color: ACCENT, fontWeight: 700, display: "flex", alignItems: "center", gap: 8
        }}>
          {icon} {label}
        </div>
        <h2 style={{ fontFamily: FONT_HEAD, fontSize: 30, fontWeight: 800, color: TEXT, margin: "6px 0 0" }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12,
      padding: 24, marginBottom: 16, ...style
    }}>
      {children}
    </div>
  );
}

// Fagbegrep — highlighted inline term
function Term({ children }) {
  return (
    <span style={{
      color: ACCENT, background: ACCENT_BG, borderLeft: `3px solid ${ACCENT}`,
      padding: "1px 6px 1px 6px", borderRadius: 3, fontWeight: 600, whiteSpace: "nowrap"
    }}>
      {children}
    </span>
  );
}

function Formula({ children }) {
  return (
    <div style={{
      fontFamily: FONT_MONO, fontSize: 15, color: TEXT,
      background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`,
      borderRadius: 8, padding: "12px 16px", margin: "12px 0", overflowX: "auto"
    }}>
      {children}
    </div>
  );
}

function H3({ children }) {
  return (
    <h3 style={{ fontFamily: FONT_HEAD, fontSize: 19, fontWeight: 700, color: TEXT, margin: "20px 0 10px" }}>
      {children}
    </h3>
  );
}

function P({ children }) {
  return <p style={{ fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.7, color: TEXT, margin: "0 0 12px" }}>{children}</p>;
}

function Li({ children }) {
  return (
    <li style={{ fontFamily: FONT_BODY, fontSize: 16, lineHeight: 1.65, color: TEXT, marginBottom: 8 }}>
      {children}
    </li>
  );
}

function TableNote({ children }) {
  return (
    <div style={{
      display: "flex", gap: 10, alignItems: "flex-start",
      fontFamily: FONT_BODY, fontSize: 14, color: TEXT2,
      background: "rgba(255,255,255,0.03)", border: `1px dashed ${BORDER}`,
      borderRadius: 8, padding: "10px 14px", margin: "12px 0"
    }}>
      <BookOpen size={16} color={ACCENT} style={{ marginTop: 2, flexShrink: 0 }} />
      <span>{children}</span>
    </div>
  );
}

/* ---------- Inline SVG diagrams ---------- */

function FermentationFlowSVG() {
  const box = (x, y, w, label, sub, fill) => (
    <g>
      <rect x={x} y={y} width={w} height="62" rx="8" fill={fill} stroke={BORDER} strokeWidth="1" />
      <text x={x + w / 2} y={y + 26} textAnchor="middle" fontFamily={FONT_HEAD} fontSize="13" fontWeight="700" fill={TEXT}>{label}</text>
      <text x={x + w / 2} y={y + 44} textAnchor="middle" fontFamily={FONT_BODY} fontSize="10" fill={TEXT2}>{sub}</text>
    </g>
  );
  const arrow = (x) => (
    <g>
      <line x1={x} y1="56" x2={x + 26} y2="56" stroke={ACCENT} strokeWidth="2" />
      <polygon points={`${x + 26},56 ${x + 20},52 ${x + 20},60`} fill={ACCENT} />
    </g>
  );
  return (
    <svg viewBox="0 0 760 150" width="100%" style={{ maxWidth: 760 }}>
      {/* USP bracket */}
      <text x="155" y="16" textAnchor="middle" fontFamily={FONT_HEAD} fontSize="12" fontWeight="700" fill={ACCENT}>OPPSTRØM (USP)</text>
      <text x="600" y="16" textAnchor="middle" fontFamily={FONT_HEAD} fontSize="12" fontWeight="700" fill="#EF4444">NEDSTRØM (DSP)</text>
      {box(10, 25, 120, "Medium + inokulum", "sammensetning", CARD)}
      {arrow(132)}
      {box(160, 25, 110, "Sterilisering", "medium + utstyr", CARD)}
      {arrow(272)}
      {box(300, 25, 120, "Bioreaktor", "dyrking / fermentering", ACCENT_BG)}
      {arrow(422)}
      {box(450, 25, 110, "Utvinning", "celle/væske-sep.", "rgba(239,68,68,0.10)")}
      {arrow(562)}
      {box(590, 25, 160, "Rensing + avfall", "produkt → marked", "rgba(239,68,68,0.10)")}
    </svg>
  );
}

function CultureModesSVG() {
  const tank = (x, label, inFlow, outFlow, note) => (
    <g>
      <text x={x + 45} y="16" textAnchor="middle" fontFamily={FONT_HEAD} fontSize="13" fontWeight="700" fill={TEXT}>{label}</text>
      {/* tank */}
      <rect x={x} y="34" width="90" height="90" rx="6" fill="none" stroke={BORDER} strokeWidth="1.5" />
      <rect x={x} y="74" width="90" height="50" rx="0" fill={ACCENT_BG} />
      <line x1={x + 45} y1="40" x2={x + 45} y2="100" stroke={TEXT2} strokeWidth="2" />
      <rect x={x + 33} y="98" width="24" height="6" fill={TEXT2} />
      {/* in flow */}
      {inFlow && (
        <g>
          <line x1={x + 45} y1="14" x2={x + 45} y2="34" stroke={ACCENT} strokeWidth="2" />
          <polygon points={`${x + 45},34 ${x + 41},27 ${x + 49},27`} fill={ACCENT} />
        </g>
      )}
      {/* out flow */}
      {outFlow && (
        <g>
          <line x1={x + 90} y1="80" x2={x + 112} y2="80" stroke="#EF4444" strokeWidth="2" />
          <polygon points={`${x + 112},80 ${x + 105},76 ${x + 105},84`} fill="#EF4444" />
        </g>
      )}
      <text x={x + 45} y="140" textAnchor="middle" fontFamily={FONT_BODY} fontSize="10" fill={TEXT2}>{note}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 560 155" width="100%" style={{ maxWidth: 560 }}>
      {tank(10, "Batch", false, false, "lukket: ingen inn/ut")}
      {tank(190, "Fed-batch", true, false, "kun tilførsel, V øker")}
      {tank(380, "Kontinuerlig", true, true, "inn = ut, steady-state")}
    </svg>
  );
}

function GrowthCurveSVG() {
  return (
    <svg viewBox="0 0 560 230" width="100%" style={{ maxWidth: 560 }}>
      {/* axes */}
      <line x1="50" y1="190" x2="540" y2="190" stroke={TEXT2} strokeWidth="1.5" />
      <line x1="50" y1="190" x2="50" y2="20" stroke={TEXT2} strokeWidth="1.5" />
      <text x="20" y="105" fontFamily={FONT_BODY} fontSize="11" fill={TEXT2} transform="rotate(-90 20 105)">ln(biomasse)</text>
      <text x="290" y="220" textAnchor="middle" fontFamily={FONT_BODY} fontSize="11" fill={TEXT2}>tid</text>
      {/* curve */}
      <path d="M50 170 L130 168 C150 165 160 60 240 50 C300 44 330 44 360 46 L460 50 C500 54 520 110 535 150"
        fill="none" stroke={ACCENT} strokeWidth="3" />
      {/* phase dividers */}
      {[130, 245, 360, 470].map((x) => (
        <line key={x} x1={x} y1="20" x2={x} y2="190" stroke={BORDER} strokeWidth="1" strokeDasharray="4 4" />
      ))}
      {/* labels */}
      {[
        [90, "Lag", ""],
        [187, "Log", "primære"],
        [302, "Stasjonær", "sekundære"],
        [420, "Død", ""]
      ].map(([x, t, sub]) => (
        <g key={t}>
          <text x={x} y="38" textAnchor="middle" fontFamily={FONT_HEAD} fontSize="12" fontWeight="700" fill={TEXT}>{t}</text>
          {sub && <text x={x} y="178" textAnchor="middle" fontFamily={FONT_BODY} fontSize="10" fill={ACCENT}>{sub}</text>}
        </g>
      ))}
    </svg>
  );
}

/* ---------- Flashcard quiz (shared interactive pattern) ---------- */

const CARDS = [
  {
    q: "Hva menes med industriell bioteknologi / en «cellefabrikk»?",
    a: "Bruk av levende celler (mikroorganismer, evt. plante-/dyreceller) som syntetiske fabrikker. Celler dyrkes i reaktorer for å produsere ønskede kommersielle produkter — enzymer, finkjemikalier, farmasøytika, mat, biopolymerer, bioenergi og fôringredienser."
  },
  {
    q: "Hva er forskjellen på oppstrøm (USP) og nedstrøm (DSP)?",
    a: "USP (upstream) = produserende organisme, kulturmedium og selve fermenteringsprosessen. DSP (downstream) = alle prosesser etter fermenteringen: utvinning, separasjon, rensing og isolering av produktet, samt avfallsbehandling."
  },
  {
    q: "I hvilke vekstfaser produseres primære vs. sekundære metabolitter?",
    a: "Primære metabolitter (aminosyrer, nukleinsyrer, vitaminer) er vekstavhengige og produseres i logfasen/eksponentialfasen. Sekundære metabolitter (antibiotika, alkoholer, syrer) er vekstuavhengige og produseres i stasjonærfasen."
  },
  {
    q: "Hvilke fem kategorier industrielle fermenteringsprodukter finnes?",
    a: "1) Mikrobielle celler / biomasse (gjær, SCP), 2) Enzymer, 3) Metabolitter (primære/sekundære), 4) Produkter fra transformasjonsprosesser (celler som katalysator), 5) Rekombinante produkter (fra genmanipulerte celler)."
  },
  {
    q: "Forskjell på intracellulære og ekstracellulære produkter — og hvorfor er det viktig for DSP?",
    a: "Intracellulære (inni cellen): nukleinsyrer, vitaminer, mange enzymer, rekombinante proteiner — krever celleoppbrudd. Ekstracellulære (skilt ut): aminosyrer, sitronsyre, alkoholer, de fleste antibiotika — enklere rensing. Lokaliseringen avgjør valg av nedstrømsprosess."
  },
  {
    q: "List de fire trinnene i tradisjonell utvikling av en bioprosess.",
    a: "1) Identifisere/isolere organisme som lager ønsket forbindelse. 2) Stammeutvikling — overproduserende stammer via mutagenese og seleksjon. 3) Lab- og pilotskala: optimalisere fermenteringsbetingelser og utvikle nedstrømsprotokoll. 4) Industriell skala / kommersiell produksjon."
  },
  {
    q: "Hva er metabolic engineering (metabolsk ingeniørkunst)?",
    a: "Målrettet forbedring av produktdannelse eller celleegenskaper ved å modifisere spesifikke biokjemiske reaksjoner — eller innføre nye — ved hjelp av rekombinant DNA-teknologi. Terminologien kom på 90-tallet. Vertsceller: E. coli, gjær (S. cerevisiae), sopp."
  },
  {
    q: "Hvorfor er sterilisering kritisk, og hva omfatter det?",
    a: "De fleste kulturer må være sterile gjennom hele dyrkingsperioden (unntak: noe mat/drikke). Feil steriliseringsmetode kan tape 3–5 % av industrielle fermenteringer. Omfatter medium + alt utstyr, ventiler, rør/slanger — oftest ved damp; O₂/gass via sterilfiltrering."
  }
];

function Flashcards() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const go = (d) => { setFlipped(false); setI((p) => (p + d + CARDS.length) % CARDS.length); };
  const c = CARDS[i];

  return (
    <div>
      <style>{`
        .imak-flip-inner { transition: transform 0.5s; transform-style: preserve-3d; position: relative; }
        .imak-flip-inner.flipped { transform: rotateY(180deg); }
        .imak-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .imak-back { transform: rotateY(180deg); }
        .imak-btn:hover { filter: brightness(1.25); }
        .imak-btn:active { transform: scale(0.96); }
        .imak-card-wrap:hover { filter: brightness(1.06); }
      `}</style>

      <div
        className="imak-card-wrap"
        onClick={() => setFlipped((f) => !f)}
        style={{ perspective: 1400, cursor: "pointer", marginBottom: 18 }}
      >
        <div className={`imak-flip-inner${flipped ? " flipped" : ""}`} style={{ minHeight: 220 }}>
          {/* FRONT */}
          <div className="imak-face" style={{
            background: CARD, border: `1px solid ${BORDER}`, borderTop: `4px solid ${ACCENT}`,
            borderRadius: 12, padding: 32, minHeight: 220, display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center", textAlign: "center"
          }}>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>Spørsmål</div>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 20, fontWeight: 700, color: TEXT, lineHeight: 1.4 }}>{c.q}</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: TEXT2, marginTop: 18 }}>Klikk for å snu →</div>
          </div>
          {/* BACK */}
          <div className="imak-face imak-back" style={{
            position: "absolute", inset: 0, background: "#162033", border: `1px solid ${ACCENT}`,
            borderRadius: 12, padding: 32, minHeight: 220, display: "flex", flexDirection: "column", justifyContent: "center"
          }}>
            <div style={{ fontFamily: FONT_HEAD, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: ACCENT, marginBottom: 14 }}>Svar</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 16, color: TEXT, lineHeight: 1.65 }}>{c.a}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button className="imak-btn" onClick={(e) => { e.stopPropagation(); go(-1); }} style={navBtn}>
          <ChevronLeft size={18} /> Forrige
        </button>
        <div style={{ fontFamily: FONT_MONO, fontSize: 14, color: TEXT2 }}>Kort {i + 1} av {CARDS.length}</div>
        <button className="imak-btn" onClick={(e) => { e.stopPropagation(); go(1); }} style={navBtn}>
          Neste <ChevronRight size={18} />
        </button>
      </div>
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <button className="imak-btn" onClick={() => setFlipped((f) => !f)} style={{ ...navBtn, background: "transparent", color: TEXT2 }}>
          <RotateCw size={15} /> Snu kort
        </button>
      </div>
    </div>
  );
}

const navBtn = {
  display: "flex", alignItems: "center", gap: 6, background: ACCENT, color: "#fff",
  border: "none", borderRadius: 8, padding: "9px 16px", fontFamily: FONT_HEAD,
  fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all .15s"
};

/* ---------- Worked example block ---------- */
function Example({ n, title, children }) {
  return (
    <Card style={{ borderLeft: `4px solid ${ACCENT}` }}>
      <div style={{ fontFamily: FONT_HEAD, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: ACCENT, fontWeight: 700 }}>
        Eksempel {n}
      </div>
      <H3>{title}</H3>
      {children}
    </Card>
  );
}

/* ======================== MAIN ======================== */

export default function A1Introduksjon() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT, padding: "0 0 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px" }}>

        {/* 1. HEADER */}
        <header style={{ padding: "56px 0 40px" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ background: ACCENT, color: "#fff", fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 13, padding: "4px 12px", borderRadius: 6 }}>A1</span>
            <span style={{ background: ACCENT_BG, color: ACCENT, border: `1px solid ${ACCENT}`, fontFamily: FONT_HEAD, fontWeight: 600, fontSize: 12, padding: "4px 12px", borderRadius: 6 }}>Del A · Bioteknologisk prosessteknologi</span>
          </div>
          <h1 style={{ fontFamily: FONT_HEAD, fontSize: 42, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            Introduksjon til fermenteringsprosesser
          </h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: TEXT2, marginTop: 14, lineHeight: 1.6 }}>
            Hva industriell bioteknologi er, hvordan en fermenteringsprosess henger sammen fra oppstrøm til nedstrøm, hvilke produkter og organismer som brukes, og de ulike dyrkingsmåtene.
          </p>
        </header>

        {/* 2. LÆRINGSMÅL */}
        <Section label="Læringsmål" title="Hva du skal kunne" icon={<Target size={14} />}>
          <Card>
            <ul style={{ margin: 0, paddingLeft: 22 }}>
              <Li>Beskrive og forklare prinsippene for, og utviklingen av, en <Term>fermenteringsprosess</Term> — inkludert nedstrømsprosesser.</Li>
              <Li>Beskrive og gi eksempler på bærekraftige, industrielle biologiske produksjonsprosesser.</Li>
            </ul>
          </Card>
        </Section>

        {/* 3. TEORI */}
        <Section label="Teori" title="Kjernestoff" icon={<BookOpen size={14} />}>

          <H3>Hva er bioteknologi?</H3>
          <P><Term>Bioteknologi</Term> er bruk av organismer til å lage produkter for mennesket. <Term>Industriell bioteknologi</Term> (bioprosessering / fermentering) bruker levende celler som «<Term>cellefabrikker</Term>»: celler dyrkes i reaktorer for å produsere kommersielle produkter som enzymer, finkjemikalier, farmasøytika, mat, biopolymerer, bioenergi og fôr. Som regel brukes mikroorganismer, men også plante- og dyreceller.</P>
          <Card>
            <P style={{ margin: 0 }}><strong style={{ color: ACCENT }}>Råstoff</strong> + <strong style={{ color: ACCENT }}>egnet organisme</strong> → bioteknologiprosess → <em>mat, enzymer, antibiotika, drivstoff</em> (eller avløpsrensing / vannrensing).</P>
          </Card>

          <H3>Oversikt over fermenteringsprosessen</H3>
          <P>En fermenteringsprosess deles inn i <Term>oppstrøm (USP)</Term> og <Term>nedstrøm (DSP)</Term>. USP omfatter den produserende organismen, kulturmediet og selve fermenteringen. DSP er alt som følger etter fermenteringen — utvinning, rensing og isolering.</P>
          <Card>
            <FermentationFlowSVG />
          </Card>
          <P>De typiske trinnene i en industriell fermentering er:</P>
          <ul style={{ paddingLeft: 22 }}>
            <Li>Sammensetning av <Term>vekstmediet</Term> (dyrking + inokulum, inkl. massebalanse) → <em>se A3, A4</em></Li>
            <Li><Term>Sterilisering</Term> av medium og utstyr</Li>
            <Li>Produksjon av en aktiv, ren kultur for inokulering (<Term>inokulum</Term>) → <em>se A6</em></Li>
            <Li>Dyrking under optimale forhold (batch, semi-batch, fed-batch eller kontinuerlig)</Li>
            <Li>Utvinning av produkt — rensing (<Term>nedstrøm</Term>) → <em>se A7</em></Li>
            <Li>Behandling av avfallsstoffer</Li>
          </ul>

          <H3>Typer fermenteringsprodukter</H3>
          <P>Produktet kan være selve <Term>biomassen</Term> (cellene), eller noe cellene lager. Fem hovedkategorier:</P>
          <ul style={{ paddingLeft: 22 }}>
            <Li><Term>Mikrobielle celler / biomasse</Term> — gjær (baking, øl, vin), encelleprotein (SCP), produksjonsceller.</Li>
            <Li><Term>Enzymer</Term> (mikrobielle, fra planter/dyr). Fordel med mikrobielle: kan masseproduseres via etablerte fermenteringsprosesser.</Li>
            <Li><Term>Metabolitter</Term> (fra alle celletyper) — primære eller sekundære.</Li>
            <Li><Term>Transformasjonsprodukter</Term> — cellene brukes som katalysatorer (biotransformasjon).</Li>
            <Li><Term>Rekombinante produkter</Term> — fra genmanipulerte celler.</Li>
          </ul>

          <Card>
            <strong style={{ color: ACCENT, fontFamily: FONT_HEAD }}>Primære vs. sekundære metabolitter</strong>
            <ul style={{ paddingLeft: 22, marginTop: 10 }}>
              <Li><Term>Primære metabolitter</Term>: nødvendige for vekst/formering, <strong>vekstavhengige</strong> — produseres i <strong>logfasen</strong> (aminosyrer, nukleinsyrer, vitaminer).</Li>
              <Li><Term>Sekundære metabolitter</Term>: ingen funksjon for vekst, <strong>vekstuavhengige</strong> — produseres i <strong>stasjonærfasen</strong> (alkoholer, syrer, antibiotika).</Li>
            </ul>
            <div style={{ marginTop: 16 }}><GrowthCurveSVG /></div>
            <P style={{ fontSize: 14, color: TEXT2, margin: "6px 0 0" }}>Koblingen metabolitt ↔ vekstfase utdypes i <em>A2 (vekstkinetikk)</em>.</P>
          </Card>

          <Card>
            <strong style={{ color: ACCENT, fontFamily: FONT_HEAD }}>Intracellulær vs. ekstracellulær — viktig for DSP</strong>
            <ul style={{ paddingLeft: 22, marginTop: 10 }}>
              <Li><Term>Intracellulære produkter</Term>: nukleinsyrer, vitaminer, mange enzymer, rekombinante proteiner — krever celleoppbrudd.</Li>
              <Li><Term>Ekstracellulære produkter</Term>: aminosyrer, sitronsyre, alkoholer, noen enzymer (amylaser, proteaser), de fleste antibiotika (streptomycin, penicillin).</Li>
            </ul>
          </Card>

          <H3>Organismer brukt i industrien</H3>
          <P>Typiske <Term>vertsceller (produksjonsceller)</Term>: <Term>E. coli</Term>, gjær (<Term>Saccharomyces cerevisiae</Term>) og ulike <Term>sopparter</Term> — i tillegg til bakterier generelt og plante-/dyreceller. <Term>Villtypestammer</Term> isolert fra naturen produserer normalt lite; gjennom stammeutvikling kan utbyttet økes dramatisk (penicillin er økt &gt; 50 000× — fra mg/L til &gt; 90 g/L).</P>
          <Card>
            <strong style={{ color: ACCENT, fontFamily: FONT_HEAD }}>Tradisjonell utvikling av en bioprosess (4 trinn)</strong>
            <ol style={{ paddingLeft: 22, marginTop: 10 }}>
              <Li>Identifisere og isolere organisme som lager ønsket forbindelse.</Li>
              <Li><Term>Stammeutvikling</Term> — overproduserende stammer via klassisk mutagenese og seleksjon.</Li>
              <Li>Lab- og pilotskala: optimalisere fermenteringsbetingelser + utvikle nedstrømsprotokoll.</Li>
              <Li>Industriell skala og kommersiell produksjon.</Li>
            </ol>
            <P style={{ margin: "10px 0 0" }}>Med <Term>rekombinant DNA-teknologi</Term> ble <Term>metabolic engineering</Term> mulig — målrettet forbedring av produktdannelse ved å modifisere (eller innføre) biokjemiske reaksjoner.</P>
          </Card>

          <H3>Dyrkingsmåter: batch, fed-batch og kontinuerlig</H3>
          <Card><CultureModesSVG /></Card>
          <ul style={{ paddingLeft: 22 }}>
            <Li><Term>Batch</Term> — lukket system, ingen tilførsel/avtapping, konstant volum. Følger vekstkurven, høstes til slutt. Enkel å sette opp og kontrollere; ved kontaminering tapes bare én batch. μ ≈ μ<sub>max</sub>.</Li>
            <Li><Term>Fed-batch</Term> — delvis åpent: kontinuerlig/periodevis tilførsel av medium, men ingen avtapping → volumet øker. Begrensende substrat tilsettes kontrollert. Kvasi steady-state.</Li>
            <Li><Term>Semi-batch</Term> — mellomting mellom batch og kontinuerlig.</Li>
            <Li><Term>Kontinuerlig</Term> — åpent system med inn- og utstrøm → <Term>steady-state</Term>. Kulturen holdes i vekstfase; μ &lt; μ<sub>max</sub> og styres av fortynningshastigheten D. Utdypes i <em>A2</em>.</Li>
          </ul>

          <H3>Sterilisering (oversikt)</H3>
          <P>De fleste kulturer må holdes <Term>aseptiske (sterile)</Term> gjennom hele dyrkingsperioden (unntak: noe mat- og drikkeproduksjon). Feil steriliseringsmetode kan føre til at <strong>3–5 % av industrielle fermenteringer tapes</strong>. Medium og alt utstyr — ventiler, overganger, rør/slanger — steriliseres, oftest ved damp. Tilførsel av luft/O₂ skjer via <Term>sterilfiltrering</Term>. Volum opp til ~150 L kan sterilfiltreres; større volum krever steril overføring via rør/slanger. Mer i <em>A8 (reaktordesign)</em>.</P>

          <H3>Viktige industrielle eksempler</H3>
          <P>Tradisjonelt (brød, øl, vin), landbruk (soppmidler), aminosyrer (glutamat, lysin), enzymer (cellulaser, lipaser, proteaser), drivstoff (etanol, butanol, metan), organiske syrer (eddik-, sitron-, melkesyre), farmasøytika (antibiotika, vitaminer, antistoffer) og <Term>SCP</Term> (encelleprotein). Utdypes i <em>A10</em> og <em>X1 (bærekraft)</em>.</P>

          <TableNote>
            <span><strong>Tabeller på eksamen:</strong> A1 er hovedsakelig konseptuelt og krever sjelden tabelloppslag. Formelsamlingen blir først sentral fra A2/A4 og utover (vekstkinetikk, utbytte, oksygenoverføring). Kjenn likevel til hvor produkt-/organismeoversikter står, så du raskt kan plassere et produkt i riktig kategori.</span>
          </TableNote>
        </Section>

        {/* 4. EKSEMPLER */}
        <Section label="Eksempler" title="Gjennomgåtte oppgaver" icon={<Lightbulb size={14} />}>

          <Example n={1} title="Klassifisering av bioprodukter (MC-stil, V2025-inspirert)">
            <P>Avgjør hvilke påstander som er <strong>riktige</strong>:</P>
            <ol style={{ paddingLeft: 22 }}>
              <Li>«Alle celleprodukter er intracellulære.» → <strong style={{ color: "#EF4444" }}>Feil</strong> — mange er ekstracellulære (aminosyrer, sitronsyre, mange antibiotika).</Li>
              <Li>«Primære metabolitter er vekstuavhengige.» → <strong style={{ color: "#EF4444" }}>Feil</strong> — primære er <em>vekstavhengige</em> (logfasen); det er de sekundære som er vekstuavhengige.</Li>
              <Li>«Antibiotika er et eksempel på en sekundær metabolitt.» → <strong style={{ color: ACCENT }}>Riktig</strong>.</Li>
              <Li>«Enzymer kan masseproduseres via fermenteringsprosesser.» → <strong style={{ color: ACCENT }}>Riktig</strong>.</Li>
              <Li>«Valg av rensetrinn påvirkes av produktkonsentrasjonen.» → <strong style={{ color: ACCENT }}>Riktig</strong> — lav konsentrasjon krever mer oppkonsentrering i DSP.</Li>
            </ol>
            <P style={{ fontSize: 14, color: TEXT2 }}>Merk: slike MC-oppgaver gir <strong>minuspoeng</strong> for feil svar. Svar bare på det du er sikker på.</P>
          </Example>

          <Example n={2} title="Plasser trinnene i USP eller DSP">
            <P>Sorter: (a) sterilfiltrering av luft, (b) sentrifugering av celler, (c) inokulumforberedelse, (d) kromatografisk rensing, (e) mediesammensetning.</P>
            <Formula>USP: (c) inokulum, (e) medium, (a) lufttilførsel | DSP: (b) celleseparasjon, (d) rensing</Formula>
            <P style={{ margin: 0 }}>Tommelfingerregel: alt <em>før og under</em> dyrkingen = USP; alt <em>etter</em> høsting = DSP.</P>
          </Example>

          <Example n={3} title="Effekt av stammeutvikling (enkel kvantitativ)">
            <P>En villtypestamme gir 20 mg/L av et produkt. Etter stammeutvikling produserer den 90 g/L. Hvor mange ganger er utbyttet økt?</P>
            <Formula>faktor = 90 g/L ÷ 0,020 g/L = 90 / 0,020 = 4500×</Formula>
            <P style={{ margin: 0 }}>Dette illustrerer poenget fra penicillinhistorien (&gt; 50 000× i praksis): stammeutvikling og prosessoptimalisering er avgjørende for kommersiell levedyktighet.</P>
          </Example>
        </Section>

        {/* 5. VIKTIGE SAMMENHENGER */}
        <Section label="Viktige sammenhenger" title="Hvordan A1 kobler til resten" icon={<Network size={14} />}>
          <Card>
            <P>A1 er kartet over hele Del A. Hvert trinn i fermenteringsprosessen utdypes i et eget delemne:</P>
            <ul style={{ paddingLeft: 22 }}>
              <Li><Term>A2 — Vekstkinetikk:</Term> kvantifiserer vekstkurven, μ, μ<sub>max</sub> og D som introduseres her (metabolitt-faser, batch vs. kontinuerlig).</Li>
              <Li><Term>A3 — Industrielle medier:</Term> detaljer om mediesammensetning (karbon-/nitrogenkilder) nevnt i prosessoversikten.</Li>
              <Li><Term>A6 — Inokulum:</Term> «produksjon av en aktiv, ren kultur» — oppskalering fra stockkultur til produksjonsfermentor.</Li>
              <Li><Term>A7 — Nedstrøm (DSP):</Term> utvinning og rensing; intracellulær/ekstracellulær-skillet styrer metodevalg.</Li>
              <Li><Term>A8 — Reaktordesign:</Term> bioreaktoren der dyrkingen skjer, samt aseptiske forhold og sterilisering.</Li>
              <Li><Term>A10 — Industrielle eksempler:</Term> konkrete prosesser (brygging m.m.) bygger på produktkategoriene her.</Li>
              <Li><Term>X1 — Bærekraft:</Term> kobler bioprosesser til bærekraftig industriell produksjon (læringsmål 2).</Li>
            </ul>
          </Card>
        </Section>

        {/* 6. QUIZ */}
        <Section label="Quiz" title="Test deg selv" icon={<Layers size={14} />}>
          <P>Klikk på kortet for å snu det. Spørsmålene er inspirert av eksamen (ikke kopiert).</P>
          <Flashcards />
        </Section>

        <footer style={{ textAlign: "center", color: TEXT2, fontFamily: FONT_BODY, fontSize: 13, marginTop: 40, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>
          IMAK2005 · A1 · Introduksjon til fermenteringsprosesser
        </footer>
      </div>
    </div>
  );
}
