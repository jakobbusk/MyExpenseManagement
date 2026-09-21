// screens/DetaljeScreen.js
// Skærm 3: detaljer for én postering, med bilaget hvis det er vedhæftet.

import { View, Text, Pressable, ScrollView, Image } from 'react-native';

import { useBilag } from '../context/BilagContext';
import styles from '../styles/styles';

export default function DetaljeScreen({ route, navigation }) {
  // route.params svarer til useParams() i React Router.
  const { id } = route.params;
  const { findTransaktion } = useBilag();

  const post = findTransaktion(id);

  // Kan ske hvis posteringen er væk - bedre end at appen crasher.
  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.tomListe}>Posteringen blev ikke fundet.</Text>
      </View>
    );
  }

  const erKlar = post.status === 'Klar til bogføring';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.kicker}>{post.kort}</Text>
      <Text style={styles.detaljeBeloeb}>{post.beloeb} kr.</Text>
      <Text style={styles.body}>{post.forretning}</Text>

      {post.bilagUri ? (
        <Image source={{ uri: post.bilagUri }} style={styles.bilagBillede} />
      ) : (
        <View style={styles.bilagPlaceholder}>
          <Text style={styles.body}>Intet bilag vedhæftet</Text>
        </View>
      )}

      <View style={styles.detaljeRaekke}>
        <Text style={styles.detaljeNoegle}>Dato</Text>
        <Text style={styles.detaljeVaerdi}>{post.dato}</Text>
      </View>

      <View style={styles.detaljeRaekke}>
        <Text style={styles.detaljeNoegle}>Kategori</Text>
        <Text style={styles.detaljeVaerdi}>{post.kategori ?? '—'}</Text>
      </View>

      <View style={styles.detaljeRaekke}>
        <Text style={styles.detaljeNoegle}>Heraf moms</Text>
        <Text style={styles.detaljeVaerdi}>
          {post.moms != null ? `${post.moms} kr.` : '—'}
        </Text>
      </View>

      <View style={styles.detaljeRaekke}>
        <Text style={styles.detaljeNoegle}>Status</Text>
        <View
          style={[
            styles.badge,
            { marginTop: 0 },
            erKlar ? styles.badgeKlar : styles.badgeMangler,
          ]}
        >
          <Text
            style={[
              styles.badgeTekst,
              erKlar ? styles.badgeTekstKlar : styles.badgeTekstMangler,
            ]}
          >
            {post.status}
          </Text>
        </View>
      </View>

      {!erKlar && (
        <View style={{ marginTop: 24 }}>
          <Pressable
            style={({ pressed }) => [
              styles.knapPrimaer,
              pressed && styles.knapPrimaerPressed,
            ]}
            onPress={() => navigation.navigate('TilfoejBilag', { id: post.id })}
          >
            <Text style={styles.knapPrimaerTekst}>Tilføj bilag</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
