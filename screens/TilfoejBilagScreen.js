// screens/TilfoejBilagScreen.js
// Skærm 2: tag billedet af kvitteringen, lad AI'en læse det, og gem.
// "Gem bilag" er den anden knap med funktion: den gemmer og navigerer tilbage.

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useBilag } from '../context/BilagContext';
import { scanBilag } from '../services/aiScan';
import styles from '../styles/styles';
import { colors } from '../styles/theme';

export default function TilfoejBilagScreen({ route, navigation }) {
  const { id } = route.params;
  const { findTransaktion, vedhaeftBilag } = useBilag();
  const transaktion = findTransaktion(id);

  const [bilagUri, setBilagUri] = useState(null);
  const [scanner, setScanner] = useState(false);
  const [kategori, setKategori] = useState('');
  const [moms, setMoms] = useState('');
  const [aiBrugt, setAiBrugt] = useState(false);

  async function tagBillede() {
    // Kameraet kræver brugerens tilladelse første gang.
    const tilladelse = await ImagePicker.requestCameraPermissionsAsync();
    if (!tilladelse.granted) {
      Alert.alert('Adgang nægtet', 'Appen har brug for adgang til kameraet.');
      return;
    }

    const resultat = await ImagePicker.launchCameraAsync({
      quality: 0.5,
      base64: true, // base64 sendes videre til AI-kaldet
    });
    if (resultat.canceled) return;

    const billede = resultat.assets[0];
    setBilagUri(billede.uri);
    laesBilag(billede.base64);
  }

  // AI'en foreslår - brugeren godkender. Felterne kan altid rettes i hånden.
  async function laesBilag(base64) {
    setScanner(true);
    try {
      const felter = await scanBilag(base64);
      if (felter.kategori) setKategori(felter.kategori);
      if (felter.moms != null) setMoms(String(felter.moms));
      setAiBrugt(true);
    } catch (fejl) {
      Alert.alert('Kunne ikke læse bilaget', 'Udfyld felterne manuelt.');
    } finally {
      setScanner(false);
    }
  }

  function gem() {
    if (!bilagUri) {
      Alert.alert('Mangler bilag', 'Tag et billede af kvitteringen først.');
      return;
    }

    vedhaeftBilag(id, {
      bilagUri,
      kategori: kategori.trim() || 'Ikke kategoriseret',
      moms: Number(moms.replace(',', '.')) || null,
    });

    navigation.goBack();
  }

  if (!transaktion) {
    return (
      <View style={styles.container}>
        <Text style={styles.tomListe}>Posteringen blev ikke fundet.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.kicker}>{transaktion.dato}</Text>
      <Text style={styles.overskrift}>{transaktion.forretning}</Text>
      <Text style={styles.hjaelpetekst}>
        {transaktion.beloeb} kr. betalt med {transaktion.kort}
      </Text>

      {bilagUri ? (
        <Image source={{ uri: bilagUri }} style={styles.bilagBillede} />
      ) : (
        <View style={styles.bilagPlaceholder}>
          <Text style={styles.body}>Intet bilag endnu</Text>
        </View>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.knapSekundaer,
          pressed && styles.knapSekundaerPressed,
        ]}
        onPress={tagBillede}
      >
        <Text style={styles.knapSekundaerTekst}>
          {bilagUri ? 'Tag nyt billede' : 'Tag billede af kvittering'}
        </Text>
      </Pressable>

      {/* Mens modellen læser bilaget */}
      {scanner && (
        <View style={styles.scannerRaekke}>
          <ActivityIndicator color={colors.mintDark} />
          <Text style={styles.scannerTekst}>Læser bilaget ...</Text>
        </View>
      )}

      {aiBrugt && !scanner && (
        <Text style={styles.aiNote}>
          Felterne er foreslået automatisk — ret dem hvis de er forkerte.
        </Text>
      )}

      <Text style={styles.label}>Kategori</Text>
      <TextInput
        style={styles.input}
        value={kategori}
        onChangeText={setKategori}
        placeholder="Transport, kontor, repræsentation ..."
        placeholderTextColor={colors.muted2}
      />

      <Text style={styles.label}>Moms (kr.)</Text>
      <TextInput
        style={styles.input}
        value={moms}
        onChangeText={setMoms}
        keyboardType="decimal-pad"
        placeholder="0,00"
        placeholderTextColor={colors.muted2}
      />

      <View style={{ height: 24 }} />

      <Pressable
        style={({ pressed }) => [styles.knapPrimaer, pressed && styles.knapPrimaerPressed]}
        onPress={gem}
      >
        <Text style={styles.knapPrimaerTekst}>Gem bilag</Text>
      </Pressable>
    </ScrollView>
  );
}
