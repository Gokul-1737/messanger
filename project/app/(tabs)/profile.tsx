import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  FlatList,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Settings as SettingsIcon, Grid2x2 as Grid, Bookmark, UserCheck } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import GlassCard from '@/components/GlassCard';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const IMAGE_SIZE = (WINDOW_WIDTH - 32 - 8) / 3; // 3 images per row with 4px gap

// Mock data for posts
const POSTS = [
  { id: '1', imageUrl: 'https://images.pexels.com/photos/1671643/pexels-photo-1671643.jpeg' },
  { id: '2', imageUrl: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg' },
  { id: '3', imageUrl: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg' },
  { id: '4', imageUrl: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg' },
  { id: '5', imageUrl: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg' },
  { id: '6', imageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg' },
  { id: '7', imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' },
  { id: '8', imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
  { id: '9', imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [activeTab, setActiveTab] = React.useState<'posts' | 'saved' | 'tagged'>('posts');

  const handleEditProfile = () => {
    console.log('Edit profile');
  };

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <FlatList
            data={POSTS}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.postItem}
                activeOpacity={0.9}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.postImage}
                />
              </TouchableOpacity>
            )}
            style={styles.postsGrid}
            contentContainerStyle={styles.postsGridContent}
            scrollEnabled={false}
          />
        );
      case 'saved':
        return (
          <View style={styles.emptyState}>
            <Bookmark size={40} color={colors.textSecondary} />
            <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
              No saved posts yet
            </Text>
          </View>
        );
      case 'tagged':
        return (
          <View style={styles.emptyState}>
            <UserCheck size={40} color={colors.textSecondary} />
            <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
              No tagged posts yet
            </Text>
          </View>
        );
    }
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
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Profile
          </Text>
          <TouchableOpacity
            onPress={handleSettingsPress}
            style={styles.settingsButton}
          >
            <SettingsIcon size={24} color={colors.text} />
          </TouchableOpacity>
        </BlurView>
        
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <GlassCard style={styles.profileCard}>
            {/* Profile info */}
            <View style={styles.profileHeader}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg' }}
                style={styles.profileImage}
              />
              
              <View style={styles.profileStats}>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.text }]}>156</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Posts</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.text }]}>1.2K</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Followers</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: colors.text }]}>850</Text>
                  <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Following</Text>
                </View>
              </View>
            </View>
            
            <Text style={[styles.username, { color: colors.text }]}>Alex Morgan</Text>
            <Text style={[styles.bio, { color: colors.textSecondary }]}>
              Photography enthusiast 📸 | Travel lover 🌎 | Coffee addict ☕
              Living in the moment ✨
            </Text>
            
            <Button
              title="Edit Profile"
              variant="secondary"
              onPress={handleEditProfile}
              style={styles.editButton}
            />
          </GlassCard>
          
          {/* Posts tabs */}
          <BlurView
            intensity={30}
            tint={colorScheme}
            style={styles.tabsContainer}
          >
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'posts' && [
                  styles.activeTab,
                  { borderBottomColor: colors.tint }
                ]
              ]}
              onPress={() => setActiveTab('posts')}
            >
              <Grid 
                size={20} 
                color={activeTab === 'posts' ? colors.tint : colors.textSecondary} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'saved' && [
                  styles.activeTab,
                  { borderBottomColor: colors.tint }
                ]
              ]}
              onPress={() => setActiveTab('saved')}
            >
              <Bookmark 
                size={20} 
                color={activeTab === 'saved' ? colors.tint : colors.textSecondary} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'tagged' && [
                  styles.activeTab,
                  { borderBottomColor: colors.tint }
                ]
              ]}
              onPress={() => setActiveTab('tagged')}
            >
              <UserCheck 
                size={20} 
                color={activeTab === 'tagged' ? colors.tint : colors.textSecondary} 
              />
            </TouchableOpacity>
          </BlurView>
          
          {/* Content based on active tab */}
          {renderTabContent()}
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
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  settingsButton: {
    position: 'absolute',
    right: 16,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 100, // Space for tab bar
  },
  profileCard: {
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  editButton: {
    height: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  postsGrid: {
    width: '100%',
  },
  postsGridContent: {
    paddingBottom: 16,
  },
  postItem: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    margin: 2,
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 16,
  },
});