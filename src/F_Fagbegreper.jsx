import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw, Eye } from "lucide-react";

/**
 * IMAK2005 — Master Fagbegreper (flashcards)
 * Kjemisk og bioteknologisk prosessteknologi, NTNU Vår 2026
 * Dekker alle 16 deltemaer (Del A: A1–A10, Del B: B1–B6)
 */

const SUB = {
  A1: { color: "#3B82F6", del: "A", navn: "Introduksjon til fermenteringsprosesser" },
  A2: { color: "#10B981", del: "A", navn: "Mikrobiell vekstkinetikk" },
  A3: { color: "#F59E0B", del: "A", navn: "Industrielle biologiske medier" },
  A4: { color: "#06B6D4", del: "A", navn: "Materialbalanse og støkiometri" },
  A5: { color: "#8B5CF6", del: "A", navn: "Røring og lufttilførsel" },
  A6: { color: "#EC4899", del: "A", navn: "Inokulum og kulturpreservering" },
  A7: { color: "#EF4444", del: "A", navn: "Nedstrømsprosesser" },
  A8: { color: "#F97316", del: "A", navn: "Reaktordesign" },
  A9: { color: "#14B8A6", del: "A", navn: "Biokatalyse og enzymatiske prosesser" },
  A10: { color: "#A855F7", del: "A", navn: "Industrielle bioprosesser" },
  B1: { color: "#6366F1", del: "B", navn: "Balanseprinsippet og flytskjema" },
  B2: { color: "#22D3EE", del: "B", navn: "Flertrinnsprosesser" },
  B3: { color: "#FB923C", del: "B", navn: "Reaktive massebalanser" },
  B4: { color: "#FBBF24", del: "B", navn: "Energibalanser" },
  B5: { color: "#34D399", del: "B", navn: "Hypotetiske prosesstrinn" },
  B6: { color: "#F472B6", del: "B", navn: "Reaktive energibalanser" },
};

const CARDS = [
  // ---------------- A1 ----------------
  { code: "A1", term: "Fermentering", def: "Prosess der en substans brytes ned til en enklere substans vha en organisme. To betydninger: (1) biologisk prosess uten oksygen (anaerob gjæring), (2) enhver prosess der mikroorganismer dyrkes for å lage et produkt (aerob eller anaerob)." },
  { code: "A1", term: "Industriell bioteknologi (bioprosessering)", def: "Bruk av levende celler som cellefabrikker; celler dyrkes i reaktorer for å produsere kommersielle produkter som enzymer, finkjemikalier, farmasøytika, mat, biopolymere, bioenergi og fôr." },
  { code: "A1", term: "Metabolic engineering (metabolsk ingeniørkunst)", def: "Målrettet forbedring av produktdannelse eller celleegenskaper ved modifikasjon av spesifikke biokjemiske reaksjoner — eller innføring av nye — vha rekombinant DNA-teknologi." },
  { code: "A1", term: "Primær metabolitt", def: "Metabolitt som er nødvendig for cellas vekst/formering og produseres i vekstfasen (logfasen). Eks: aminosyrer, nukleinsyrer, vitaminer. Vekstavhengig." },
  { code: "A1", term: "Sekundær metabolitt", def: "Metabolitt uten funksjon for selve veksten; produseres i stasjonærfasen. Eks: alkoholer, organiske syrer, antibiotika (penicillin)." },
  { code: "A1", term: "SCP (single cell protein / encelleprotein)", def: "Mikrobiell biomasse brukt som protein-/matkilde. Eksempel på fermenteringsprodukt der selve cellene er produktet." },
  { code: "A1", term: "Fermenteringsprodukter (kategorier)", def: "Mikrobielle celler (biomasse), enzymer, metabolitter (primære/sekundære), transformasjonsprodukter (celler som katalysatorer) og rekombinante produkter (fra genmanipulerte celler)." },
  { code: "A1", term: "Skala (fermentor)", def: "Nano/mikroreaktor (<ml), labskala (0,1–10 L), pilotskala (50–5000 L) og industriell skala (>50 til ~1,5 millioner L)." },

  // ---------------- A2 ----------------
  { code: "A2", term: "Spesifikk veksthastighet (μ)", def: "Biomasse produsert per enhet biomasse per tid (t⁻¹). Definert ved vekstligningen dx/dt = μ·x, der x er biomassekonsentrasjon." },
  { code: "A2", term: "Maksimal spesifikk veksthastighet (μmax)", def: "μ når næringsstoffene er i overskudd og cellene vokser maksimalt. I batch er μ ≈ μmax under vanlige forhold." },
  { code: "A2", term: "Doblingstid (td)", def: "Tiden det tar for biomassen å doble seg. td = ln2/μ. Kalles også generasjonstid." },
  { code: "A2", term: "Utbyttekoeffisient (Y)", def: "Forhold mellom dannet biomasse og forbrukt substrat: Y = x/S. Brukes til å beregne hvor mye biomasse en gitt substratmengde gir." },
  { code: "A2", term: "Monods ligning", def: "Beskriver forholdet mellom μ og restsubstrat S: μ = μmax·S/(Ks + S). Gjelder når substrat blir begrensende (overgang til stasjonærfase / kjemostat)." },
  { code: "A2", term: "Ks (substratmetningskonstant)", def: "Substratkonsentrasjonen der μ = ½·μmax. Lav Ks = høy affinitet for substratet; høy Ks = lav affinitet." },
  { code: "A2", term: "Batch kultur", def: "Lukket system uten tilførsel eller uttapping; konstant volum. Kan være substrat- og/eller giftbegrenset. Følger standard vekstkurve, μ ≈ μmax i logfasen." },
  { code: "A2", term: "Vekstkurve (faser)", def: "Lagfase → akselerasjon → eksponensiell (log) fase → nedbremsing → stasjonærfase → dødsfase." },
  { code: "A2", term: "Lagfase", def: "Tilvenningsfase i starten av en batchkultur uten netto vekst; cellene tilpasser seg mediet. Et aktivt inokulum korter ned lagfasen." },
  { code: "A2", term: "Logfase (eksponensiell fase)", def: "Eksponentiell vekst (Nt = N0·2ⁿ) med konstant μ. Celledeling med konstant generasjonstid; primære (vekstavhengige) metabolitter produseres." },
  { code: "A2", term: "Stasjonærfase", def: "Vekst avtar/stopper fordi substrat brukes opp og/eller giftige produkter dannes. Sekundære metabolitter produseres her." },
  { code: "A2", term: "Kontinuerlig kultur", def: "Åpent system med samtidig tilførsel og uttapping → steady-state og konstant cellekonsentrasjon. Kun substratbegrensning (ikke giftbegrensning)." },
  { code: "A2", term: "Kjemostat", def: "Kontinuerlig kultur som starter som batch; veksten styres av substrattilførselen (vekstbegrensende) iht Monod. Selvbalanserende. Ved steady-state er μ = D." },
  { code: "A2", term: "Fortynningshastighet (D)", def: "D = F/V (flowhastighet inn-ut / reaktorvolum), enhet t⁻¹. Kontrollerer μ i en kjemostat; alltid μ < μmax i kontinuerlig kultur." },
  { code: "A2", term: "Kritisk fortynningshastighet", def: "Når substratkonsentrasjonen blir for lav til at μ styres av D, slik at μ < D → cellene vaskes ut raskere enn de produseres." },
  { code: "A2", term: "Turbidostat", def: "Kontinuerlig kultur der flow/fortynning reguleres etter optisk tetthet (mål på cellekonsentrasjon). Cellekonsentrasjon holdes konstant; varierende μ og D." },
  { code: "A2", term: "Fed-batch kultur", def: "Tilførsel uten uttapping → variabelt volum. Kvasi steady-state: μ og D endres under prosessen. Veksten begrenses av et substrats konsentrasjon (f.eks penicillin)." },

  // ---------------- A3 ----------------
  { code: "A3", term: "Krav til medium", def: "Maks konsentrasjon/utbytte av produkt per gram substrat, maks produktdannelseshastighet, minimalt biprodukt, billig og lett tilgjengelig substrat, få prosessproblemer." },
  { code: "A3", term: "Karbon-/energikilde", def: "Ofte samme forbindelse i industrielle prosesser. Karbohydrater (sukrose/melasse), hydrokarboner (n-alkaner, metanol). Ofte begrensende faktor i mediet." },
  { code: "A3", term: "Nitrogenkilde", def: "Uorganisk (ammoniakkgass, ammoniumsalter, nitrater) eller organisk (aminosyrer, proteiner, urea, gjærekstrakt, corn-steep liquor, peptoner). Organiske fremmer vekst best." },
  { code: "A3", term: "Sterilisering av medium", def: "Labskala: autoklavering eller in situ. Pilot-/industriell skala: in situ med direkte tilførsel av vanndamp ved riktig temperatur og trykk (typisk 121 °C)." },
  { code: "A3", term: "Antifoam (skumdempende midler)", def: "Reduserer skumdannelse. Tre løsninger: (1) definert medium + endre fysiske parametre, (2) kjemiske antifoams, (3) mekanisk skumskjærer i toppen av reaktoren." },
  { code: "A3", term: "Begrensende næringsstoff", def: "Det elementet/stoffet som teoretisk gir minst biomasse. Bestemmes ved å sammenligne organismens elementsammensetning med mediets sammensetning." },

  // ---------------- A4 ----------------
  { code: "A4", term: "Materialbalanse (massebalanse)", def: "Bin − But + Bdannet − Btapt = dB/dt. For en konservert størrelse ved steady-state: inn = ut (Bdannet = Btapt = 0, dB/dt = 0)." },
  { code: "A4", term: "Black-box modell", def: "Forenkling der cella behandles som en «svart boks»: man betrakter bare strømmene inn og ut, ikke de indre metabolske reaksjonene." },
  { code: "A4", term: "Generell biomasseformel", def: "CH₁.₈O₀.₅N₀.₂ (Mw ≈ 24,6 g/mol), basert på ett C-atom for tørr biomasse. Mikroorganisme: ~90–95% C, O, H, N + 5–10% «aske»." },
  { code: "A4", term: "Vekstligning (støkiometri)", def: "CwHxOyNz + a·O₂ + b·HgOhNi → c·CHαOβNδ + d·CO₂ + e·H₂O (+ f·CjHkOlNm). 5 ukjente koeffisienter bestemmes ved element­balanser (+ evt. RQ)." },
  { code: "A4", term: "Biomasseutbytte (Yxs)", def: "Yxs = mengde biomasse produsert / mengde substrat forbrukt = X/S = c·Mw(celler)/Mw(substrat). Gram eller mol." },
  { code: "A4", term: "Produktutbytte (Yps)", def: "Yps = mengde produkt produsert / mengde substrat forbrukt = P/S = f·Mw(produkt)/Mw(substrat). Gjelder ekstracellulært produkt." },
  { code: "A4", term: "Respirasjonskvotient (RQ)", def: "RQ = mol CO₂ produsert / mol O₂ forbrukt = d/a. Dimensjonsløst. Karbohydrater ≈ 1,0; proteiner ≈ 0,7–0,9; organiske syrer ≈ 1,3." },
  { code: "A4", term: "Teoretisk oksygenkrav (a)", def: "Den støkiometriske O₂-koeffisienten: a = (w·γs − c·γB − f·j·γp)/4. Beregnes fra elektronbalansen. O₂ er ofte begrensende i aerobe prosesser." },
  { code: "A4", term: "Elektronbalanse", def: "Tilgjengelige elektroner for overføring til O₂ bevares under metabolismen: w·γS − 4a = c·γB (+ f·j·γp med produkt)." },
  { code: "A4", term: "Grad av reduksjon (γ)", def: "Mål på elektroner tilgjengelig for overføring til oksygen. γS (substrat), γB (biomasse), γp (produkt). Verdiene finnes i vedlagte tabeller på eksamen." },

  // ---------------- A5 ----------------
  { code: "A5", term: "OTR (oksygenoverføringshastighet)", def: "Transport av O₂ fra luftboble til væskefase: OTR = KLa·(C* − CL). Avhenger av lufttilførselkapasiteten." },
  { code: "A5", term: "OUR (oksygenopptakshastighet)", def: "Cellas oksygenforbruk per volum og tid. Ved steady-state er OUR = OTR (dCL/dt = 0)." },
  { code: "A5", term: "KLa (volumetrisk masseoverføringskonstant)", def: "Sammenslåing av KL og a (t⁻¹). Mål for bioreaktorens lufttilførselkapasitet — høyere KLa gir høyere O₂-kapasitet." },
  { code: "A5", term: "KL (massetransportkoeffisient)", def: "Summen av all motstand i transporten av oksygen fra gass til væske (cm·t⁻¹)." },
  { code: "A5", term: "Drivkraft (C* − CL)", def: "C* = mettet løst O₂-konsentrasjon i mediet; CL = faktisk løst O₂-konsentrasjon. Differansen er drivkraften for oksygenoverføring." },
  { code: "A5", term: "Kritisk oksygenkonsentrasjon", def: "Det løst-O₂-nivået der respirasjonshastigheten (QO₂) slutter å øke med mer O₂. QO₂ er prop. med μ; CL må holdes over kritisk nivå for maks biomasse." },
  { code: "A5", term: "Dynamisk utgassingsmetode", def: "Eksperimentell metode for å bestemme KLa og OUR. Når løst O₂ plottes mot tid gir stigningstallet til tangenten OTR-verdien." },
  { code: "A5", term: "Faktorer som påvirker KLa", def: "Luftflowhastighet, grad av røring, reologi/viskositet, biomassekonsentrasjon og morfologi, tilstedeværelse av antifoam, samt opp-/nedskalering." },

  // ---------------- A6 ----------------
  { code: "A6", term: "Inokulum (startkultur)", def: "Aktiv kultur som tilsettes for å starte produksjon. Krav: friskt og aktivt (kort lagfase), nok volum, riktig morfologi, ingen kontaminering, opprettholder produksjon." },
  { code: "A6", term: "Masterkultur", def: "Bank av identiske bevarte kulturer av produksjonsorganismen. Fra masterkulturer etableres arbeidskulturer (stock-løsninger) til inokulum." },
  { code: "A6", term: "Lyofilisering (frysetørking)", def: "Lagringsmetode godt egnet for mikroorganismer (ikke dyreceller). Celler dyrkes til stasjonærfase og resuspenderes i beskyttende medium (melk, serum, Na-glutamat)." },
  { code: "A6", term: "Kryopreservering", def: "Langvarig lagring ved kryogene temperaturer (flytende N₂ −196 °C eller cryofryser −150 °C). 5–10% DMSO brukes for å unngå intracellulær isdannelse." },
  { code: "A6", term: "Skråagar", def: "Kortvarig lagringsmetode med subkultivering hver 6. måned (inntil ~1 år hvis agaren dekkes med mineralolje)." },
  { code: "A6", term: "Sporesuspensjon", def: "Inokulum laget fra aseksuelle sporer (soppkulturer). Eks: penicillinproduksjon der sporer dyrkes i rulleflasker og overføres til produksjonstank." },

  // ---------------- A7 ----------------
  { code: "A7", term: "Nedstrømsprosess (downstream)", def: "Produktopparbeidelse og rensing etter fermentering. Mål: konsentrere og rense produktet raskest/billigst. Utgjør 15–70% av totale kostnader." },
  { code: "A7", term: "Trinn i nedstrømsprosessen", def: "(1) Fjerning av celler (filtrering/sentrifugering), (2) grovrensing (adsorpsjon, ekstraksjon, utfelling), (3) finrensing (kromatografi, ultrafiltrering), (4) sluttbehandling (krystallisering, tørking)." },
  { code: "A7", term: "Cellelysering (celleknusing)", def: "Knusing av celler for å frigjøre intracellulære produkter. Mekaniske eller ikke-mekaniske (kjemisk/enzymatisk) metoder." },
  { code: "A7", term: "Intra- vs ekstracellulært produkt", def: "Ekstracellulært produkt isoleres direkte fra mediet; intracellulært krever at cellene knuses først. Påvirker valg av rensetrinn." },
  { code: "A7", term: "Sentrifugering", def: "Separasjon vha sentrifugalkraft ut fra tetthetsforskjell. Mest effektiv for store partikler, lav viskositet og stor tetthetsforskjell. Brukes når filtrering er uegnet." },
  { code: "A7", term: "Filtrering", def: "Separering av faste partikler/celler fra løsning. Filterhjelp (kiselgur/diatomitt) brukes ved bakterier for å hindre blokkering. Eks: platefilter, roterende vakuumfilter." },
  { code: "A7", term: "Utfelling", def: "Rensing og oppkonsentrering i ett trinn. Bruk av syrer/baser (isoelektrisk punkt), salter (utsalting), organiske løsningsmidler, PEG, varmebehandling." },
  { code: "A7", term: "Kromatografi", def: "Selektiv finrenseteknikk. Typer: ionebytter- (mye brukt), adsorpsjons-, gelfiltrering (eksklusjon), hydrofob interaksjon (HIC), affinitets- og omvendt fase-kromatografi." },
  { code: "A7", term: "Enhetsoperasjon", def: "Et grunnleggende fysisk prosesstrinn: adsorpsjon, sentrifugering, kromatografi, krystallisering, filtrering, ekstraksjon, ultrafiltrering osv." },

  // ---------------- A8 ----------------
  { code: "A8", term: "Bioreaktor (fermentor)", def: "Apparat for dyrking av organismer (gjær, sopp, bakterier, plante-/dyreceller) under kontrollerte forhold (aerobe/anaerobe)." },
  { code: "A8", term: "Røretank (STR)", def: "Vanligste bioreaktoren. Sylindrisk beholder (glass/stål) med sentral akse + impellere, kjølekappe, baffles og luftspreder. Arbeidsvolum 70–80%." },
  { code: "A8", term: "Impeller (rører)", def: "To hovedfunksjoner: (1) minske luftboblestørrelsen for større overflate/økt OTR, (2) oppnå homogent miljø. Typer: diskturbin (Rushton, radial), åpen turbin, propell (aksial)." },
  { code: "A8", term: "Baffles (strømbrytere)", def: "3–4 metallstrimler (~1/10 av tankdiameter) festet nær veggen for å hindre vorteks og forbedre lufttilførselen. Reaktorer >3 dm³: 6–8 baffles." },
  { code: "A8", term: "Sparger (luftspreder)", def: "System for lufttilførsel, plassert i bunnen av reaktoren. Eneste indre utstyr i en bobblekolonne." },
  { code: "A8", term: "Airlift-reaktor", def: "Bioreaktor uten mekanisk røring/bevegelige deler. Røring ved luftsirkulasjon i et loop-system (indre eller ytre loop), drevet av tetthetsforskjell. Skånsom mot celler." },
  { code: "A8", term: "Bobblekolonne (tårnreaktor)", def: "Enkel reaktor uten mekanisk røring. Røring vha lufttilførsel (porøs spreder) i bunn. Høyde:diameter 3:1 (bakegjær) til minst 6:1." },
  { code: "A8", term: "Arbeidsvolum / fyllingsgrad", def: "Medievolumet bør utgjøre maks ~70–80% av totalt reaktorvolum (rom for skum, gass og blanding)." },
  { code: "A8", term: "Reaktor-energibalanse (varme)", def: "Qmet + Qag + Qgas = Qacc + Qexch + Qevap + Qsen. Tar hensyn til metabolisme, røring, lufttilførsel, akkumulering, varmeutveksling, fordampning og flow." },

  // ---------------- A9 ----------------
  { code: "A9", term: "Biokatalyse", def: "Bruk av isolerte celler, celleorganeller eller isolerte enzymer som katalysatorer i kjemiske (ofte organiske) reaksjoner." },
  { code: "A9", term: "Biotransformasjon", def: "Bruk av levende celler i kultur; en forløper tilsettes mediet, cellene tar den opp og lager produktet (kan involvere mange enzymer)." },
  { code: "A9", term: "Immobilisering", def: "Feste av biokatalysator for å løse problemer med ustabilitet og separasjon. Metoder: adsorpsjon/ionisk, kovalent binding, kryssbinding, innkapsling." },
  { code: "A9", term: "Kovalent immobilisering", def: "Stabil binding til bærer ved deling av elektronpar. Ulemper: aktivitetstap (~1/5 per binding), stress, konformasjonsendring. Anbefales kun for isolerte enzymer." },
  { code: "A9", term: "Kryssbinding", def: "Kovalente bindinger mellom biokatalysator-molekyler (danner aggregater). Reagenser: glutaraldehyd, heksametylendiisocyanat. Enkel metode, men gir aktivitetstap." },
  { code: "A9", term: "Innkapsling", def: "Biokatalysator stenges inne i en fast matriks eller membranbegrenset område. Eks: MEEC — enzym lukket i en dialyseslange (forenklet membranreaktor)." },
  { code: "A9", term: "Enantiomer", def: "To molekyler med lik struktur men ulik romlig struktur som er speilbilder av hverandre (R og S)." },
  { code: "A9", term: "Rasemisk blanding", def: "Like mengder av R- og S-enantiomer. Ingen rotering av planpolarisert lys. Enantiomerisk overskudd (ee) = 0%." },
  { code: "A9", term: "Enantiomerisk overskudd (ee)", def: "Mål på enantiomerisk renhet. Ren enantiomer: ee = 100%; rasemisk: ee = 0%. Eks: 70% av en + 30% av den andre → ee = 40%." },
  { code: "A9", term: "Enantioselektivitet (E)", def: "Enantiomerisk forhold — mål på hvor selektivt enzymet er i en enzymatisk oppløsning. E > 30 er bra. E = 53 betyr at favoritt-enantiomeren omdannes 53× raskere." },
  { code: "A9", term: "Enzymatisk (kinetisk) oppløsning", def: "Starter med rasemisk blanding; enzymet favoriserer en enantiomer (kiral diskriminering i aktivt sete). Hver enantiomer gir maks 50% utbytte; ideelt stopper rx ved 50% omsetning." },
  { code: "A9", term: "Proteinengineering", def: "Endre proteiners egenskaper (f.eks stabilitet/selektivitet) ved å gjøre endringer direkte i genene." },

  // ---------------- A10 ----------------
  { code: "A10", term: "Screening", def: "Leting etter nye mikroorganismer med unike bioaktiviteter eller høyproduktive stammer som kan produsere ønsket forbindelse." },
  { code: "A10", term: "Stammeutvikling", def: "Utvikling av overproduserende stammer med kommersielt potensial vha klassisk mutagenese og seleksjonsstrategier (eller metabolic engineering)." },
  { code: "A10", term: "Penicillin (prosess)", def: "Typisk sekundær metabolitt fra Penicillium (Fleming 1928). Produseres i fed-batch i idiofasen (stasjonær); glukose er begrensende. Forløper fenyleddiksyre gir penicillin G." },
  { code: "A10", term: "Sitronsyre (prosess)", def: "Produseres av Aspergillus niger (~2 mill tonn/år) og har erstattet ekstraksjon fra sitrusfrukter. Eksempel på at et mikrobielt produkt = kjemisk produkt." },
  { code: "A10", term: "Forløper (precursor)", def: "Forbindelse som tilsettes mediet og inngår direkte i produktet for å øke utbytte (f.eks fenyleddiksyre som sidekjede-forløper i penicillin G)." },

  // ---------------- B1 ----------------
  { code: "B1", term: "Balanseprinsippet", def: "dB/dt = Ḃinn − Ḃut + Ḃdannet − Ḃtapt, der B er en balanserbar størrelse innenfor kontrollvolumet. Prikk-variable angir rate (per tidsenhet)." },
  { code: "B1", term: "Balanserbar størrelse (B)", def: "Kan være total masse, komponentmasse, molmengde (total/komponent) eller energi. Kan IKKE være volum, konsentrasjon, temperatur eller trykk." },
  { code: "B1", term: "Konservert størrelse", def: "Størrelse der Bdannet = 0 og Btapt = 0 — gjelder total masse [kg] og energi [J]. Ved steady-state: inn = ut." },
  { code: "B1", term: "Kontrollvolum", def: "Systemets grenseflate mot omgivelsene. Når balanseligninger settes opp betraktes kun de strømmene som krysser kontrollvolumet." },
  { code: "B1", term: "Flytskjema", def: "Diagram over prosessenheter og strømmer. Kjente størrelser (strømmer, sammensetninger) fylles inn først, uten beregning, for å organisere problemet." },
  { code: "B1", term: "Frihetsgradsanalyse", def: "nfg = antall ukjente − antall uavhengige ligninger. nfg = 0 → problemet er løsbart; nfg > 0 → trenger mer info; nfg < 0 → overbestemt." },
  { code: "B1", term: "Σ fraksjoner = 1", def: "Ekstra uavhengig ligning per strøm: summen av massefraksjoner (eller molfraksjoner) i en strøm er lik 1." },
  { code: "B1", term: "Stasjonær tilstand (steady-state)", def: "dB/dt = 0 — ingen akkumulering i systemet. Forenkler balanseligningen til inn − ut (+ dannet − tapt) = 0." },

  // ---------------- B2 ----------------
  { code: "B2", term: "Flertrinnsprosess", def: "Prosess satt sammen av flere enheter. Løses ved å splitte i mindre deler, sette opp kontrollvolum rundt hver del og sjekke frihetsgrader." },
  { code: "B2", term: "Resirkulering", def: "Tilbakeføring av (en del av) en strøm til et tidligere punkt i prosessen, typisk fra separator tilbake til reaktor for å øke samlet omsetning/utnyttelse." },
  { code: "B2", term: "Bypass", def: "En del av fødestrømmen ledes utenom en enhet og blandes inn igjen i produktstrømmen, f.eks for å justere sammensetning." },
  { code: "B2", term: "Purge (avtapping)", def: "En utløpsstrøm fra en resirkulasjonssløyfe som hindrer opphopning av inerte/uønskede komponenter i systemet." },
  { code: "B2", term: "Splitter (forgreningspunkt)", def: "Punkt der en strøm deles i flere. Alle delstrømmene har samme sammensetning som strømmen før splitten." },

  // ---------------- B3 ----------------
  { code: "B3", term: "Reaktiv massebalanse", def: "Massebalanse for system med kjemisk reaksjon, der Bdannet/Btapt ≠ 0 for komponenter. Håndteres med reaksjonsomfang i tillegg til vanlig verktøykasse." },
  { code: "B3", term: "Reaksjonsomfang (ξ)", def: "Mål på hvor langt en reaksjon har gått: ni = ni0 + νi·ξ, der νi er den støkiometriske koeffisienten (negativ for reaktanter, positiv for produkter)." },
  { code: "B3", term: "Begrensende reaktant", def: "Reaktanten som finnes i minst mengde relativt til det støkiometriske forholdet; den brukes opp først og bestemmer maks produktmengde." },
  { code: "B3", term: "Reaktant i overskudd", def: "Reaktant som er til stede i mer enn støkiometrisk nødvendig mengde i forhold til den begrensende reaktanten." },
  { code: "B3", term: "Omdanningsgrad (omsetning)", def: "Andel av en reaktant som har reagert: (mol reagert)/(mol i føde). Angis ofte i %." },
  { code: "B3", term: "Utbytte (yield)", def: "(mol ønsket produkt produsert)/(maksimalt antall mol ønsket produkt mulig hvis all begrensende reaktant gikk til ønsket produkt)." },
  { code: "B3", term: "Selektivitet", def: "(mol ønsket produkt produsert)/(mol uønsket produkt produsert). Sier hvor selektivt reaksjonen gir ønsket produkt fremfor biprodukt." },

  // ---------------- B4 ----------------
  { code: "B4", term: "Energibalanse", def: "dE/dt = Ėinn − Ėut + Q̇ + Ẇ'. Total energi E = Ek + Ep + U. Ofte settes opp ved steady-state." },
  { code: "B4", term: "Indre energi (U)", def: "Energi knyttet til mikroskopisk bevegelse av molekyler, atomer og elektroner." },
  { code: "B4", term: "Kinetisk energi (Ek)", def: "Energi som skyldes makroskopisk bevegelse av systemet/strømmen." },
  { code: "B4", term: "Potensiell energi (Ep)", def: "Energi som skyldes posisjon i et felt, f.eks tyngdefeltet." },
  { code: "B4", term: "Varme (Q)", def: "Energioverføring pga temperaturforskjell. For systemet er Q positiv når varme overføres til systemet fra omgivelsene." },
  { code: "B4", term: "Arbeid (W)", def: "Energioverføring via krefter. Positivt når arbeid utføres på systemet fra omgivelsene. Faktisk arbeid: Ẇ' = Ẇ + Wia (indre/strømningsarbeid pV)." },
  { code: "B4", term: "Entalpi (H)", def: "H = U + pV. Energibalanse på entalpiform: Ḣut + Ėk,ut + Ėp,ut − (Ḣinn + Ėk,inn + Ėp,inn) = Q̇ + Ẇ." },
  { code: "B4", term: "Lukket vs åpent system", def: "Lukket system utveksler ikke masse med omgivelsene (Wia = 0); åpent system utveksler både masse og energi." },
  { code: "B4", term: "Varmekapasitet (Cp)", def: "Energi som kreves for å heve temperaturen ved konstant trykk. Sensibel entalpiendring: ΔH = ∫Cp dT." },

  // ---------------- B5 ----------------
  { code: "B5", term: "Hypotetiske prosesstrinn", def: "Konstruert prosessveg (oppvarming, faseendring, trykkendring osv.) mellom to tilstander, brukt for å beregne ΔH selv om den faktiske veien er annerledes." },
  { code: "B5", term: "Tilstandsfunksjon (-variabel)", def: "Størrelse (H, U) som kun avhenger av tilstanden (start og slutt), ikke av veien mellom dem. Grunnlaget for hypotetiske prosesstrinn." },
  { code: "B5", term: "Referansetilstand", def: "Valgt tilstand der entalpien settes lik 0. Alle entalpier i problemet regnes relativt til denne." },
  { code: "B5", term: "Faseendring", def: "Overgang mellom fast, væske og gass (smelting, fordampning, sublimasjon). Skjer ved konstant temperatur og krever latent varme." },
  { code: "B5", term: "Fordampningsentalpi (ΔHv)", def: "Latent varme som kreves for å fordampe et stoff ved kokepunktet (konstant T). Tilsvarende finnes smelteentalpi for fast→væske." },
  { code: "B5", term: "Sensibel varme", def: "Entalpiendring som skyldes temperaturendring uten faseendring: ΔH = ∫Cp dT." },

  // ---------------- B6 ----------------
  { code: "B6", term: "Reaktiv energibalanse", def: "Energibalanse for et system med kjemisk reaksjon; reaksjonsvarmen må inkluderes i tillegg til entalpien i strømmene inn og ut." },
  { code: "B6", term: "Reaksjonsentalpi (ΔHr)", def: "Entalpiendring for en reaksjon ved gitt T og p: ΔHr = Σ(prod) − Σ(reakt). Beregnes ofte fra dannelsesentalpier." },
  { code: "B6", term: "Standard reaksjonsentalpi (ΔHr°)", def: "Reaksjonsentalpien ved standardbetingelser (25 °C, 1 atm). ΔHr° = Σ νi·ΔHf°(produkt) − Σ νi·ΔHf°(reaktant)." },
  { code: "B6", term: "Dannelsesentalpi (ΔHf°)", def: "Entalpi for dannelse av én mol av en forbindelse fra grunnstoffene i standardtilstand. Brukes til å beregne reaksjonsentalpi." },
  { code: "B6", term: "Eksoterm / endoterm", def: "Eksoterm reaksjon avgir varme (ΔHr < 0); endoterm reaksjon opptar varme (ΔHr > 0)." },
  { code: "B6", term: "Metode: reaksjons- vs dannelsesentalpi", def: "To metoder for å inkludere reaksjonsvarme i energibalansen: (1) via reaksjonsentalpi for hver reaksjon, eller (2) via dannelsesentalpier for alle komponenter." },
  { code: "B6", term: "Forenklet energiligning", def: "Når varmeleddet dominerer (faseovergang/reaksjon) og Ek, Ep, W kan neglisjeres: ΔḢ = Q̇." },
];

function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const COLORS = {
  bg: "#0F172A",
  card: "#1E293B",
  border: "#334155",
  text: "#F8FAFC",
  sub: "#94A3B8",
};

export default function IMAK2005Fagbegreper() {
  const [filter, setFilter] = useState("alle"); // "alle" | "A" | "B" | sub-code
  const [order, setOrder] = useState(null); // array of indices into filtered deck, or null = natural
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState(() => new Set());

  // Apply filter
  const filtered = useMemo(() => {
    if (filter === "alle") return CARDS;
    if (filter === "A" || filter === "B") return CARDS.filter((c) => SUB[c.code].del === filter);
    return CARDS.filter((c) => c.code === filter);
  }, [filter]);

  // Apply shuffle order on top of filtered
  const deck = useMemo(() => {
    if (!order) return filtered;
    return order.map((i) => filtered[i]).filter(Boolean);
  }, [filtered, order]);

  const total = deck.length;
  const safeIndex = Math.min(index, Math.max(0, total - 1));
  const current = deck[safeIndex];

  const markSeen = (card) => {
    if (!card) return;
    setSeen((prev) => {
      if (prev.has(card.term)) return prev;
      const next = new Set(prev);
      next.add(card.term);
      return next;
    });
  };

  const goTo = (newIdx) => {
    const n = total;
    if (n === 0) return;
    const wrapped = ((newIdx % n) + n) % n;
    setIndex(wrapped);
    setFlipped(false);
    markSeen(deck[wrapped]);
  };

  const handleFilter = (f) => {
    setFilter(f);
    setOrder(null);
    setIndex(0);
    setFlipped(false);
  };

  const handleShuffle = () => {
    const idxs = filtered.map((_, i) => i);
    for (let i = idxs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
    }
    setOrder(idxs);
    setIndex(0);
    setFlipped(false);
    if (filtered[idxs[0]]) markSeen(filtered[idxs[0]]);
  };

  const handleReset = () => {
    setSeen(new Set());
    setOrder(null);
    setIndex(0);
    setFlipped(false);
  };

  const handleFlip = () => {
    setFlipped((f) => !f);
    markSeen(current);
  };

  const filterBtn = (key, label, color) => {
    const active = filter === key;
    return (
      <button
        key={key}
        onClick={() => handleFilter(key)}
        className="shrink-0 transition-all duration-150"
        style={{
          padding: "6px 14px",
          borderRadius: 9999,
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          whiteSpace: "nowrap",
          color: active ? COLORS.bg : color || COLORS.text,
          background: active ? color || COLORS.text : hexToRgba(color || "#94A3B8", 0.12),
          border: `1px solid ${active ? color || COLORS.text : hexToRgba(color || "#94A3B8", 0.4)}`,
        }}
      >
        {label}
      </button>
    );
  };

  const accent = current ? SUB[current.code].color : "#94A3B8";

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, minHeight: "100%", padding: "24px 16px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Source+Sans+3:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .imak-scroll::-webkit-scrollbar { height: 6px; }
        .imak-scroll::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 9999px; }
        .imak-scroll::-webkit-scrollbar-track { background: transparent; }
        .flip-card { perspective: 1000px; }
        .flip-inner { position: relative; width: 100%; height: 100%; transition: transform 0.5s; transform-style: preserve-3d; }
        .flip-inner.flipped { transform: rotateY(180deg); }
        .flip-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden;
          display: flex; flex-direction: column; border-radius: 16px; padding: 28px; box-sizing: border-box; overflow-y: auto; }
        .flip-back { transform: rotateY(180deg); }
        .nav-btn { transition: all 0.15s; cursor: pointer; }
        .nav-btn:hover { background: ${COLORS.border} !important; }
        .icon-btn { transition: all 0.15s; cursor: pointer; }
        .icon-btn:hover { transform: translateY(-1px); }
      `}</style>

      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 30, margin: 0, letterSpacing: "-0.02em" }}>
            IMAK2005 — Fagbegreper
          </h1>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", color: COLORS.sub, margin: "6px 0 0", fontSize: 15 }}>
            Master­flashcards · Kjemisk og bioteknologisk prosessteknologi · {CARDS.length} begreper
          </p>
        </div>

        {/* FILTER BAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
          <div className="imak-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {filterBtn("alle", "Alle", "#F8FAFC")}
            {filterBtn("A", "Del A · Biotek", "#10B981")}
            {filterBtn("B", "Del B · Kjemi", "#6366F1")}
          </div>
          <div className="imak-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6 }}>
            {Object.keys(SUB).map((code) => filterBtn(code, code, SUB[code].color))}
          </div>
        </div>

        {/* CONTROLS ROW */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleShuffle}
              className="icon-btn"
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
                background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.text,
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600 }}
            >
              <Shuffle size={15} /> Stokk
            </button>
            <button
              onClick={handleReset}
              className="icon-btn"
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
                background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.sub,
                fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 600 }}
            >
              <RotateCcw size={15} /> Nullstill
            </button>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: COLORS.sub }}>
            Sett: <span style={{ color: COLORS.text }}>{seen.size}</span> / {CARDS.length} kort
          </div>
        </div>

        {/* FLASHCARD */}
        {current ? (
          <>
            <div className="flip-card" style={{ height: 360, marginBottom: 16 }}>
              <div
                className={`flip-inner${flipped ? " flipped" : ""}`}
                onClick={handleFlip}
                style={{ cursor: "pointer" }}
              >
                {/* FRONT — term */}
                <div
                  className="flip-face imak-scroll"
                  style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderLeft: `4px solid ${accent}` }}
                >
                  <CardTag code={current.code} accent={accent} />
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 26, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                      {current.term}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: COLORS.sub, fontFamily: "'Source Sans 3', sans-serif", fontSize: 12 }}>
                    <Eye size={13} /> Trykk for forklaring
                  </div>
                </div>

                {/* BACK — definition */}
                <div
                  className="flip-face flip-back imak-scroll"
                  style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderLeft: `4px solid ${accent}` }}
                >
                  <CardTag code={current.code} accent={accent} />
                  <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                    <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 17, lineHeight: 1.6, margin: 0, color: COLORS.text }}>
                      <span style={{ fontWeight: 700, color: accent }}>{current.term}: </span>
                      {current.def}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* NAVIGATION */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <button
                onClick={() => goTo(safeIndex - 1)}
                className="nav-btn"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10,
                  background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.text,
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600 }}
              >
                <ChevronLeft size={17} /> Forrige
              </button>

              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: COLORS.sub }}>
                Kort <span style={{ color: COLORS.text }}>{safeIndex + 1}</span> av {total}
              </span>

              <button
                onClick={() => goTo(safeIndex + 1)}
                className="nav-btn"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10,
                  background: COLORS.card, border: `1px solid ${COLORS.border}`, color: COLORS.text,
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, fontWeight: 600 }}
              >
                Neste <ChevronRight size={17} />
              </button>
            </div>
          </>
        ) : (
          <div style={{ padding: 40, textAlign: "center", color: COLORS.sub, fontFamily: "'Source Sans 3', sans-serif" }}>
            Ingen kort i dette filteret.
          </div>
        )}
      </div>
    </div>
  );
}

function CardTag({ code, accent }) {
  const info = SUB[code];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <span
        style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 9999,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600,
          color: accent, background: hexToRgba(accent, 0.13), border: `1px solid ${hexToRgba(accent, 0.4)}` }}
      >
        {code}
      </span>
      <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "#94A3B8" }}>
        Del {info.del} · {info.navn}
      </span>
    </div>
  );
}
