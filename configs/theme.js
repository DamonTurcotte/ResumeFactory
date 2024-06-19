import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';
import { FONT } from '../constants';

const ThemeFonts = configureFonts({
  config: {
    "displaySmall": {
      "fontFamily": FONT.SairaM,
      "fontSize": 30,
      "letterSpacing": 0,
    },
    "displayMedium": {
      "fontFamily": FONT.SairaM,
      "fontSize": 36,
      "letterSpacing": 0,
    },
    "displayLarge": {
      "fontFamily": FONT.SairaM,
      "fontSize": 42,
      "letterSpacing": 0,
    },
    "headlineSmall": {
      "fontFamily": FONT.SairaM,
      "fontSize": 18,
      "letterSpacing": 0,
    },
    "headlineMedium": {
      "fontFamily": FONT.SairaM,
      "fontSize": 20,
      "letterSpacing": 0,
    },
    "headlineLarge": {
      "fontFamily": FONT.SairaM,
      "fontSize": 22,
      "letterSpacing": 0,
    },
    "titleSmall": {
      "fontFamily": FONT.SairaM,
      "fontSize": 14,
      "letterSpacing": 0.1,
    },
    "titleMedium": {
      "fontFamily": FONT.SairaM,
      "fontSize": 15,
      "letterSpacing": 0.15,
    },
    "titleLarge": {
      "fontFamily": FONT.SairaM,
      "fontSize": 16,
      "letterSpacing": 0,
    },
    "labelSmall": {
      "fontFamily": FONT.SairaM,
      "fontSize": 12,
      "letterSpacing": 0.5,
    },
    "labelMedium": {
      "fontFamily": FONT.SairaM,
      "fontSize": 13,
      "letterSpacing": 0.5,
    },
    "labelLarge": {
      "fontFamily": FONT.SairaM,
      "fontSize": 15,
      "letterSpacing": 0.1,
      "lineHeight": 22
    },
    "bodySmall": {
      "fontFamily": FONT.SairaM,
      "fontSize": 12,
      "letterSpacing": 0.4,
    },
    "bodyMedium": {
      "fontFamily": FONT.SairaM,
      "fontSize": 13,
      "letterSpacing": 0.25,
    },
    "bodyLarge": {
      "fontFamily": FONT.SairaM,
      "fontSize": 14,
      "letterSpacing": 0.15,
      "lineHeight": 22
    },
    "default": {
      "fontFamily": FONT.SairaM,
      "fontSize": 13,
      "letterSpacing": 0,
    }
  }
});

export const CombinedDefaultTheme = {
  ...DefaultTheme,
  ...MD3LightTheme,
  colors: {
    ...DefaultTheme.colors,
    ...MD3LightTheme.colors,
    background: "#F5F5F5",
    navbar: '#4F378B',
    onNavbar: '#FFFFFF',
    onNavbarVariant: '#FFA855',
    surface: '#FFF',
    surfaceVariant: "#F0F0F0",
    surfaceRipple: "#FFD885",
    primary: "#EF7040",
    secondaryContainer: "#BF5030",
    error: "#FF453A",
    onError: "#FFD8E4",
    overlay: "#00000080",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  fonts: ThemeFonts,
};

export const CombinedDarkTheme = {
  ...DarkTheme,
  ...MD3DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...MD3DarkTheme.colors,
    background: "#131313",
    navbar: '#252525',
    onNavbar: '#FFFFFF',
    onNavbarVariant: '#FFD845',
    surface: '#25232A',
    surfaceVariant: '#3b383d',
    surfaceRipple: "#6F5835",
    primary: "#DF7040",
    secondaryContainer: "#BF5030",
    error: "#601410",
    onError: "#F2B8B5",
    overlay: "#00000080",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
  },
  fonts: ThemeFonts,
};


// THEME COLORS AS HEX
// LOG  ["primary", "#D0BCFF"]
// LOG  ["background", "#1C1B1F"]
// LOG  ["card", "#121212"]
// LOG  ["text", "#E5E5E7"]
// LOG  ["border", "#272729"]
// LOG  ["notification", "#FF453A"]
// LOG  ["primaryContainer", "#4F378B"]
// LOG  ["secondary", "#CCC2DC"]
// LOG  ["secondaryContainer", "#4A4458"]
// LOG  ["tertiary", "#EFB8C8"]
// LOG  ["tertiaryContainer", "#633B48"]
// LOG  ["surface", "#1C1B1F"]
// LOG  ["surfaceVariant", "#49454F"]
// LOG  ["surfaceDisabled", "#E6E1E533"]
// LOG  ["error", "#F2B8B5"]
// LOG  ["errorContainer", "#8C1D18"]
// LOG  ["onPrimary", "#381E72"]
// LOG  ["onPrimaryContainer", "#EADDFF"]
// LOG  ["onSecondary", "#332D41"]
// LOG  ["onSecondaryContainer", "#E8DEF8"]
// LOG  ["onTertiary", "#492532"]
// LOG  ["onTertiaryContainer", "#FFD8E4"]
// LOG  ["onSurface", "#E6E1E5"]
// LOG  ["onSurfaceVariant", "#CAC4D0"]
// LOG  ["onSurfaceDisabled", "#E6E1E548"]
// LOG  ["onError", "#601410"]
// LOG  ["onErrorContainer", "#F2B8B5"]
// LOG  ["onBackground", "#E6E1E5"]
// LOG  ["outline", "#938F99"]
// LOG  ["outlineVariant", "#49454F"]
// LOG  ["inverseSurface", "#E6E1E5"]
// LOG  ["inverseOnSurface", "#313033"]
// LOG  ["inversePrimary", "#6750A4"]