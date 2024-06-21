import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from 'expo-navigation-bar';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { Pressable, useColorScheme } from 'react-native';
import { PaperProvider, ActivityIndicator } from 'react-native-paper';

import { store, persistor } from '../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { CombinedDefaultTheme, CombinedDarkTheme } from '../configs';
import { FONT } from '../constants';
import { HeaderBackButton, HeaderNextButton } from '../components';
import { Icon } from '../components/icons/icon';
import { StatusBar } from 'expo-status-bar';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  const router = useRouter();

  SplashScreen.hideAsync();

  return (
    <PaperProvider theme={colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<ActivityIndicator animating={true} color={theme.colors.error} size='large' />}>
          <Stack
            screenOptions={{
              contentStyle: { backgroundColor: theme.colors.background },
              headerStyle: { backgroundColor: theme.colors.navbar},
              headerTintColor: theme.colors.onNavbarVariant,
              headerTitleStyle: { color: theme.colors.onNavbar, fontFamily: FONT.SairaB, fontSize: 22},
              headerTitleAlign: "center",
              animation: "fade_from_bottom",
            }}
          >
            <Stack.Screen name="index" options={{title: "Resume Factory", headerShown: false}} />
          </Stack>
          <StatusBar style='auto' hidden={false} />
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}