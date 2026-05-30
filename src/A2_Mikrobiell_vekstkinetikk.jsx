import React, { useState } from "react";

// ============================================================
//  IMAK2005 — A2 · Mikrobiell vekstkinetikk
//  Kombinert side: Teori + Eksempler & Quiz (klikkbare faner).
//  Begge delene er pakket i hver sin scope (IIFE) slik at de
//  delte hjelpe-komponentene ikke kolliderer.
// ============================================================

const WRAP_ACCENT = "#10B981";
const WRAP_BG = "#0F172A";
const WRAP_BORDER = "#334155";
const WRAP_TXT = "#F8FAFC";
const WRAP_SUB = "#94A3B8";

const TeoriPage = (() => {
// ============================================================
//  IMAK2005 — A2 Mikrobiell vekstkinetikk — DEL 1: TEORI
//  Del A (bioteknologi) · Accent: #10B981 (emerald)
//  Part 1 of 2 (Header, Læringsmål, Teori, Viktige sammenhenger)
// ============================================================

const ACCENT = "#10B981";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TXT = "#F8FAFC";
const TXT2 = "#94A3B8";

// ---- Reusable primitives ----------------------------------

function Section({ label, title, children }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <div
        style={{
          borderLeft: `4px solid ${ACCENT}`,
          paddingLeft: 16,
          marginBottom: 20,
        }}
      >
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

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: 24,
        marginBottom: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function H3({ children }) {
  return (
    <h3
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 20,
        fontWeight: 700,
        color: TXT,
        margin: "0 0 12px 0",
      }}
    >
      {children}
    </h3>
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

// Fagbegrep highlight
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
        fontFamily: "'Source Sans 3', sans-serif",
      }}
    >
      {children}
    </span>
  );
}

// Formula block
function F({ children, note }) {
  return (
    <div style={{ margin: "14px 0" }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16,
          color: TXT,
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${BORDER}`,
          borderRadius: 8,
          padding: "12px 16px",
          lineHeight: 1.6,
          overflowX: "auto",
        }}
      >
        {children}
      </div>
      {note && (
        <div
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 13,
            color: TXT2,
            marginTop: 6,
            paddingLeft: 4,
          }}
        >
          {note}
        </div>
      )}
    </div>
  );
}

// Small reference pill for Tabeller / exam
function Ref({ children }) {
  return (
    <div
      style={{
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 13,
        color: TXT2,
        background: "rgba(255,255,255,0.03)",
        border: `1px dashed ${BORDER}`,
        borderRadius: 8,
        padding: "8px 12px",
        marginTop: 10,
      }}
    >
      📑 {children}
    </div>
  );
}

// ---- SVG Diagrams -----------------------------------------

function VekstkurveSVG() {
  return (
    <svg viewBox="0 0 640 320" style={{ width: "100%", height: "auto" }}>
      {/* axes */}
      <line x1="60" y1="280" x2="600" y2="280" stroke={BORDER} strokeWidth="2" />
      <line x1="60" y1="280" x2="60" y2="30" stroke={BORDER} strokeWidth="2" />
      <text x="20" y="160" fill={TXT2} fontSize="13" fontFamily="JetBrains Mono" transform="rotate(-90 20 160)">
        ln(x)  →
      </text>
      <text x="520" y="305" fill={TXT2} fontSize="13" fontFamily="JetBrains Mono">
        tid  →
      </text>

      {/* growth curve */}
      <path
        d="M60,250 C120,250 130,248 150,242
           C200,225 215,120 280,90
           C320,72 360,70 420,70
           C470,70 500,90 540,150
           C560,180 580,210 600,235"
        fill="none"
        stroke={ACCENT}
        strokeWidth="3"
      />

      {/* phase dividers */}
      {[150, 280, 470].map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="280" stroke={BORDER} strokeWidth="1" strokeDasharray="4 4" />
      ))}

      {/* phase labels */}
      <text x="75" y="60" fill={TXT} fontSize="13" fontFamily="Plus Jakarta Sans" fontWeight="700">Lag</text>
      <text x="180" y="60" fill={TXT} fontSize="13" fontFamily="Plus Jakarta Sans" fontWeight="700">Eksp. (log)</text>
      <text x="345" y="60" fill={TXT} fontSize="13" fontFamily="Plus Jakarta Sans" fontWeight="700">Stasjonær</text>
      <text x="510" y="60" fill={TXT} fontSize="13" fontFamily="Plus Jakarta Sans" fontWeight="700">Død</text>

      {/* metabolite tags */}
      <text x="165" y="300" fill={ACCENT} fontSize="11" fontFamily="Source Sans 3">primære metab.</text>
      <text x="330" y="300" fill="#F59E0B" fontSize="11" fontFamily="Source Sans 3">sekundære metab.</text>
    </svg>
  );
}

function MonodSVG() {
  return (
    <svg viewBox="0 0 640 320" style={{ width: "100%", height: "auto" }}>
      <line x1="60" y1="280" x2="600" y2="280" stroke={BORDER} strokeWidth="2" />
      <line x1="60" y1="280" x2="60" y2="30" stroke={BORDER} strokeWidth="2" />

      {/* μmax asymptote */}
      <line x1="60" y1="70" x2="600" y2="70" stroke={TXT2} strokeWidth="1" strokeDasharray="5 5" />
      <text x="500" y="62" fill={TXT2} fontSize="13" fontFamily="JetBrains Mono">μmax</text>

      {/* Monod curve: saturating */}
      <path
        d="M60,280 C120,200 160,140 240,110 C330,80 440,74 600,71"
        fill="none"
        stroke={ACCENT}
        strokeWidth="3"
      />

      {/* Ks marker: μ = μmax/2 */}
      <line x1="60" y1="175" x2="150" y2="175" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="150" y1="175" x2="150" y2="280" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="30" y="180" fill="#F59E0B" fontSize="12" fontFamily="JetBrains Mono">½μmax</text>
      <text x="138" y="298" fill="#F59E0B" fontSize="13" fontFamily="JetBrains Mono">Ks</text>

      <text x="15" y="160" fill={TXT2} fontSize="13" fontFamily="JetBrains Mono" transform="rotate(-90 15 160)">μ →</text>
      <text x="540" y="305" fill={TXT2} fontSize="13" fontFamily="JetBrains Mono">S (substrat) →</text>
    </svg>
  );
}

function KjemostatSVG() {
  return (
    <svg viewBox="0 0 640 300" style={{ width: "100%", height: "auto" }}>
      {/* reservoir */}
      <rect x="40" y="40" width="110" height="80" rx="6" fill="rgba(16,185,129,0.12)" stroke={ACCENT} strokeWidth="2" />
      <text x="95" y="78" fill={TXT} fontSize="12" fontFamily="Source Sans 3" textAnchor="middle">Medie-</text>
      <text x="95" y="95" fill={TXT} fontSize="12" fontFamily="Source Sans 3" textAnchor="middle">reservoir (SR)</text>

      {/* pump arrow in */}
      <line x1="150" y1="90" x2="260" y2="160" stroke={TXT2} strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="170" y="120" fill={TXT2} fontSize="11" fontFamily="JetBrains Mono">F (inn)</text>

      {/* fermenter */}
      <rect x="260" y="120" width="130" height="120" rx="8" fill={CARD} stroke={ACCENT} strokeWidth="2" />
      <text x="325" y="170" fill={TXT} fontSize="13" fontFamily="Plus Jakarta Sans" fontWeight="700" textAnchor="middle">Fermentor</text>
      <text x="325" y="190" fill={TXT2} fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">V, konst.</text>
      <text x="325" y="210" fill={ACCENT} fontSize="13" fontFamily="JetBrains Mono" textAnchor="middle">μ = D</text>

      {/* out arrow */}
      <line x1="390" y1="180" x2="500" y2="180" stroke={TXT2} strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="410" y="170" fill={TXT2} fontSize="11" fontFamily="JetBrains Mono">F (ut)</text>

      {/* waste */}
      <rect x="500" y="150" width="100" height="70" rx="6" fill="rgba(255,255,255,0.04)" stroke={BORDER} strokeWidth="2" />
      <text x="550" y="190" fill={TXT2} fontSize="12" fontFamily="Source Sans 3" textAnchor="middle">Uttapping</text>

      {/* D formula */}
      <text x="325" y="275" fill={TXT} fontSize="14" fontFamily="JetBrains Mono" textAnchor="middle">D = F / V</text>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={TXT2} />
        </marker>
      </defs>
    </svg>
  );
}

// ---- Main component ---------------------------------------

function MikrobiellVekstkinetikkTeori() {
  return (
    <div style={{ background: BG, minHeight: "100vh", padding: "0 0 60px 0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        .hoverlift { transition: filter .15s ease, transform .15s ease; }
        .hoverlift:hover { filter: brightness(1.12); }
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px 0 24px" }}>
        {/* ============ HEADER ============ */}
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
              Del 1 av 2 · Teori
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 46,
              fontWeight: 800,
              color: TXT,
              margin: "0 0 12px 0",
              lineHeight: 1.05,
            }}
          >
            Mikrobiell vekstkinetikk
          </h1>
          <p
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 18,
              color: TXT2,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Hvordan mikroorganismer vokser i ulike kultursystemer — vekstkurvens faser, kvantitativ
            beskrivelse av vekst (μ, td, Monod), utbyttekoeffisienter, og forskjellen mellom batch-,
            kontinuerlig- og fed-batch-kultur.
          </p>

          <div
            style={{
              marginTop: 18,
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 13,
              color: TXT2,
            }}
          >
            Kilde: <em>Principles of Fermentation Technology</em> kap. 2 · Kompendium (Stuen) kap. 1 ·
            forelesning «2 Mikrobiell vekstkinetikk»
          </div>
        </header>

        {/* ============ LÆRINGSMÅL ============ */}
        <Section label="Læringsmål" title="Hva du skal kunne">
          <Card>
            <P style={{ marginBottom: 16 }}>
              Etter dette temaet skal du kunne følgende av emnets offisielle læringsutbytter:
            </P>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Beregne utbytte, oksygenbehov og oksygenoverføring i en biologisk produksjonsprosess (vekstkinetikk leverer utbyttekoeffisientene og μ som disse beregningene bygger på).",
                "Beskrive og forklare prinsippene for, og utviklingen av, en fermenteringsprosess — herunder valg mellom batch, kontinuerlig og fed-batch dyrking.",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <span
                    style={{
                      color: ACCENT,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    LU{i + 1}
                  </span>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: TXT, lineHeight: 1.6 }}>
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* ============ TEORI ============ */}
        <Section label="Teori" title="Vekstkurven (batch-kultur)">
          <Card>
            <P>
              En <FB>batch-kultur</FB> er et <FB>lukket system</FB>: all næring tilsettes ved start, og det er
              <strong> ingen tilførsel eller avtapping</strong> underveis. Volumet er konstant, og kulturen
              er enten <strong>substratbegrenset</strong> og/eller <strong>giftbegrenset</strong>. Veksten følger
              en karakteristisk <FB>vekstkurve</FB> med fire faser:
            </P>

            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16, margin: "8px 0 20px 0" }}>
              <VekstkurveSVG />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <H3>1. Lagfase (nølefase / tilvenningsfase)</H3>
                <P style={{ margin: 0 }}>
                  Tida mellom inokulering og at vekst starter. Cellene tilpasser seg det nye mediet — ingen
                  netto økning i biomasse ennå. Lengden påvirkes av <strong>startkulturens alder og fysiologiske
                  tilstand</strong>, samt <strong>mediesammensetning</strong> og komponentenes tilgjengelighet.
                </P>
              </div>

              <div>
                <H3>2. Eksponensialfase (logfase)</H3>
                <P style={{ margin: 0 }}>
                  Gradvis økende cellevekst ved <strong>celledeling med konstant tidsintervall</strong>
                  (<FB>generasjonstid</FB>). Når næring er i overskudd, vokser organismen med <FB>maksimal
                  spesifikk veksthastighet (μmax)</FB>. Her produseres <FB>primære metabolitter</FB>
                  (vekstavhengige). Vekst beskrives eksponentielt — se neste kort.
                </P>
              </div>

              <div>
                <H3>3. Stasjonærfase</H3>
                <P style={{ margin: 0 }}>
                  Avtagende vekst fram til vekststopp. Skyldes <strong>substratbegrensning</strong> (oppbrukt C-
                  eller N-kilde, evt. O₂ eller annen oksidant) og/eller <strong>dannelse av giftige produkter</strong>.
                  Forholdet mellom μ og restsubstrat beskrives av <FB>Monods ligning</FB>. Her produseres
                  <FB>sekundære metabolitter</FB> (vekstuavhengige, f.eks. antibiotika).
                </P>
              </div>

              <div>
                <H3>4. Dødsfase</H3>
                <P style={{ margin: 0 }}>
                  Celledød fordi alle reservematerialer er oppbrukt og giftproduksjon øker. Cellene er
                  fysiologisk forskjellige fra cellene ved start.
                </P>
              </div>
            </div>

            <Ref>
              <strong>Varianter av vekstkurver</strong> (Enfors): (1) standard kurve som flater ut ved O₂-begrensning/inhibitorer;
              (2) vekst stopper plutselig pga. manglende C-/N-kilde; (3) vekst fortsetter på ny C-kilde
              (<strong>tofase / diauksisk vekst</strong>).
            </Ref>
          </Card>
        </Section>

        <Section label="Teori" title="Eksponentiell vekst & doblingstid">
          <Card>
            <P>
              I logfasen dobles celletallet med jevne mellomrom. Etter <em>n</em> generasjoner:
            </P>
            <F note="Nt = celletall ved tid t · N0 = startcelletall · n = antall generasjoner (doblinger)">
              Nt = N₀ · 2ⁿ
            </F>

            <P style={{ marginTop: 20 }}>
              Vekst kan også uttrykkes ved <FB>doblingstid (td)</FB>, også kalt <FB>generasjonstid</FB> — tida
              det tar å doble biomassen. Den henger sammen med spesifikk veksthastighet:
            </P>
            <F note="td = doblingstid (t) · μ = spesifikk veksthastighet (t⁻¹). Følger av at ln(2x/x) = μ·td.">
              td = ln(2) / μ
            </F>
            <P style={{ margin: 0, color: TXT2, fontSize: 15 }}>
              Merk: høy μ ⇒ kort doblingstid. Sammenhengen brukes ofte begge veier på eksamen
              (regn μ fra td, eller td fra μ).
            </P>
          </Card>
        </Section>

        <Section label="Teori" title="Spesifikk veksthastighet (μ)">
          <Card>
            <P>
              <FB>Spesifikk veksthastighet (μ)</FB> = biomasse produsert per enhet biomasse per tid (enhet t⁻¹).
              Vekstraten er proporsjonal med mengden biomasse som allerede finnes:
            </P>
            <F note="x = biomassekonsentrasjon (g/dm³) · μ = spesifikk veksthastighet (t⁻¹) · t = tid (timer)">
              dx/dt = μ · x
            </F>

            <P style={{ marginTop: 18 }}>
              Integrering ved konstant μ (logfasen) gir den lineariserte formen. Plotter du
              <strong> ln x mot t</strong>, får du en tilnærmet rett linje med stigning = μ:
            </P>
            <F note="x0 = start biomassekons. · xt = biomassekons. etter t timer. Stigningstall = μ.">
              ln xt = ln x₀ + μ · t
            </F>
            <P style={{ margin: 0, color: TXT2, fontSize: 15 }}>
              Dette er den mest brukte formelen på eksamen for å regne ut μ fra to målepunkter, eller for å
              regne ut hvor lang tid en gitt biomasseøkning tar.
            </P>
          </Card>
        </Section>

        <Section label="Teori" title="Monod-kinetikk">
          <Card>
            <P>
              Når substrat blir begrensende, avhenger μ av restsubstratkonsentrasjonen S. Dette beskrives av
              <FB>Monods ligning</FB> — analog til Michaelis–Menten:
            </P>
            <F note="μmax = maksimal spesifikk veksthastighet · S = restsubstratkons. · Ks = halvmetningskonstant">
              μ = μmax · S / (Ks + S)
            </F>

            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16, margin: "16px 0" }}>
              <MonodSVG />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <P style={{ margin: 0 }}>
                <FB>μmax</FB> — øvre asymptote: veksthastigheten ved substratoverskudd. Påvirker hvor høy
                fortynningshastighet en kan kjøre i kjemostat.
              </P>
              <P style={{ margin: 0 }}>
                <FB>Ks (halvmetningskonstant)</FB> — substratkonsentrasjonen der μ = ½·μmax. Lav Ks ⇒ høy
                affinitet til substratet (cella vokser nær μmax selv ved lite substrat). Påvirker
                restsubstratkonsentrasjon og maks fortynningshastighet.
              </P>
            </div>
            <P style={{ margin: "12px 0 0 0", color: TXT2, fontSize: 15 }}>
              Viktig: Y, μmax og Ks er strengt tatt ikke ekte konstanter — verdiene kan variere med
              dyrkingsbetingelsene.
            </P>
          </Card>
        </Section>

        <Section label="Teori" title="Utbyttekoeffisienter (Y)">
          <Card>
            <P>
              En <FB>utbyttekoeffisient (Y)</FB> forteller hvor mye produkt/biomasse en får ut per enhet
              forbrukt råstoff. Brukes til å bestemme hvor mye biomasse en kan få fra en gitt mengde substrat.
            </P>

            <F note="Yxs = g biomasse produsert per g substrat forbrukt. Også: Y = x/S over en dyrkingsperiode.">
              Yxs = Δ biomasse / Δ substrat = X / S
            </F>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
              <P style={{ margin: 0 }}>
                <FB>Yxs</FB> — biomasse-utbytte fra substrat (g celler / g substrat). Mest brukt.
              </P>
              <P style={{ margin: 0 }}>
                <FB>Yps</FB> — produkt-utbytte fra substrat (g produkt / g substrat).
              </P>
              <P style={{ margin: 0 }}>
                <FB>Yxo</FB> — biomasse-utbytte fra oksygen (g celler / g O₂). Relevant for O₂-behov (se A5).
              </P>
            </div>

            <P style={{ marginTop: 14 }}>
              Koblingen til <strong>black-box-ligningen</strong>: når Yxs er konstant gjennom vekstperioden, kan
              den eksperimentelle verdien brukes til å beregne biomassekoeffisienten <em>c</em>:
            </P>
            <F note="Mw = molvekt. Husk askekorreksjon (f.eks. /0,95 ved 5 % aske) på cellenes molvekt.">
              c = Yxs · (Mw substrat / Mw celler)
            </F>

            <P style={{ marginTop: 14 }}>
              Produktdannelse i forhold til vekst beskrives ved:
            </P>
            <F note="qp = spesifikk produktdannelseshastighet (mg produkt · g⁻¹ biomasse · t⁻¹) · Yp/x = produkt per biomasse">
              qp = Yp/x · μ
            </F>

            <Ref>
              <strong>Tabeller.pdf / SI Chemical Data:</strong> molvekter for substrater (glukose 180,16 g/mol;
              etanol 46,07 g/mol) og elementsammensetning/askeinnhold for ulike mikroorganismer hentes herfra på
              eksamen. <em>Se tabell for cellesammensetning og molvekt av organismen i black-box-oppgaver.</em>
            </Ref>
          </Card>
        </Section>

        <Section label="Teori" title="Vedlikeholdsenergi & ms">
          <Card>
            <P>
              Ved lave veksthastigheter er den observerte biomassekonsentrasjonen lavere enn forventet. Forklares
              med <FB>vedlikehold (maintenance)</FB> — energi brukt til andre formål enn produksjon av nytt
              cellemateriale: osmoregulering, opprettholdelse av intern pH, cellebevegelse, forsvarsmekanismer
              og syntese/omsetning av makromolekyler.
            </P>

            <P>
              <FB>Vedlikeholdskoeffisienten (ms)</FB> er substrat forbrukt per enhet biomasse per time, kun til
              vedlikehold:
            </P>
            <F note="(ds/dt)M = substratforbruk til vedlikehold · m (ms) = vedlikeholdskoeffisient · x = biomasse">
              (ds/dt)M = ms · x
            </F>

            <P style={{ marginTop: 14 }}>
              Det totale substratforbruket fordeles på vekst + vedlikehold. Sammenhengen mellom tilsynelatende
              utbytte (Yapp), ekte vekstutbytte (YG) og vedlikehold:
            </P>
            <F note="Yapp = observert (tilsynelatende) utbytte · YG = ekte vekstutbytte · μ = spesifikk veksthastighet">
              1/Yapp = 1/YG + ms/μ
            </F>
            <P style={{ margin: 0, color: TXT2, fontSize: 15 }}>
              Konsekvens: ved svært lav μ (lav D i kjemostat) går en større andel av substratet til vedlikehold ⇒
              lavere observert biomasseutbytte.
            </P>
          </Card>
        </Section>

        <Section label="Teori" title="Kontinuerlig kultur / kjemostat">
          <Card>
            <P>
              En <FB>kontinuerlig kultur</FB> er et <FB>åpent system</FB>: medium tilføres og kultur tappes ut
              kontinuerlig, slik at en når <FB>steady-state</FB> — balanse i systemet med konstant
              cellekonsentrasjon og konstant volum. Kulturen holdes i logfasen over tid. Den starter typisk som
              batch, og går så over til kontinuerlig drift.
            </P>

            <P>
              Flow inn er knyttet til reaktorvolumet via <FB>fortynningshastigheten (D)</FB>:
            </P>
            <F note="F = flowhastighet (dm³·t⁻¹) · V = volum (dm³) · D = fortynningshastighet (t⁻¹)">
              D = F / V
            </F>

            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16, margin: "16px 0" }}>
              <KjemostatSVG />
            </div>

            <P>
              Ved <strong>steady-state</strong> balanserer veksten uttappingen, slik at:
            </P>
            <F note="Fortynningshastigheten KONTROLLERER veksthastigheten. Alltid μ < μmax i en enkel kjemostat.">
              μ = D
            </F>

            <P style={{ marginTop: 14 }}>
              Setter en μ = D inn i Monod, finner en restsubstrat og biomasse ved steady-state:
            </P>
            <F note="s̄ = restsubstrat ved steady-state — bestemmes av D">
              s̄ = Ks · D / (μmax − D)
            </F>
            <F note="x̄ = biomasse ved steady-state · Y = utbyttekoeffisient · SR = opprinnelig substratkons. · s̄ = restsubstrat">
              x̄ = Y · (SR − s̄)
            </F>

            <H3>Kjemostat — egenskaper</H3>
            <P style={{ margin: 0 }}>
              Veksten styres av <strong>substrattilførselen</strong> (vekstbegrensende), ikke av giftproduksjon —
              i henhold til Monods ligning. Systemet er <FB>selvbalanserende</FB>: konstant flowhastighet,
              konstant volum, steady-state ved metabolsk kontroll.
            </P>

            <Ref>
              <strong>Større fare for kontaminering</strong> enn i batch (åpent system over lang tid) — en
              lærerannotasjon verdt å huske.
            </Ref>
          </Card>
        </Section>

        <Section label="Teori" title="Washout & kritisk fortynningshastighet">
          <Card>
            <P>
              Hvis substratkonsentrasjonen blir for lav til at veksten styres av D, skjer <FB>washout</FB>:
            </P>
            <ol style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: TXT, lineHeight: 1.8, paddingLeft: 20, margin: "8px 0" }}>
              <li>μ &lt; D ⇒ cellene vaskes ut raskere enn de produseres.</li>
              <li>Substratkonsentrasjonen øker fordi få celler er til stede.</li>
              <li>Økt substrat ⇒ μ &gt; D igjen ⇒ biomassen øker.</li>
              <li>Steady-state etableres på nytt (selvbalanserende).</li>
            </ol>

            <P style={{ marginTop: 10 }}>
              <FB>Kritisk fortynningshastighet (Dcrit)</FB> er D der x = 0 (cellene er fullstendig vasket ut):
            </P>
            <F note="Dcrit påvirkes av μmax, Ks og SR. Jo større SR, jo nærmere ligger Dcrit μmax. μmax kan aldri nås i en enkel steady-state-kjemostat (substratbegrensning må alltid råde).">
              Dcrit = μmax · SR / (Ks + SR)
            </F>
          </Card>
        </Section>

        <Section label="Teori" title="Kjemostat med feedback (cellerecirkulasjon)">
          <Card>
            <P>
              For å øke produktiviteten kan en kjøre en kunstig høy cellekonsentrasjon (x &gt; Y(SR − s)) ved
              hjelp av <FB>feedback / cellerecirkulasjon</FB>:
            </P>
            <P style={{ margin: 0 }}>
              <strong>Indre feedback:</strong> mediet ut har lavere cellekonsentrasjon enn inni reaktoren.
              <br />
              <strong>Ytre feedback:</strong> uttaket går via separering (sentrifugering/sedimentering), og en
              porsjon konsentrert biomasse resirkuleres tilbake.
            </P>
            <P style={{ marginTop: 12, marginBottom: 0 }}>
              Effekten er økt biomassekonsentrasjon, mindre restsubstrat, og høyere maksimalt uttak av biomasse
              og produkt. Kritisk fortynningshastighet økes (en kan kjøre høyere D før washout).
            </P>
          </Card>
        </Section>

        <Section label="Teori" title="Flertrinns kjemostat">
          <Card>
            <P>
              Flere kjemostater koblet i serie = <FB>flertrinnskjemostat</FB>. Fordeler:
            </P>
            <ul style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, color: TXT, lineHeight: 1.8, paddingLeft: 20, margin: "8px 0 0 0" }}>
              <li>Kan ha <strong>ulike forhold (substratkonsentrasjon)</strong> i hvert trinn.</li>
              <li>Kan <strong>utnytte flere karbonkilder</strong>.</li>
              <li>Kan <strong>separere biomasseproduksjon fra metabolittproduksjon</strong> i ulike trinn — gunstig
                for produksjon av sekundære metabolitter og biodrivstoff.</li>
            </ul>
          </Card>
        </Section>

        <Section label="Teori" title="Fed-batch (mate-batch / semi-batch)">
          <Card>
            <P>
              <FB>Fed-batch</FB> er en mellomting: en starter som batch og <strong>tilsetter substrat underveis</strong>
              uten uttapping (variabelt volum). Brukes for å styre vekst og produktdannelse — særlig når en vil
              kontrollere en begrensende komponent.
            </P>
            <P>
              Mengde substrat inn ≈ mengde substrat tatt opp av cellene, slik at cellekonsentrasjonen holdes
              tilnærmet konstant selv om total biomasse øker. Etter hvert avtar D, og en får
              <FB>kvasi-steady-state</FB> (μ ≈ D, halv steady-state).
            </P>

            <H3>Kontinuerlig vs fed-batch (vekstkinetikk)</H3>
            <P style={{ margin: 0 }}>
              <strong>Kontinuerlig:</strong> μ (&lt; μmax) og D er konstante ⇒ produktkonsentrasjonen når steady-state.
              <br />
              <strong>Fed-batch:</strong> μ og D endres gjennom prosessen (kvasi steady-state); produktkonsentrasjonen
              avhenger av forholdet mellom qp (produkt) og μ (biomasse).
            </P>

            <Ref>
              <strong>Klassisk eksempel — penicillin (sekundær metabolitt):</strong> produseres i stasjonærfasen
              (idiofasen). Både trofo-(log) og idiofasen styres ved <strong>tilsats av glukose</strong> som
              begrensende faktor. Overskudd glukose ⇒ for stort O₂-krav; for lite glukose ⇒ organisk N brukes som
              C-kilde ⇒ høy pH og for lite biomasse.
            </Ref>
          </Card>
        </Section>

        <Section label="Teori" title="Turbidostat vs kjemostat">
          <Card>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "rgba(16,185,129,0.07)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                <H3>Kjemostat</H3>
                <P style={{ margin: 0, fontSize: 15 }}>
                  Styres av <strong>substrattilførsel</strong>. Flowhastigheten settes fast.
                  <br />
                  <strong style={{ color: ACCENT }}>konstant μ, konstant D.</strong>
                </P>
              </div>
              <div style={{ background: "rgba(245,158,11,0.07)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 16 }}>
                <H3>Turbidostat</H3>
                <P style={{ margin: 0, fontSize: 15 }}>
                  Flowhastigheten <strong>reguleres etter optisk tetthet</strong> (indirekte mål på cellekons.).
                  Cellekonsentrasjon holdes konstant ved å justere tilførselen etter behov.
                  <br />
                  <strong style={{ color: "#F59E0B" }}>varierende μ, varierende D.</strong>
                </P>
              </div>
            </div>
          </Card>
        </Section>

        <Section label="Teori" title="Batch vs kontinuerlig — oppsummering">
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Source Sans 3', sans-serif" }}>
              <thead>
                <tr style={{ background: "rgba(16,185,129,0.08)" }}>
                  <th style={{ ...th, width: "34%" }}>Egenskap</th>
                  <th style={th}>Batch</th>
                  <th style={th}>Kontinuerlig</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["System", "Lukket (ikke noe inn/ut)", "Åpent (inn/ut-strøm)"],
                  ["Vekst", "Følger vekstkurve", "Holdes i logfasen / steady-state"],
                  ["Steady-state", "Nei", "Ja (μ = D)"],
                  ["Begrensning", "Substrat OG/ELLER gift", "Kun substrat"],
                  ["μ", "μ = μmax (vanlige forhold)", "μ < μmax (styrt av D)"],
                  ["Produkthøsting", "Til slutt", "Kontinuerlig ved steady-state"],
                  ["Kontroll", "Kun ved start", "pH, temp, O₂, næring, produkt konstant"],
                  ["Fordel", "Enkel; én batch ødelagt ved kontaminering", "Høy produktivitet over tid"],
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${BORDER}` }}>
                    <td style={{ ...td, color: ACCENT, fontWeight: 600 }}>{row[0]}</td>
                    <td style={td}>{row[1]}</td>
                    <td style={td}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Section>

        <Section label="Teori" title="Produktivitet">
          <Card>
            <P>
              <strong>Batch:</strong> biomasseproduktivitet = uttak per tidsenhet, der xmax = maks cellekons. i
              stasjonærfase, x₀ = inokuleringskons., ti = tid med vekst ved μmax, tii = tid uten vekst:
            </P>
            <F note="R = g biomasse · dm⁻³ · t⁻¹">
              R = (xmax − x₀) / (ti + tii)
            </F>

            <P style={{ marginTop: 14 }}>
              <strong>Kontinuerlig:</strong> biomasseproduktivitet = D·x. Den øker med økende D inntil et maksimum;
              videre økning av D senker produktiviteten (nærmer seg washout).
            </P>
            <F note="Dx = produktivitet · x = biomasse ved steady-state">
              Produktivitet = D · x
            </F>
          </Card>
        </Section>

        {/* ============ VIKTIGE SAMMENHENGER ============ */}
        <Section label="Sammenhenger" title="Viktige sammenhenger">
          <Card>
            <P style={{ marginBottom: 18 }}>
              Vekstkinetikk er navet i Del A — formlene og begrepene her dukker opp igjen i nesten alle andre
              bio-temaer:
            </P>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["A1", "Introduksjon til fermenteringsprosesser", "Gir oversikten over batch/kontinuerlig/fed-batch og primære vs sekundære metabolitter — dette temaet utdyper kinetikken bak."],
                ["A3", "Industrielle biologiske medier", "Substratkonsentrasjon (særlig C-kilden) påvirker μ og fordelingen mellom primære/sekundære metabolitter. Begrensende næringsstoff settes inn i Monod og utbytteberegninger."],
                ["A4", "Materialbalanse og støkiometri (bio)", "Utbyttekoeffisienten Yxs kobler vekstkinetikk til black-box-ligningen og elementbalanser — c = Yxs·(Mw substrat / Mw celler)."],
                ["A5", "Røring og lufttilførsel", "Yxo og O₂-behov: oksygenoverføring (OTR) kan begrense μ. Kritisk O₂-konsentrasjon og respirasjonshastighet (QO2 ∝ μ) hører hit."],
                ["A8", "Reaktordesign", "Kjemostaten er en reaktortype. D, steady-state og washout er reaktordriftsbetingelser; flertrinns-/feedback-systemer er designvalg."],
              ].map(([code, name, desc]) => (
                <div
                  key={code}
                  className="hoverlift"
                  style={{
                    display: "flex",
                    gap: 14,
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${BORDER}`,
                    borderRadius: 10,
                    padding: 14,
                    cursor: "default",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 44,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: ACCENT,
                      color: BG,
                      borderRadius: 6,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {code}
                  </span>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: TXT, marginBottom: 3 }}>
                      {name}
                    </div>
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", color: TXT2, fontSize: 15, lineHeight: 1.55 }}>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* footer note */}
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
          Del 1 av 2 ferdig — Eksempler &amp; Quiz kommer i Del 2.
        </div>
      </div>
    </div>
  );
}

const th = {
  textAlign: "left",
  padding: "12px 16px",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 700,
  fontSize: 14,
  color: TXT,
};
const td = {
  padding: "11px 16px",
  fontSize: 15,
  color: TXT,
  verticalAlign: "top",
};


return MikrobiellVekstkinetikkTeori;
})();

const EksemplerQuizPage = (() => {
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

function VekstkinetikkEksemplerQuiz() {
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


return VekstkinetikkEksemplerQuiz;
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
          A2 · Mikrobiell vekstkinetikk
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
