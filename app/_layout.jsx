import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { StatusBar, useColorScheme } from 'react-native';
import { PaperProvider, ActivityIndicator } from 'react-native-paper';

import { store, persistor } from '../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { FontConfig, CombinedDefaultTheme, CombinedDarkTheme } from '../configs';
import { FONT } from '../constants';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(FontConfig);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<ActivityIndicator animating={true} color={theme.colors.error} size='large' />}>
          <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} backgroundColor={theme.colors.onPrimary} />
          <Stack screenOptions={{
            contentStyle: { backgroundColor: theme.colors.inverseOnSurface },
            headerStyle: { backgroundColor: theme.colors.onPrimary},
            headerTintColor: theme.colors.onBackgroundVariant,
            headerTitleStyle: { color: theme.colors.onBackground, fontFamily: FONT.OrbitronB },
            animation: "fade_from_bottom",
          }}>
            <Stack.Screen name="index" options={{title: "ResumeIO", headerShown: false, contentStyle: {backgroundColor: theme.colors.background}}} />
            <Stack.Screen 
              name="(tabs)" 
              options={({ route }) => {
                const routeName = route.params?.screen;
                let title = routeName[0].toUpperCase() + routeName.slice(1);
                return { title };
              }}
            />
            <Stack.Screen 
              name="personal"
              options={{title: "Personal"}}
            />
          </Stack>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}