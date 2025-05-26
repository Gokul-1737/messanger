import React, { ReactNode } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

type GlassCardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
};

export default function GlassCard({ 
  children, 
  style, 
  intensity = 60,
  tint: propTint
}: GlassCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  // Determine the tint based on props or system theme
  const tint = propTint === 'default' 
    ? colorScheme 
    : propTint || colorScheme;

  return (
    <View style={[styles.container, style]}>
      <BlurView
        intensity={intensity}
        tint={tint}
        style={styles.blur}
      >
        <View style={[
          styles.content,
          { borderColor: colors.border }
        ]}>
          {children}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 20,
  },
  blur: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: 'rgba(200, 210, 220, 0.5)',
  },
});