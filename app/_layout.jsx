import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as NavigationBar from 'expo-navigation-bar';

import { StatusBar, useColorScheme } from 'react-native';
import { PaperProvider, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { store, persistor } from '../redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { CombinedDefaultTheme, CombinedDarkTheme } from '../configs';
import { FONT } from '../constants';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;
  NavigationBar.setBackgroundColorAsync(theme.colors.navbar, true);
  NavigationBar.setButtonStyleAsync("light")

  SplashScreen.hideAsync();

  return (
    <PaperProvider theme={colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<ActivityIndicator animating={true} color={theme.colors.error} size='large' />}>
          <GestureHandlerRootView style={{flex: 1}}>
            <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} backgroundColor={theme.colors.navbar} />
            <Stack screenOptions={{
              contentStyle: { backgroundColor: theme.colors.inverseOnSurface },
              headerStyle: { backgroundColor: theme.colors.navbar},
              headerTintColor: theme.colors.onNavbarVariant,
              headerTitleStyle: { color: theme.colors.onNavbar, fontFamily: FONT.OrbitronB },
              animation: "fade_from_bottom",
            }}>
              <Stack.Screen name="index" options={{title: "ResumeIO", headerShown: false, contentStyle: {backgroundColor: "#D0BCFF"}}} />
              <Stack.Screen 
                name="(tabs)" 
                headerLeft={() => <HeaderBackButton path="/" theme={theme} />}
                options={({ route }) => {
                  const routeName = getFocusedRouteNameFromRoute(route) ?? 'default';
                  let title = routeName[0].toUpperCase() + routeName.slice(1);
                  return { title };
                }}
              />
            </Stack>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}