import React, { useState } from "react";
import {
  Calculator,
  ClipboardList,
  Lightbulb,
  CheckCircle2,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Beaker,
  Wind,
  Sigma,
} from "lucide-react";

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

export default function A4MaterialbalanseDel2() {
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
