// screens/TransaktionerScreen.js
// Skærm 1: posteringer fra firmakortet.
// Opfylder kravet om en liste (FlatList) og en knap med funktion
// (knappen navigerer til den første postering der mangler bilag).

import { View, Text, FlatList, Pressable } from 'react-native';

import { useBilag } from '../context/BilagContext';
import styles from '../styles/styles';

export default function TransaktionerScreen({ navigation }) {
  const { transaktioner, antalMangler, modtager } = useBilag();

  const manglende = transaktioner.filter((t) => t.status === 'Mangler bilag');

  // Knappen springer direkte til næste postering uden bilag -
  // færrest mulige tryk fra "jeg har kvitteringen i hånden" til kameraet.
  function naesteUdenBilag() {
    if (manglende.length > 0) {
      navigation.navigate('TilfoejBilag', { id: manglende[0].id });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>Firmakort •••• 4417</Text>
      <Text style={styles.display}>{antalMangler} mangler bilag</Text>
      <Text style={styles.hjaelpetekst}>
        Posteringer hentet fra kortet. Vedhæft kvitteringen, så sendes bilaget
        automatisk til {modtager}.
      </Text>

      {manglende.length > 0 && (
        <Pressable
          style={({ pressed }) => [
            styles.knapPrimaer,
            pressed && styles.knapPrimaerPressed,
          ]}
          onPress={naesteUdenBilag}
        >
          <Text style={styles.knapPrimaerTekst}>Scan næste kvittering</Text>
        </Pressable>
      )}

      <FlatList
        data={transaktioner}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.tomListe}>Ingen posteringer på kortet.</Text>
        }
        renderItem={({ item }) => {
          const erKlar = item.status === 'Klar til bogføring';

          return (
            <Pressable
              style={({ pressed }) => [styles.kort, pressed && styles.kortPressed]}
              // Data sendes med som params - svarer til useParams() i React Router.
              onPress={() => navigation.navigate('Detalje', { id: item.id })}
            >
              <View style={styles.kortRaekke}>
                <Text style={styles.kortTitel}>{item.forretning}</Text>
                <Text style={styles.kortBeloeb}>{item.beloeb} kr.</Text>
              </View>

              <Text style={styles.kortMeta}>
                {item.dato} · {item.kategori ?? 'Ikke kategoriseret'}
              </Text>

              {/* Betinget styling med array-syntaks - RN's conditional classes */}
              <View style={[styles.badge, erKlar ? styles.badgeKlar : styles.badgeMangler]}>
                <Text
                  style={[
                    styles.badgeTekst,
                    erKlar ? styles.badgeTekstKlar : styles.badgeTekstMangler,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
