# Tour De Mohlenpris

**Beskrivelse:**  
Mohlenpris-borettslag arrangerer årlig et sosialt arrangement kalt _Tour De Mohlenpris_, som fremmer samhold og nettverksbygging ved å matche beboere med forskjellige verter for måltider. Hver vert tilbyr en 3-retters middag som inkluderer forrett, hovedrett og dessert. Deltakere (gjester) blir matchet med vertene på en måte som fremmer nye bekjentskaper. Dette prosjektet har som mål å effektivisere prosessen med å tildele gjester til verter ved hjelp av et nettsidegrensesnitt, som automatisk importerer, sorterer og eksporterer informasjon via CSV-filer.

---

### **Problemet:**

Borettslaget lager per i dag gjestelister og vertslister manuelt. Målet er å utvikle en nettside som gjør dette lettere ved å tillate import og eksport av CSV-filer, samt at det tungvinte arbeidet med å sortere deltakerne og tildele dem til ulike verter blir automatisert gjennom algoritmer.

---

### **Formål:**

1. **Importere CSV-filer** – Mulighet for å laste opp CSV-filer som inneholder informasjon om både gjester og verter.
2. **Eksportere CSV-filer** – Generere CSV-filer med de sorterte grupperingene som kan brukes videre.
3. **Oppdatere CSV-filer** – Oppdatere eksisterende CSV-filer basert på endringer som gjøres på nettsiden.
4. **Lagre CSV-filer i Supabase** – CSV-filene skal lagres sikkert i Supabase-databasen.
5. **Lagre verter og gjester i Supabase** – Vertene og gjestene lagres i databasen for videre bruk.
6. **Brukerpålogging via Supabase** – Brukerautentisering for å sikre at bare autoriserte personer kan endre informasjonen.
7. **Brukere** – Administratorer vil bli opprettet på forhånd, og disse kan håndtere all informasjon.
8. **Sortering og visning av måltidsgrupper** – Algoritmer skal håndtere tildeling av gjester til vertene og sikre at kravene for gruppesammensetning overholdes.

**Hovedprioritet:**

- Importere CSV
- Sortering av grupper
- Eksportere CSV

**Framtidsplan:**

- Implementering av innlogging og brukeradministrasjon.
- Forside med informasjon om eventet for gjester/hosts.

---

### **Sorteringsbetingelser (Constraints):**

1. **Vertenes sitteplasser** – En vert kan kun ha et bestemt antall sitteplasser. Det skal ikke tildeles flere gjester enn antall tilgjengelige plasser.
2. **Gjestenes allergier/vegetarisme** – Hver gjest kan ha allergier eller være vegetarianer, og vertene skal spesifisere hvilke måltider som er tilgjengelige for slike gjester.
3. **Møte nye personer** – Hver gjest skal møte en ny vert for hvert måltid, og vertene skal ikke ha gjester som har møtt dem tidligere i arrangementet.
4. **Co-gjest** – Gjester kan ha en medfølgende gjest (co-gjest), som betyr at én gjest teknisk sett teller som to personer.
5. **Begrensninger i gruppestørrelse** – Hvis antallet gjester overstiger antallet tilgjengelige plasser for alle verter, kan vertene bruke sine ekstra sitteplasser for å imøtekomme flere gjester.

---

### **Gjestetyper (Guest Types):**

- **Navn** – Gjestens fullstendige navn.
- **Allergier** – Eventuelle matallergier som gjesten måtte ha.
- _Vegetarianer_ - Er gjesten vegetarianer.
- **Co-gjest** – Gjestens medfølgende person, hvis de ønsker å delta sammen (en gjest teller som to personer).

### **Vertetyper (Host Types):**

- **Navn** – Vertens fullstendige navn.
- **Ingredienser** – Måltidets ingredienser (kan inkludere informasjon om matallergier og vegetarianske alternativer).
- **Sitteplasser** – Antall sitteplasser tilgjengelig for gjester.
- **Adresse** – Vertens adresse.
- **Telefonnummer** – Kontaktinformasjon for verten.
- **Ekstra sitteplasser** – Antall ekstra sitteplasser verten har tilgjengelig (hvis relevant).

---

### **Teknologier og Arkitektur:**

1. **Supabase** – Brukes til å lagre og administrere data om gjester, verter og CSV-filer.
2. **CSV-import og -eksport** – En enkel måte å laste opp og laste ned informasjon.
3. **Algoritme for sortering av grupper** – En automatisert algoritme for å sikre at gjestene blir riktig fordelt til vertene, i henhold til alle spesifiserte betingelser (allergier, co-gjester, nye møter osv.).
4. **Frontend** – Webgrensesnitt som muliggjør enkel opplasting og visning av CSV-filer samt tildeling av gjester til verter.

---

### **Plan for Implementering:**

1. **Utvikle nettsidegrensesnittet** – Lag et brukervennlig grensesnitt for å importere CSV-filer, vise grupper, og tildele gjester til verter.
2. **Implementere CSV-håndtering** – Lag funksjonalitet for å importere og eksportere CSV-filer.
3. **Bygge sorteringsalgoritme** – Utvikle algoritmen som håndterer sorteringen av gjester og verter basert på de definerte betingelsene.
4. **Integrere med Supabase** – Sett opp databaselagring for gjester og verter.
5. **Implementere login-funksjonalitet** – Sette opp innlogging for administratorer og brukere.
