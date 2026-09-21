// styles/theme.js
// Webits' design-system som tokens. Ingen komponent må hardkode en farve -
// alt hentes herfra.
//
// (Filen hedder .js og ikke .ts, fordi projektet kører JavaScript jf. kursets
// blank-template. Indholdet er identisk med theme.ts fra web-frontenden.)

export const colors = {
  mint: '#64BA98', // primær accent - sparsomt: ikoner, dots, aktiv tilstand
  mintDark: '#4a9c7e', // accent-tekst på lys baggrund, links
  mintSoft: '#eaf6f1', // baggrund på ikon-tiles / badges
  ink: '#0B1420', // primær tekst, primær knap
  jet: '#112635', // knap pressed-state
  page: '#FAFAF7', // hovedbaggrund (varm off-white)
  pageAlt: '#F3F3EF', // sekundær sektionsbaggrund
  line: '#E6E5DF', // hairline-borders og dividers
  muted: '#6b7280', // body/sekundær tekst
  muted2: '#9aa0a6', // labels, tertiær tekst
  white: '#FFFFFF', // kort
};

export const fonts = {
  // Font-familienavne som @expo-google-fonts eksponerer dem.
  // Afvigelse fra web-designguiden: IBM Plex erstatter Lora/Inter, men
  // serif/sans-kontrasten mellem overskrift og body er bevaret.
  display: 'IBMPlexSerif_500Medium', // overskrifter
  displayBold: 'IBMPlexSerif_600SemiBold', // logo
  body: 'IBMPlexSans_400Regular',
  bodyMedium: 'IBMPlexSans_500Medium',
  bodySemi: 'IBMPlexSans_600SemiBold',
};

export const radius = { card: 16, pill: 999 };

// FORESLÅET - stod ikke i designguiden. Sig til hvis I har andre værdier
// i web-frontenden, så retter jeg dem ét sted.
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };

export const type = {
  display: 28, // sidetitel
  heading: 20, // sektionsoverskrift
  body: 15,
  small: 13,
  kicker: 11,
};

// RN's letterSpacing regnes i punkter, ikke i em. Værdierne herunder svarer
// til -0.018em og 0.18em ved de skriftstørrelser de bruges på.
export const tracking = {
  display: -0.5, // -0.018em ved 28 pt
  heading: -0.36, // -0.018em ved 20 pt
  kicker: 2, // 0.18em ved 11 pt
};
