import React, { useState } from "react";
import {
  FlaskConical,
  Repeat,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Lightbulb,
  Table,
  ListChecks,
} from "lucide-react";

/* ============================================================
   IMAK2005 — Massebalanser: Eksempler og Quiz — B1+B2+B3 (Del B)
   Part 2 of 4. Accent: #6366F1 (indigo). Standalone.
   Eksempler er forankret i reelle eksamener (V2023/V2024/V2025).
   ============================================================ */

const C = {
  bg: "#0F172A",
  card: "#1E293B",
  border: "#334155",
  text: "#F8FAFC",
  sub: "#94A3B8",
  accent: "#6366F1",
  accentSoft: "rgba(99,102,241,0.12)",
  formulaBg: "rgba(255,255,255,0.05)",
};
const FONT_HEAD = "'Plus Jakarta Sans', sans-serif";
const FONT_BODY = "'Source Sans 3', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

/* ---------- Reusable pieces ---------- */
function Term({ children }) {
  return (
    <span style={{ color: C.accent, background: C.accentSoft, borderLeft: `3px solid ${C.accent}`,
      padding: "1px 7px", borderRadius: 4, fontWeight: 600, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}
function Mono({ children }) {
  return <span style={{ fontFamily: FONT_MONO, color: C.text }}>{children}</span>;
}
function Formula({ children, label }) {
  return (
    <div style={{ margin: "12px 0" }}>
      <div style={{ fontFamily: FONT_MONO, background: C.formulaBg, border: `1px solid ${C.border}`,
        borderRadius: 10, padding: "13px 17px", color: C.text, fontSize: 15, lineHeight: 1.7, overflowX: "auto" }}>
        {children}
      </div>
      {label && <div style={{ color: C.sub, fontSize: 13, marginTop: 6, fontStyle: "italic" }}>{label}</div>}
    </div>
  );
}
function Card({ children, style }) {
  return <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, ...style }}>{children}</div>;
}
function SectionHeader({ icon: Icon, label, title }) {
  return (
    <div style={{ borderLeft: `4px solid ${C.accent}`, paddingLeft: 16, margin: "8px 0 22px" }}>
      <div style={{ color: C.accent, fontFamily: FONT_HEAD, fontWeight: 700, letterSpacing: 2, fontSize: 13,
        textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
        {Icon && <Icon size={16} />}{label}
      </div>
      <h2 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 28, margin: "6px 0 0", color: C.text }}>{title}</h2>
    </div>
  );
}
function Tip({ children }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: C.accentSoft,
      border: `1px solid ${C.accent}`, borderRadius: 10, padding: "12px 16px", margin: "14px 0",
      color: C.text, fontSize: 14.5, lineHeight: 1.55 }}>
      <Lightbulb size={18} style={{ flexShrink: 0, marginTop: 2, color: C.accent }} />
      <div>{children}</div>
    </div>
  );
}
function Tabeller({ children }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "rgba(245,158,11,0.08)",
      border: "1px solid rgba(245,158,11,0.35)", borderRadius: 10, padding: "12px 16px", margin: "14px 0",
      color: "#FCD34D", fontSize: 14.5, lineHeight: 1.55 }}>
      <Table size={18} style={{ flexShrink: 0, marginTop: 2 }} />
      <div>{children}</div>
    </div>
  );
}
const P = { color: C.text, fontSize: 16, lineHeight: 1.7, margin: "0 0 14px" };

/* ---------- Degrees-of-freedom mini table ---------- */
function DFTable({ rows }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", margin: "14px 0", fontSize: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", background: "#172033",
        color: C.accent, fontWeight: 700, fontFamily: FONT_MONO, fontSize: 12.5 }}>
        {["Kontrollvolum", "Ukjente", "Ligninger", "n_fg"].map((h) => (
          <div key={h} style={{ padding: "9px 12px", borderBottom: `1px solid ${C.border}` }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
          color: C.text, background: i % 2 ? "transparent" : "rgba(255,255,255,0.02)" }}>
          <div style={{ padding: "9px 12px" }}>{r[0]}</div>
          <div style={{ padding: "9px 12px", fontFamily: FONT_MONO }}>{r[1]}</div>
          <div style={{ padding: "9px 12px", fontFamily: FONT_MONO }}>{r[2]}</div>
          <div style={{ padding: "9px 12px", fontFamily: FONT_MONO, fontWeight: 700,
            color: r[3] === "0" ? "#34D399" : C.text }}>{r[3]}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Example wrapper ---------- */
function Eksempel({ n, level, title, exam, children }) {
  const colors = { 1: "#34D399", 2: "#22D3EE", 3: "#FBBF24", 4: "#FB923C", 5: "#F472B6" };
  return (
    <Card style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 14, color: "#0F172A",
          background: C.accent, width: 34, height: 34, borderRadius: 8, display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</span>
        <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 19, margin: 0, color: C.text, flex: 1 }}>{title}</h3>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, marginLeft: 46, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: colors[level], border: `1px solid ${colors[level]}`,
          padding: "2px 9px", borderRadius: 20, fontFamily: FONT_MONO }}>NIVÅ {level}</span>
        {exam && <span style={{ fontSize: 11.5, fontWeight: 700, color: C.sub, background: "#172033",
          padding: "2px 9px", borderRadius: 20, fontFamily: FONT_MONO }}>{exam}</span>}
      </div>
      {children}
    </Card>
  );
}
function Steg({ label, children }) {
  return (
    <div style={{ borderLeft: `2px solid ${C.border}`, paddingLeft: 16, marginLeft: 6, marginBottom: 12,
      color: C.text, fontSize: 15.5, lineHeight: 1.65 }}>
      {label && <div style={{ color: C.accent, fontWeight: 700, fontSize: 13.5, marginBottom: 3, fontFamily: FONT_HEAD }}>{label}</div>}
      {children}
    </div>
  );
}
function Svar({ children }) {
  return (
    <div style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.4)",
      borderRadius: 10, padding: "12px 16px", marginTop: 8, color: "#A7F3D0", fontSize: 15.5, lineHeight: 1.6 }}>
      <b style={{ color: "#34D399" }}>SVAR:</b> {children}
    </div>
  );
}
const oppgavetekst = {
  background: "#172033", border: `1px solid ${C.border}`, borderRadius: 10,
  padding: "14px 18px", color: C.text, fontSize: 15.5, lineHeight: 1.6, margin: "0 0 18px", fontStyle: "italic",
};

/* ---------- SVG flytskjema (one per example) ---------- */
function arrowDefs(id, color) {
  return (
    <marker id={id} markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
      <path d="M0,0 L7,3 L0,6 Z" fill={color} />
    </marker>
  );
}
function box(x, y, w, h, label) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="7" fill={C.accent} opacity="0.9" />
      <text x={x + w / 2} y={y + h / 2 + 4} fill="#0F172A" fontSize="12" fontWeight="700"
        fontFamily={FONT_HEAD} textAnchor="middle">{label}</text>
    </g>
  );
}

function EvaporatorSVG() {
  return (
    <svg viewBox="0 0 380 170" width="100%" style={{ maxWidth: 380 }}>
      <line x1="10" y1="105" x2="118" y2="105" stroke={C.sub} strokeWidth="2" markerEnd="url(#e1)" />
      <text x="14" y="95" fill={C.text} fontSize="11.5" fontFamily={FONT_MONO}>føde 1000 kg/h</text>
      <text x="14" y="122" fill={C.sub} fontSize="11">20 % tørrstoff</text>
      {box(120, 82, 90, 46, "Inndamper")}
      <line x1="165" y1="80" x2="165" y2="22" stroke={C.sub} strokeWidth="2" markerEnd="url(#e1)" />
      <text x="175" y="30" fill={C.text} fontSize="11.5" fontFamily={FONT_MONO}>vann W (ren)</text>
      <line x1="212" y1="105" x2="330" y2="105" stroke={C.sub} strokeWidth="2" markerEnd="url(#e1)" />
      <text x="240" y="95" fill={C.text} fontSize="11.5" fontFamily={FONT_MONO}>produkt P</text>
      <text x="250" y="122" fill={C.sub} fontSize="11">50 % tørrstoff</text>
      <defs>{arrowDefs("e1", C.sub)}</defs>
    </svg>
  );
}
function TwoMixerSVG() {
  return (
    <svg viewBox="0 0 460 175" width="100%" style={{ maxWidth: 460 }}>
      <line x1="8" y1="55" x2="78" y2="55" stroke={C.sub} strokeWidth="2" markerEnd="url(#m1)" />
      <text x="8" y="46" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>F1 100 (0,5A)</text>
      <line x1="8" y1="105" x2="78" y2="105" stroke={C.sub} strokeWidth="2" markerEnd="url(#m1)" />
      <text x="8" y="125" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>F2 40 (0,9A)</text>
      {box(80, 58, 70, 44, "Mikser 1")}
      <line x1="152" y1="80" x2="208" y2="80" stroke={C.sub} strokeWidth="2" markerEnd="url(#m1)" />
      <text x="158" y="72" fill={C.accent} fontSize="11" fontFamily={FONT_MONO}>S</text>
      <line x1="240" y1="135" x2="240" y2="104" stroke={C.sub} strokeWidth="2" markerEnd="url(#m1)" />
      <text x="200" y="150" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>F3 30 (0,2A)</text>
      {box(210, 58, 70, 44, "Mikser 2")}
      <line x1="282" y1="80" x2="360" y2="80" stroke={C.sub} strokeWidth="2" markerEnd="url(#m1)" />
      <text x="300" y="72" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>P</text>
      <defs>{arrowDefs("m1", C.sub)}</defs>
    </svg>
  );
}
function KlimaSVG() {
  return (
    <svg viewBox="0 0 480 200" width="100%" style={{ maxWidth: 480 }}>
      {/* feed */}
      <line x1="8" y1="95" x2="92" y2="95" stroke={C.sub} strokeWidth="2" markerEnd="url(#k1)" />
      <text x="10" y="86" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>1 · 4 % V</text>
      {/* mix point */}
      <circle cx="100" cy="95" r="6" fill="none" stroke={C.text} strokeWidth="1.5" />
      <line x1="106" y1="95" x2="150" y2="95" stroke={C.sub} strokeWidth="2" markerEnd="url(#k1)" />
      <text x="110" y="86" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>2 · 2,3 % V</text>
      {box(152, 73, 78, 44, "Kjøler")}
      {/* condensate */}
      <line x1="191" y1="117" x2="191" y2="170" stroke={C.sub} strokeWidth="2" markerEnd="url(#k1)" />
      <text x="198" y="160" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>3 · 100 % V (vann)</text>
      {/* out -> split */}
      <line x1="232" y1="95" x2="300" y2="95" stroke={C.sub} strokeWidth="2" markerEnd="url(#k1)" />
      <text x="240" y="86" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>4 · 1,7 % V</text>
      <circle cx="308" cy="95" r="6" fill={C.accent} />
      {/* product */}
      <line x1="314" y1="95" x2="466" y2="95" stroke={C.sub} strokeWidth="2" markerEnd="url(#k1)" />
      <text x="380" y="86" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>6 · 100 mol/s</text>
      {/* recycle */}
      <polyline points="308,101 308,150 100,150 100,89" fill="none" stroke={C.accent} strokeWidth="2" markerEnd="url(#kA)" />
      <text x="200" y="166" fill={C.accent} fontSize="11" fontFamily={FONT_MONO} textAnchor="middle">5 · resirkulering</text>
      <defs>{arrowDefs("k1", C.sub)}{arrowDefs("kA", C.accent)}</defs>
    </svg>
  );
}
function ReactorRecycleSVG() {
  return (
    <svg viewBox="0 0 490 190" width="100%" style={{ maxWidth: 490 }}>
      <line x1="6" y1="80" x2="74" y2="80" stroke={C.sub} strokeWidth="2" markerEnd="url(#r1)" />
      <text x="6" y="71" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>1 · 101 A</text>
      <circle cx="82" cy="80" r="6" fill="none" stroke={C.text} strokeWidth="1.5" />
      <line x1="88" y1="80" x2="118" y2="80" stroke={C.sub} strokeWidth="2" markerEnd="url(#r1)" />
      <text x="90" y="71" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>2</text>
      {box(120, 58, 78, 44, "Reaktor")}
      <text x="159" y="50" fill={C.sub} fontSize="11" fontFamily={FONT_MONO} textAnchor="middle">A→2B</text>
      <line x1="200" y1="80" x2="250" y2="80" stroke={C.sub} strokeWidth="2" markerEnd="url(#r1)" />
      <text x="210" y="71" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>3</text>
      {box(252, 58, 82, 44, "Separator")}
      <line x1="336" y1="80" x2="476" y2="80" stroke={C.sub} strokeWidth="2" markerEnd="url(#r1)" />
      <text x="350" y="71" fill={C.text} fontSize="11" fontFamily={FONT_MONO}>5 · 1%A / 99%B</text>
      {/* recycle */}
      <polyline points="293,102 293,150 82,150 82,86" fill="none" stroke={C.accent} strokeWidth="2" markerEnd="url(#rA)" />
      <text x="188" y="166" fill={C.accent} fontSize="11" fontFamily={FONT_MONO} textAnchor="middle">4 · 90%A / 10%B (resirk.)</text>
      <defs>{arrowDefs("r1", C.sub)}{arrowDefs("rA", C.accent)}</defs>
    </svg>
  );
}

/* ---------- Quiz ---------- */
const CARDS = [
  { q: "Hva er frihetsgradsanalyse, og hvorfor gjør vi det?",
    a: "n_fg = (antall ukjente) − (antall uavhengige ligninger). Vi gjør det FØR vi regner for å avgjøre om problemet er løsbart. n_fg = 0 → løsbart. n_fg > 0 → underspesifisert (mangler info). n_fg < 0 → overspesifisert. På flertrinn gjør vi det per kontrollvolum for å finne hvilket vi kan løse først." },
  { q: "Skriv den generelle balanseligninga for en stasjonær prosess UTEN reaksjon.",
    a: "dB/dt = 0 og dannet = forbrukt = 0, så: Ḃ_inn = Ḃ_ut. Gjelder for total masse OG hver komponent. B er masse/molmengde — aldri volum, konsentrasjon, temperatur eller trykk." },
  { q: "Hva er forskjellen mellom overall (total) og single-pass omdanningsgrad?",
    a: "Single-pass = omdanning per gang strømmen går gjennom reaktoren, basert på reaktorføden (fersk føde + resirkulering). Overall = omdanning for hele prosessen, basert på fersk føde inn og netto produkt ut. Overall er alltid høyere fordi uomsatt reaktant resirkuleres og reagerer i senere passasjer." },
  { q: "Hvorfor trenger man en purge-strøm i resirkuleringssystemer?",
    a: "For å hindre at inerte stoffer (eller biprodukter) som kommer inn med fersk føde hoper seg opp i sløyfa. Inert kan ikke reagere eller forlate via produktet, så uten purge vokser inertmengden til systemet aldri når steady state. Ved steady state: inert inn (fersk føde) = inert ut (purge)." },
  { q: "Beregn % overskudd: 100 mol A og 300 mol B mates inn, reaksjon A + 2B → C. Hvilken er begrensende?",
    a: "Støkiometrisk trenger 100 mol A → 2·100 = 200 mol B. Vi har 300 mol B → B er i overskudd, A er begrensende. % overskudd B = (300 − 200)/200 × 100 = 50 %." },
  { q: "Hva er reaksjonsomfang (ξ), og hvordan brukes det?",
    a: "ξ måler hvor langt reaksjonen har gått [mol/s]. Brukes via ṅ_i,ut = ṅ_i,inn + ν_i·ξ, der ν_i er støkiometrisk koeffisient (− for reaktant, + for produkt). Samme ξ gjelder ALLE komponenter i reaksjonen — én ukjent erstatter mange. Ved flere reaksjoner: ṅ_i,ut = ṅ_i,inn + Σ_j ν_ij·ξ_j." },
  { q: "Hvor mange UAVHENGIGE balanser kan du sette opp rundt ett kontrollvolum med 3 komponenter?",
    a: "3. Du kan velge 3 komponentbalanser, ELLER 2 komponentbalanser + totalbalansen. Du kan IKKE telle alle 3 komponent + total samtidig — totalbalansen er da summen av komponentbalansene og ikke uavhengig." },
  { q: "Regneoppgave (V2023): luft med 4 % vann (resten tørrluft) avfuktes til 1,7 % vann; produkt = 100 mol/s. Finn føderaten med overall-balanse.",
    a: "Tørrluft er inert. Overall TL-balanse: 0,96·ṅ₁ = 0,983·100 → ṅ₁ = 102,4 mol/s. Totalbalanse gir kondensat ṅ₃ = 102,4 − 100 = 2,4 mol/s." },
  { q: "Regneoppgave (V2024-stil): to reaksjoner. HCHO ut = 30 mol/s og CO₂ ut = 10 mol/s, begge 0 inn. Finn reaksjonsomfangene.",
    a: "HCHO dannes kun i reaksjon 1 (ν=+1): ξ₁ = 30 mol/s. CO₂ dannes kun i reaksjon 2 (ν=+1): ξ₂ = 10 mol/s. Bruk så ṅ_i,ut = ṅ_i,inn + Σ ν_ij·ξ_j for de andre komponentene (f.eks. O₂, CH₄, H₂O)." },
  { q: "Hvordan beregner du resirkuleringsforhold (recycle ratio)?",
    a: "Recycle ratio = (resirkulert strøm) / (fersk føde). I V2023-eksempelet: ṅ₅/ṅ₁ = 290/102,4 ≈ 2,8 — altså sirkuleres nesten 3× føden for å treffe sammensetningsspec'en inn på kjøleren." },
];

function Quiz() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const go = (d) => { setFlipped(false); setI((p) => (p + d + CARDS.length) % CARDS.length); };
  const c = CARDS[i];
  return (
    <div>
      <div onClick={() => setFlipped((f) => !f)} style={{ perspective: 1400, cursor: "pointer", marginBottom: 18 }}>
        <div style={{ position: "relative", minHeight: 250,
          transition: "transform 0.55s cubic-bezier(.4,.2,.2,1)", transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "none" }}>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            background: C.card, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.accent}`,
            borderRadius: 14, padding: 28, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ color: C.accent, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, fontFamily: FONT_MONO, marginBottom: 12 }}>SPØRSMÅL</div>
            <div style={{ color: C.text, fontSize: 18, lineHeight: 1.6, fontWeight: 600 }}>{c.q}</div>
            <div style={{ color: C.sub, fontSize: 13, marginTop: 18 }}>Klikk for å snu →</div>
          </div>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)", background: "#172033", border: `1px solid ${C.accent}`,
            borderRadius: 14, padding: 28, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ color: C.accent, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, fontFamily: FONT_MONO, marginBottom: 12 }}>SVAR</div>
            <div style={{ color: C.text, fontSize: 15.5, lineHeight: 1.6 }}>{c.a}</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => go(-1)} style={navBtn}><ChevronLeft size={18} /> Forrige</button>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ color: C.sub, fontFamily: FONT_MONO, fontSize: 14 }}>Kort {i + 1} av {CARDS.length}</span>
          <button onClick={() => { setI(0); setFlipped(false); }} style={{ ...navBtn, padding: "9px 12px" }} title="Tilbakestill"><RotateCcw size={16} /></button>
        </div>
        <button onClick={() => go(1)} style={navBtn}>Neste <ChevronRight size={18} /></button>
      </div>
    </div>
  );
}
const navBtn = { display: "flex", alignItems: "center", gap: 6, background: C.card, color: C.text,
  border: `1px solid ${C.border}`, borderRadius: 9, padding: "9px 16px", fontSize: 14.5,
  fontFamily: FONT_BODY, fontWeight: 600, cursor: "pointer" };

/* ============================================================ */
export default function MassebalanserEksempler() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: FONT_BODY }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        button:hover { border-color: ${C.accent} !important; transform: translateY(-1px); }
        button { transition: all .15s ease; }
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* HEADER */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ background: C.accent, color: "#0F172A", fontWeight: 700, fontSize: 13, padding: "5px 12px", borderRadius: 7, fontFamily: FONT_HEAD }}>DEL B · Kjemisk prosessteknologi</span>
            <span style={{ border: `1px solid ${C.accent}`, color: C.accent, fontWeight: 700, fontSize: 13, padding: "5px 12px", borderRadius: 7, fontFamily: FONT_MONO }}>B1 / B2 / B3</span>
            <span style={{ border: `1px solid ${C.border}`, color: C.sub, fontWeight: 600, fontSize: 13, padding: "5px 12px", borderRadius: 7 }}>Del 2 av 4 · Eksempler</span>
          </div>
          <h1 style={{ fontFamily: FONT_HEAD, fontWeight: 800, fontSize: 42, margin: "0 0 10px", color: C.text, lineHeight: 1.1 }}>
            Massebalanser — Eksempler og Quiz
          </h1>
          <p style={{ color: C.sub, fontSize: 19, margin: 0, lineHeight: 1.5 }}>
            Fem gjennomregnede oppgaver i økende vanskegrad, forankret i reelle eksamener (V2023, V2024, V2025).
            Dette er det mest verdifulle studiematerialet for de ~40 % av eksamen som er kjemidel.
          </p>
        </div>

        <Card style={{ marginBottom: 40, borderLeft: `4px solid ${C.accent}` }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <ListChecks size={20} style={{ color: C.accent, flexShrink: 0, marginTop: 2 }} />
            <div style={{ color: C.text, fontSize: 15.5, lineHeight: 1.65 }}>
              <b>Standard fremgangsmåte (samme hver gang):</b> (1) tegn flytskjema, merk alle strømmer og ukjente →
              (2) velg basis → (3) frihetsgradsanalyse per kontrollvolum → (4) løs kontrollvolumet med
              <Mono> n_fg = 0</Mono> først → (5) bruk resultatet videre → (6) svar med enheter.
            </div>
          </div>
        </Card>

        <SectionHeader icon={FlaskConical} label="Eksempler" title="Fem oppgaver, økende vanskegrad" />

        {/* ===== EKSEMPEL 1 ===== */}
        <Eksempel n="1" level={1} title="Inndamper — ett trinn, uten reaksjon" exam="Type: F&R / standard">
          <div style={oppgavetekst}>
            En slurry mates til en inndamper med <Mono>1000 kg/h</Mono> og 20 % tørrstoff. Rent vann fordampes
            (strøm W) slik at produktet (P) holder 50 % tørrstoff. Finn W og P. Stasjonær, ingen reaksjon.
          </div>
          <div style={{ display: "flex", justifyContent: "center", margin: "4px 0 18px" }}><EvaporatorSVG /></div>

          <Steg label="Frihetsgrader">
            2 ukjente (W, P). Komponenter: tørrstoff + vann → 2 uavhengige balanser.
            <DFTable rows={[["Hele inndamperen", "2", "2", "0"]]} />
            <Mono>n_fg = 0</Mono> → løsbart.
          </Steg>
          <Steg label="Balanseligninger (Inn = Ut)">
            Tørrstoff (inert i fordampingen): <Mono>0,20·1000 = 0,50·P</Mono><br />
            Total masse: <Mono>1000 = P + W</Mono>
          </Steg>
          <Steg label="Løsning">
            <Mono>P = 200 / 0,50 = 400 kg/h</Mono>. Deretter <Mono>W = 1000 − 400 = 600 kg/h</Mono>.
          </Steg>
          <Svar><Mono>P = 400 kg/h</Mono> produkt, <Mono>W = 600 kg/h</Mono> fordampet vann.</Svar>
          <Tip>Triks: start alltid med komponenten som bare finnes i ÉN inn- og én ut-strøm (her tørrstoffet) — den gir umiddelbart ett tall.</Tip>
        </Eksempel>

        {/* ===== EKSEMPEL 2 ===== */}
        <Eksempel n="2" level={2} title="To miksere i serie — velg riktig enhet først" exam="Type: flertrinn (B2)">
          <div style={oppgavetekst}>
            To strømmer blandes i Mikser 1: <Mono>F1 = 100 kg/h</Mono> (0,5 A / 0,5 B) og <Mono>F2 = 40 kg/h</Mono> (0,9 A / 0,1 B).
            Resultatet (S) blandes i Mikser 2 med <Mono>F3 = 30 kg/h</Mono> (0,2 A / 0,8 B) til produkt P. Finn S, P og
            sammensetningene. Ingen reaksjon.
          </div>
          <div style={{ display: "flex", justifyContent: "center", margin: "4px 0 18px" }}><TwoMixerSVG /></div>

          <Steg label="Frihetsgrader — hvilken enhet løser vi først?">
            <DFTable rows={[
              ["Mikser 1 (S, x_A,S)", "2", "2", "0"],
              ["Mikser 2 (P, x_A,P)", "2", "2", "0"],
            ]} />
            Begge har <Mono>n_fg = 0</Mono>, men Mikser 1 har bare KJENTE innstrømmer → start der. Mikser 2 trenger
            S fra Mikser 1, så den løses etterpå.
          </Steg>
          <Steg label="Mikser 1">
            Total: <Mono>S = 100 + 40 = 140 kg/h</Mono>.<br />
            A: <Mono>0,5·100 + 0,9·40 = 86 kg A/h</Mono> → <Mono>x_A,S = 86/140 = 0,614</Mono> (x_B,S = 0,386).
          </Steg>
          <Steg label="Mikser 2">
            Total: <Mono>P = 140 + 30 = 170 kg/h</Mono>.<br />
            A: <Mono>86 + 0,2·30 = 92 kg A/h</Mono> → <Mono>x_A,P = 92/170 = 0,541</Mono> (x_B,P = 0,459).
          </Steg>
          <Svar><Mono>S = 140 kg/h</Mono> (61,4 % A), <Mono>P = 170 kg/h</Mono> (54,1 % A).</Svar>
          <Tip>Kjernepoenget i flertrinn: løs i rekkefølge. Det kontrollvolumet med færrest ukjente (ofte en enhet med bare kjente innstrømmer, eller hele prosessen) går først, og resultatet «mater» neste.</Tip>
        </Eksempel>

        {/* ===== EKSEMPEL 3 ===== */}
        <Eksempel n="3" level={3} title="Klimaanlegg med resirkulering" exam="Eksamen V2023 · Oppgave 1 (25p)">
          <div style={oppgavetekst}>
            Frisk luft med 4,0 mol% vanndamp (strøm 1) avfuktes til 1,70 mol% (strøm 6). Anlegget produserer
            <Mono> 100 mol/s</Mono> i strøm 6. En del av strømmen ut av kjøleren resirkuleres (strøm 5) og blandes med
            føden, slik at strømmen inn på kjøleren (strøm 2) har 2,3 mol% vanndamp. Kondensat tas ut som rent vann
            (strøm 3). Finn alle strømmer og sammensetninger. (TL = tørrluft, V = vanndamp)
          </div>
          <div style={{ display: "flex", justifyContent: "center", margin: "4px 0 18px" }}><KlimaSVG /></div>

          <Steg label="a) Det du kan fylle inn uten å regne">
            Strøm 4, 5 og 6 har samme sammensetning (split etter kjøleren): alle 1,7 % V / 98,3 % TL.
            Strøm 3 er rent vann (100 % V). Tørrluft er <Term>inert</Term> — den går rett gjennom.
          </Steg>
          <Steg label="b/c) Frihetsgrader → er det løsbart?">
            <DFTable rows={[
              ["Hele prosessen (ṅ₁, ṅ₃)", "2", "2", "0"],
              ["Blandepunkt (ṅ₂, ṅ₅)", "2", "2", "0"],
            ]} />
            To kontrollvolum med <Mono>n_fg = 0</Mono> → problemet er løsbart. Start med hele prosessen
            (resirkulering krysser ikke ytre grense).
          </Steg>
          <Steg label="d) Hele prosessen — finn føde og kondensat">
            TL-balanse: <Mono>0,96·ṅ₁ = 0,983·100 = 98,3</Mono> → <Mono>ṅ₁ = 102,4 mol/s</Mono>.<br />
            Totalbalanse: <Mono>ṅ₁ = ṅ₃ + 100</Mono> → <Mono>ṅ₃ = 2,4 mol/s</Mono>.
          </Steg>
          <Steg label="d) Blandepunkt — finn resirkuleringen">
            Total: <Mono>102,4 + ṅ₅ = ṅ₂</Mono>. TL: <Mono>0,96·102,4 + 0,983·ṅ₅ = 0,977·ṅ₂</Mono>.<br />
            Substituer ṅ₂: <Mono>(0,983 − 0,977)·ṅ₅ = 0,977·102,4 − 0,96·102,4</Mono> → <Mono>ṅ₅ ≈ 290 mol/s</Mono>.
          </Steg>
          <Steg label="Resten følger">
            <Mono>ṅ₂ = 102,4 + 290 = 392 mol/s</Mono>. Kjøler: <Mono>ṅ₄ = ṅ₂ − ṅ₃ = 390 mol/s</Mono> (= ṅ₅ + ṅ₆ = 290 + 100 ✓).
          </Steg>
          <Svar>ṅ₁ = 102,4 · ṅ₂ = 392 · ṅ₃ = 2,4 · ṅ₄ = 390 · ṅ₅ ≈ 290 · ṅ₆ = 100 [mol/s]. Recycle ratio ṅ₅/ṅ₁ ≈ 2,8.</Svar>
        </Eksempel>

        {/* ===== EKSEMPEL 4 ===== */}
        <Eksempel n="4" level={4} title="Oksidasjon av metan — to reaksjoner, reaksjonsomfang" exam="Eksamen V2024 · Oppgave 1 (deler)">
          <div style={oppgavetekst}>
            CH₄ (100 mol/s) og luft (476 mol/s, 21 % O₂ / 79 % N₂) mates til en reaktor. Produkt: CH₄ 60, HCHO 30,
            CO₂ 10, H₂O 50, O₂ = x, N₂ = y [mol/s]. To reaksjoner:<br />
            <Mono>(1) CH₄ + O₂ → HCHO + H₂O</Mono> &nbsp;·&nbsp; <Mono>(2) CH₄ + 2 O₂ → CO₂ + 2 H₂O</Mono><br />
            Finn reaksjonsomfangene og bestem x og y.
          </div>
          <Steg label="Mol inn">
            CH₄ = 100. O₂ = 0,21·476 ≈ 100. N₂ = 0,79·476 ≈ 376 (inert).
          </Steg>
          <Steg label="Flere reaksjoner → generalisert omfangsligning">
            <Formula>ṅ<sub>i,ut</sub> = ṅ<sub>i,inn</sub> + Σ<sub>j</sub> ν<sub>ij</sub> · ξ<sub>j</sub></Formula>
            Finn ξ fra et produkt som bare dannes i ÉN reaksjon:<br />
            HCHO (kun i rx 1): <Mono>0 + ξ₁ = 30</Mono> → <Mono>ξ₁ = 30 mol/s</Mono>.<br />
            CO₂ (kun i rx 2): <Mono>0 + ξ₂ = 10</Mono> → <Mono>ξ₂ = 10 mol/s</Mono>.
          </Steg>
          <Steg label="Sjekk med CH₄ og H₂O">
            CH₄: <Mono>100 − ξ₁ − ξ₂ = 100 − 30 − 10 = 60</Mono> ✓ (stemmer med oppgitt).<br />
            H₂O: <Mono>0 + ξ₁ + 2ξ₂ = 30 + 20 = 50</Mono> ✓.
          </Steg>
          <Steg label="Bestem x (O₂) og y (N₂)">
            O₂: <Mono>x = 100 − ξ₁ − 2ξ₂ = 100 − 30 − 20 = 50 mol/s</Mono>.<br />
            N₂ er inert: <Mono>y = 376 mol/s</Mono>.
          </Steg>
          <Svar><Mono>ξ₁ = 30</Mono>, <Mono>ξ₂ = 10</Mono>, <Mono>x = 50 mol/s O₂</Mono>, <Mono>y = 376 mol/s N₂</Mono>.</Svar>
          <Tip><b>Alternativ — atombalanse (Metode 1):</b> du kunne i stedet balansert C, H, O, N direkte (atomer bevares uansett reaksjon). Omfangsmetoden er raskere her fordi reaksjonene er kjent. Sjekk gjerne svaret med en C-balanse: C inn = 100; C ut = 60+30+10 = 100 ✓.</Tip>
        </Eksempel>

        {/* ===== EKSEMPEL 5 ===== */}
        <Eksempel n="5" level={5} title="Reaktor med resirkulering — og hvorfor systemet kan bli singulært" exam="Eksamen V2025 · Oppgave 2 (20p)">
          <div style={oppgavetekst}>
            Reaksjon <Mono>A → 2B</Mono>. Fersk føde (strøm 1) = 101 mol/s A (ingen B). Reaktorføde (2) = føde + resirkulering (4).
            Reaktorprodukt (3) → separator → lett produkt (5: 1 % A / 99 % B) og tung strøm (4: 90 % A / 10 % B) som
            resirkuleres. Strøm 5 inneholder 2 mol/s A. Stasjonært, bare A og B. Finn det som lar seg bestemme.
          </div>
          <div style={{ display: "flex", justifyContent: "center", margin: "4px 0 18px" }}><ReactorRecycleSVG /></div>

          <Steg label="Strøm 5 (produkt) — løses direkte">
            Strøm 5 er 1 % A, og A = 2 mol/s → <Mono>ṅ₅ = 2 / 0,01 = 200 mol/s</Mono>. Dermed B i strøm 5 = 198 mol/s.
          </Steg>
          <Steg label="Overall balanse (rundt hele prosessen)">
            Inn = 101 A. Ut = strøm 5.<br />
            A (med reaksjon): <Mono>101 − A_reagert = 2</Mono> → <Mono>A_reagert = 99 mol/s</Mono> → <Mono>ξ = 99 mol/s</Mono>.<br />
            B dannet: <Mono>2·ξ = 198 mol/s</Mono> = B ut ✓ (overall er konsistent).
          </Steg>
          <Steg label="Det viktige poenget: hvorfor Python sier «singulær matrise»">
            Sett opp separatorbalansene (strøm 3 = strøm 4 + strøm 5) med reaktorens omfangsligning. A-balansen gir
            entydig <Mono>ξ = 99</Mono> uansett resirkulering. Men B-balansen rundt sløyfa reduseres til
            <Mono> B₄ + 198 = B₄ + 198</Mono> — en identitet (0 = 0). Den gir <b>ingen</b> ny informasjon om resirkuleringen.
          </Steg>
          <Steg label="Konsekvens">
            Strøm 4 (og dermed strøm 2 og 3) er <Term>underdeterminert</Term>: en hvilken som helst resirkuleringsrate
            tilfredsstiller balansene. Matrisen A i <Mono>Ax = b</Mono> er rang-defekt → singulær. Du <i>kan</i> bestemme
            føde, produkt, ξ og total omdanning, men <b>ikke</b> resirkuleringsstrømmen uten én ekstra opplysning.
          </Steg>
          <Steg label="Slik gjøres det løsbart">
            Trenger én ekstra spec — typisk <Term>single-pass omdanning</Term> X_sp i reaktoren. Da:
            <Mono> X_sp = ξ / A₂ = 99 / (101 + A₄)</Mono>. Er f.eks. X_sp oppgitt til 0,50: <Mono>101 + A₄ = 198</Mono> →
            <Mono> A₄ = 97</Mono>, og med 90 % A i strøm 4: <Mono>B₄ = A₄/9 ≈ 10,8</Mono> → <Mono>ṅ₄ ≈ 108 mol/s</Mono>.
          </Steg>
          <Svar>
            Løsbart: ṅ₅ = 200 mol/s (2 A + 198 B), ξ = 99 mol/s, total omdanning av A = 99/101 = 98 %.
            IKKE løsbart uten ekstra info: ṅ₂, ṅ₃, ṅ₄ (resirkuleringen).
          </Svar>
          <Tip>
            <b>Eksamenslærdom:</b> en frihetsgradsanalyse som «ser» <Mono>n_fg = 0</Mono> kan likevel være singulær hvis
            to ligninger ikke er lineært uavhengige. Ved A → 2B øker molantallet, så total-mol-balansen og
            komponentbalansene henger sammen på en måte som kan kollapse i resirkuleringssløyfa. Sjekk alltid rangen.
          </Tip>
        </Eksempel>

        {/* PURGE */}
        <Card style={{ marginBottom: 48, borderLeft: `4px solid ${C.accent}` }}>
          <h3 style={{ fontFamily: FONT_HEAD, fontWeight: 700, fontSize: 19, margin: "0 0 12px", color: C.text }}>
            Tillegg: purge — logikken på 30 sekunder
          </h3>
          <p style={{ ...P, marginBottom: 10 }}>
            Hvis fersk føde inneholder et <Term>inert</Term> stoff og produktstrømmen er ren, har inertet ingen vei ut
            av resirkuleringssløyfa → det hoper seg opp og systemet blir aldri stasjonært. Løsning: en liten
            <Term>purge</Term>-strøm avtappes fra sløyfa. Ved steady state må <b>inert inn = inert ut</b>:
          </p>
          <Formula label="Purge har samme sammensetning som resirkuleringsstrømmen (begge tas fra samme split-punkt).">
            ṅ<sub>inert, føde</sub> = x<sub>inert, purge</sub> · ṅ<sub>purge</sub>
          </Formula>
          <p style={{ ...P, margin: 0 }}>
            Eksempel: 2 mol/s inert kommer inn med føden, og purgen har 5 % inert →
            <Mono> ṅ_purge = 2 / 0,05 = 40 mol/s</Mono>. Større purge → lavere inert-nivå i sløyfa, men mer tap av
            verdifull reaktant. Det er en avveining.
          </p>
        </Card>

        {/* QUIZ */}
        <SectionHeader icon={Repeat} label="Quiz" title="Test deg selv" />
        <p style={{ ...P, color: C.sub, marginTop: -10, marginBottom: 22 }}>
          Klikk kortet for å snu. Blanding av konsept- og regneoppgaver i eksamenstil.
        </p>
        <Quiz />

        <div style={{ textAlign: "center", marginTop: 56, color: C.sub, fontSize: 13, fontFamily: FONT_MONO }}>
          IMAK2005 · Del B · B1/B2/B3 · Massebalanser (Eksempler og Quiz) · Del 2 av 4
        </div>
      </div>
    </div>
  );
}
