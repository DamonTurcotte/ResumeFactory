import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';
import { FONT } from '../constants';

const ThemeFonts = configureFonts({
  config: {
    "displaySmall": {
      "fontFamily": FONT.GenosM,
      "fontSize": 36,
      "letterSpacing": 0,
    },
    "displayMedium": {
      "fontFamily": FONT.GenosM,
      "fontSize": 45,
      "letterSpacing": 0,
    },
    "displayLarge": {
      "fontFamily": FONT.GenosM,
      "fontSize": 57,
      "letterSpacing": 0,
    },
    "headlineSmall": {
      "fontFamily": FONT.GenosM,
      "fontSize": 24,
      "letterSpacing": 0,
    },
    "headlineMedium": {
      "fontFamily": FONT.GenosM,
      "fontSize": 28,
      "letterSpacing": 0,
    },
    "headlineLarge": {
      "fontFamily": FONT.GenosM,
      "fontSize": 32,
      "letterSpacing": 0,
    },
    "titleSmall": {
      "fontFamily": FONT.GenosM,
      "fontSize": 16,
      "letterSpacing": 0.1,
    },
    "titleMedium": {
      "fontFamily": FONT.GenosM,
      "fontSize": 18,
      "letterSpacing": 0.15,
    },
    "titleLarge": {
      "fontFamily": FONT.GenosM,
      "fontSize": 20,
      "letterSpacing": 0,
    },
    "labelSmall": {
      "fontFamily": FONT.GenosM,
      "fontSize": 15,
      "letterSpacing": 0.5,
    },
    "labelMedium": {
      "fontFamily": FONT.GenosM,
      "fontSize": 16,
      "letterSpacing": 0.5,
    },
    "labelLarge": {
      "fontFamily": FONT.GenosM,
      "fontSize": 18,
      "letterSpacing": 0.1,
    },
    "bodySmall": {
      "fontFamily": FONT.GenosM,
      "fontSize": 14,
      "letterSpacing": 0.4,
    },
    "bodyMedium": {
      "fontFamily": FONT.GenosM,
      "fontSize": 16,
      "letterSpacing": 0.25,
    },
    "bodyLarge": {
      "fontFamily": FONT.GenosM,
      "fontSize": 18,
      "letterSpacing": 0.15,
    },
    "default": {
      "fontFamily": FONT.GenosM,
      "fontSize": 16,
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
    background: '#F5F5F5',
    onBackground: '#381e72',
    onBackgroundVariant: '#FFA855',
  },
  fonts: ThemeFonts,
};

export const CombinedDarkTheme = {
  ...DarkTheme,
  ...MD3DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...MD3DarkTheme.colors,
    background: '#4F378B',
    onBackground: '#FFF',
    onBackgroundVariant: '#FFD835',
  },
  fonts: ThemeFonts,
};

// LOG  ["primary", "rgba(208, 188, 255, 1)"]
// LOG  ["background", "rgba(28, 27, 31, 1)"]
// LOG  ["card", "rgb(18, 18, 18)"]
// LOG  ["text", "rgb(229, 229, 231)"]
// LOG  ["border", "rgb(39, 39, 41)"]
// LOG  ["notification", "rgb(255, 69, 58)"]
// LOG  ["primaryContainer", "rgba(79, 55, 139, 1)"]
// LOG  ["secondary", "rgba(204, 194, 220, 1)"]
// LOG  ["secondaryContainer", "rgba(74, 68, 88, 1)"]
// LOG  ["tertiary", "rgba(239, 184, 200, 1)"]
// LOG  ["tertiaryContainer", "rgba(99, 59, 72, 1)"]
// LOG  ["surface", "rgba(28, 27, 31, 1)"]
// LOG  ["surfaceVariant", "rgba(73, 69, 79, 1)"]
// LOG  ["surfaceDisabled", "rgba(230, 225, 229, 0.12)"]
// LOG  ["error", "rgba(242, 184, 181, 1)"]
// LOG  ["errorContainer", "rgba(140, 29, 24, 1)"]
// LOG  ["onPrimary", "rgba(56, 30, 114, 1)"]
// LOG  ["onPrimaryContainer", "rgba(234, 221, 255, 1)"]
// LOG  ["onSecondary", "rgba(51, 45, 65, 1)"]
// LOG  ["onSecondaryContainer", "rgba(232, 222, 248, 1)"]
// LOG  ["onTertiary", "rgba(73, 37, 50, 1)"]
// LOG  ["onTertiaryContainer", "rgba(255, 216, 228, 1)"]
// LOG  ["onSurface", "rgba(230, 225, 229, 1)"]
// LOG  ["onSurfaceVariant", "rgba(202, 196, 208, 1)"]
// LOG  ["onSurfaceDisabled", "rgba(230, 225, 229, 0.38)"]
// LOG  ["onError", "rgba(96, 20, 16, 1)"]
// LOG  ["onErrorContainer", "rgba(242, 184, 181, 1)"]
// LOG  ["onBackground", "rgba(230, 225, 229, 1)"]
// LOG  ["outline", "rgba(147, 143, 153, 1)"]
// LOG  ["outlineVariant", "rgba(73, 69, 79, 1)"]
// LOG  ["inverseSurface", "rgba(230, 225, 229, 1)"]
// LOG  ["inverseOnSurface", "rgba(49, 48, 51, 1)"]
// LOG  ["inversePrimary", "rgba(103, 80, 164, 1)"]