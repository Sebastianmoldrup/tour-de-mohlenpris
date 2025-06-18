# Designdokument for Tour de Møhlenpris

## Innholdsfortegnelse

[1. Oppdrag beskrivelse](#1-oppdrag-beskrivelse)
[2. Plan for å nå målet](#2-plan-for-å-nå-målet)
[3. Kravspesifikasjon](#3-kravspesifikasjon)
[4. Løsningsforslag](#4-løsningsforslag)
[5. HMS](#5-hms)
[6. Arbeidsoppgaver & Tidsestimat](#6-arbeidsoppgaver--tidsestimat)
[7. Løsnings skisser](#7-løsnings-skisser)
[8. Informasjonskilder](#8-informasjonskilder)

---

## 1. Oppdrag beskrivelse

### 1.1 Formål

Formålet med prosjektet er å utvikle en digital løsning som forenkler planleggingen og gjennomføringen av arrangementet _Tour de Møhlenpris_. Løsningen skal erstatte manuelle prosesser og bidra til en mer effektiv arbeidsflyt for arrangørene, spesielt når det gjelder fordeling av deltakere og håndtering av verter og menyer.

### 1.2 Informasjon

_Tour de Møhlenpris_ er et sosialt arrangement der deltakerne besøker ulike middagsverter i løpet av kvelden. I dag benyttes registreringssystemet Letsreg for påmelding, men videre håndtering skjer manuelt i regneark. Dette inkluderer manuell registrering av verter og menyer, samt tidkrevende fordeling av deltakere. Fordelingen må ta hensyn til ulike regler og ønsker, som plassbegrensninger, gruppetilhørighet og variasjon i hvem deltakerne møter. Prosessen er lite effektiv og sårbar for feil, noe som skaper behov for en bedre digital løsning.

### 1.3 Målgruppe

Målgruppen for løsningen er primært arrangørene av _Tour de Møhlenpris_, som skal bruke systemet til å planlegge og administrere arrangementet. I tillegg er det viktig at løsningen støtter deltakerne indirekte, gjennom å sikre god fordeling, oversikt og flyt i arrangementet.

### 1.4 Forutsetninger

- Påmelding skjer via Letsreg og arrangør bruker Google sheets for å lagre (verter og deltagere) som data jeg kan bruke via Google sheets API.
- Deltaker data kommer med en "medgjest" verdi som viser hvem de går sammen med.
- Verter har 3 retter (forrett, middag og dessert).
- Arkene som skal bli printet ut er A4 ark som skal fungere som en invitasjon med informasjon
- Jeg jobber freelance

### 1.5 Omfang

Prosjektet skal omfatte utvikling av en brukervennlig, responsiv webapplikasjon som kan:

1. La arrangører logge inn på siden.
2. Importere data (verter og deltagere) via Google sheets API.
3. Det skal automatisk fordele deltakerne slik at hver person får spise forrett, middag og dessert hos tre forskjellige verter.
4. Sørge for at deltakere med medgjester holdes samlet.
5. Minimere antall gjentatte møter mellom deltakere over de forskjellige rettene.
6. La arrangør redigere den sortere listen av deltakere.
7. La arrangør kunne skrive ut et A4 ark

Applikasjonen skal være tilgjengelig på både PC, nettbrett og mobil.

---

## 2. Plan for å nå målet

1. Planlegge og velge teknologi løsning
2. Lage UI skisser av de forskjellige løsningene
3. Utvikle selve løsningen steg for steg via Kanban
4. Testing

- **Unit test:** Fordelings funksjon
- **E2E test:** Brukerautentisering
- **Component test:** Enkel komponent
- **Integration test:** Nested komponent

5. Teknisk dokumentasjon
6. Tilrettegjøre for mulig **tvist**

---

## 3. Kravspesifikasjon

### 3.1 Funksjonelle krav

- **Brukerautentisering:** admin skal kunne logge inn på siden for å se/behandle/printe data, slik andre ikke har tilgang til dette.
- **Importering av data:** Google sheets API blir brukt for å hente/lese data fra google sheets.
- **Det skal automatisk fordeles deltakere over 3 retter med kriterier:**
  - Hver rett skal være hos en unik vert
  - Det skal være mest mulig sosialt med minst mulig gjentatte møter mellom deltakere over måltidene (men det vil skje at noen møtes).
- **Manuell redigering:** admin skal kunne redigere på sortering, i tilfelle noe er feil eller det er problemer med allergi, osv.
- **Utskrift:** admin skal kunne se og printe A4 ark som invitasjoner. De skal inneholde deltaker navn, medgjest og 3 retter (med verten sitt navn).

### 3.2 Ikke-funksjonelle krav

- **Brukervennlig:**
  - Universell utforming (WCAG - web content accessibility guidelines).
  - HTML semantics.
- **Responsiv design:** Tilgjenglig og funksjonelt på PC, nettbrett og mobil.
- **Sikkerhet:** Det skal være sikkert for angrep ved bruk av input validering og sanitering.

---

## 4. Løsningsforlsag

### Alternativ 1. WordPress

**Beskrivelse:**
Ved bruk av Wordpress som plattform kan det implementeres et tema eller plugin for å løse fordelings logikken, så er det innebygd admin innlogging og andre tilgjengelige løsninger.

**Fordeler:**

- Admin brukerautentisering + UI er inkludert.
- Lett for admin å kunne oprette/endre sider/posts.
- Stort økosystem som gjør det lett å kunne finne løsninger/hjelp.

**Ulemper:**

- Skyløsning for hosting kan koste en del og er vanskelig å sette opp.
- Det er ikke veldig god ytelse med avanserte funksjoner, og det kan kreves omveier for å implementere fordelingslogikken.
- Krever vedlikehold/oppdatering for å holde det trygt for angrep.

---

### Alternativ 2. NextJS

**Beskrivelse:**
NextJS er et veldig moderne frontend rammeverk som gir mulighet for innebygd integrasjoner, og mulighet for enkle implementeringer av databaser/auth verktøy for brukerautentiseringer.

**Fordeler:**

- Moderne og raskt.
- Full kontroll, med mindre problemer for å gjøre endringer og videreutvikle på (så lenge det blir utviklet riktig uten teknisk gjeld).
- Stort økosystem som også gjør dette til en ideel løsning, samt at Vercel for hosting funker sømløst med Next og tilbyr "Atomic Deploy" som hindrer at en error blir deployed. Slik at den vil alltid bruke den siste fungerende versjonen.
- Kan brukes shadcn/ui for å få ferdiglagde komponenter som er bygd på Radix UI. Radix UI følger WAI-ARIA som gir et godt grunnlag for universell utforming, HTML semantics og WCAG.

**Ulemper:**

- Må bygges fra bunnen av og kan ta litt lengre tid.
- Brukerautentisering må implementeres fra tredjepart, og UI må lages.

---

### Valg av løsning

Begge valgene tilbyr open-source kode med et stort økosystem som er veldig bra for å kunne løse framtidige problemer. Mens WordPress tilbyr mange ferdig tjenester føler jeg dette kan være et tosidig sverd hvor du får noe raskt, men samtidig kan det også komme tilbake og bite deg hvis det eventuelt blir deprecated eller noen hacker det og kan få tilgang til systemet.

Derfor velger jeg **NextJS** som tilbyr

- Full kontroll.
- Integrasjon med shadcn/ui som tilbyr et solid fundament for universell utforming og HTML semantics.
- God ytelse.
- Sømløs deployment med Vercel som har atomic deploy.

**Skisser av løsning:**
Finnes lengre nede ved punkt [[#7. Løsnings skisser]]

#### Tech stack

**Frontend:** Next.js
**Backend & Auth:** Supabase
**API:** Google sheets API
**Hosting:** Vercel
**Dependencies:** TailwindCSS & shadcn/ui

#### Bærekraftige fordeler

- **Lettvekts frontend:** Next.js bruker Static Site Generation (SSG) som reduserer serverbelastning og energiforbruk.
- **Effektiv styling:** TailwindCSS og shadcn/ui minimerer kodevolum og dataoverføring.
- **Grønn hosting:** Vercel driftes på karbonnøytrale datasentre med fornybar energi.
- **Serverløs backend:** Supabase skalerer ressursbruk etter behov, noe som sparer energi.
- **Enkel datatilgang:** Google Sheets API reduserer behov for egne servere og kompleksitet.

---

## 5. HMS

Jeg har ingen filosofi eller bestemt regel, men velger heller å følge en sammensmeltet regelbok som kommer fra arbeidsmiljøloven og arbeidstilsynet.

### 5.1 Ergonomi

- Bruk av justerbar stol og bord for å sikre god sittestilling.
- Skjermplassering i øyehøyde for å unngå nakkebelastning.
- Tastatur og mus plassert slik at håndledd holdes i nøytral stilling.
- Riktig belysning for å redusere øyeutmattelse.

### 5.2 Pauser og hvile

- Regelmessige pauser (f.eks. 5-10 minutter hver time) for å redusere belastning på øyne og muskler.
- Anbefalt 20-20-20-regel: Hver 20. minutt, se på noe 20 fot (6 meter) unna i 20 sekunder for å hvile øynene.

### 5.3 Arbeidsmiljø

- Støyreduserende tiltak for å sikre konsentrasjon.
- God luftkvalitet og temperatur for økt trivsel og konsentrasjon.
- Organisert og ryddig arbeidsplass for å unngå ulykker.

### 5.4 Psykososialt arbeidsmiljø

- God kommunikasjon og samarbeid i team.
- Realistiske tidsfrister for å unngå stress og utbrenthet.
- Mulighet for faglig utvikling og veiledning.

### 5.5 Digital sikkerhet og personvern

- Sikring av data for å forhindre informasjonssikkerhetsbrudd.
- Bevissthet rundt passordhåndtering og bruk av sikre verktøy.

---

## 6. Arbeidsoppgaver & Tidsestimat

### 6.1 Arbeidsoppgaver

| Nr  |  Arbeidsoppgave          |  Beskrivelse                                                                                                                 |  Timer |
| --- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------ |
| 1   | Opprette utviklingsmiljø | Starte selve NextJS prosjektet og legge til relevante dependencies, env variables                                            | 2      |
| 2   | Brukerautentisering      | Lage supabase bruker, integrere API og lage login UI med funksonalitet                                                       | 4      |
| 3   | Googlesheets API         | Lage google bruker, integrere API, lage funksjonalitet for å hente data, formatering av data                                 | 4      |
| 4   | Fordelings funksjon      | Lage en funksjon som tar i mot verter og deltaker data og sorterer de                                                        | 12     |
| 5   | Admin dashboard          | UI med oversikt over fordelt deltakere, manuelle redigerings muligheter for sortering                                        | 8      |
| 6   | Utskrift                 | Knapp på admin dashboard, for å lage en print page med alle deltakere sin informasjon formatert til et A4 ark som invitasjon | 4      |
| 7   | Testing                  | Unit testing, E2E testing, integration testing og komponent testing                                                          | 6      |
|     |                          | Totalt                                                                                                                       | 40     |

---

## 6.2 Prisestimat

### Bakgrunn

Ifølge E24 ligger gjennomsnittlig årslønn for en utvikler i Vestland på ca. **817 096 kr**, med et spenn fra **310 000 kr** til **2 500 000 kr** (basert på en medianerfaring på 5 år).

Som freelance **juniorutvikler** legger jeg til grunn en årlig inntekt på **600 000 kr**, noe som tilsvarer en timepris på ca. **332 kr** (basert på vanlig norsk arbeidstid).

---

### Estimert arbeid og kostnad

| **Fase**                    | **Arbeid**                                                                                                      | **Estimert tid** | **Timepris** | **Pris**      |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------- | ------------ | ------------- |
| Planlegging                 | Utarbeidelse av designdokument                                                                                  | 10 timer         | 332 kr       | 3 320 kr      |
| Utvikling                   | Implementering av IT-løsning  <br>_(inkl. oppsett av Supabase, Google Sheets-integrasjon og deploy til Vercel)_ | 40 timer         | 332 kr       | 13 280 kr     |
| Testing og kvalitetssikring | Funksjonell testing og gjennomgang                                                                              | 6 timer          | 332 kr       | 1 992 kr      |
|                             |                                                                                                                 |                  | **Totalt**   | **18 592 kr** |

---

### Løpende kostnader (etter lansering)

I tillegg til utviklingskostnaden vil det påløpe en **månedlig driftskostnad på 1 500 kr**, som dekker:

- Hosting (via Vercel)
- Supabase-abonnement og datalagring
- Vedlikehold, mindre justeringer og teknisk support

---

### Oppsummering

|**Type**|**Pris**|
|---|---|
|Engangsutvikling|18 592 kr|
|Månedlig drift/support|1 500 kr/mnd|

---

## 7. Løsnings skisser

### 7.1 Brukerautentisering

Bruker skal kunne gå til en login side for å logge inn med email + passord som har input validation + sanitation, hashing og kryptering skjer via supabase sin løsning så vi styrer autentisering via session key vi får tilsendt.

![[Pasted image 20250617203240.png]]

### 7.2 Admin dashboard

Dashboard skal hente og sortere data fra Google sheets og vise en oversikt for de sorterte deltakerne med mulighet for manuell redigering via en knapp som har drop down for hver rett med de tilgjengelige vertene (de som har plass) og en knapp for å kunne printe/vise utskrift

![[Pasted image 20250617203913.png]]

### 7.3 Utskrift

Utskrift siden skal vise et A4 ark for alle deltakerene slik det blir en invitasjons papir som inneholder navn, medgjester og alle rettene (med verter)

![[Pasted image 20250617204150.png]]

---

## 8. Informasjonskilder

### Løsningsforslag - Alternativer

- Google sheets API - <https://developers.google.com/workspace/sheets/api/guides/concepts>
- WordPress docs - <https://wordpress.org/documentation/>
- Next.JS docs - <https://nextjs.org/docs>
- Vercel docs - <https://vercel.com/docs>

### Løsningsforslag - Bærekraft

- Vercel renewable energy - <https://vercel.com/guides/what-is-vercel-green-energy-policy>
- Radix UI accessibility - <https://www.radix-ui.com/primitives/docs/overview/accessibility>

### HMS

- Arbeidsmiljøloven: <https://lovdata.no/dokument/NL/lov/2005-06-17-62>
- Arbeidstilsynet om ergonomi: <https://www.arbeidstilsynet.no/tema/ergonomi/>
- Arbeidstilsynet om skjermarbeid og pauser: <https://www.arbeidstilsynet.no/tema/skjermarbeid/>

### Prisestimat

- E24 utvikler lønn - <https://www.kode24.no/artikkel/utvikleres-lonn-2024-her-i-norge-tjener-du-minst-og-mest/81345181>

### Generell informasjon/hjelpe kilde

- ChatGPT for generell hjelp av formatering, og hjelp - <https://chatgpt.com/>
