import React from "react";

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

export default function MikrobiellVekstkinetikkTeori() {
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
