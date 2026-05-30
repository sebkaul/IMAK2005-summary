import React, { useState } from "react";
import {
  Calculator,
  Layers,
  Flame,
  Snowflake,
  Beaker,
  Droplets,
  Route,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Table2,
  CheckCircle2,
} from "lucide-react";

// ============================================================
// IMAK2005 — Del B, Part 4 of 4
// Energibalanser — EKSEMPLER OG QUIZ  (B4/B5/B6)
// Accent: #FBBF24
// ============================================================

const ACCENT = "#FBBF24";
const ACCENT_TEXT = "#fcd34d";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TXT = "#F8FAFC";
const TXT2 = "#94A3B8";
const MONO = "'JetBrains Mono', monospace";

// ---------- reusable bits ----------
const Fag = ({ children }) => (
  <span style={{ color: ACCENT_TEXT, background: "rgba(251,191,36,0.10)", borderLeft: `3px solid ${ACCENT}`, padding: "1px 7px", borderRadius: 4, fontWeight: 600 }}>
    {children}
  </span>
);

const Card = ({ children, style }) => (
  <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, marginBottom: 22, ...style }}>{children}</div>
);

const P = ({ children }) => <p style={{ color: TXT, fontSize: 16, lineHeight: 1.75, margin: "10px 0" }}>{children}</p>;

const Mono = ({ children, hl }) => (
  <div style={{ fontFamily: MONO, background: "#0b1220", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "12px 16px", color: TXT, fontSize: 14.5, lineHeight: 1.8, overflowX: "auto", margin: "10px 0" }}>
    {children}
  </div>
);

const Note = ({ children, type = "info" }) => {
  const c = { info: { b: "#38bdf8", bg: "rgba(56,189,248,0.08)" }, warn: { b: "#fb923c", bg: "rgba(251,146,60,0.08)" }, table: { b: ACCENT, bg: "rgba(251,191,36,0.08)" }, good: { b: "#34d399", bg: "rgba(52,211,153,0.08)" } }[type];
  return <div style={{ borderLeft: `4px solid ${c.b}`, background: c.bg, borderRadius: 8, padding: "12px 16px", margin: "14px 0", color: TXT, fontSize: 15, lineHeight: 1.65 }}>{children}</div>;
};

const Step = ({ n, title, children }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 5 }}>
      <span style={{ background: "rgba(251,191,36,0.15)", color: ACCENT_TEXT, fontFamily: MONO, fontWeight: 700, fontSize: 13, width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</span>
      <span style={{ color: TXT, fontWeight: 700, fontSize: 15.5 }}>{title}</span>
    </div>
    <div style={{ paddingLeft: 33, color: TXT2, fontSize: 15, lineHeight: 1.65 }}>{children}</div>
  </div>
);

const Answer = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(52,211,153,0.08)", border: "1px solid #34d399", borderRadius: 10, padding: "12px 16px", marginTop: 10 }}>
    <CheckCircle2 size={20} color="#34d399" style={{ flexShrink: 0 }} />
    <span style={{ color: TXT, fontFamily: MONO, fontSize: 15, fontWeight: 700 }}>{children}</span>
  </div>
);

const ExampleHeader = ({ tag, icon: Icon, title }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
    <span style={{ background: ACCENT, color: "#1a1300", fontFamily: MONO, fontWeight: 700, fontSize: 12, padding: "3px 10px", borderRadius: 6 }}>{tag}</span>
    <Icon size={19} color={ACCENT} />
    <strong style={{ color: TXT, fontSize: 18 }}>{title}</strong>
  </div>
);

const TableRef = ({ children }) => (
  <Note type="table">
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
      <Table2 size={17} color={ACCENT} style={{ marginTop: 2, flexShrink: 0 }} />
      <div>{children}</div>
    </div>
  </Note>
);

// ============================================================
// Reusable PATH diagram (states + step arrows)
// states: [{label, sub}] ; steps: [string]
// ============================================================
const PathDiagram = ({ states, steps, caption }) => {
  const n = states.length;
  const W = 700;
  const boxW = 96;
  const gap = (W - boxW * n) / (n - 1);
  return (
    <svg viewBox={`0 0 ${W} 150`} style={{ width: "100%", height: "auto", maxWidth: W }}>
      <defs>
        <marker id="pa" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 Z" fill={ACCENT} />
        </marker>
      </defs>
      {states.map((s, i) => {
        const x = i * (boxW + gap);
        return (
          <g key={i}>
            <rect x={x} y={45} width={boxW} height={50} rx={9} fill="rgba(251,191,36,0.10)" stroke={ACCENT} strokeWidth="1.5" />
            <text x={x + boxW / 2} y={66} fill={TXT} fontSize="12.5" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans'">{s.label}</text>
            <text x={x + boxW / 2} y={83} fill={TXT2} fontSize="11" textAnchor="middle" fontFamily={MONO}>{s.sub}</text>
            {i < n - 1 && (
              <>
                <line x1={x + boxW} y1={70} x2={x + boxW + gap} y2={70} stroke={ACCENT} strokeWidth="2" markerEnd="url(#pa)" />
                <text x={x + boxW + gap / 2} y={36} fill={ACCENT_TEXT} fontSize="11" fontWeight="700" textAnchor="middle" fontFamily={MONO}>{steps[i]}</text>
              </>
            )}
          </g>
        );
      })}
      {caption && <text x={W / 2} y={130} fill={TXT2} fontSize="12.5" textAnchor="middle" fontFamily="'Source Sans 3'">{caption}</text>}
    </svg>
  );
};

// Flow diagram (inn / boks / ut / Q)
const FlowDiagram = ({ inn, ut, box }) => (
  <svg viewBox="0 0 660 210" style={{ width: "100%", height: "auto", maxWidth: 660 }}>
    <defs>
      <marker id="fa" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill={TXT2} /></marker>
      <marker id="fq" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill={ACCENT} /></marker>
    </defs>
    <rect x="265" y="60" width="130" height="80" rx="10" fill="rgba(251,191,36,0.12)" stroke={ACCENT} strokeWidth="2" />
    <text x="330" y="105" fill={ACCENT_TEXT} fontSize="15" fontWeight="700" textAnchor="middle" fontFamily="'Plus Jakarta Sans'">{box}</text>
    <line x1="120" y1="100" x2="263" y2="100" stroke={TXT2} strokeWidth="2" markerEnd="url(#fa)" />
    {inn.map((t, i) => <text key={i} x="124" y={80 + i * 16} fill={TXT} fontSize="12.5" fontFamily={MONO}>{t}</text>)}
    <line x1="397" y1="100" x2="540" y2="100" stroke={TXT2} strokeWidth="2" markerEnd="url(#fa)" />
    {ut.map((t, i) => <text key={i} x="430" y={80 + i * 16} fill={TXT} fontSize="12.5" fontFamily={MONO}>{t}</text>)}
    <line x1="330" y1="140" x2="330" y2="185" stroke={ACCENT} strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#fq)" />
    <text x="343" y="180" fill={ACCENT_TEXT} fontSize="17" fontWeight="700" fontFamily={MONO}>Q̇</text>
  </svg>
);

// ============================================================
// FLASHCARDS (min 8)
// ============================================================
const FLASHCARDS = [
  {
    q: "Hva er en referansetilstand, og hvorfor velger vi den?",
    a: "Vi kan ikke måle absolutt entalpi, bare ENDRINGER. Referansetilstanden (T_ref, P_ref, fase_ref) er nullpunktet alle entalpier måles relativt til. Vi velger den fritt — gjerne en tilstand som gjør regningen enkel (f.eks. der en strøm allerede ligger, eller 25 °C for reaktive systemer). Resultatet (Q) er uavhengig av valget.",
  },
  {
    q: "Skriv formelen for ΔHr° fra standard dannelsesentalpier.",
    a: "ΔHr° = Σ(νᵢ·ΔHf°)ₚᵣₒdᵤₖₜ − Σ(νᵢ·ΔHf°)ᵣₑₐₖₜₐₙₜ.  νᵢ = støkiometrisk koeffisient. Grunnstoffer har ΔHf° = 0.",
  },
  {
    q: "Hva er forskjellen mellom ΔHf° og ΔHc°?",
    a: "ΔHf° (dannelsesentalpi) = entalpi for å DANNE 1 mol stoff fra grunnstoffene (25 °C, 1 atm). ΔHc° (forbrenningsentalpi) = entalpi for å FORBRENNE 1 mol stoff fullstendig (til CO₂ + H₂O). De gir to ulike veier til samme ΔHr°.",
  },
  {
    q: "Beregn ΔHr° for CH₄ + 2O₂ → CO₂ + 2H₂O(g). Gitt ΔHf° (kJ/mol): CH₄ −74,85, CO₂ −393,5, H₂O(g) −241,83, O₂ 0.",
    a: "ΔHr° = [(−393,5) + 2·(−241,83)] − [(−74,85) + 2·0] = −877,16 + 74,85 = −802,3 kJ/mol. Eksoterm (frigjør varme).",
  },
  {
    q: "Hva sier Kirchhoffs lov?",
    a: "Reaksjonsentalpien endrer seg med temperatur: ΔHr(T) = ΔHr° + ∫₂₅→T ΔCp dT, der ΔCp = Σν·Cp(produkter) − Σν·Cp(reaktanter). I praksis håndteres dette via hypotetiske trinn: kjøl reaktanter til 25 °C, reager, varm produkter til T.",
  },
  {
    q: "Tegn en hypotetisk prosessvei for oppvarming av is fra −10 °C til damp ved 150 °C (1 atm).",
    a: "5 trinn: (1) varm is −10→0 °C [Cp,is]; (2) smelt ved 0 °C [+ΔHfus]; (3) varm væske 0→100 °C [Cp,væske]; (4) fordamp ved 100 °C [+ΔHvap]; (5) varm damp 100→150 °C [Cp,damp]. ΔĤ = sum av alle fem.",
  },
  {
    q: "Eksoterm reaksjon: er ΔHr positiv eller negativ? Hva betyr det for Q?",
    a: "Eksoterm → ΔHr < 0 (frigjør varme). I en isoterm reaktor må denne varmen FJERNES, så Q < 0 (varme ut av systemet). Endoterm → ΔHr > 0, Q > 0 (varme må tilføres).",
  },
  {
    q: "Hvorfor er fortegnskonvensjonen viktig i energibalanser?",
    a: "Konvensjonen i kurset (F&R): Q̇ − Ẇₛ = ΔḢ + … der Q > 0 betyr varme TILFØRT systemet. Et positivt svar ⇒ du må VARME prosessen; negativt svar ⇒ du må KJØLE. Bytter du fortegn feil et sted (f.eks. ut−inn vs inn−ut), snur hele konklusjonen — derfor må du være konsekvent.",
  },
  {
    q: "I dannelsesentalpimetoden: hva inngår i den spesifikke entalpien Ĥᵢ for hver komponent?",
    a: "Ĥᵢ = ΔHf°,ᵢ + ∫₂₅→T Cp,ᵢ dT (sensibel del) + evt. faseovergangsentalpier. For gasser kan sensibel del leses direkte fra Tabell B.8. Energibalanse: Q = Σ(ṅᵢĤᵢ)_ut − Σ(ṅᵢĤᵢ)_inn.",
  },
  {
    q: "Hvorfor får du fortegnsbytte når du regner ΔHr° fra forbrenningsentalpier i stedet for dannelsesentalpier?",
    a: "ΔHr° = Σ(ν·ΔHc°)ᵣₑₐₖₜₐₙₜ − Σ(ν·ΔHc°)ₚᵣₒdᵤₖₜ — altså REAKTANTER minus produkter (motsatt av dannelsesformelen). Det skyldes at ΔHc° måler veien NEDOVER til forbrente produkter; reaktantene har 'lenger å falle' enn produktene.",
  },
];

const Flashcard = () => {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const go = (d) => { setFlipped(false); setTimeout(() => setI((p) => (p + d + FLASHCARDS.length) % FLASHCARDS.length), 120); };
  const c = FLASHCARDS[i];
  return (
    <div>
      <style>{`
        .p4-flip{perspective:1600px;}
        .p4-inner{transition:transform .55s cubic-bezier(.4,.2,.2,1);transform-style:preserve-3d;position:relative;}
        .p4-inner.f{transform:rotateY(180deg);}
        .p4-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;}
        .p4-back{transform:rotateY(180deg);}
        .p4-nav:hover{background:#475569 !important;}
        .p4-flip:hover .p4-hint{opacity:1;}
      `}</style>
      <div className="p4-flip" style={{ minHeight: 280 }} onClick={() => setFlipped((f) => !f)}>
        <div className={"p4-inner" + (flipped ? " f" : "")} style={{ minHeight: 280, cursor: "pointer" }}>
          <div className="p4-face" style={{ background: CARD, border: `2px solid ${ACCENT}`, borderRadius: 14, padding: 28, minHeight: 280 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontFamily: MONO, fontSize: 12, color: "#1a1300", background: ACCENT, padding: "3px 10px", borderRadius: 6, fontWeight: 700 }}>SPØRSMÅL</span>
              <span style={{ color: TXT2, fontSize: 13, fontFamily: MONO }}>Kort {i + 1} av {FLASHCARDS.length}</span>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
              <p style={{ color: TXT, fontSize: 17, lineHeight: 1.55, margin: 0 }}>{c.q}</p>
            </div>
            <div className="p4-hint" style={{ color: TXT2, fontSize: 12.5, textAlign: "center", opacity: 0.55, transition: "opacity .3s" }}>Klikk for å snu kortet</div>
          </div>
          <div className="p4-face p4-back" style={{ background: "#172033", border: `2px solid ${ACCENT_TEXT}`, borderRadius: 14, padding: 28, minHeight: 280 }}>
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontFamily: MONO, fontSize: 12, color: ACCENT_TEXT, background: "rgba(251,191,36,0.12)", padding: "3px 10px", borderRadius: 6, fontWeight: 700, border: `1px solid ${ACCENT}` }}>SVAR</span>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", overflowY: "auto" }}>
              <p style={{ color: TXT, fontSize: 15, lineHeight: 1.6, margin: 0 }}>{c.a}</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, justifyContent: "center" }}>
        <button className="p4-nav" onClick={() => go(-1)} style={{ display: "flex", alignItems: "center", gap: 6, background: BORDER, color: TXT, border: "none", borderRadius: 9, padding: "10px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}><ChevronLeft size={17} /> Forrige</button>
        <button className="p4-nav" onClick={() => { setFlipped(false); setTimeout(() => setI(0), 120); }} style={{ display: "flex", alignItems: "center", gap: 6, background: BORDER, color: TXT2, border: "none", borderRadius: 9, padding: "10px 14px", cursor: "pointer", fontSize: 13 }}><RotateCcw size={15} /></button>
        <button className="p4-nav" onClick={() => go(1)} style={{ display: "flex", alignItems: "center", gap: 6, background: BORDER, color: TXT, border: "none", borderRadius: 9, padding: "10px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Neste <ChevronRight size={17} /></button>
      </div>
    </div>
  );
};

// ============================================================
// MAIN
// ============================================================
export default function EnergibalanserEksempler() {
  return (
    <div style={{ background: BG, minHeight: "100vh", padding: "0 0 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;}
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 22px", fontFamily: "'Source Sans 3', sans-serif" }}>

        {/* ===== HEADER ===== */}
        <div style={{ paddingTop: 48, paddingBottom: 8 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ background: ACCENT, color: "#1a1300", fontFamily: MONO, fontWeight: 700, fontSize: 13, padding: "4px 12px", borderRadius: 7 }}>Del B · Kjemisk prosessteknologi</span>
            <span style={{ border: `1px solid ${ACCENT}`, color: ACCENT_TEXT, fontFamily: MONO, fontWeight: 700, fontSize: 13, padding: "4px 12px", borderRadius: 7 }}>B4 / B5 / B6</span>
            <span style={{ color: TXT2, fontSize: 13, fontFamily: MONO }}>Part 4 av 4</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 44, color: TXT, margin: "0 0 10px", lineHeight: 1.1 }}>
            Energibalanser <span style={{ color: ACCENT_TEXT }}>— Eksempler og Quiz</span>
          </h1>
          <p style={{ color: TXT2, fontSize: 18, margin: 0, lineHeight: 1.5 }}>
            Fem fullstendig løste eksamensnivå-eksempler + flashcards. Drill metodikken — det er der folk taper poeng.
          </p>
          <Note type="warn">
            Energibalanser er verdt <strong>~20 poeng</strong> på eksamen. Studenter stryker fordi de
            hopper over systematikken. <strong>Fast oppskrift:</strong> flytskjema → forenkle
            energibalansen → velg referanse → prosessvei + tabellverdier → regn trinn for trinn →
            svar med <strong>enhet og fortegn</strong>.
          </Note>
        </div>

        {/* ===== EKSEMPLER ===== */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, marginTop: 10 }}>
          <div style={{ background: ACCENT, color: "#1a1300", width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}><Calculator size={19} /></div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 27, color: TXT, margin: 0 }}>Eksempler</h2>
        </div>

        {/* ---- Eksempel A ---- */}
        <Card>
          <ExampleHeader tag="A · B4" icon={Droplets} title="Oppvarming med faseovergang (uten reaksjon)" />
          <P>
            En strøm på ṁ = 2,0 kg/s flytende vann ved 20 °C varmes til overopphetet damp ved 200 °C
            (1 atm) i en varmeveksler. Finn nødvendig varmetilførsel Q̇.
          </P>
          <FlowDiagram box="Varmeveksler" inn={["væske", "2,0 kg/s", "20 °C"]} ut={["damp", "2,0 kg/s", "200 °C"]} />

          <TableRef>
            <strong>Tabellverdier (Tabeller.pdf):</strong> Cp,væske = 4,18 kJ/kg·K · ΔĤvap(100 °C) =
            2257 kJ/kg · Cp,damp ≈ 1,96 kJ/kg·K. (Alternativt kan damptabell B.6/B.7 brukes for å lese
            Ĥ direkte i kJ/kg.)
          </TableRef>

          <Step n="1" title="Forenkle">Stasjonær, Ẇₛ = 0, ΔĖₖ ≈ ΔĖₚ ≈ 0 → Q̇ = ΔḢ = ṁ·ΔĤ.</Step>
          <Step n="2" title="Prosessvei (3 trinn)">
            <PathDiagram
              states={[{ label: "væske", sub: "20 °C" }, { label: "væske", sub: "100 °C" }, { label: "damp", sub: "100 °C" }, { label: "damp", sub: "200 °C" }]}
              steps={["Cp,v", "ΔĤvap", "Cp,g"]}
            />
          </Step>
          <Step n="3" title="ΔĤ per kg">
            <Mono>
              ΔĤ₁ = 4,18·(100−20) = 334,4 kJ/kg{"\n"}
              ΔĤ₂ = 2257 kJ/kg{"\n"}
              ΔĤ₃ = 1,96·(200−100) = 196 kJ/kg{"\n"}
              ΔĤ = 334,4 + 2257 + 196 = 2787,4 kJ/kg
            </Mono>
          </Step>
          <Step n="4" title="Skaler med massestrøm">
            <Mono>Q̇ = ṁ·ΔĤ = 2,0 · 2787,4 = 5574,8 kJ/s</Mono>
          </Step>
          <Answer>Q̇ ≈ +5,57·10³ kJ/s (+5,57 MW) — positivt ⇒ varme må TILFØRES.</Answer>
        </Card>

        {/* ---- Eksempel B ---- */}
        <Card>
          <ExampleHeader tag="B · B4" icon={Beaker} title="Blandingsvarme — fortynning av syre" />
          <P>
            100 mol/s konsentrert svovelsyre (H₂SO₄) ved 25 °C blandes med vann (25 °C) slik at det
            dannes en løsning med molforhold ≈ 1 mol H₂SO₄ per 10 mol H₂O. Prosessen er adiabatisk.
            Hvor mye varme frigjøres, og hva blir omtrentlig temperaturøkning i produktstrømmen?
          </P>
          <FlowDiagram box="Blander" inn={["H₂SO₄ + H₂O", "25 °C"]} ut={["H₂SO₄(aq)", "T = ?"]} />

          <TableRef>
            <strong>Tabell for integral løsningsvarme (F&R Tabell B.11 / SI Chemical Data):</strong>{" "}
            for H₂SO₄ med 10 mol H₂O per mol syre er <Fag>ΔĤs ≈ −69 kJ/mol</Fag> (eksoterm). Slå opp
            eksakt verdi for det aktuelle molforholdet — verdien blir mer negativ jo mer fortynnet.
          </TableRef>

          <Step n="1" title="Varme frigjort ved blanding">
            <Mono>Q_frigjort = ṅ_syre · |ΔĤs| = 100 · 69 = 6900 kJ/s</Mono>
            ΔĤmix &lt; 0 → eksoterm. Hvis vi ville holdt 25 °C måtte vi fjernet Q = −6900 kJ/s.
          </Step>
          <Step n="2" title="Adiabatisk → temperaturøkning">
            Q = 0, så all blandingsvarmen går til å varme løsningen: 0 = ΔĤmix + ṁ_løsning·Cp,løsning·ΔT.
          </Step>
          <Step n="3" title="Estimer ΔT">
            <Mono>
              massestrøm ut ≈ 100·98 + 1000·18 = 27 800 g/s = 27,8 kg/s{"\n"}
              Cp,løsning ≈ 3,8 kJ/kg·K (fortynnet syre){"\n"}
              ΔT = 6900 / (27,8 · 3,8) ≈ 65 °C
            </Mono>
          </Step>
          <Answer>Q_frigjort ≈ 6,9·10³ kJ/s · adiabatisk: T_ut ≈ 25 + 65 = 90 °C.</Answer>
          <Note type="warn">
            Derfor tilsetter man <strong>alltid syre i vann</strong>, aldri omvendt — den store
            eksoterme blandingsvarmen kan ellers koke væsken lokalt.
          </Note>
        </Card>

        {/* ---- Eksempel C ---- */}
        <Card>
          <ExampleHeader tag="C · B5" icon={Snowflake} title="Hypotetisk prosessvei — is til damp" />
          <P>
            Beregn ΔĤ for å varme 1 mol vann fra is ved −10 °C til overopphetet damp ved 150 °C
            (1 atm). Dette er den klassiske 5-trinns prosessveien.
          </P>
          <TableRef>
            <strong>Tabellverdier (molare):</strong> Cp,is ≈ 0,0376 · Cp,væske ≈ 0,0754 · Cp,damp ≈
            0,0341 (kJ/mol·°C) · ΔĤfus = 6,01 kJ/mol · ΔĤvap = 40,66 kJ/mol.
          </TableRef>
          <Step n="1" title="Tegn prosessveien (5 trinn)">
            <PathDiagram
              states={[{ label: "is", sub: "−10 °C" }, { label: "is", sub: "0 °C" }, { label: "væske", sub: "0 °C" }, { label: "væske", sub: "100 °C" }, { label: "damp", sub: "100 °C" }, { label: "damp", sub: "150 °C" }]}
              steps={["Cp,is", "ΔHfus", "Cp,v", "ΔHvap", "Cp,g"]}
              caption="Faseoverganger (smelting, fordampning) skjer ved konstant T."
            />
          </Step>
          <Step n="2" title="ΔĤ for hvert trinn">
            <Mono>
              1) is −10→0:&nbsp;&nbsp; 0,0376·(0−(−10)) = 0,376 kJ/mol{"\n"}
              2) smelt @0:&nbsp;&nbsp;&nbsp; +6,01 kJ/mol{"\n"}
              3) væske 0→100: 0,0754·100 = 7,54 kJ/mol{"\n"}
              4) fordamp @100: +40,66 kJ/mol{"\n"}
              5) damp 100→150: 0,0341·50 = 1,705 kJ/mol
            </Mono>
          </Step>
          <Step n="3" title="Summér (Hess' lov)">
            <Mono>ΔĤ = 0,376 + 6,01 + 7,54 + 40,66 + 1,705 = 56,29 kJ/mol</Mono>
          </Step>
          <Answer>ΔĤ ≈ +56,3 kJ/mol — domineres av fordampningsvarmen (40,66).</Answer>
        </Card>

        {/* ---- Eksempel D ---- */}
        <Card>
          <ExampleHeader tag="D · B6" icon={Flame} title="Reaktiv energibalanse — dannelsesentalpimetoden" />
          <P>
            10 mol/s metan (CH₄) og støkiometrisk luft mates inn ved 25 °C og forbrennes fullstendig.
            Produktene forlater ved 500 °C. Reaksjon: CH₄ + 2O₂ → CO₂ + 2H₂O(damp). Finn Q̇.
          </P>
          <Step n="1" title="Massebalanse / strømmer">
            <Mono>
              CH₄ inn: 10 → forbruker 20 O₂{"\n"}
              luft: O₂ = 20, N₂ = 20·(79/21) = 75,24 (mol/s){"\n"}
              ut @500 °C: CO₂ 10 · H₂O(g) 20 · N₂ 75,24 · O₂ 0
            </Mono>
          </Step>
          <FlowDiagram box="Reaktor" inn={["CH₄ 10, luft", "25 °C"]} ut={["CO₂,H₂O,N₂", "500 °C"]} />
          <TableRef>
            <strong>Tabell B.1</strong> ΔHf° (kJ/mol): CH₄ −74,85 · CO₂ −393,5 · H₂O(g) −241,83 ·
            O₂ = N₂ = 0. &nbsp;<strong>Tabell B.8</strong> Ĥ @500 °C (kJ/mol): O₂ 15,03 · N₂ 14,24 ·
            CO₂ 21,34 · H₂O 17,01. (Alle strømmer inn ved 25 °C → sensibel del = 0.)
          </TableRef>
          <Step n="2" title="Energibalanse">
            Q̇ = ΔḢ = Σ(ṅᵢĤᵢ)_ut − Σ(ṅᵢĤᵢ)_inn, &nbsp;Ĥᵢ = ΔHf°,ᵢ + Ĥ_sensibel(T).
          </Step>
          <Step n="3" title="Entalpi inn (alt ved 25 °C)">
            <Mono>Σ_inn = 10·(−74,85) + 20·0 + 75,24·0 = −748,5 kJ/s</Mono>
          </Step>
          <Step n="4" title="Entalpi ut (ved 500 °C)">
            <Mono>
              CO₂: 10·(−393,5 + 21,34) = −3721,6{"\n"}
              H₂O: 20·(−241,83 + 17,01) = −4496,4{"\n"}
              N₂:&nbsp; 75,24·(0 + 14,24) = +1071,4{"\n"}
              Σ_ut = −7146,6 kJ/s
            </Mono>
          </Step>
          <Step n="5" title="Q̇">
            <Mono>Q̇ = Σ_ut − Σ_inn = −7146,6 − (−748,5) = −6398,1 kJ/s</Mono>
          </Step>
          <Answer>Q̇ ≈ −6,40·10³ kJ/s (−6,40 MW) — negativt ⇒ varme må FJERNES (eksoterm).</Answer>
        </Card>

        {/* ---- Eksempel E ---- */}
        <Card>
          <ExampleHeader tag="E · B6" icon={Route} title="ΔHr° fra forbrenningsentalpier (fortegnsbytte)" />
          <P>
            Hydrogenering av etylen: C₂H₄(g) + H₂(g) → C₂H₆(g). Du har bare forbrenningsentalpier
            tilgjengelig. Beregn ΔHr°, og deretter Q̇ for en isoterm reaktor ved 25 °C som omsetter
            ξ = 5 mol/s.
          </P>
          <TableRef>
            <strong>Tabell for forbrenningsentalpier ΔHc° (kJ/mol, produkter = CO₂ + H₂O væske):</strong>{" "}
            C₂H₄ −1411 · H₂ −285,8 · C₂H₆ −1560. (Slå opp eksakte verdier i formelsamlingen.)
          </TableRef>
          <Step n="1" title="Bruk forbrennings-formelen (REAKTANTER − PRODUKTER)">
            <Mono>
              ΔHr° = Σ(ν·ΔHc°)_reaktant − Σ(ν·ΔHc°)_produkt{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;= [(−1411) + (−285,8)] − [(−1560)]{"\n"}
              &nbsp;&nbsp;&nbsp;&nbsp;= −1696,8 + 1560 = −136,8 kJ/mol
            </Mono>
          </Step>
          <Note type="warn">
            <strong>Fortegnet:</strong> her er det <Fag>reaktanter minus produkter</Fag> — motsatt av
            dannelsesentalpi-formelen (produkter minus reaktanter). Bruker du feil rekkefølge får du
            +136,8 og konkluderer feil (endoterm).
          </Note>
          <Step n="2" title="Q̇ for isoterm reaktor ved 25 °C">
            Ved 25 °C inn og ut er sensibel entalpi 0, så Q̇ = ξ·ΔHr°.
            <Mono>Q̇ = 5 · (−136,8) = −684 kJ/s</Mono>
          </Step>
          <Answer>ΔHr° = −136,8 kJ/mol (eksoterm) · Q̇ = −684 kJ/s — varme må fjernes.</Answer>
        </Card>

        {/* ===== QUIZ ===== */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, marginTop: 34 }}>
          <div style={{ background: ACCENT, color: "#1a1300", width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}><Layers size={19} /></div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 27, color: TXT, margin: 0 }}>Quiz — flashcards</h2>
        </div>
        <Card style={{ paddingBottom: 30 }}>
          <P>Klikk kortet for å snu. {FLASHCARDS.length} kort, blandet konseptuelt + beregning, inspirert av eksamen V2023–V2025.</P>
          <Flashcard />
        </Card>

        <div style={{ textAlign: "center", color: TXT2, fontSize: 13, marginTop: 30, fontFamily: MONO }}>
          IMAK2005 · Del B · Energibalanser (B4/B5/B6) · Part 4 av 4
        </div>
      </div>
    </div>
  );
}
