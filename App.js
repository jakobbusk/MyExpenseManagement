// App.js
// Rodkomponenten: indlæser fonte, sætter navigationen op og pakker appen
// ind i BilagProvider, så alle skærme deler samme data.

import { useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  IBMPlexSerif_500Medium,
  IBMPlexSerif_600SemiBold,
} from '@expo-google-fonts/ibm-plex-serif';
import {
  IBMPlexSans_400Regular,
  IBMPlexSans_500Medium,
  IBMPlexSans_600SemiBold,
} from '@expo-google-fonts/ibm-plex-sans';

import { BilagProvider } from './context/BilagContext';
import TransaktionerScreen from './screens/TransaktionerScreen';
import TilfoejBilagScreen from './screens/TilfoejBilagScreen';
import DetaljeScreen from './screens/DetaljeScreen';
import { colors, fonts, type, tracking } from './styles/theme';

// Hold splash-skærmen fremme indtil fontene er klar, så teksten ikke
// "hopper" fra systemfont til IBM Plex foran brugeren.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    IBMPlexSerif_500Medium,
    IBMPlexSerif_600SemiBold,
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
  });

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayout();
  }, [onLayout]);

  if (!fontsLoaded) return null;

  return (
    <BilagProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Transaktioner"
          screenOptions={{
            // Fladt, lyst header uden skygge - adskillelse sker med hairline.
            headerStyle: { backgroundColor: colors.page },
            headerShadowVisible: false,
            headerTintColor: colors.ink,
            headerTitleStyle: {
              fontFamily: fonts.display,
              fontSize: type.heading,
              letterSpacing: tracking.heading,
              color: colors.ink,
            },
            contentStyle: { backgroundColor: colors.page },
          }}
        >
          <Stack.Screen
            name="Transaktioner"
            component={TransaktionerScreen}
            options={{ title: 'Bilag' }}
          />
          <Stack.Screen
            name="TilfoejBilag"
            component={TilfoejBilagScreen}
            options={{ title: 'Vedhæft bilag' }}
          />
          <Stack.Screen
            name="Detalje"
            component={DetaljeScreen}
            options={{ title: 'Postering' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </BilagProvider>
  );
}
