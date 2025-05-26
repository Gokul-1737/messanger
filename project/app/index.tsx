import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  useEffect(() => {
    // Simulate initial loading delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Automatically attempt biometric authentication
      authenticateUser();
    }, 1500);
  }, []);

  const authenticateUser = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      
      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate to access WhisperChat',
          fallbackLabel: 'Use password',
          disableDeviceFallback: false,
        });
        
        if (result.success) {
          setIsAuthenticated(true);
        }
      } else {
        // If biometrics not available, redirect to password login
        setIsAuthenticated(true); // In this demo, we auto-authenticate
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // In a real app, handle error and show manual login option
      setIsAuthenticated(true); // For demo purposes
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.logo, { color: colors.text }]}>WhisperChat</Text>
        <ActivityIndicator size="large" color={colors.tint} style={styles.loader} />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.logo, { color: colors.text }]}>WhisperChat</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Please authenticate to continue
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  loader: {
    marginTop: 24,
  },
});