import React from 'react';
import { Tabs } from 'expo-router';
import TabBar from '@/components/TabBar';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
      <Tabs.Screen name="reels" options={{ title: 'Reels' }} />
      <Tabs.Screen name="post" options={{ title: 'Post' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}