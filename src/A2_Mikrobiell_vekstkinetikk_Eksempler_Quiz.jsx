import React, { useState } from "react";

// ============================================================
//  IMAK2005 — A2 Mikrobiell vekstkinetikk — DEL 2: EKSEMPLER & QUIZ
//  Del A (bioteknologi) · Accent: #10B981 (emerald)
//  Standalone artifact (Part 2 of 2)
// ============================================================

const ACCENT = "#10B981";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TXT = "#F8FAFC";
const TXT2 = "#94A3B8";

// ---- Reusable primitives (identical to Part 1) ------------

function Section({ label, title, children }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{ borderLeft: `4px solid ${ACCENT}`, paddingLeft: 16, marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: ACCENT,
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 30,
            fontWeight: 700,
            color: TXT,
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function P({ children, style = {} }) {
  return (
    <p
      style={{
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 16,
        lineHeight: 1.7,
        color: TXT,
        margin: "0 0 12px 0",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function FB({ children }) {
  return (
    <span
      style={{
        color: ACCENT,
        background: "rgba(16,185,129,0.1)",
        borderLeft: `3px solid ${ACCENT}`,
        padding: "1px 8px 1px 6px",
        borderRadius: 3,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

function F({ children, note }) {
  return (
    <div style={{ margin: "12px 0" }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 15,
          color: TXT,
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${BORDER}`,
          borderRadius: 8,
          padding: "10px 14px",
          lineHeight: 1.6,
          overflowX: "auto",
          whiteSpace: "pre-wrap",
        }}
      >
        {children}
      </div>
      {note && (
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: TXT2, marginTop: 6, paddingLeft: 4 }}>
          {note}
        </div>
      )}
    </div>
  );
}

// ---- Worked example component -----------------------------

function Eksempel({ n, tag, title, oppgave, steps, svar }) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: 24,
        marginBottom: 20,
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: ACCENT,
            color: BG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          {n}
        </span>
        <h3
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 19,
            fontWeight: 700,
            color: TXT,
            margin: 0,
            flex: 1,
          }}
        >
          {title}
        </h3>
        {tag && (
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: TXT2,
              border: `1px solid ${BORDER}`,
              borderRadius: 12,
              padding: "2px 10px",
            }}
          >
            {tag}
          </span>
        )}
      </div>

      {/* problem statement */}
      <div
        style={{
          background: "rgba(16,185,129,0.06)",
          borderLeft: `3px solid ${ACCENT}`,
          borderRadius: 6,
          padding: "12px 16px",
          marginBottom: 16,
        }}
      >
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: ACCENT, marginBottom: 6, letterSpacing: 1 }}>
          OPPGAVE
        </div>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, color: TXT, lineHeight: 1.6 }}>{oppgave}</div>
      </div>

      {/* steps */}
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TXT2, marginBottom: 8, letterSpacing: 1 }}>
        FRAMGANGSMÅTE
      </div>
      <div>{steps}</div>

      {/* answer */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${ACCENT}`,
          borderRadius: 8,
          padding: "12px 16px",
          marginTop: 14,
        }}
      >
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: ACCENT, letterSpacing: 1 }}>SVAR </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: TXT, fontWeight: 600 }}>{svar}</span>
      </div>
    </div>
  );
}

function Step({ children }) {
  return <P style={{ fontSize: 15, marginBottom: 8 }}>{children}</P>;
}

// ---- Flashcard quiz ---------------------------------------

const CARDS = [
  {
    type: "Konsept",
    q: "Hva skjer ved washout i en kjemostat, og hvordan korrigerer systemet seg selv?",
    a: "Washout: når μ < D vaskes celler ut raskere enn de produseres. Da synker biomassen, restsubstratet stiger (færre celler bruker det), noe som øker μ til μ > D igjen — biomassen øker og steady-state gjenopprettes. Kjemostaten er altså selvbalanserende. Vaskes cellene helt ut (x = 0) er D = Dcrit.",
  },
  {
    type: "Beregning",
    q: "Gitt μmax = 0,5 t⁻¹, Ks = 0,2 g/L og S = 1,0 g/L. Beregn spesifikk veksthastighet μ (Monod).",
    a: "μ = μmax·S/(Ks+S) = 0,5 · 1,0/(0,2+1,0) = 0,5 · 1,0/1,2 = 0,42 t⁻¹.",
  },
  {
    type: "Beregning",
    q: "En bakterie har doblingstid td = 30 min. Regn ut spesifikk veksthastighet μ.",
    a: "μ = ln(2)/td = 0,693/0,5 t = 1,39 t⁻¹. (Husk å gjøre om 30 min til 0,5 t.)",
  },
  {
    type: "Beregning",
    q: "En kultur går fra 0,8 g/L til 6,4 g/L biomasse i løpet av 4 timer i logfasen. Beregn μ.",
    a: "ln xt = ln x0 + μt ⇒ μ = ln(xt/x0)/t = ln(6,4/0,8)/4 = ln(8)/4 = 2,079/4 = 0,52 t⁻¹.",
  },
  {
    type: "Beregning",
    q: "Dyrking startet med 0,7 g/L celler og 35 g/L glukose. Sluttbiomasse 70 g/L, restglukose 1,2 g/L. Bestem Yxs.",
    a: "Yxs = Δx/ΔS = (70 − 0,7)/(35 − 1,2) = 69,3/33,8 = 2,05 g biomasse per g glukose. (Volum kanselleres når begge er i g/L.)",
  },
  {
    type: "Beregning",
    q: "Kjemostat: F = 2,0 L/t, V = 5,0 L. Beregn fortynningshastigheten D og angi μ ved steady-state.",
    a: "D = F/V = 2,0/5,0 = 0,4 t⁻¹. Ved steady-state er μ = D = 0,4 t⁻¹ (fortynningshastigheten kontrollerer veksthastigheten).",
  },
  {
    type: "Beregning",
    q: "Kjemostat ved steady-state: Y = 0,5 g/g, SR = 20 g/L, restsubstrat s̄ = 2 g/L. Beregn biomassekonsentrasjonen x̄.",
    a: "x̄ = Y·(SR − s̄) = 0,5 · (20 − 2) = 0,5 · 18 = 9 g/L.",
  },
  {
    type: "Beregning",
    q: "Beregn kritisk fortynningshastighet Dcrit for μmax = 0,9 t⁻¹, Ks = 0,5 g/L, SR = 10 g/L.",
    a: "Dcrit = μmax·SR/(Ks + SR) = 0,9 · 10/(0,5 + 10) = 9/10,5 = 0,86 t⁻¹. Over denne D vaskes kulturen ut.",
  },
  {
    type: "Beregning",
    q: "Black-box: Yxs = 2,05 g/g for glukose (Mw 180,16) med celle-molvekt 25,16 g/mol (inkl. aske). Beregn biomassekoeffisienten c.",
    a: "c = Yxs · (Mw substrat / Mw celler) = 2,05 · (180,16/25,16) = 14,7 mol biomasse per mol glukose.",
  },
  {
    type: "Beregning",
    q: "RQ: en celle tar opp 0,25 mol O₂ og produserer 0,27 mol CO₂ per tidsenhet. Beregn respirasjonskvotienten.",
    a: "RQ = CO₂ produsert / O₂ forbrukt = 0,27/0,25 = 1,08. RQ forteller noe om hvilken metabolsk vei/substrat som brukes.",
  },
  {
    type: "Sammenligning",
    q: "Forklar den viktigste forskjellen mellom batch- og kontinuerlig kultur når det gjelder vekstkinetikk.",
    a: "Batch er lukket (ingen inn/ut), følger hele vekstkurven og har μ = μmax under vanlige forhold; kan være substrat- OG/ELLER giftbegrenset. Kontinuerlig er åpent, når steady-state (μ = D, alltid < μmax), holdes i logfasen, og er kun substratbegrenset. I kontinuerlig styrer fortynningshastigheten veksten.",
  },
  {
    type: "Konsept",
    q: "I hvilke vekstfaser produseres henholdsvis primære og sekundære metabolitter?",
    a: "Primære metabolitter (vekstavhengige — aminosyrer, vitaminer, nukleinsyrer) produseres i eksponensialfasen/logfasen. Sekundære metabolitter (vekstuavhengige — antibiotika, alkoholer) produseres i stasjonærfasen (idiofasen).",
  },
  {
    type: "Konsept",
    q: "Hva betyr halvmetningskonstanten Ks, og hva betyr en lav Ks-verdi?",
    a: "Ks er substratkonsentrasjonen der μ = ½·μmax. Lav Ks ⇒ høy affinitet til substratet: organismen vokser nær μmax selv ved lav substratkonsentrasjon. Ks påvirker restsubstratkonsentrasjon og maks fortynningshastighet i kjemostat.",
  },
  {
    type: "Konsept",
    q: "Hvilke fordeler gir en flertrinns kjemostat sammenlignet med ett trinn?",
    a: "Flere kjemostater i serie gir ulike forhold (substratkons.) i hvert trinn. Det gjør at man kan utnytte flere karbonkilder, og separere biomasseproduksjon fra metabolittproduksjon — gunstig for sekundære metabolitter og biodrivstoff.",
  },
  {
    type: "Konsept",
    q: "Hva er forskjellen på en turbidostat og en kjemostat?",
    a: "Kjemostat: konstant flowhastighet styrt av substrattilførsel ⇒ konstant μ og konstant D. Turbidostat: flowhastigheten reguleres etter optisk tetthet (cellekonsentrasjon) ⇒ varierende μ og varierende D, men konstant cellekonsentrasjon.",
  },
  {
    type: "Konsept",
    q: "Hva er fed-batch, og hvorfor brukes det (bruk penicillin som eksempel)?",
    a: "Fed-batch: start som batch, tilsett substrat underveis uten uttapping (variabelt volum) ⇒ kvasi steady-state. Brukes for å styre en begrensende komponent. Penicillin (sekundær metabolitt) produseres i idiofasen; glukosetilsats styrer både log- og idiofasen. For mye glukose ⇒ for stort O₂-krav; for lite ⇒ org. N brukes som C-kilde, høy pH, for lite biomasse.",
  },
];

function Quiz() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = CARDS[i];

  const go = (dir) => {
    setFlipped(false);
    setI((prev) => (prev + dir + CARDS.length) % CARDS.length);
  };

  const typeColor = card.type === "Beregning" ? "#F59E0B" : card.type === "Sammenligning" ? "#06B6D4" : ACCENT;

  return (
    <div>
      <style>{`
        .flip-inner { transition: transform .55s cubic-bezier(.4,.2,.2,1); transform-style: preserve-3d; }
        .flip-inner.is-flipped { transform: rotateY(180deg); }
        .flip-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .flip-back { transform: rotateY(180deg); }
        .navbtn { transition: filter .15s ease, background .15s ease; }
        .navbtn:hover { filter: brightness(1.15); }
      `}</style>

      {/* counter + type */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: TXT2 }}>
          Kort {i + 1} av {CARDS.length}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: typeColor,
            border: `1px solid ${typeColor}`,
            borderRadius: 12,
            padding: "3px 12px",
          }}
        >
          {card.type}
        </span>
      </div>

      {/* card */}
      <div style={{ perspective: 1600, marginBottom: 16 }}>
        <div
          className={"flip-inner" + (flipped ? " is-flipped" : "")}
          onClick={() => setFlipped((f) => !f)}
          style={{ position: "relative", width: "100%", minHeight: 280, cursor: "pointer" }}
        >
          {/* front */}
          <div
            className="flip-face"
            style={{
              position: "absolute",
              inset: 0,
              background: CARD,
              border: `1px solid ${BORDER}`,
              borderTop: `3px solid ${typeColor}`,
              borderRadius: 12,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TXT2, letterSpacing: 1, marginBottom: 14 }}>
              SPØRSMÅL
            </div>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 21, fontWeight: 600, color: TXT, lineHeight: 1.4 }}>
              {card.q}
            </div>
            <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: TXT2, marginTop: 20 }}>
              Klikk for å snu →
            </div>
          </div>

          {/* back */}
          <div
            className="flip-face flip-back"
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(16,185,129,0.06)",
              border: `1px solid ${ACCENT}`,
              borderRadius: 12,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: ACCENT, letterSpacing: 1, marginBottom: 14 }}>
              SVAR
            </div>
            <div
              style={{
                fontFamily: card.type === "Beregning" ? "'JetBrains Mono', monospace" : "'Source Sans 3', sans-serif",
                fontSize: card.type === "Beregning" ? 15 : 16,
                color: TXT,
                lineHeight: 1.65,
              }}
            >
              {card.a}
            </div>
          </div>
        </div>
      </div>

      {/* nav */}
      <div style={{ display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
        <button className="navbtn" onClick={() => go(-1)} style={navStyle}>
          ← Forrige
        </button>

        <button
          className="navbtn"
          onClick={() => setFlipped((f) => !f)}
          style={{ ...navStyle, background: ACCENT, color: BG, border: `1px solid ${ACCENT}`, fontWeight: 700 }}
        >
          {flipped ? "Vis spørsmål" : "Vis svar"}
        </button>

        <button className="navbtn" onClick={() => go(1)} style={navStyle}>
          Neste →
        </button>
      </div>

      {/* progress dots */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
        {CARDS.map((_, idx) => (
          <span
            key={idx}
            onClick={() => {
              setFlipped(false);
              setI(idx);
            }}
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              cursor: "pointer",
              background: idx === i ? ACCENT : BORDER,
              transition: "background .15s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const navStyle = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 15,
  fontWeight: 600,
  color: TXT,
  background: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: 8,
  padding: "10px 18px",
  cursor: "pointer",
};

// ---- Main component ---------------------------------------

export default function VekstkinetikkEksemplerQuiz() {
  return (
    <div style={{ background: BG, minHeight: "100vh", padding: "0 0 60px 0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px 0 24px" }}>
        {/* HEADER */}
        <header style={{ marginBottom: 44 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
            <span
              style={{
                background: ACCENT,
                color: BG,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                fontSize: 13,
                padding: "4px 12px",
                borderRadius: 20,
              }}
            >
              Del A · Bioteknologi
            </span>
            <span
              style={{
                border: `1px solid ${ACCENT}`,
                color: ACCENT,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                fontSize: 13,
                padding: "4px 12px",
                borderRadius: 20,
              }}
            >
              A2
            </span>
            <span
              style={{
                border: `1px solid ${BORDER}`,
                color: TXT2,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                padding: "4px 12px",
                borderRadius: 20,
              }}
            >
              Del 2 av 2 · Eksempler &amp; Quiz
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 42,
              fontWeight: 800,
              color: TXT,
              margin: "0 0 12px 0",
              lineHeight: 1.05,
            }}
          >
            Mikrobiell vekstkinetikk — Eksempler og Quiz
          </h1>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 18, color: TXT2, margin: 0, lineHeight: 1.6 }}>
            Gjennomregnede oppgaver i eksamensstil (μ, td, Monod, Yxs, kjemostat, RQ) etterfulgt av en
            flashcard-quiz. Tallene er valgt for å ligne tidligere eksamener (V2023–V2025) uten å kopiere dem.
          </p>
        </header>

        {/* EKSEMPLER */}
        <Section label="Eksempler" title="Gjennomregnede oppgaver">
          <Eksempel
            n="1"
            tag="μ fra vekstdata"
            title="Spesifikk veksthastighet fra to målepunkter"
            oppgave={
              <>
                I logfasen måles biomassekonsentrasjonen til 0,5 g/L ved t = 0 og 8,0 g/L ved t = 5,0 t.
                Beregn spesifikk veksthastighet μ og doblingstiden td.
              </>
            }
            steps={
              <>
                <Step>Bruk den integrerte vekstligningen for logfasen:</Step>
                <F>ln xt = ln x₀ + μ·t  ⟹  μ = ln(xt / x₀) / t</F>
                <Step>Sett inn:</Step>
                <F>μ = ln(8,0 / 0,5) / 5,0 = ln(16) / 5,0 = 2,773 / 5,0 = 0,555 t⁻¹</F>
                <Step>Doblingstid følger direkte:</Step>
                <F>td = ln(2) / μ = 0,693 / 0,555 = 1,25 t</F>
              </>
            }
            svar="μ ≈ 0,55 t⁻¹  ·  td ≈ 1,25 t (75 min)"
          />

          <Eksempel
            n="2"
            tag="td → μ → tid"
            title="Doblingstid, veksthastighet og tid til ønsket biomasse"
            oppgave={
              <>
                En bakterie har doblingstid td = 30 min under optimale forhold. Du starter med 2 × 10² g biomasse.
                (i) Regn ut μ. (ii) Hvor lang tid tar det å nå 1,5 × 10⁸ g?
              </>
            }
            steps={
              <>
                <Step>(i) Gjør om td til timer (0,5 t) og bruk td = ln2/μ:</Step>
                <F>μ = ln(2) / td = 0,693 / 0,5 = 1,386 t⁻¹</F>
                <Step>(ii) Løs vekstligningen med hensyn på t:</Step>
                <F>t = ln(xt / x₀) / μ = ln(1,5×10⁸ / 2×10²) / 1,386</F>
                <F note="ln(7,5×10⁵) = 13,53">t = 13,53 / 1,386 = 9,76 t</F>
              </>
            }
            svar="μ ≈ 1,39 t⁻¹  ·  t ≈ 9,8 timer"
          />

          <Eksempel
            n="3"
            tag="Monod"
            title="Beregn μ med Monods ligning"
            oppgave={
              <>
                En organisme har μmax = 0,9 t⁻¹ og Ks = 0,5 g/L. Restsubstratkonsentrasjonen er S = 2,0 g/L.
                Beregn μ, og kommenter hvor nær μmax du er.
              </>
            }
            steps={
              <>
                <Step>Sett inn i Monods ligning:</Step>
                <F>μ = μmax · S / (Ks + S) = 0,9 · 2,0 / (0,5 + 2,0)</F>
                <F>μ = 0,9 · 2,0 / 2,5 = 0,9 · 0,8 = 0,72 t⁻¹</F>
                <Step>
                  S = 2,0 g/L er 4× Ks, så μ er 80 % av μmax. Skulle du ned mot Ks (0,5 g/L) ville μ falle til
                  ½·μmax = 0,45 t⁻¹.
                </Step>
              </>
            }
            svar="μ = 0,72 t⁻¹  (80 % av μmax)"
          />

          <Eksempel
            n="4"
            tag="Yxs"
            title="Utbyttekoeffisient fra eksperimentelle data"
            oppgave={
              <>
                <FB>(Inspirert av V2024 oppg. 2.8)</FB> Candida utilis dyrkes i 5,0 L med glukose. Start: 0,7 g/L
                celler og 35 g/L glukose. Etter dyrking er det høstet 0,35 kg biomasse, og restglukose er 1,2 g/L.
                Bestem Yxs.
              </>
            }
            steps={
              <>
                <Step>Regn om høstet biomasse til konsentrasjon (V = 5,0 L):</Step>
                <F>x_slutt = 350 g / 5,0 L = 70 g/L   (x_start = 0,7 g/L)</F>
                <Step>Utbyttekoeffisient = produsert biomasse / forbrukt substrat:</Step>
                <F>Yxs = Δx / ΔS = (70 − 0,7) / (35 − 1,2) = 69,3 / 33,8</F>
                <F note="Volumet kanselleres så lenge alt er i g/L.">Yxs = 2,05 g biomasse per g glukose</F>
              </>
            }
            svar="Yxs ≈ 2,05 g/g"
          />

          <Eksempel
            n="5"
            tag="Black-box · c"
            title="Biomassekoeffisient c fra Yxs"
            oppgave={
              <>
                Fortsettelse av eksempel 4: sett opp black-box-ligningen med NH₃ som N-kilde og biomasse
                (CH₁,₈₃O₀,₅₄N₀,₁₀) som produkt. Beregn biomassekoeffisienten c (anta 4 % aske).
              </>
            }
            steps={
              <>
                <Step>Black-box-skjelett:</Step>
                <F>C₆H₁₂O₆ + a O₂ + b NH₃ → c·CH₁,₈₃O₀,₅₄N₀,₁₀ + d CO₂ + e H₂O</F>
                <Step>Molvekter (Mw):</Step>
                <F note="Askekorreksjon: 23,9 / 0,96 ≈ 24,9 g/mol (4 % aske ⟹ del på 0,96).">
                  {"Mw glukose = 180,16 g/mol\nMw celle = 12,01 + 1,83·1,01 + 0,54·16,0 + 0,10·14,0 = 23,9 g/mol"}
                </F>
                <Step>Bruk koblingen mellom Yxs og c:</Step>
                <F>c = Yxs · (Mw substrat / Mw celle) = 2,05 · (180,16 / 24,9) ≈ 14,8</F>
              </>
            }
            svar="c ≈ 14,8 mol biomasse per mol glukose"
          />

          <Eksempel
            n="6"
            tag="Kjemostat"
            title="D, steady-state biomasse og kritisk D"
            oppgave={
              <>
                En kjemostat (V = 4,0 L) mates med F = 1,2 L/t. Utbyttet er Y = 0,45 g/g, tilført substrat
                SR = 25 g/L, restsubstrat ved steady-state s̄ = 0,8 g/L. μmax = 0,8 t⁻¹, Ks = 0,4 g/L.
                Beregn (i) D, (ii) x̄, (iii) Dcrit.
              </>
            }
            steps={
              <>
                <Step>(i) Fortynningshastighet:</Step>
                <F>D = F / V = 1,2 / 4,0 = 0,30 t⁻¹   (= μ ved steady-state)</F>
                <Step>(ii) Biomasse ved steady-state:</Step>
                <F>x̄ = Y·(SR − s̄) = 0,45·(25 − 0,8) = 0,45·24,2 = 10,9 g/L</F>
                <Step>(iii) Kritisk fortynningshastighet (washout):</Step>
                <F>Dcrit = μmax·SR/(Ks + SR) = 0,8·25/(0,4 + 25) = 20/25,4 = 0,79 t⁻¹</F>
              </>
            }
            svar="D = 0,30 t⁻¹  ·  x̄ ≈ 10,9 g/L  ·  Dcrit ≈ 0,79 t⁻¹"
          />

          <Eksempel
            n="7"
            tag="RQ"
            title="Respirasjonskvotient fra gassmålinger"
            oppgave={
              <>
                <FB>(Inspirert av V2024 oppg. 2.9)</FB> I et fermenteringsforsøk forbrukes 0,25 mol O₂ og det
                produseres 0,27 mol CO₂ over et tidsintervall. Beregn RQ og forklar kort hva den forteller.
              </>
            }
            steps={
              <>
                <Step>RQ er forholdet mellom produsert CO₂ og forbrukt O₂:</Step>
                <F>RQ = (CO₂ ut − CO₂ inn) / (O₂ inn − O₂ ut) = 0,27 / 0,25 = 1,08</F>
                <Step>
                  RQ ≈ 1 tyder på karbohydrat (glukose) som substrat med fullstendig oksidasjon. Avvik fra 1
                  indikerer andre substrater eller metabolske veier (f.eks. fettsyrer gir RQ &lt; 1).
                </Step>
              </>
            }
            svar="RQ = 1,08  (≈ karbohydratmetabolisme)"
          />

          <Eksempel
            n="8"
            tag="Eksponentiell vekst"
            title="Tid for massiv oppformering (Nt = N₀·2ⁿ-resonnement)"
            oppgave={
              <>
                <FB>(Inspirert av V2023 oppg. 4a)</FB> En startkultur med Penicillium chrysogenum inneholder
                2,5 × 10⁻¹¹ g celler. Hvor lang tid tar det å nå 4,0 × 10²⁵ g biomasse når μ = 0,12 t⁻¹?
              </>
            }
            steps={
              <>
                <Step>Bruk den integrerte logfase-ligningen løst for t:</Step>
                <F>t = ln(xt / x₀) / μ</F>
                <F>t = ln(4,0×10²⁵ / 2,5×10⁻¹¹) / 0,12 = ln(1,6×10³⁶) / 0,12</F>
                <F note="ln(1,6×10³⁶) ≈ 83,4">t = 83,4 / 0,12 ≈ 695 t</F>
              </>
            }
            svar="t ≈ 695 timer (≈ 29 døgn)"
          />
        </Section>

        {/* QUIZ */}
        <Section label="Quiz" title="Flashcards — test deg selv">
          <P style={{ marginBottom: 20, color: TXT2 }}>
            {CARDS.length} kort som blander konsept-, beregnings- og sammenligningsspørsmål i eksamensstil.
            Klikk kortet (eller «Vis svar») for å snu det. Bruk prikkene for å hoppe direkte til et kort.
          </P>
          <Quiz />
        </Section>

        {/* footer */}
        <div
          style={{
            textAlign: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: TXT2,
            marginTop: 30,
            paddingTop: 24,
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          A2 Mikrobiell vekstkinetikk — Del 2 av 2 (Eksempler &amp; Quiz)
        </div>
      </div>
    </div>
  );
}
