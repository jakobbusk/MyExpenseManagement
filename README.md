# Bilagsmatch

Prototype til godkendelsesopgave 1, Innovation og ny teknologi (INNT), CBS E2026.
Udviklet af Jakob Sabroe Busk.

## Hvad appen gør

I små virksomheder bliver indkøb betalt med firmakortet, men kvitteringen ender i en
lomme eller en mailtråd. Bogholderiet sidder tilbage med en kortpostering uden bilag —
og fra 1. januar 2026 er digital bogføring et lovkrav også for personligt ejede
virksomheder over 300.000 kr. i omsætning.

Appen viser posteringerne fra firmakortet, lader brugeren fotografere kvitteringen på
stedet, og bruger en vision-model til at foreslå kategori og momsbeløb. Brugeren
godkender eller retter — modellen foreslår, mennesket beslutter.

Tre skærme:

- **Bilag** — posteringer fra kortet, med markering af hvilke der mangler bilag
- **Vedhæft bilag** — kamera, automatisk udfyldning af felter, godkendelse
- **Postering** — den enkelte postering med bilag, kategori og moms

## Demovideo

[Indsæt link her — YouTube (ikke-listet) eller en fil i repoet]

## Sådan køres projektet

```bash
npm install
npx expo start
```

Scan QR-koden med Expo Go, eller tryk `i` / `a` for simulator. Kameraet virker kun på
en fysisk enhed.

AI-scanningen kører uden opsætning: uden API-nøgle returnerer `services/aiScan.js` et
simuleret svar, så flowet kan demonstreres. Vil du bruge den rigtige model, indsættes
nøglen i toppen af den fil.

## Teknisk

- **Expo / React Native**, oprettet med `create-expo-app --template blank`
- **React Navigation** (native stack) mellem de tre skærme
- **React Context** til delt state
- **expo-image-picker** til kameraet
- **StyleSheet** i `styles/styles.js`, med design-tokens i `styles/theme.js`
- **IBM Plex Serif / Sans** via `@expo-google-fonts`

```
App.js                      navigation og provider
context/BilagContext.js     delt state: posteringer og bilag
services/aiScan.js          kald til vision-model, med simuleret fallback
screens/                    de tre skærme
styles/theme.js             design-tokens (farver, fonte, radius)
styles/styles.js            al styling
```

## Afgrænsning og kendte svagheder

Korttransaktionerne er hårdkodet. I en rigtig version kommer de fra bankens eller
kortudstederens feed, hvilket kræver aftaler og adgang, der ligger uden for denne
prototype.

Data gemmes kun i hukommelsen og forsvinder ved genstart. Det er et bevidst valg:
formålet med denne version er at teste flowet på rigtige brugere.

API-nøglen til vision-modellen ville ligge i klienten, hvis den blev sat ind. Det er
acceptabelt i en prototype og uacceptabelt i produktion — dér skal kaldet gå gennem
egen backend. Samtidig sendes bilaget til en ekstern leverandør; en senere version kan
fjerne den afhængighed ved at lade modellen køre på enheden selv.
