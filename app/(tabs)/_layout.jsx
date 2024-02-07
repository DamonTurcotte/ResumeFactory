import { Tabs } from 'expo-router';

import { useTheme } from 'react-native-paper';
import { HeaderBackButton } from '../../components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.navbar,
          borderColor: theme.colors.navbar
        },
        tabBarActiveTintColor: theme.colors.onNavbarVariant,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => {
            const name = focused ? "account-circle" : "account-circle-outline";
            return <MaterialCommunityIcons name={name} color={color} size={26} />;
          },
          headerLeft: () => <HeaderBackButton path="/" theme={theme} />,
        }}
      />
      <Tabs.Screen
        name="templates"
        options={{
          title: 'Templates',
          tabBarIcon: ({ color, focused }) => {
            const name = focused ? "file-document" : "file-document-outline";
            return <MaterialCommunityIcons name={name} color={color} size={26} />;
          },
          headerLeft: () => <HeaderBackButton path="/" theme={theme} />,
        }}
      />
    </Tabs>
  );
}