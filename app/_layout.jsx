import { useFonts } from 'expo-font';
import { Stack, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme, Platform } from 'react-native';
import { PaperProvider, adaptNavigationTheme, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

import store from '../redux/store';
import { Provider } from 'react-redux';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

export const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Regular: require('../assets/fonts/DMSans-Regular.ttf'),
    Medium: require('../assets/fonts/DMSans-Medium.ttf'),
    Bold: require('../assets/fonts/DMSans-Bold.ttf'),
  });

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
  const navTheme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={colorScheme === 'dark'? theme.dark : theme.light} >
      <Provider store={store}>
        <Stack initialRouteName={unstable_settings.initialRouteName} screenOptions={{
          headerStyle: {
            backgroundColor: navTheme.colors.card,
          },
          headerTintColor: navTheme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: "Profile",
        }}>
          <Stack.Screen name="(tabs)" options={{
            headerShown: false
          }} />
          <Stack.Screen name="profile" />
        </Stack>
      </Provider>
    </PaperProvider>
  );
}

export const theme = {
  light: {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
    },
  },
  dark: {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
    },
  },
};
