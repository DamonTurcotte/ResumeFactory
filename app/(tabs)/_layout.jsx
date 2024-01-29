import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, Redirect } from 'expo-router';
import { Pressable } from 'react-native';

import { useColorScheme } from 'react-native';

import { useTheme } from 'react-native-paper';

function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.onBackgroundVariant,
        tabBarInactiveTintColor: theme.colors.onBackground,
        tabBarActiveBackgroundColor: theme.colors.onPrimary,
        tabBarInactiveBackgroundColor: theme.colors.onPrimary,
        tabBarStyle: {
          borderTopColor: theme.colors.onPrimary,
          backgroundColor: theme.colors.onPrimary,
        },
      }}>
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: headerBtnRight(),
        }}
      />
      <Tabs.Screen
        name="templates"
        options={{
          title: 'Templates',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}

function headerBtnRight() {
  return () => (
    <Link href="/personal">
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="info-circle"
            size={25}
            color={"#FFFF00"}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
        )}
      </Pressable>
    </Link>
  );
}

