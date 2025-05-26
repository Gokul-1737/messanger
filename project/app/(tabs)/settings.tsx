import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Switch, 
  TouchableOpacity, 
  ScrollView,
  StatusBar,
  Platform,
  ImageBackground
} from 'react-native';
import { BlurView } from 'expo-blur';
import { ChevronLeft, Lock, Bell, Eye, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import GlassCard from '@/components/GlassCard';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  // Settings state
  const [useBiometrics, setUseBiometrics] = useState(true);
  const [hideLastSeen, setHideLastSeen] = useState(false);
  const [hideReadReceipts, setHideReadReceipts] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(true);

  const handleBack = () => {
    router.back();
  };
  
  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    description: string,
    toggle?: {
      value: boolean;
      onValueChange: (value: boolean) => void;
    }
  ) => {
    return (
      <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
        <View style={styles.settingIcon}>{icon}</View>
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
            {description}
          </Text>
        </View>
        {toggle && (
          <Switch
            value={toggle.value}
            onValueChange={toggle.onValueChange}
            trackColor={{ false: colors.border, true: colors.tint }}
            thumbColor="white"
          />
        )}
      </View>
    );
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg' }}
      style={styles.backgroundImage}
    >
      <View style={[
        styles.container,
        { paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 0 }
      ]}>
        {/* Header */}
        <BlurView
          intensity={40}
          tint={colorScheme}
          style={styles.header}
        >
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
          >
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Settings
          </Text>
          <View style={styles.placeholderButton} />
        </BlurView>
        
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Security Settings */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Security</Text>
          <GlassCard style={styles.card}>
            {renderSettingItem(
              <Lock size={22} color={colors.text} />,
              'Use Biometrics',
              'Use Face ID or Fingerprint to log in',
              {
                value: useBiometrics,
                onValueChange: setUseBiometrics,
              }
            )}
            
            {renderSettingItem(
              <Shield size={22} color={colors.text} />,
              'App Lock',
              'Lock the app when it\'s in the background'
            )}
          </GlassCard>
          
          {/* Privacy Settings */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Privacy</Text>
          <GlassCard style={styles.card}>
            {renderSettingItem(
              <Eye size={22} color={colors.text} />,
              'Last Seen',
              'Hide when you were last active',
              {
                value: hideLastSeen,
                onValueChange: setHideLastSeen,
              }
            )}
            
            {renderSettingItem(
              <Eye size={22} color={colors.text} />,
              'Read Receipts',
              'Hide when you\'ve read messages',
              {
                value: hideReadReceipts,
                onValueChange: setHideReadReceipts,
              }
            )}
            
            {renderSettingItem(
              <Bell size={22} color={colors.text} />,
              'Notifications',
              'Receive notifications for new messages',
              {
                value: enableNotifications,
                onValueChange: setEnableNotifications,
              }
            )}
          </GlassCard>
          
          {/* Support */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
          <GlassCard style={styles.card}>
            {renderSettingItem(
              <HelpCircle size={22} color={colors.text} />,
              'Help Center',
              'Get help with WhisperChat'
            )}
          </GlassCard>
          
          {/* Logout Button */}
          <TouchableOpacity 
            style={[styles.logoutButton, { borderColor: colors.error }]}
            onPress={handleLogout}
          >
            <LogOut size={20} color={colors.error} style={styles.logoutIcon} />
            <Text style={[styles.logoutText, { color: colors.error }]}>
              Log Out
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  placeholderButton: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 100, // Space for tab bar
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 24,
    paddingLeft: 4,
  },
  card: {
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
  },
  settingIcon: {
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderRadius: 12,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});