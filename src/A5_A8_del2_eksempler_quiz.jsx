import React, { useState } from "react";

// ============================================================
// IMAK2005 — A5/A8: Røring, lufttilførsel og reaktordesign
// Part 2 av 2: Eksempler + Quiz (flashcards)
// Accent: #8B5CF6 (violet)
// ============================================================

const ACCENT = "#8B5CF6";
const ACCENT_BG = "rgba(139,92,246,0.10)";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const T1 = "#F8FAFC";
const T2 = "#94A3B8";

const fontHead = "'Plus Jakarta Sans', sans-serif";
const fontBody = "'Source Sans 3', sans-serif";
const fontMono = "'JetBrains Mono', monospace";

// ---------- Reusable bits ----------
const Term = ({ children }) => (
  <span style={{ color: ACCENT, background: ACCENT_BG, borderLeft: `3px solid ${ACCENT}`, padding: "1px 6px", borderRadius: 4, fontWeight: 600, whiteSpace: "nowrap" }}>
    {children}
  </span>
);

const Formula = ({ children }) => (
  <div style={{ fontFamily: fontMono, background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "14px 18px", margin: "14px 0", color: T1, fontSize: 15, lineHeight: 1.7, whiteSpace: "pre-wrap", overflowX: "auto" }}>
    {children}
  </div>
);

const Card = ({ children, style }) => (
  <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, marginBottom: 18, ...style }}>
    {children}
  </div>
);

const SectionLabel = ({ children }) => (
  <div style={{ borderLeft: `4px solid ${ACCENT}`, paddingLeft: 14, margin: "48px 0 22px 0" }}>
    <div style={{ fontFamily: fontHead, textTransform: "uppercase", letterSpacing: 2, fontSize: 13, color: ACCENT, fontWeight: 700 }}>{children}</div>
  </div>
);

const ExHeader = ({ tag, children }) => (
  <h3 style={{ fontFamily: fontHead, fontSize: 20, fontWeight: 700, color: T1, margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: 10 }}>
    <span style={{ fontFamily: fontMono, fontSize: 13, color: "#0F172A", background: ACCENT, borderRadius: 6, padding: "3px 9px", fontWeight: 700 }}>{tag}</span>
    {children}
  </h3>
);

const Step = ({ n, children }) => (
  <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
    <div style={{ flex: "0 0 24px", height: 24, borderRadius: "50%", background: ACCENT_BG, border: `1px solid ${ACCENT}`, color: ACCENT, fontFamily: fontMono, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{n}</div>
    <div style={{ flex: 1, lineHeight: 1.6 }}>{children}</div>
  </div>
);

const Answer = ({ children }) => (
  <div style={{ marginTop: 14, padding: "12px 16px", background: ACCENT_BG, border: `1px solid ${ACCENT}`, borderRadius: 8, fontFamily: fontMono, fontSize: 15, color: T1 }}>
    <span style={{ color: ACCENT, fontWeight: 700 }}>Svar: </span>{children}
  </div>
);

const Bullet = ({ children }) => <li style={{ marginBottom: 7, lineHeight: 1.6 }}>{children}</li>;

// ============================================================
// QUIZ DATA — inspired by V2024 2.3/2.5, V2023 3a, V2025 5c (not copied)
// ============================================================
const CARDS = [
  {
    q: "Sant eller usant: K_La ligger typisk i området 0,01–0,02 s⁻¹.",
    a: "USANT. K_La ligger normalt i 0,02–0,25 s⁻¹. (0,01–0,02 er en klassisk distraktor på MC.) K_La er målet på bioreaktorens lufttilførselkapasitet — jo høyere, jo bedre.",
  },
  {
    q: "Hva er de to viktigste designkravene til en bioreaktor?",
    a: "1) Reaktoren må kunne opereres ASEPTISK hele prosessen (dager–måneder).\n2) Aerobe prosesser: nok lufttilførsel + røring til mikrobens metabolske behov, UTEN å skade cellene / med minimalt skum.",
  },
  {
    q: "Hva er impellerens to hovedfunksjoner?",
    a: "1) Minske boblestørrelsen → større gass–væske-grenseflate (bedre OTR) + kortere diffusjonsvei.\n2) Oppnå et homogent miljø — jevn fordeling av næring, celler og O₂.",
  },
  {
    q: "Sant eller usant: Røretanken har typisk H:D-forhold på 1:2.",
    a: "SANT — det ligger i intervallet. STR har H:D fra 1:1 til 1:3 avhengig av bruk. Arbeidsvolum er 70–80 % av reaktorvolumet.",
  },
  {
    q: "Hva er forskjellen mellom en airlift med ytre og indre loop?",
    a: "Begge drives av tetthetsforskjellen mellom luftrik stigningsrør og luftfattig avløpsrør (ingen mekanisk røring). Forskjellen er hvor sirkulasjonen skjer: YTRE loop har et eksternt rør utenfor hovedbeholderen; INDRE loop har et innvendig sentralt rør (draft tube). Prinsippet er likt.",
  },
  {
    q: "Forklar OTR = K_La·(C* − C_L) og hva hvert ledd betyr.",
    a: "OTR = oksygenoverføringshastighet [mmol·dm⁻³·t⁻¹].\nK_La = volumetrisk masseoverføringskoeffisient [t⁻¹] = lufttilførselkapasitet.\nC* = metningskonsentrasjon av løst O₂.\nC_L = faktisk løst O₂.\n(C* − C_L) = drivkraften. NB: minus, ikke pluss!",
  },
  {
    q: "Nevn fordeler med engangsreaktorer (biobags).",
    a: "Reduserer risiko for KRYSSKONTAMINERING; ingen sterilisering nødvendig; raskere omstilling mellom batcher; lavere investering. Plast (flere lag polymerfilm, polyetylen nærmest cellene) festet i stålstativ. ~60 % av farma brukte dem i 2019.",
  },
  {
    q: "Hvorfor er strømbrytere (baffles) nødvendige i en røretank?",
    a: "De hindrer at det dannes en VORTEKS (virvel) ved røring, og forbedrer effektiviteten av røring og lufttilførsel. Typisk 3–4 stk (6–8 i reaktorer >3 dm³), metallstrimler ~1/10 av tankdiameteren, montert med gap til veggen.",
  },
  {
    q: "Sant eller usant: Air-lift-reaktor og tårnreaktor er samme type bioreaktor.",
    a: "USANT. Begge mangler mekanisk røring, men de er ulike. Airlift har et definert loop-system (stigningsrør/avløpsrør) drevet av tetthetsforskjell; tårn-/boblekolonne blandes mindre definert via bobler fra sparger i bunn.",
  },
  {
    q: "Hva er sammenhengen mellom K_La, OTR og OUR ved steady-state?",
    a: "Ved steady-state er tilførsel = forbruk: OTR = OUR og dC_L/dt = 0. Da kan K_La finnes som K_La = OTR/(C*−C_L). Cellens O₂-opptak (OUR) bestemmer hvor mye som må overføres.",
  },
  {
    q: "Hva er kritisk oksygenkonsentrasjon (C_crit)?",
    a: "Konsentrasjonen av løst O₂ der respirasjonshastigheten Q_O₂ slutter å øke. Q_O₂ ∝ spesifikk veksthastighet μ. C_L må holdes OVER C_crit for maks biomasse; under C_crit forstyrres metabolismen og veksten begrenses.",
  },
  {
    q: "Hvordan bestemmes K_La og OUR med den dynamiske utgassingsmetoden?",
    a: "DO₂-sensor måler C_L. 1) Slå AV lufta (OTR=0): dC_L/dt = −OUR → stigningstall gir OUR. 2) Slå PÅ lufta igjen → C_L stiger; et plott av ln((C_L′−C_L,t1)/(C_L′−C_L,t2)) mot (t₂−t₁) gir rett linje med stigningstall = K_La. Antakelser: godt blandet, rask elektrode, høy rørehastighet.",
  },
  {
    q: "Sant eller usant: Aerert (gasset) effektforbruk er høyere enn uaerert.",
    a: "USANT — det er lavere. Luftbobler gjør væsken mindre tett og gassfylte kaviteter bak bladene reduserer motstanden. Derfor må motoren dimensjoneres for UAERERT drift (sterilisering / luftsvikt), ellers overbelastes den.",
  },
  {
    q: "Sant eller usant: Glass egner seg ikke som materiale i reaktorer over 50 dm³.",
    a: "SANT. Glass brukes i labskala (maks ~Ø60 cm, eller Ø30 cm ved in-situ-trykk). Pilot- og stor skala bruker rustfritt stål (>4 % krom) som tåler steriliseringstrykk og korrosjon.",
  },
  {
    q: "Når velger du STR vs. airlift?",
    a: "STR: robuste mikrober/sopp, høyt O₂-behov, behov for kraftig blanding og god temp.kontroll. AIRLIFT: skjærsensitive celler (plante-/dyreceller, encelleprotein) der mekanisk røring ville skadet cellene, og når man vil unngå varmeutvikling/bevegelige deler.",
  },
];

// ---------- Flashcard component ----------
const Flashcard = () => {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const c = CARDS[i];

  const go = (d) => {
    setFlipped(false);
    setI((prev) => (prev + d + CARDS.length) % CARDS.length);
  };

  const navBtn = {
    fontFamily: fontHead, fontWeight: 700, fontSize: 15, color: T1,
    background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10,
    padding: "10px 20px", cursor: "pointer",
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, fontFamily: fontMono, fontSize: 14, color: T2 }}>
        <span>Kort {i + 1} av {CARDS.length}</span>
        <span style={{ color: ACCENT }}>{flipped ? "SVAR" : "SPØRSMÅL"} · klikk for å snu</span>
      </div>

      <div
        onClick={() => setFlipped((f) => !f)}
        style={{ perspective: 1200, cursor: "pointer", marginBottom: 18 }}
      >
        <div style={{
          position: "relative", width: "100%", minHeight: 260,
          transition: "transform 0.55s", transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>
          {/* FRONT */}
          <div style={{
            position: flipped ? "absolute" : "relative", inset: 0,
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            background: CARD, border: `1px solid ${BORDER}`, borderTop: `4px solid ${ACCENT}`,
            borderRadius: 14, padding: "34px 28px", display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center", textAlign: "center",
          }}>
            <div style={{ fontFamily: fontMono, fontSize: 12, color: ACCENT, marginBottom: 14, letterSpacing: 1 }}>A5 / A8 · SPØRSMÅL</div>
            <div style={{ fontFamily: fontHead, fontSize: 21, fontWeight: 600, lineHeight: 1.4, color: T1 }}>{c.q}</div>
          </div>
          {/* BACK */}
          <div style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#19223a", border: `1px solid ${ACCENT}`, borderRadius: 14,
            padding: "30px 28px", display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <div style={{ fontFamily: fontMono, fontSize: 12, color: ACCENT, marginBottom: 12, letterSpacing: 1 }}>SVAR</div>
            <div style={{ fontFamily: fontBody, fontSize: 16, lineHeight: 1.6, color: T1, whiteSpace: "pre-wrap" }}>{c.a}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <button style={navBtn} onClick={(e) => { e.stopPropagation(); go(-1); }}>← Forrige</button>
        <button
          onClick={(e) => { e.stopPropagation(); setFlipped((f) => !f); }}
          style={{ ...navBtn, background: ACCENT_BG, borderColor: ACCENT, color: ACCENT }}
        >
          {flipped ? "Vis spørsmål" : "Vis svar"}
        </button>
        <button style={navBtn} onClick={(e) => { e.stopPropagation(); go(1); }}>Neste →</button>
      </div>

      {/* progress dots */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 18, justifyContent: "center" }}>
        {CARDS.map((_, idx) => (
          <div key={idx}
            onClick={() => { setFlipped(false); setI(idx); }}
            style={{ width: 9, height: 9, borderRadius: "50%", cursor: "pointer", background: idx === i ? ACCENT : BORDER }} />
        ))}
      </div>
    </div>
  );
};

// ============================================================
export default function App() {
  return (
    <div style={{ background: BG, minHeight: "100vh", color: T1, fontFamily: fontBody, fontSize: 16, lineHeight: 1.6 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ul { padding-left: 22px; margin: 8px 0; }
        button:hover { filter: brightness(1.15); }
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 22px 80px 22px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14, flexWrap: "wrap" }}>
          <span style={{ background: ACCENT, color: "#0F172A", fontFamily: fontHead, fontWeight: 800, fontSize: 13, padding: "4px 12px", borderRadius: 999 }}>DEL A · BIOTEK</span>
          <span style={{ border: `1px solid ${ACCENT}`, color: ACCENT, fontFamily: fontMono, fontSize: 13, padding: "3px 12px", borderRadius: 999 }}>A5 / A8</span>
          <span style={{ color: T2, fontFamily: fontMono, fontSize: 12 }}>Del 2 av 2 — Eksempler &amp; Quiz</span>
        </div>
        <h1 style={{ fontFamily: fontHead, fontSize: 34, fontWeight: 800, lineHeight: 1.15, margin: "0 0 12px 0" }}>
          Røring, lufttilførsel og reaktordesign — Eksempler og Quiz
        </h1>
        <p style={{ color: T2, fontSize: 18, margin: 0 }}>
          Regneeksempler i eksamensstil + flashcards som driller de MC-/sant–usant-påstandene som dukker opp hvert år.
        </p>

        {/* ============ EKSEMPLER ============ */}
        <SectionLabel>Eksempler</SectionLabel>

        {/* Eksempel A */}
        <Card>
          <ExHeader tag="A">K_La via utgassingsmetoden</ExHeader>
          <p style={{ marginTop: 0 }}>En kultur kjøres i steady-state. Under K_La-bestemmelse slås lufta på igjen og C_L måles mot tid. Metningsverdien er C* = 0,25 mmol·dm⁻³. To målepunkter:</p>
          <Formula>{`t₁ = 20 s   →   C_L = 0,05 mmol·dm⁻³
t₂ = 30 s   →   C_L = 0,15 mmol·dm⁻³`}</Formula>
          <p>Når lufta er på antar vi OUR ≈ K_La·(C*−C_L′) med C_L′ = C* og bruker den integrerte formen:</p>
          <Step n="1">Sett opp ligningen: <span style={{ fontFamily: fontMono }}>K_La = ln[(C*−C_L,t1)/(C*−C_L,t2)] / (t₂−t₁)</span></Step>
          <Step n="2">Teller: <span style={{ fontFamily: fontMono }}>(0,25−0,05)/(0,25−0,15) = 0,20/0,10 = 2,0</span></Step>
          <Step n="3"><span style={{ fontFamily: fontMono }}>ln(2,0) = 0,693</span></Step>
          <Step n="4">Del på Δt: <span style={{ fontFamily: fontMono }}>0,693 / (30−20) s = 0,693/10</span></Step>
          <Answer>K_La ≈ 0,069 s⁻¹ — innenfor det forventede området 0,02–0,25 s⁻¹.</Answer>
          <p style={{ color: T2, fontSize: 14, marginBottom: 0 }}>Tips: i en figur leser du heller av stigningstallet til den rette linja (ln-uttrykk mot tid) = K_La. OUR finner du fra fasen der lufta er AV: stigningstall av C_L mot t = −OUR.</p>
        </Card>

        {/* Eksempel B */}
        <Card>
          <ExHeader tag="B">OTR-beregning — er kapasiteten nok?</ExHeader>
          <p style={{ marginTop: 0 }}>En reaktor har K_La = 0,12 s⁻¹, metning C* = 0,24 mmol·dm⁻³ og holder C_L = 0,06 mmol·dm⁻³. Cellene har spesifikt opptak Q_O₂ = 4,0 mmol O₂·g⁻¹·t⁻¹ ved en biomasse x = 6 g·dm⁻³. Er O₂-overføringen tilstrekkelig?</p>
          <Step n="1">OTR = K_La·(C*−C_L) = 0,12 · (0,24−0,06) = 0,12 · 0,18</Step>
          <Step n="2"><span style={{ fontFamily: fontMono }}>OTR = 0,0216 mmol·dm⁻³·s⁻¹ → ×3600 = 77,8 mmol·dm⁻³·t⁻¹</span></Step>
          <Step n="3">Cellenes behov: OUR = Q_O₂·x = 4,0 · 6 = 24 mmol·dm⁻³·t⁻¹</Step>
          <Answer>OTR (≈78) ≫ OUR (24) ⟹ overføringen er rikelig. C_L vil holde seg over C_crit og veksten er ikke O₂-begrenset.</Answer>
          <p style={{ color: T2, fontSize: 14, marginBottom: 0 }}>Hvis OUR &gt; OTR ville C_L falt under C_crit, og du måtte øke K_La (mer røring/luft) eller redusere x.</p>
        </Card>

        {/* Eksempel C */}
        <Card>
          <ExHeader tag="C">Beskriv STR (slik eksamen forventer)</ExHeader>
          <p style={{ marginTop: 0 }}>Modellsvar på «beskriv røretanken mht. fordeler, materialvalg, sterilisering, størrelse og viktigste utstyr» (jf. V2024 2.5):</p>
          <ul style={{ margin: 0 }}>
            <Bullet><b>Konstruksjon:</b> sylindrisk beholder av glass og/eller rustfritt stål (stor skala), med mekanisk røreenhet (akse + impellere), kjølekappe, strømbrytere og luftspreder.</Bullet>
            <Bullet><b>Materialvalg:</b> glatte overflater, lette å rengjøre; rustfritt stål (&gt;4 % krom) tåler gjentatte dampsteriliseringer og korrosjon.</Bullet>
            <Bullet><b>Sterilisering:</b> varm damp ~121 °C — autoklavering (lab) eller in situ (stor skala). Engangsbeholdere (biobags) finnes også.</Bullet>
            <Bullet><b>Størrelse:</b> lab 1–30 dm³, pilot 50–5000 dm³, fabrikk inntil 1,5 mill. dm³. H:D = 1:1 til 1:3, arbeidsvolum 70–80 %.</Bullet>
            <Bullet><b>Utstyr:</b> luftspreder, sensorer for O₂, CO₂, temp, pH, evt. skumskjærer/-oppsamler.</Bullet>
            <Bullet><b>Fordeler:</b> enkel og robust, god blanding/temp.kontroll, kan kjøres kontinuerlig, lave driftskostnader. <b>Ulemper:</b> pakninger rundt akselen, størrelsesbegrensning på motor/akse/vekt.</Bullet>
          </ul>
        </Card>

        {/* Eksempel D */}
        <Card>
          <ExHeader tag="D">STR vs. airlift — når velge hva?</ExHeader>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 240px" }}>
              <div style={{ color: ACCENT, fontFamily: fontHead, fontWeight: 700, marginBottom: 8 }}>Røretank (STR)</div>
              <ul style={{ margin: 0 }}>
                <Bullet>Mekanisk røring → høy, justerbar OTR.</Bullet>
                <Bullet>Robuste mikrober/sopp, høyt O₂-behov.</Bullet>
                <Bullet>God blanding + temp.kontroll.</Bullet>
                <Bullet>Ulempe: skjærkrefter kan skade ømfintlige celler.</Bullet>
              </ul>
            </div>
            <div style={{ flex: "1 1 240px" }}>
              <div style={{ color: ACCENT, fontFamily: fontHead, fontWeight: 700, marginBottom: 8 }}>Airlift</div>
              <ul style={{ margin: 0 }}>
                <Bullet>Ingen bevegelige deler → skånsom.</Bullet>
                <Bullet>Plante-/dyreceller, encelleprotein.</Bullet>
                <Bullet>Mindre varmeutvikling, enklere mekanisk.</Bullet>
                <Bullet>Ulempe: lavere/mindre justerbar blanding ved høy viskositet.</Bullet>
              </ul>
            </div>
          </div>
          <Answer>Velg STR når du trenger kraftig O₂-overføring til robuste organismer; velg airlift når cellene er skjærsensitive og skånsom blanding er viktigere enn maksimal OTR.</Answer>
        </Card>

        {/* ============ QUIZ ============ */}
        <SectionLabel>Quiz — flashcards</SectionLabel>
        <Card style={{ background: "transparent", border: "none", padding: 0 }}>
          <p style={{ color: T2, marginTop: 0 }}>
            {CARDS.length} kort som speiler MC-/sant–usant-påstandene fra V2023 (3a), V2024 (2.3, 2.5) og V2025 (5c). Husk: feil svar gir <b>minuspoeng</b> på eksamen — vær sikker før du krysser av.
          </p>
          <Flashcard />
        </Card>

        <div style={{ marginTop: 40, textAlign: "center", color: T2, fontFamily: fontMono, fontSize: 13 }}>
          A5 / A8 fullført · Del 1 (Teori) + Del 2 (Eksempler &amp; Quiz)
        </div>
      </div>
    </div>
  );
}
