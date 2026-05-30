import React, { useState } from "react";
import { Atom, Beaker, Calculator, ChevronLeft, ChevronRight, ClipboardList, Droplets, FlaskConical, GitCompare, Layers, Leaf, Lightbulb, Link2, RotateCcw, Scale, Sparkles, Target, Wind, Wrench } from "lucide-react";

// ============================================================
//  IMAK2005 — A3 · Industrielle biologiske medier
//  Kombinert side: Teori + Eksempler & Quiz (klikkbare faner).
//  Begge delene er pakket i hver sin scope (IIFE) slik at de
//  delte hjelpe-komponentene ikke kolliderer.
// ============================================================

const WRAP_ACCENT = "#F59E0B";
const WRAP_BG = "#0F172A";
const WRAP_BORDER = "#334155";
const WRAP_TXT = "#F8FAFC";
const WRAP_SUB = "#94A3B8";

const TeoriPage = (() => {
/**
 * IMAK2005 — A3: Industrielle biologiske medier
 * PART 1 av 2: Teori
 * Innhold: Header, Læringsmål, Teori, Viktige sammenhenger
 * Accent: #F59E0B (amber)
 */

const ACCENT = "#F59E0B";
const ACCENT_BG = "rgba(245,158,11,0.10)";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TXT = "#F8FAFC";
const TXT2 = "#94A3B8";

/* ---------- Gjenbrukbare byggeklosser ---------- */

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
      margin: "14px 0",
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
    <div
      style={{
        borderLeft: `4px solid ${ACCENT}`,
        paddingLeft: "16px",
        marginBottom: "20px",
      }}
    >
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

const SubTitle = ({ children }) => (
  <h3
    style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: "18px",
      fontWeight: 700,
      color: TXT,
      margin: "0 0 10px",
    }}
  >
    {children}
  </h3>
);

const P = ({ children, style }) => (
  <p style={{ color: TXT, lineHeight: 1.75, margin: "0 0 12px", ...style }}>
    {children}
  </p>
);

const Li = ({ children }) => (
  <li style={{ color: TXT, lineHeight: 1.7, marginBottom: "7px" }}>{children}</li>
);

const Note = ({ children }) => (
  <div
    style={{
      borderLeft: `3px solid ${ACCENT}`,
      background: ACCENT_BG,
      borderRadius: "0 8px 8px 0",
      padding: "12px 16px",
      margin: "14px 0",
      color: TXT,
      fontSize: "14.5px",
      lineHeight: 1.65,
    }}
  >
    {children}
  </div>
);

const TableRef = ({ children }) => (
  <span style={{ color: TXT2, fontStyle: "italic", fontSize: "13.5px" }}>
    {children}
  </span>
);

/* ---------- Tabell-hjelper ---------- */

const Table = ({ head, rows, colW }) => (
  <div style={{ overflowX: "auto", margin: "12px 0 6px" }}>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "14.5px",
        minWidth: "520px",
      }}
    >
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

/* ---------- SVG: oversikt medium-komponenter ---------- */

const MediumDiagram = () => {
  const comp = [
    { x: 60, y: 40, label: "Karbonkilde", role: "Energi + byggesteiner (C)", color: "#F59E0B" },
    { x: 560, y: 40, label: "Nitrogenkilde", role: "Proteiner, nukleinsyrer (N)", color: "#10B981" },
    { x: 60, y: 320, label: "Mineraler & sporstoff", role: "Kofaktorer, struktur", color: "#06B6D4" },
    { x: 560, y: 320, label: "Vekstfaktorer", role: "Vitaminer, aminosyrer", color: "#A855F7" },
    { x: 310, y: 360, label: "Vann", role: "Hovedkomponent / løsemiddel", color: "#3B82F6" },
  ];
  return (
    <svg viewBox="0 0 800 460" style={{ width: "100%", height: "auto" }}>
      {/* piler */}
      {comp.map((c, i) => (
        <line
          key={"l" + i}
          x1={c.x + 90}
          y1={c.y + 30}
          x2={400}
          y2={230}
          stroke={BORDER}
          strokeWidth="2"
          strokeDasharray="5 4"
        />
      ))}
      {/* sentral celle */}
      <ellipse cx="400" cy="230" rx="95" ry="70" fill={ACCENT_BG} stroke={ACCENT} strokeWidth="2.5" />
      <text x="400" y="222" textAnchor="middle" fill={TXT} fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="17">
        MIKRO-
      </text>
      <text x="400" y="244" textAnchor="middle" fill={TXT} fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="17">
        ORGANISME
      </text>
      {/* komponentbokser */}
      {comp.map((c, i) => (
        <g key={"g" + i}>
          <rect x={c.x} y={c.y} width="180" height="60" rx="10" fill={CARD} stroke={c.color} strokeWidth="2" />
          <text x={c.x + 90} y={c.y + 26} textAnchor="middle" fill={c.color} fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="14">
            {c.label}
          </text>
          <text x={c.x + 90} y={c.y + 46} textAnchor="middle" fill={TXT2} fontFamily="'Source Sans 3', sans-serif" fontSize="11.5">
            {c.role}
          </text>
        </g>
      ))}
      <text x="400" y="318" textAnchor="middle" fill={TXT2} fontSize="12.5" fontFamily="'Source Sans 3', sans-serif">
        → balansert medium = maksimal produksjon
      </text>
    </svg>
  );
};

/* ---------- Hovedkomponent ---------- */

function A3Teori() {
  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "'Source Sans 3', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .a3-link { transition: all .15s ease; cursor: pointer; }
        .a3-link:hover { filter: brightness(1.25); transform: translateY(-2px); }
        ul { margin: 6px 0 14px; padding-left: 22px; }
      `}</style>

      <div style={{ maxWidth: "880px", margin: "0 auto" }}>
        {/* ---------------- HEADER ---------------- */}
        <Card style={{ marginBottom: "20px", borderTop: `4px solid ${ACCENT}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
            <span
              style={{
                background: ACCENT,
                color: BG,
                fontWeight: 800,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                padding: "4px 12px",
                borderRadius: "8px",
                fontSize: "15px",
              }}
            >
              A3
            </span>
            <span
              style={{
                border: `1px solid ${ACCENT}`,
                color: ACCENT,
                padding: "3px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Del A · Bioteknologi
            </span>
            <span style={{ color: TXT2, fontSize: "13px", fontWeight: 600 }}>Del 1 av 2 · Teori</span>
          </div>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "38px",
              fontWeight: 800,
              color: TXT,
              margin: "0 0 8px",
              lineHeight: 1.1,
            }}
          >
            Industrielle biologiske medier
          </h1>
          <p style={{ color: TXT2, fontSize: "17px", margin: 0, lineHeight: 1.6 }}>
            Hvordan et balansert vekstmedium settes sammen av karbon-, nitrogen-, mineral- og
            vekstfaktorkilder — og hvorfor riktig medievalg er avgjørende for utbytte, produktkvalitet og
            økonomi i en fermenteringsprosess.
          </p>
        </Card>

        {/* ---------------- LÆRINGSMÅL ---------------- */}
        <Section label="Læringsmål" title="Hva du skal sitte igjen med" icon={Target}>
          <Card>
            <ul style={{ margin: 0 }}>
              <Li>
                Studenten kan beskrive og forklare prinsippene for og utvikling av en fermenteringsprosess,
                inklusive nedstrømsprosesser.
              </Li>
            </ul>
            <Note>
              <strong>Konkret for A3:</strong> forstå viktigheten av et godt sammensatt medium for vellykket
              produksjon av både biomasse og produkter, kjenne til de viktigste industrielle næringsstoffene,
              og forstå mediets innvirkning på <Fag>oksygenløselighet</Fag> og -opptak i cella.
            </Note>
          </Card>
        </Section>

        {/* ---------------- TEORI ---------------- */}
        <Section label="Teori" title="Mediekomponering fra bunnen" icon={FlaskConical}>
          {/* 1. Hva er et vekstmedium */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle>Hva er et vekstmedium — formål og krav</SubTitle>
            <P>
              Et <Fag>vekstmedium</Fag> må inneholde alle nødvendige elementer i en form mikroorganismene
              kan utnytte til vekst og produksjon av metabolske produkter. Sammensetningen må tilpasses den
              spesifikke prosessen — <em>«spiser alle mikroorganismer den samme maten?»</em> Nei.
            </P>
            <P style={{ marginBottom: "6px", fontWeight: 600, color: TXT2 }}>
              Et optimalt medium skal (de 7 kravene fra Stanbury kap. 4):
            </P>
            <ul>
              <Li>gi maks konsentrasjon og utbytte av produkt/biomasse pr. gram substrat</Li>
              <Li>gi maks hastighet for produktdannelse</Li>
              <Li>gi minimalt med uønskede biprodukter</Li>
              <Li>være billig, av god/konsistent kvalitet og lett tilgjengelig hele året</Li>
              <Li>gi minimale problemer ved tillaging og sterilisering</Li>
              <Li>gi minimale problemer under prosessen (røring, oksygentilførsel, ekstraksjon, rensing, avfall)</Li>
            </ul>
            <Note>
              <strong>Lab vs. industriell skala:</strong> i labskala brukes gjerne <Fag>rene og definerte</Fag>{" "}
              næringsstoffer (kontroll og reproduserbarhet). I industriell skala er mediet mer{" "}
              <Fag>komplekst</Fag> og bygger på billige råmaterialer for å holde kostnadene nede.
            </Note>
            <P style={{ marginBottom: 0 }}>
              <TableRef>Se tabell 4.1 i pensumboka for eksempler på medier.</TableRef>
            </P>
          </Card>

          {/* 2. Klassifisering */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle>Klassifisering av vekstmedium</SubTitle>
            <Table
              head={["Type", "Beskrivelse"]}
              colW={["32%", "68%"]}
              rows={[
                [<Fag key="d">Definert medium</Fag>, "Blanding av kjente, rene kjemikalier — kjent sammensetning."],
                [
                  <Fag key="k">Komplekst medium</Fag>,
                  "Mindre definerte komponenter / råmaterialer, f.eks. ekstrakter og hydrolysater fra korn, kjøtt og autolyserte gjærceller.",
                ],
                [<Fag key="s">Selektivt medium</Fag>, "Gir vekst av et begrenset utvalg mikroorganismer."],
                [
                  <Fag key="m">Minimalt medium</Fag>,
                  "Et minimum av komponenter nødvendig for vekst (f.eks. sukker + ammoniakk + salter).",
                ],
              ]}
            />
            <Note>
              <strong>Eksamenstips:</strong> matche-oppgaver der medietype kobles til beskrivelse er en gjenganger
              (V2024 oppg. 2.1). Lær de fire definisjonene ordrett.
            </Note>
          </Card>

          {/* 3. Definert vs komplekst */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle>Definert vs. komplekst — fordeler og ulemper</SubTitle>
            <Table
              head={["", "Fordeler", "Ulemper"]}
              colW={["20%", "40%", "40%"]}
              rows={[
                [
                  <strong key="d" style={{ color: ACCENT }}>Definert</strong>,
                  "Full kontroll og reproduserbarhet; enkel nedstrøm/rensing; lett å analysere balanser.",
                  "Dyrt; ofte tregere vekst; krever at alle vekstfaktorer tilsettes eksplisitt.",
                ],
                [
                  <strong key="k" style={{ color: ACCENT }}>Komplekst</strong>,
                  "Billig; inneholder ofte vitaminer/vekstfaktorer «gratis»; fremmer rask vekst.",
                  "Batch-variasjon i råstoff; vanskeligere balanser; mer skum og urenheter → tyngre nedstrøm.",
                ],
              ]}
            />
            <P style={{ margin: "10px 0 0" }}>
              <strong>Når velges hva?</strong> Kjemisk definerte, proteinfrie medier er nødvendige f.eks. ved
              produksjon av <em>vaksiner til mennesker</em>. Komplekse, billige medier dominerer i storskala
              produksjon av f.eks. antibiotika og biomasse.
            </P>
          </Card>

          {/* 4. Mediumsammensetning + diagram */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle>Mediumsammensetning — oversikt</SubTitle>
            <ul>
              <Li>
                <Fag>Makroelementer</Fag>: C, H, O, N, S, P, K, Mg, Ca, Na
              </Li>
              <Li>
                <Fag>Mikroelementer / sporstoff</Fag>: Fe, Zn, Cu, B, Cr, Co, Mn, Mo, Ni, Se, W, V
              </Li>
              <Li>
                <Fag>Vann</Fag> — hovedkomponenten i mediet (også viktig til oppvarming, kjøling, rengjøring,
                skylling)
              </Li>
            </ul>
            <P>
              Cellas elementsammensetning brukes som <strong>guide</strong> ved komponering: man dekker behovet
              for hvert element. Noen mikroorganismer kan ikke produsere visse forbindelser selv (vitaminer,
              aminosyrer, nukleotider) — disse tilsettes som rene forbindelser eller via en kompleks blanding.
            </P>
            <div style={{ marginTop: "8px" }}>
              <MediumDiagram />
            </div>
          </Card>

          {/* 5. Karbonkilder */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle>
              <FlaskConical size={17} style={{ verticalAlign: "-2px", marginRight: "6px", color: ACCENT }} />
              Karbonkilder (= energikilder)
            </SubTitle>
            <P>
              Industrielle mikroorganismer er stort sett <Fag>kjemoorganotrofe</Fag> — de henter energi ved
              oksidasjon av organiske mediekomponenter. Derfor er <strong>karbonkilden ofte den samme
              forbindelsen som energikilden</strong>.
            </P>
            <Note>
              <Fag>Metaboliseringshastighet</Fag> påvirker hva som produseres: høy C-konsentrasjon ⇒ rask
              metabolisme ⇒ <strong>lav</strong> produksjon av sekundære metabolitter. Dette er sentralt for
              f.eks. antibiotikaproduksjon.
            </Note>
            <Table
              head={["Karbonkilde", "Egenskaper / bruk"]}
              colW={["30%", "70%"]}
              rows={[
                ["Stivelse (mais o.l.)", "Brukes direkte eller hydrolysert (syre/enzym) til glukoseprodukter. Eks. hydrolysert kassava → glutaminsyre (Japan)."],
                ["Malt (bygg)", "Stivelse + sukker. Ølbrygging."],
                [
                  "Sukrose / melasse",
                  "Fra sukkerrør/-roer. SCP, etanol, antibiotika m.m. Melasse krever kompliserte/dyre ekstraksjons- og rensetrinn.",
                ],
                ["Biprodukter", "F.eks. glyserol fra biodieselproduksjon."],
                ["Oljer og fett", "Planteoljer (mais, oliven, soya): ~2,4× mer energi enn glukose."],
                [
                  "Hydrokarboner: n-alkaner, metanol, metan",
                  "Til biomasse/SCP. n-alkaner gir ~2× karbon og ~3× energi sammenlignet med glukose.",
                ],
              ]}
            />
            <P style={{ margin: "10px 0 0" }}>
              Utbyttet uttrykkes med <Fag>utbyttekoeffisient</Fag>:
            </P>
            <Formula>Y_xs = X / S = mengde biomasse produsert / mengde substrat forbrukt</Formula>
            <P style={{ marginBottom: 0 }}>
              <TableRef>
                Se tabell 4.5 (byggmalt), 4.6 (melasse-analyse) i pensumboka. Beregning av Y_xs hører til A4.
              </TableRef>
            </P>
          </Card>

          {/* 6. Nitrogenkilder */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle>
              <Leaf size={17} style={{ verticalAlign: "-2px", marginRight: "6px", color: ACCENT }} />
              Nitrogenkilder
            </SubTitle>
            <P>De fleste industrielle mikroorganismer kan utnytte både organiske og uorganiske N-kilder:</P>
            <Table
              head={["Type", "Eksempler", "Kommentar"]}
              colW={["22%", "38%", "40%"]}
              rows={[
                [
                  <Fag key="u">Uorganiske</Fag>,
                  "Ammoniakkgass, ammoniumsalter, nitrater",
                  "Ammoniakk/ammoniumion er ofte foretrukket: ammoniakk represserer nitratreduktase, så NH₄⁺ tas opp først.",
                ],
                [
                  <Fag key="o">Organiske</Fag>,
                  "Aminosyrer, proteiner, urea, gjærekstrakt, corn steep liquor, peptoner (proteinhydrolysater), soyamel",
                  "Fremmer vekst bedre enn uorganiske. Noen mikroorganismer har absolutt behov for visse aminosyrer.",
                ],
              ]}
            />
            <Note>
              <strong>Corn steep liquor</strong> (biprodukt fra stivelsesutvinning fra mais) er primært en
              N-kilde, men inneholder også melkesyre, sukker og polysakkarider — <em>kan derfor også fungere
              som C-kilde</em> (lærerens håndnotat). <TableRef>Se tabell 4.7 (CSL) og 4.8 (Pharmamedia).</TableRef>
            </Note>
            <Note>
              <strong>Oppsummert (C- og N-kilder):</strong> karbon og energikilde er ofte samme forbindelse;
              både org. og uorg. N kan brukes; de fleste C-/N-kildene inneholder noen av de nødvendige
              vitaminene; <Fag>C- og N-kilden er ofte begrensende reaktant</Fag> i mediet.
            </Note>
          </Card>

          {/* 7. Mineraler + chelater */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle>
              <Atom size={17} style={{ verticalAlign: "-2px", marginRight: "6px", color: ACCENT }} />
              Mineraler, sporstoff og chelering
            </SubTitle>
            <ul>
              <Li>Mineraler tilsettes i form av salter — konsentrasjonen er viktig.</Li>
              <Li>Hovedelementer: Mg, P, K, S, Ca, Cl m.fl.</Li>
              <Li>
                Fosfatkonsentrasjonen er ofte høyere enn andre mineralkomponenter (særlig i lab-medier /
                ristekolber), fordi fosfat også fungerer som <Fag>buffer</Fag> når ekstern pH-kontroll ikke
                brukes.
              </Li>
            </ul>
            <P style={{ margin: "6px 0 4px", fontWeight: 600 }}>
              <Fag>Chelater</Fag> (chelateringsmidler):
            </P>
            <ul style={{ marginTop: 0 }}>
              <Li>Hindrer utfelling av metallfosfater under tillaging/autoklavering av mediet.</Li>
              <Li>Danner komplekser med metallfosfatene som gradvis «spises opp» av mikroorganismene.</Li>
              <Li>Eksempler: EDTA, sitronsyre, etylendiamin.</Li>
              <Li>
                <strong>For høy konsentrasjon kan hemme veksten</strong> — viktig eksamenspoeng (det er
                <em> ikke</em> «jo mer jo bedre»).
              </Li>
              <Li>
                I komplekse medier trengs ofte ikke ekstra chelater: gjærekstrakt/peptoner kompleksbinder
                metallioner selv.
              </Li>
            </ul>
            <P style={{ marginBottom: 0 }}>
              <TableRef>Se tabell 4.10 (typiske mineralkonsentrasjoner) og 4.11 (sporstoff og metabolisme).</TableRef>
            </P>
          </Card>

          {/* 8. Vekstfaktorer */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle>Vekstfaktorer</SubTitle>
            <P>
              <Fag>Vekstfaktorer</Fag> er ferdige forbindelser som mikroorganismen trenger fordi den ikke klarer
              å syntetisere fullstendige cellekomponenter selv. Vanligst er <strong>vitaminer</strong>, men det
              kan også være spesifikke <strong>aminosyrer, fettsyrer eller steroler</strong>.
            </P>
            <ul style={{ marginBottom: 0 }}>
              <Li>Mange naturlige C-/N-kilder inneholder allerede alle eller noen vekstfaktorer.</Li>
              <Li>
                Trengs bare ett vitamin, kan det være billigere å tilsette det rene vitaminet enn en stor mengde
                av en kompleks kilde. Eks.: biotin må være i begrenset konsentrasjon ved glutaminsyreproduksjon.
              </Li>
            </ul>
          </Card>

          {/* 9. Buffer / pH */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle>Bufring og pH-kontroll</SubTitle>
            <P>pH-kontroll er viktig for optimal produktivitet. I mediet styres pH bl.a. av:</P>
            <ul style={{ marginBottom: 0 }}>
              <Li>
                <Fag>Kalsiumkarbonat (CaCO₃)</Fag> i mediet ⇒ holder pH ≈ 7; senkning av pH gir dekomponering av
                karbonatet.
              </Li>
              <Li>C- og N-kildene (forbruk forskyver pH).</Li>
              <Li>Eventuell tilsats av ammoniakk eller natriumhydroksid.</Li>
              <Li>Fosfatbuffer (jf. mineraler over).</Li>
            </ul>
          </Card>

          {/* 10. Antiskum */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle>
              <Wind size={17} style={{ verticalAlign: "-2px", marginRight: "6px", color: ACCENT }} />
              Skumdempende midler (antifoams)
            </SubTitle>
            <P>
              Skum skyldes <strong>proteiner, polysakkarider og fettsyrer</strong> (fra mediet eller produsert av
              mikroorganismen) som legger seg i væskeoverflaten. Skum kan føre til at celler fjernes fra mediet
              (<Fag>autolyse</Fag> ⇒ enda mer proteiner) og gir fysiske/biologiske problemer.
            </P>
            <P style={{ marginBottom: "6px", fontWeight: 600, color: TXT2 }}>Tre måter å løse skumproblemet:</P>
            <ul>
              <Li>Definert medium + endring av fysiske parametre.</Li>
              <Li>
                Bruk av <Fag>antiskummidler</Fag>. Eksempler (lærerens notat): estere (Clerol) og andre
                syntetiske; silikon; planteoljer / torskeleverolje; alkoholer (f.eks. oktyldekanol).
              </Li>
              <Li>
                Mekanisk <Fag>skumskjærer</Fag> i toppen av reaktoren (+ evt. skumoppsamler) — endrer ikke
                egenskapene til mediet.
              </Li>
            </ul>
            <Note>
              <strong>Viktig kobling (A5):</strong> antiskummidler er ofte <Fag>overflateaktive forbindelser</Fag>
              {" "}og kan <strong>redusere oksygenoverføringen (OTR / K_La)</strong> ved å påvirke
              gass–væske-grenseflaten. Dette er en gjenganger i påstands-oppgaver på eksamen.
            </Note>
          </Card>

          {/* 11. Forløpere + inhibitorer */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle>Forløpere og andre metabolske regulatorer</SubTitle>
            <P>
              <Fag>Forløpere (precursors)</Fag> er kjemikalier som ved tilsats blir <strong>direkte inkorporert
              i produktet</strong>, og dermed øker utbytte og/eller kvalitet.
            </P>
            <Note>
              <strong>Klassisk eksempel — penicillin:</strong> aktiviteten ligger i sidekjeden, som er
              begrensende faktor i produksjonen. Tilsats av forløperen <Fag>fenyleddiksyre</Fag> (+ derivater)
              gir <strong>benzylpenicillin (penicillin G)</strong> og økt utbytte. (Corn steep liquor inneholder
              fenyletylamin, som var den opprinnelige «oppdagelsen».)
            </Note>
            <P style={{ margin: "6px 0 4px", fontWeight: 600 }}>
              <Fag>Inhibitorer</Fag>:
            </P>
            <ul style={{ marginBottom: 0 }}>
              <Li>Hemmer produksjon av uønskede produkter slik at ønsket produkt fremmes.</Li>
              <Li>Eks.: natriumbisulfitt hindrer omdanning av glukose til etanol og fremmer glyserol i stedet.</Li>
              <Li>Eks.: ammoniakk hemmer biogassproduksjon fra mikroorganismer.</Li>
            </ul>
            <P style={{ marginBottom: 0 }}>
              <TableRef>Se tabell 4.12 (forløpere) og 4.13 (inhibitorer).</TableRef>
            </P>
          </Card>

          {/* 12. Medieoptimalisering */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle>
              <Wrench size={17} style={{ verticalAlign: "-2px", marginRight: "6px", color: ACCENT }} />
              Medieoptimalisering
            </SubTitle>
            <P>
              <strong>Klassisk metode</strong> — <Fag>én faktor om gangen</Fag> (endre én variabel, hold resten
              fast). Svært tidkrevende og dyrt for mange variabler. En full faktoriell søk krever:
            </P>
            <Formula>antall forsøk = x^n   (x = antall nivåer, n = antall variabler)</Formula>
            <P>
              Eksempel: 3 næringsstoffer på 2 nivåer = 2³ = 8 forsøk (greit). Men 6 næringsstoffer på 3 nivåer =
              3⁶ = 729 forsøk (uholdbart). Derfor brukes <strong>statistiske metoder</strong>:
            </P>
            <ul>
              <Li>
                <Fag>Plackett-Burman</Fag>: screener ut de <em>viktigste</em> variablene når det er mer enn ~5
                variabler. X forsøk evaluerer X−1 variabler (X må være multiplum av 4: 8, 12, 16…). «Dummy»-
                variabler brukes til å estimere eksperimentell feil (varians).
              </Li>
              <Li>
                <Fag>Respons-overflate-metode (RSM)</Fag> (Box &amp; Wilson): brukes etterpå til å finne{" "}
                <em>optimalt nivå</em> av nøkkelvariablene. Konturkart der like responser knyttes sammen; to
                variabler endres samtidig.
              </Li>
              <Li>
                <Fag>Simplex-søk</Fag>: optimaliserer n variabler ved n+1 forsøk, og bruker resultatene til å
                predikere neste forsøk (nyttig i store, dyre kar).
              </Li>
            </ul>
            <P style={{ marginBottom: 0 }}>
              Industrielt mål: <strong>færrest mulig forsøk</strong> for å finne optimale betingelser.
            </P>
          </Card>

          {/* 13. Økonomi / bærekraft */}
          <Card style={{ marginBottom: "18px" }}>
            <SubTitle>
              <Scale size={17} style={{ verticalAlign: "-2px", marginRight: "6px", color: ACCENT }} />
              Økonomi og bærekraft i medievalg
            </SubTitle>
            <ul>
              <Li>
                Råstoff må være <strong>billig, tilgjengelig hele året</strong> og av jevn kvalitet. Komplekse
                råstoff har ofte batch-variasjon som kan påvirke prosessen.
              </Li>
              <Li>
                Bærekraft: bruk av <strong>biprodukter/avfallsstrømmer</strong> (melasse, glyserol fra biodiesel,
                myse) som substrat.
              </Li>
              <Li>
                <strong>Medievalg påvirker reaktordesign:</strong> ICI valgte metanol + ammoniakk til SCP, en
                svært aerob og eksoterm prosess, som krevde en helt ny <Fag>air-lift-reaktor</Fag> med høy
                oksygenoverføringskapasitet og god kjøling.
              </Li>
            </ul>
            <Note>
              Et «optimalt» vekstmedium for biomassefasen er ikke nødvendigvis best for selve produktdannelsen —
              ofte trengs en <strong>sekvens av faser</strong> med ulike optimale betingelser.
            </Note>
          </Card>

          {/* 14. Vannkvalitet */}
          <Card>
            <SubTitle>
              <Droplets size={17} style={{ verticalAlign: "-2px", marginRight: "6px", color: ACCENT }} />
              Vannkvalitet
            </SubTitle>
            <P style={{ marginBottom: 0 }}>
              Vann er hovedkomponenten i mediet, men også en stor prosessfaktor: det brukes til oppvarming,
              kjøling, rengjøring og skylling. Mineralinnhold og kvalitet i vannet kan påvirke både
              mediesammensetning og prosessen — og er en kostnadsdriver i storskala.
            </P>
          </Card>
        </Section>

        {/* ---------------- VIKTIGE SAMMENHENGER ---------------- */}
        <Section label="Viktige sammenhenger" title="Hvordan A3 henger sammen med resten" icon={Link2}>
          <Card>
            <P style={{ marginBottom: "16px" }}>
              Mediekomponering er bindeleddet mellom mikroorganismens behov og resten av prosessen. Slik kobler
              A3 seg til de andre delemnene:
            </P>
            {[
              { code: "A2", color: "#10B981", text: "Vekstkinetikk: substratkonsentrasjonen S i mediet styrer den spesifikke veksthastigheten μ via Monod-ligningen. C-/N-kilden er typisk begrensende substrat." },
              { code: "A4", color: "#06B6D4", text: "Materialbalanse og støkiometri: mediekomponentene inngår i black-box-ligninger og elementbalanser. Cellas elementsammensetning bestemmer behovet, og Y_xs kobler substrat til biomasse." },
              { code: "A5", color: "#8B5CF6", text: "Røring og lufttilførsel: antiskummidler (overflateaktive) og medieviskositet påvirker oksygenoverføringen (K_La / OTR). Skum kan redusere K_La." },
              { code: "A6", color: "#EC4899", text: "Inokulum: mediet må tilpasses inokulumstadiet — sammensetningen av inokulummediet påvirker produktkvalitet og cellemorfologi i produksjonen." },
              { code: "A7", color: "#EF4444", text: "Nedstrøm: medievalg påvirker rensing/opparbeidelse. Komplekse medier og pigmenter/biprodukter gjør nedstrøm tyngre; valg av «ren» organisme/medium forenkler." },
              { code: "A10", color: "#A855F7", text: "Industrielle eksempler: spesifikke medier for spesifikke produkter — f.eks. corn steep liquor + fenyleddiksyre i penicillinproduksjon, melasse til etanol/SCP." },
            ].map((c) => (
              <div
                key={c.code}
                className="a3-link"
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  padding: "14px",
                  border: `1px solid ${BORDER}`,
                  borderRadius: "10px",
                  marginBottom: "10px",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    background: c.color,
                    color: BG,
                    fontWeight: 800,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    padding: "3px 10px",
                    borderRadius: "7px",
                    fontSize: "14px",
                    minWidth: "38px",
                    textAlign: "center",
                  }}
                >
                  {c.code}
                </span>
                <span style={{ color: TXT, lineHeight: 1.65, fontSize: "15px" }}>{c.text}</span>
              </div>
            ))}
          </Card>

          <Card style={{ marginTop: "16px", borderLeft: `4px solid ${ACCENT}` }}>
            <P style={{ margin: 0, color: TXT2 }}>
              <strong style={{ color: TXT }}>Neste:</strong> Del 2 dekker <em>Eksempler</em> (Y_xs-beregning,
              begrensende reaktant, medievalg) og <em>Quiz</em> (flashcards inspirert av eksamen).
            </P>
          </Card>
        </Section>

        <div style={{ textAlign: "center", color: TXT2, fontSize: "13px", marginTop: "10px" }}>
          IMAK2005 · A3 Industrielle biologiske medier · Del 1/2 (Teori)
        </div>
      </div>
    </div>
  );
}


return A3Teori;
})();

const EksemplerQuizPage = (() => {
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

function A3EksemplerQuiz() {
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


return A3EksemplerQuiz;
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
          A3 · Industrielle biologiske medier
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
