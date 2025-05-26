import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Fingerprint, Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import Button from '@/components/Button';
import GlassCard from '@/components/GlassCard';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleLogin = () => {
    setLoading(true);
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleBiometricAuth = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      
      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Log in to WhisperChat',
          fallbackLabel: 'Use password',
        });
        
        if (result.success) {
          // Handle successful authentication
          router.replace('/(tabs)');
        }
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg' }}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'transparent']}
            style={styles.gradientTop}
          />

          <View style={styles.contentContainer}>
            <Text style={styles.logo}>WhisperChat</Text>
            <Text style={styles.tagline}>Connect privately. Share freely.</Text>
            
            <GlassCard style={styles.card}>
              <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
              
              <View style={styles.inputContainer}>
                <Mail size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Email"
                  placeholderTextColor={colors.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Lock size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Password"
                  placeholderTextColor={colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  {showPassword ? (
                    <EyeOff size={20} color={colors.textSecondary} />
                  ) : (
                    <Eye size={20} color={colors.textSecondary} />
                  )}
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={[styles.forgotPasswordText, { color: colors.tint }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              
              <Button
                title="Log In"
                onPress={handleLogin}
                loading={loading}
                style={styles.loginButton}
              />
              
              <View style={styles.orContainer}>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
                <Text style={[styles.orText, { color: colors.textSecondary }]}>OR</Text>
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              </View>
              
              <TouchableOpacity
                style={[styles.biometricButton, { borderColor: colors.border }]}
                onPress={handleBiometricAuth}
              >
                <Fingerprint size={24} color={colors.tint} />
                <Text style={[styles.biometricText, { color: colors.text }]}>
                  Use Biometrics
                </Text>
              </TouchableOpacity>
            </GlassCard>
            
            <View style={styles.signupContainer}>
              <Text style={[styles.signupText, { color: 'white' }]}>
                Don't have an account?
              </Text>
              <TouchableOpacity>
                <Text style={[styles.signupLink, { color: colors.tint }]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)']}
            style={styles.gradientBottom}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    fontSize: 16,
    color: 'white',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginBottom: 16,
    height: 50,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  eyeButton: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    height: 50,
    marginBottom: 24,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  biometricText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    marginRight: 4,
  },
  signupLink: {
    fontSize: 16,
    fontWeight: '600',
  },
});