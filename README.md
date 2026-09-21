# Bilagsmatch

Prototype til godkendelsesopgave 1, Innovation og ny teknologi.

Tre skærme:

- **Bilag** — posteringer fra kortet, med markering af hvilke der mangler bilag
- **Vedhæft bilag** — kamera, automatisk udfyldning af felter, godkendelse
- **Postering** — den enkelte postering med bilag, kategori og moms

## Demovideo

[Demovideo](https://www.icloud.com/photos/#/icloudlinks/084iAnqBCAnj9qxLkO6sq42Xw/) 
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
