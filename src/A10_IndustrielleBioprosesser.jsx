import React, { useState } from "react";

// ============================================================
// IMAK2005 — A10: Industrielle bioprosesser (eksempler)
// Del A — Bioteknologisk prosessteknologi
// Accent: #A855F7
// ============================================================

const ACCENT = "#A855F7";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TEXT = "#F8FAFC";
const TEXT2 = "#94A3B8";

const accentBg = "rgba(168, 85, 247, 0.10)";
const accentBorder = "rgba(168, 85, 247, 0.45)";

// ---- shared tiny components ------------------------------------------------

const Term = ({ children }) => (
  <span
    style={{
      color: ACCENT,
      background: accentBg,
      borderLeft: `3px solid ${ACCENT}`,
      borderRadius: "4px",
      padding: "1px 6px",
      fontWeight: 600,
    }}
  >
    {children}
  </span>
);

const Formula = ({ children }) => (
  <div
    style={{
      fontFamily: "'JetBrains Mono', monospace",
      background: "#0B1220",
      border: `1px solid ${BORDER}`,
      borderRadius: "8px",
      padding: "10px 14px",
      color: TEXT,
      fontSize: "0.95rem",
      margin: "10px 0",
      overflowX: "auto",
    }}
  >
    {children}
  </div>
);

const Section = ({ tag, title, children }) => (
  <section style={{ marginBottom: "44px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.8rem",
          color: ACCENT,
          border: `1px solid ${accentBorder}`,
          background: accentBg,
          borderRadius: "6px",
          padding: "3px 9px",
        }}
      >
        {tag}
      </span>
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "1.6rem",
          fontWeight: 700,
          margin: 0,
          color: TEXT,
        }}
      >
        {title}
      </h2>
    </div>
    {children}
  </section>
);

const Card = ({ children, style }) => (
  <div
    style={{
      background: CARD,
      border: `1px solid ${BORDER}`,
      borderRadius: "12px",
      padding: "20px",
      ...style,
    }}
  >
    {children}
  </div>
);

// ---- data: process cards ---------------------------------------------------

const PROCESSES = [
  {
    navn: "Alkoholgjæring / øl",
    produkt: "Etanol + smaks-/aromastoffer",
    organisme: "Saccharomyces cerevisiae (overgjær), S. pastorianus (undergjær)",
    prosess: "Batch, anaerob",
    metabolitt: "Primær (vekstassosiert)",
    medie: "Vørter (malt → forgjærbart sukker via amylaser) + humle",
    nedstrom: "Filtrering, modning, karbonering",
  },
  {
    navn: "Sitronsyre (E330)",
    produkt: "Sitronsyre — mat, pH-regulator, pussemiddel",
    organisme: "Aspergillus niger (muggsopp)",
    prosess: "Batch / fed-batch, aerob",
    metabolitt: "Primær (overflow-metabolitt)",
    medie: "Surt medium, lavt fritt Fe (<0,5 mg/L), melasse/sukker",
    nedstrom: "Utfelling, filtrering, krystallisering",
  },
  {
    navn: "Penicillin (antibiotika)",
    produkt: "Benzylpenicillin (penicillin G)",
    organisme: "Penicillium chrysogenum (muggsopp)",
    prosess: "Fed-batch, aerob",
    metabolitt: "Sekundær (stasjonærfase)",
    medie: "Glukose + corn-steep liquor + forløper (fenyleddiksyre)",
    nedstrom: "Filtrering av mycel, ekstraksjon, krystallisering",
  },
  {
    navn: "Mykoprotein / SCP",
    produkt: "Encelleprotein (Quorn) — kjøtterstatning",
    organisme: "Fusarium venenatum (filamentsopp)",
    prosess: "Kontinuerlig, air-lift reaktor",
    metabolitt: "Biomasse er produktet",
    medie: "Glukosemedie (fra maisstivelse)",
    nedstrom: "Høsting av biomasse, varmebehandling, teksturering",
  },
  {
    navn: "Bakegjær",
    produkt: "Gjærbiomasse (baking)",
    organisme: "Saccharomyces cerevisiae",
    prosess: "Fed-batch, aerob",
    metabolitt: "Biomasse er produktet",
    medie: "Melasse, kontrollert glukose (unngå Crabtree)",
    nedstrom: "Sentrifugering, filtrering, tørking",
  },
  {
    navn: "Industrielle enzymer",
    produkt: "α-amylase, proteaser, lipaser, pektinaser",
    organisme: "Bacillus subtilis (bakt.), Aspergillus (sopp)",
    prosess: "Fed-batch, aerob",
    metabolitt: "Ekstracellulært enzym",
    medie: "Stivelse/protein-rikt medium",
    nedstrom: "Cellefjerning, konsentrering, formulering",
  },
  {
    navn: "Rekombinant insulin",
    produkt: "Humant insulin (diabetes)",
    organisme: "E. coli eller S. cerevisiae (rDNA)",
    prosess: "Fed-batch, aerob",
    metabolitt: "Rekombinant protein",
    medie: "Definert medium, induktor",
    nedstrom: "Celleoppslutning, kromatografi, refolding",
  },
  {
    navn: "Eddiksyre",
    produkt: "Eddiksyre (12 % → eddik)",
    organisme: "Acetobacter (bakterie)",
    prosess: "Kontinuerlig, aerob",
    metabolitt: "Primær (fra etanol)",
    medie: "Etanol + luft",
    nedstrom: "Destillasjon / konsentrering",
  },
];

const ProcessCard = ({ p }) => (
  <Card style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    <h3
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "1.15rem",
        margin: 0,
        color: ACCENT,
        borderBottom: `1px solid ${BORDER}`,
        paddingBottom: "10px",
      }}
    >
      {p.navn}
    </h3>
    {[
      ["Produkt / bruk", p.produkt],
      ["Organisme", p.organisme],
      ["Prosesstype", p.prosess],
      ["Metabolitt-type", p.metabolitt],
      ["Medie", p.medie],
      ["Nedstrøm", p.nedstrom],
    ].map(([k, v]) => (
      <div key={k} style={{ fontSize: "0.92rem", lineHeight: 1.4 }}>
        <span style={{ color: TEXT2, fontWeight: 600 }}>{k}: </span>
        <span style={{ color: TEXT }}>{v}</span>
      </div>
    ))}
  </Card>
);

// ---- flashcards ------------------------------------------------------------

const CARDS = [
  {
    q: "Hvilken organisme brukes til industriell penicillinproduksjon, og hvordan ble den funnet?",
    a: "Penicillium chrysogenum. Den ble funnet i 1943 på en cantaloupe-melon under et screeningprogram for å finne sopp med høyere utbytte enn Flemings opprinnelige P. notatum. Klassisk mutagenese + seleksjon ga >100 g/L (20 000× Flemings sopp).",
  },
  {
    q: "Er penicillin en primær eller sekundær metabolitt — og hvilken prosesstype passer derfor?",
    a: "Sekundær metabolitt: den har ingen funksjon for cellens vekst og produseres i stasjonærfasen. Derfor brukes fed-batch — man holder lav, kontrollert vekstrate slik at cellene går over i produksjonsfasen i stedet for å bruke alt substrat på rask vekst.",
  },
  {
    q: "Hva er SCP / mykoprotein, og hvilken organisme + reaktor brukes?",
    a: "SCP = single cell protein (encelleprotein) — biomassen selv er produktet, brukt som proteinkilde/kjøtterstatning (Quorn). Filamentsoppen Fusarium venenatum dyrkes i glukosemedie (fra maisstivelse) i en air-lift reaktor, kontinuerlig drift.",
  },
  {
    q: "Hvilken organisme produserer sitronsyre industrielt, og hvilke mediebetingelser fremmer produksjonen?",
    a: "Aspergillus niger. Surt medium og lavt nivå av fritt jern (Fe < 0,5 mg/L) fremmer sitronsyreproduksjon, og gir >200 g/L. Den mikrobielle prosessen har erstattet ekstraksjon fra sitrusfrukter: «mikrobielt produkt = kjemisk produkt».",
  },
  {
    q: "Hvorfor er etanol fra ølgjæring en primær metabolitt, mens penicillin er sekundær?",
    a: "Etanol dannes som direkte sluttprodukt av den anaerobe energimetabolismen (glykolyse → gjæring) mens cellen vokser — altså vekstassosiert (primær). Penicillin har ingen rolle i vekst og lages først når veksten bremser i stasjonærfasen (sekundær).",
  },
  {
    q: "Nevn to eksempler på rekombinante (rDNA) produkter fra bioprosesser og vertscellene som brukes.",
    a: "Humant insulin (produsert i E. coli eller S. cerevisiae, siden 1980-tallet — erstattet ekstraksjon fra bukspyttkjertel) og terapeutiske proteiner som veksthormon, koagulasjonsfaktorer VIII & IX og interferoner. HIV-vaksine kan også produseres i E. coli (30–2000 dm³).",
  },
  {
    q: "Hva er malt, og hvilken rolle spiller amylaser i ølbrygging?",
    a: "Malt = korn (bygg) som har spiret en tid, slik at det dannes store mengder enzymer. Amylasene omdanner stivelse til dekstrin og forgjærbart sukker (og bidrar til farge/smak). Uten malting har gjæren ikke noe sukker å gjære til etanol.",
  },
  {
    q: "Hva er forskjellen på overgjæret og undergjæret øl?",
    a: "Overgjæret: Saccharomyces cerevisiae, ~15–25 °C, fruktig profil, ale/IPA/stout/hveteøl, gjær samler seg øverst. Undergjæret: Saccharomyces pastorianus, ~8–12 °C, ren/frisk profil, lager/pils/bock, gjær samler seg nederst.",
  },
];

const Flashcards = () => {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const go = (d) => {
    setFlipped(false);
    setI((prev) => (prev + d + CARDS.length) % CARDS.length);
  };

  return (
    <div>
      <style>{`
        .fc-scene { perspective: 1200px; }
        .fc-card {
          position: relative;
          width: 100%;
          min-height: 220px;
          transition: transform 0.55s cubic-bezier(.2,.8,.2,1);
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .fc-card.flipped { transform: rotateY(180deg); }
        .fc-face {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          display: flex; align-items: center; justify-content: center;
          padding: 26px;
          border-radius: 12px;
          border: 1px solid ${BORDER};
          text-align: center;
        }
        .fc-back { transform: rotateY(180deg); }
      `}</style>

      <div className="fc-scene">
        <div
          className={`fc-card ${flipped ? "flipped" : ""}`}
          onClick={() => setFlipped((f) => !f)}
        >
          <div
            className="fc-face"
            style={{ background: CARD, borderLeft: `4px solid ${ACCENT}` }}
          >
            <div>
              <div style={{ color: TEXT2, fontSize: "0.75rem", letterSpacing: "0.08em", marginBottom: "12px", textTransform: "uppercase" }}>
                Spørsmål
              </div>
              <div style={{ color: TEXT, fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.5, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {CARDS[i].q}
              </div>
              <div style={{ color: TEXT2, fontSize: "0.8rem", marginTop: "16px" }}>
                Klikk for å snu
              </div>
            </div>
          </div>
          <div
            className="fc-face fc-back"
            style={{ background: "#0B1220", borderLeft: `4px solid ${ACCENT}` }}
          >
            <div>
              <div style={{ color: ACCENT, fontSize: "0.75rem", letterSpacing: "0.08em", marginBottom: "12px", textTransform: "uppercase" }}>
                Svar
              </div>
              <div style={{ color: TEXT, fontSize: "1rem", lineHeight: 1.6 }}>
                {CARDS[i].a}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "18px" }}>
        <NavBtn onClick={() => go(-1)}>← Forrige</NavBtn>
        <span style={{ color: TEXT2, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem" }}>
          {i + 1} / {CARDS.length}
        </span>
        <NavBtn onClick={() => go(1)}>Neste →</NavBtn>
      </div>
    </div>
  );
};

const NavBtn = ({ children, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? accentBg : CARD,
        color: hover ? ACCENT : TEXT,
        border: `1px solid ${hover ? accentBorder : BORDER}`,
        borderRadius: "8px",
        padding: "9px 16px",
        fontSize: "0.9rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.18s ease",
        fontFamily: "'Source Sans 3', sans-serif",
      }}
    >
      {children}
    </button>
  );
};

// ---- main ------------------------------------------------------------------

export default function A10_IndustrielleBioprosesser() {
  return (
    <div
      style={{
        background: BG,
        color: TEXT,
        minHeight: "100vh",
        fontFamily: "'Source Sans 3', sans-serif",
        padding: "0 0 60px 0",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Source+Sans+3:wght@400;600&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        .wrap { max-width: 920px; margin: 0 auto; padding: 0 22px; }
        ul { margin: 8px 0; padding-left: 20px; }
        li { margin: 6px 0; line-height: 1.55; }
        p { line-height: 1.65; }
      `}</style>

      {/* ===== HEADER ===== */}
      <div
        style={{
          background: `linear-gradient(135deg, ${accentBg}, transparent)`,
          borderBottom: `1px solid ${BORDER}`,
          padding: "42px 0 34px",
        }}
      >
        <div className="wrap">
          <div style={{ display: "flex", gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}>
            <span style={{ background: ACCENT, color: "#0F172A", fontWeight: 800, padding: "4px 12px", borderRadius: "6px", fontSize: "0.85rem", fontFamily: "'JetBrains Mono', monospace" }}>
              A10
            </span>
            <span style={{ border: `1px solid ${accentBorder}`, color: ACCENT, padding: "4px 12px", borderRadius: "6px", fontSize: "0.85rem", fontWeight: 600 }}>
              Del A — Bioteknologi
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "2.4rem",
              fontWeight: 800,
              margin: "0 0 10px",
              lineHeight: 1.15,
            }}
          >
            Industrielle bioprosesser <span style={{ color: ACCENT }}>(eksempler)</span>
          </h1>
          <p style={{ color: TEXT2, fontSize: "1.1rem", margin: 0, maxWidth: "640px" }}>
            Oversikt over de viktigste industrielle fermenteringsprosessene — produkt, organisme, prosesstype og metabolitt-klassifisering. Faktatungt: optimalisert for å huske eksemplene.
          </p>
        </div>
      </div>

      <div className="wrap" style={{ paddingTop: "40px" }}>

        {/* ===== LÆRINGSMÅL ===== */}
        <Section tag="01" title="Læringsmål">
          <Card style={{ borderLeft: `4px solid ${ACCENT}` }}>
            <p style={{ margin: 0, fontSize: "1.05rem" }}>
              Studenten kan <strong style={{ color: ACCENT }}>beskrive og gi eksempler på bærekraftige, industrielle biologiske produksjonsprosesser</strong> — inkludert hvilke organismer som brukes, om produktet er en primær- eller sekundær metabolitt, biomasse eller rekombinant, og hvilken prosesstype (batch / fed-batch / kontinuerlig) som passer.
            </p>
          </Card>
        </Section>

        {/* ===== TEORI ===== */}
        <Section tag="02" title="Teori">
          <p>
            Et industrielt fermenteringsprodukt kan være <Term>biomasse</Term> (cellene selv) eller noe cellene <Term>produserer</Term>. Produkter deles i fem hovedkategorier, og forståelsen av <Term>primær vs. sekundær metabolitt</Term> avgjør hvilken prosesstype som velges.
          </p>

          {/* Kategorier */}
          <Card style={{ marginBottom: "20px" }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: 0, color: ACCENT, fontSize: "1.1rem" }}>
              Kategorier av fermenteringsprodukter
            </h3>
            <ul>
              <li><strong>Mikrobielle celler (biomasse):</strong> bakegjær, øl-/vingjær, SCP (encelleprotein).</li>
              <li><strong>Enzymer:</strong> bakterielle (amylase, protease, lipase) og sopp (amylase, protease, pektinase).</li>
              <li><strong>Metabolitter:</strong> primære (aminosyrer, vitaminer, nukleinsyrer) og sekundære (antibiotika, antimikrobielle stoffer).</li>
              <li><strong>Rekombinante (rDNA) produkter:</strong> hormoner (insulin, veksthormon), terapeutiske proteiner (koagulasjonsfaktor VIII & IX, interferoner).</li>
              <li><strong>Transformasjonsprodukter:</strong> biodrivstoff (bioetanol, biohydrogen, bioplast), bioremediering (avløpsvann).</li>
            </ul>
          </Card>

          {/* Primær vs sekundær */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
            <Card>
              <h4 style={{ margin: "0 0 8px", color: ACCENT }}>Primær metabolitt</h4>
              <p style={{ margin: 0, fontSize: "0.95rem", color: TEXT2 }}>
                Nødvendig for cellens vekst/formering. Produseres i <strong style={{ color: TEXT }}>vekstfasen (logfasen)</strong> — vekstassosiert.
                <br /><span style={{ color: TEXT }}>Eks: aminosyrer, vitaminer, etanol, sitronsyre.</span>
              </p>
            </Card>
            <Card>
              <h4 style={{ margin: "0 0 8px", color: ACCENT }}>Sekundær metabolitt</h4>
              <p style={{ margin: 0, fontSize: "0.95rem", color: TEXT2 }}>
                Har ingen funksjon for vekst. Produseres i <strong style={{ color: TEXT }}>stasjonærfasen</strong> — krever ofte fed-batch for å bremse veksten.
                <br /><span style={{ color: TEXT }}>Eks: antibiotika (penicillin), alkaloider.</span>
              </p>
            </Card>
          </div>

          {/* Vekstkurve SVG */}
          <Card style={{ marginBottom: "28px" }}>
            <h4 style={{ margin: "0 0 12px", color: TEXT }}>Hvor i vekstkurven dannes produktet?</h4>
            <svg viewBox="0 0 600 240" style={{ width: "100%", height: "auto" }}>
              {/* axes */}
              <line x1="50" y1="200" x2="570" y2="200" stroke={BORDER} strokeWidth="2" />
              <line x1="50" y1="200" x2="50" y2="20" stroke={BORDER} strokeWidth="2" />
              <text x="300" y="232" fill={TEXT2} fontSize="13" textAnchor="middle" fontFamily="Source Sans 3">Tid →</text>
              <text x="18" y="110" fill={TEXT2} fontSize="13" textAnchor="middle" transform="rotate(-90 18 110)">log(celler)</text>
              {/* growth curve */}
              <path d="M50,180 L120,178 C160,178 175,60 240,55 C320,50 360,52 420,52 C470,52 500,90 560,150" fill="none" stroke={ACCENT} strokeWidth="3" />
              {/* phase shading dividers */}
              <line x1="120" y1="200" x2="120" y2="40" stroke={BORDER} strokeDasharray="4 4" />
              <line x1="245" y1="200" x2="245" y2="40" stroke={BORDER} strokeDasharray="4 4" />
              <line x1="430" y1="200" x2="430" y2="40" stroke={BORDER} strokeDasharray="4 4" />
              {/* labels */}
              <text x="85" y="35" fill={TEXT2} fontSize="11" textAnchor="middle">Lag</text>
              <text x="182" y="35" fill={TEXT2} fontSize="11" textAnchor="middle">Logfase</text>
              <text x="337" y="35" fill={TEXT2} fontSize="11" textAnchor="middle">Stasjonær</text>
              <text x="495" y="35" fill={TEXT2} fontSize="11" textAnchor="middle">Død</text>
              {/* annotations */}
              <text x="182" y="120" fill={ACCENT} fontSize="12" textAnchor="middle" fontWeight="600">Primær</text>
              <text x="182" y="135" fill={ACCENT} fontSize="11" textAnchor="middle">metabolitt</text>
              <text x="337" y="120" fill={ACCENT} fontSize="12" textAnchor="middle" fontWeight="600">Sekundær</text>
              <text x="337" y="135" fill={ACCENT} fontSize="11" textAnchor="middle">metabolitt</text>
            </svg>
          </Card>

          {/* Comparison grid */}
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: TEXT, fontSize: "1.25rem", marginBottom: "16px" }}>
            Sammenligning av prosesser
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "30px" }}>
            {PROCESSES.map((p) => (
              <ProcessCard key={p.navn} p={p} />
            ))}
          </div>

          {/* Deep dives */}
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: TEXT, fontSize: "1.25rem", marginBottom: "16px" }}>
            Detaljer på nøkkelprosessene
          </h3>

          {/* ØL */}
          <Card style={{ marginBottom: "18px" }}>
            <h4 style={{ margin: "0 0 10px", color: ACCENT }}>🍺 Ølbrygging (anaerob gjæring)</h4>
            <p style={{ margin: "0 0 10px" }}>
              <Term>Saccharomyces cerevisiae</Term> gjærer sukker anaerobt. Ca. <strong>85 %</strong> av det fermenterbare sukkeret omdannes til etanol; resten går til nye celler, glyserol (~1 g/L, «det glemte biproduktet») og andre metabolitter. Det dannes 800–1000 kjente smaks-/aromaforbindelser (fuselalkoholer, estere).
            </p>
            <p style={{ margin: "0 0 10px" }}><strong>Trenger:</strong> malt (sukker/farge), humle (bitterstoffer = α-syrer, måles i <Term>IBU</Term>), gjær, vann.</p>
            <p style={{ margin: "0 0 6px" }}><strong>Malting (3 trinn):</strong></p>
            <ul>
              <li><strong>Oppbløting (støping):</strong> 2–5 døgn i rent vann, kornet sveller.</li>
              <li><strong>Spiring:</strong> 20–27 °C, 5–8 dager, lufttilførsel → <Term>amylaser</Term> dannes (omdanner stivelse → dekstrin + forgjærbart sukker).</li>
              <li><strong>Tørking (kjølling):</strong> høy temp stopper groingen; mørk malt → mørkt øl (Guinness).</li>
            </ul>
            <p style={{ margin: "10px 0 0" }}><strong>Bryggetrinn:</strong> mesking → vørter separeres → koking med humle → avkjøling → tilsats av gjær → fermentering → modning. Guinness (overgjæret stout): N₂ tilsettes for kremlag.</p>
            <div style={{ marginTop: "12px", background: "#0B1220", border: `1px solid ${BORDER}`, borderRadius: "8px", overflow: "hidden", fontSize: "0.9rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", background: accentBg, fontWeight: 700, color: ACCENT }}>
                <div style={{ padding: "8px 12px" }}></div>
                <div style={{ padding: "8px 12px" }}>Overgjæret</div>
                <div style={{ padding: "8px 12px" }}>Undergjæret</div>
              </div>
              {[
                ["Gjær", "S. cerevisiae", "S. pastorianus"],
                ["Temp.", "~15–25 °C", "~8–12 °C"],
                ["Profil", "Fruktig, kompleks", "Ren, frisk"],
                ["Stiler", "Ale, IPA, stout", "Lager, pils, bock"],
                ["Gjær samler", "Øverst", "Nederst"],
              ].map((r, idx) => (
                <div key={r[0]} style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", borderTop: `1px solid ${BORDER}` }}>
                  <div style={{ padding: "7px 12px", color: TEXT2, fontWeight: 600 }}>{r[0]}</div>
                  <div style={{ padding: "7px 12px" }}>{r[1]}</div>
                  <div style={{ padding: "7px 12px" }}>{r[2]}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* PENICILLIN */}
          <Card style={{ marginBottom: "18px" }}>
            <h4 style={{ margin: "0 0 10px", color: ACCENT }}>💊 Penicillin (antibiotika)</h4>
            <p style={{ margin: "0 0 10px" }}>
              Oppdaget av Fleming i 1928 (inhiberingssoner rundt <em>Staphylococcus aureus</em> forurenset med <Term>Penicillium notatum</Term>). P. notatum gav bare 1 mg/L; corn-steep liquor gav 20–25× økning. I 1943 ble <Term>Penicillium chrysogenum</Term> funnet på en cantaloupe-melon — med mutagenese + seleksjon gir dagens prosesser &gt;100 g/L (20 000× Flemings sopp).
            </p>
            <p style={{ margin: 0 }}>
              Penicillin er en <strong style={{ color: ACCENT }}>typisk sekundær metabolitt</strong> → produseres i stasjonærfasen → <strong>fed-batch</strong> for å holde lav vekstrate og dirigere substrat mot produkt. Forløperen <Term>fenyleddiksyre</Term> tilsettes for å gi benzylpenicillin (penicillin G). Semisyntetisk penicillin kombinerer fermentering + kjemisk/enzymatisk trinn. Inokulum: sporesuspensjon fra rulleflasker.
            </p>
          </Card>

          {/* SITRONSYRE */}
          <Card style={{ marginBottom: "18px" }}>
            <h4 style={{ margin: "0 0 10px", color: ACCENT }}>🍋 Sitronsyre (E330)</h4>
            <p style={{ margin: 0 }}>
              <Term>Aspergillus niger</Term>-fermentering har erstattet ekstraksjon fra sitrusfrukter («mikrobielt produkt = kjemisk produkt»). Årlig produksjon ~2 mill. tonn i 100–500 m³ bioreaktorer (røretank eller tårn). <strong>Surt medium + lavt fritt Fe (&lt;0,5 mg/L)</strong> fremmer produksjon → &gt;200 g/L. Brukes som smakstilsetter, antioksidant, pH-regulator i mat, og som pussemiddel for metaller.
            </p>
          </Card>

          {/* SCP + REKOMBINANT */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Card>
              <h4 style={{ margin: "0 0 10px", color: ACCENT }}>🍔 SCP / mykoprotein</h4>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>
                <Term>Fusarium venenatum</Term> dyrkes kontinuerlig i <strong>air-lift reaktor</strong> på glukosemedie (fra maisstivelse). Biomassen selv er produktet → <strong>Quorn</strong> (kjøtterstatning, Marlow Foods). Bærekraftig proteinkilde.
              </p>
            </Card>
            <Card>
              <h4 style={{ margin: "0 0 10px", color: ACCENT }}>🧬 Rekombinante produkter</h4>
              <p style={{ margin: 0, fontSize: "0.95rem" }}>
                rDNA-teknologi lar oss overføre gener til vertsceller (<Term>E. coli</Term>, S. cerevisiae). Insulin produseres i E. coli siden 1980-tallet (erstattet bukspyttkjertel). Også veksthormon, faktor VIII/IX, interferoner, HIV-vaksine (30–2000 dm³).
              </p>
            </Card>
          </div>

          <div style={{ marginTop: "20px", background: accentBg, border: `1px solid ${accentBorder}`, borderRadius: "10px", padding: "14px 18px" }}>
            <strong style={{ color: ACCENT }}>📋 Tabeller.pdf:</strong>{" "}
            <span style={{ color: TEXT2 }}>
              For dette temaet er det mest relevant å bruke molarmasse-tabeller og elementære cellesammensetninger (CH₁,₈₃O₀,₅₅N₀,₂₅ o.l.) hvis et eksamensspørsmål kobler en konkret prosess (f.eks. etanol- eller sitronsyreproduksjon) til en utbytte-/støkiometriberegning — se A4.
            </span>
          </div>
        </Section>

        {/* ===== VIKTIGE SAMMENHENGER ===== */}
        <Section tag="03" title="Viktige sammenhenger">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px" }}>
            {[
              ["A1", "Oversikt over fermenteringsprosesser og produktkategoriene disse eksemplene faller inn under."],
              ["A2", "Vekstkurven avgjør primær (logfase) vs. sekundær (stasjonær) metabolitt — kjernen i å velge batch/fed-batch."],
              ["A3", "Medievalg: corn-steep liquor (penicillin), lavt Fe (sitronsyre), melasse/glukose (etanol, SCP)."],
              ["A6", "Inokulum: sporesuspensjon (penicillin via rulleflasker), frøkultur (enzymer fra Bacillus)."],
              ["A7", "Nedstrøm: intracellulære vs. ekstracellulære produkter styrer rensestrategi (penicillin, sitronsyre = ekstracellulær)."],
            ].map(([code, txt]) => (
              <Card key={code} style={{ padding: "16px" }}>
                <span style={{ background: ACCENT, color: "#0F172A", fontWeight: 800, padding: "2px 9px", borderRadius: "5px", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace" }}>
                  {code}
                </span>
                <p style={{ margin: "10px 0 0", fontSize: "0.9rem", color: TEXT2, lineHeight: 1.5 }}>{txt}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* ===== QUIZ ===== */}
        <Section tag="04" title="Quiz — flashcards">
          <p style={{ color: TEXT2, marginTop: 0 }}>
            Klikk kortet for å snu. Spørsmålene er inspirert av eksamensoppgaver (V2023–V2025), ikke kopiert.
          </p>
          <Flashcards />
        </Section>

        <div style={{ textAlign: "center", color: BORDER, fontSize: "0.8rem", marginTop: "40px", fontFamily: "'JetBrains Mono', monospace" }}>
          IMAK2005 · A10 · Industrielle bioprosesser
        </div>
      </div>
    </div>
  );
}
