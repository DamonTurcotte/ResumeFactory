import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

  SplashScreen.hideAsync();

  return (
    <PaperProvider theme={colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<ActivityIndicator animating={true} color={theme.colors.error} size='large' />}>
          <GestureHandlerRootView style={{flex: 1}}>
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
                  const routeName = getFocusedRouteNameFromRoute(route) ?? 'default';
                  let title = routeName[0].toUpperCase() + routeName.slice(1);
                  return { title };
                }}
                headerLeft={() => <HeaderBackButton path="index" theme={theme} />}
              />
              <Stack.Screen 
                name="profile/personal"
                options={{title: "Personal"}}
                headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
              />
              <Stack.Screen 
                name="profile/experience"
                options={{title: "Experience"}}
                headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
              />
            </Stack>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}

const HeaderBackButton = ({path, theme}) => {
  const router = useRouter();
  return (
    <Icon 
      name='arrow-left'
      color={theme.colors.onBackgroundVariant}
      size={30}
      onPress={() => {
        router.navigate(path);
      }}
    />
  )
}