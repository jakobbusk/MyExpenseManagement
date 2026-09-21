// styles/styles.js
// Al styling samlet her, adskilt fra skærmene (jf. øvelse 04_Styling).
// Alle værdier kommer fra theme.js - ingen hardkodede farver.

import { StyleSheet } from 'react-native';
import { colors, fonts, radius, spacing, type, tracking } from './theme';

export default StyleSheet.create({
  // ---------- Layout ----------
  container: {
    flex: 1,
    backgroundColor: colors.page,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },

  // ---------- Typografi ----------
  kicker: {
    fontFamily: fonts.bodySemi,
    fontSize: type.kicker,
    letterSpacing: tracking.kicker,
    textTransform: 'uppercase',
    color: colors.mintDark,
    marginBottom: spacing.sm,
  },
  display: {
    fontFamily: fonts.display,
    fontSize: type.display,
    letterSpacing: tracking.display,
    color: colors.ink,
  },
  overskrift: {
    fontFamily: fonts.display,
    fontSize: type.heading,
    letterSpacing: tracking.heading,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: type.body,
    color: colors.muted,
  },
  hjaelpetekst: {
    fontFamily: fonts.body,
    fontSize: type.small,
    color: colors.muted,
    marginBottom: spacing.lg,
  },

  // ---------- Knapper ----------
  knapPrimaer: {
    backgroundColor: colors.ink,
    paddingVertical: 15,
    borderRadius: radius.pill,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  knapPrimaerPressed: {
    backgroundColor: colors.jet,
  },
  knapPrimaerTekst: {
    fontFamily: fonts.bodySemi,
    fontSize: type.body,
    color: colors.white,
  },
  knapSekundaer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.line,
    paddingVertical: 15,
    borderRadius: radius.pill,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  knapSekundaerPressed: {
    borderColor: colors.ink,
  },
  knapSekundaerTekst: {
    fontFamily: fonts.bodyMedium,
    fontSize: type.body,
    color: colors.ink,
  },

  // ---------- Kort i listen ----------
  kort: {
    backgroundColor: colors.white,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  kortPressed: {
    borderColor: colors.ink,
  },
  kortRaekke: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  kortTitel: {
    fontFamily: fonts.bodyMedium,
    fontSize: type.body,
    color: colors.ink,
    flexShrink: 1,
    paddingRight: spacing.md,
  },
  kortBeloeb: {
    fontFamily: fonts.bodySemi,
    fontSize: type.body,
    color: colors.ink,
  },
  kortMeta: {
    fontFamily: fonts.body,
    fontSize: type.small,
    color: colors.muted2,
    marginTop: spacing.xs,
  },

  // ---------- Statusbadge ----------
  // Mint bruges som punktuering: kun som badge-tekst og mintSoft-flade,
  // aldrig som stor farveflade.
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginTop: spacing.md,
  },
  badgeMangler: {
    backgroundColor: colors.pageAlt,
  },
  badgeKlar: {
    backgroundColor: colors.mintSoft,
  },
  badgeTekst: {
    fontFamily: fonts.bodySemi,
    fontSize: type.kicker,
    letterSpacing: tracking.kicker,
    textTransform: 'uppercase',
  },
  badgeTekstMangler: {
    color: colors.muted,
  },
  badgeTekstKlar: {
    color: colors.mintDark,
  },

  // ---------- AI-scanning ----------
  scannerRaekke: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  scannerTekst: {
    fontFamily: fonts.body,
    fontSize: type.small,
    color: colors.mintDark,
  },
  aiNote: {
    fontFamily: fonts.body,
    fontSize: type.small,
    color: colors.muted,
    backgroundColor: colors.mintSoft,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },

  // ---------- Formular ----------
  label: {
    fontFamily: fonts.bodyMedium,
    fontSize: type.small,
    color: colors.ink,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.card,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: type.body,
    color: colors.ink,
    marginBottom: spacing.sm,
  },

  // ---------- Detaljevisning ----------
  detaljeBeloeb: {
    fontFamily: fonts.display,
    fontSize: 40,
    letterSpacing: -0.72,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  detaljeRaekke: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  detaljeNoegle: {
    fontFamily: fonts.body,
    fontSize: type.body,
    color: colors.muted,
  },
  detaljeVaerdi: {
    fontFamily: fonts.bodyMedium,
    fontSize: type.body,
    color: colors.ink,
  },

  // ---------- Bilag ----------
  bilagPlaceholder: {
    height: 160,
    borderRadius: radius.card,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.line,
    backgroundColor: colors.pageAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  bilagBillede: {
    width: '100%',
    height: 220,
    borderRadius: radius.card,
    marginVertical: spacing.lg,
  },

  tomListe: {
    fontFamily: fonts.body,
    fontSize: type.body,
    color: colors.muted2,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
