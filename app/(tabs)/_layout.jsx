import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, Redirect } from 'expo-router';
import { Pressable } from 'react-native';

import { useColorScheme } from 'react-native';
import { useSession } from '../../global';

import { LightTheme, DarkTheme } from '../_layout';

function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const navTheme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: navTheme.colors.card,
        },
        tabBarStyle: {
          backgroundColor: navTheme.colors.card,
          borderColor: navTheme.colors.card,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: navTheme.colors.primary,
        headerTitleStyle: {
          color: navTheme.colors.text,
        },
        tabBarInactiveTintColor: navTheme.colors.text,
      }}>
      <Tabs.Screen
        name="index"
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
    <Link href="/profile">
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

