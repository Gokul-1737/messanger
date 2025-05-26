import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ImageBackground,
  StatusBar,
  Platform
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Avatar from '@/components/Avatar';
import SearchBar from '@/components/SearchBar';
import ChatItem from '@/components/ChatItem';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

// Mock data for chats
const CHATS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    lastMessage: 'Hey, how are you doing?',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 1)),
    unreadCount: 2,
    status: 'online',
    isRead: false,
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    lastMessage: 'I just sent you the files',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 3)),
    unreadCount: 0,
    status: 'busy',
    isRead: true,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    lastMessage: 'Let me know when you\'re free',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    unreadCount: 1,
    status: 'away',
    isRead: false,
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    lastMessage: 'See you at the meeting tomorrow',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
    unreadCount: 0,
    status: 'offline',
    isRead: true,
  },
  {
    id: '5',
    name: 'Jessica Taylor',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    lastMessage: 'Thanks for the help!',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 3)),
    unreadCount: 0,
    status: 'online',
    isRead: true,
  },
];

export default function ChatScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const filteredChats = CHATS.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatPress = (id: string) => {
    // In a real app, navigate to the chat detail screen
    console.log(`Chat ${id} pressed`);
  };

  const handleNewChat = () => {
    // In a real app, navigate to the new chat screen
    console.log('New chat pressed');
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
          <View style={styles.headerContent}>
            <TouchableOpacity 
              onPress={() => router.push('/profile')}
              activeOpacity={0.7}
            >
              <Avatar 
                source="https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg" 
                size={40} 
              />
            </TouchableOpacity>
            
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Chats
            </Text>
            
            <TouchableOpacity 
              style={[styles.newChatButton, { backgroundColor: colors.tint }]}
              onPress={handleNewChat}
            >
              <Plus size={20} color="white" />
            </TouchableOpacity>
          </View>
          
          <SearchBar
            placeholder="Search chats..."
            onSearch={setSearchQuery}
            style={styles.searchBar}
          />
        </BlurView>
        
        {/* Chat list */}
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatItem
              id={item.id}
              name={item.name}
              avatar={item.avatar}
              lastMessage={item.lastMessage}
              timestamp={item.timestamp}
              unreadCount={item.unreadCount}
              status={item.status as 'online' | 'offline' | 'away' | 'busy'}
              isRead={item.isRead}
              onPress={handleChatPress}
            />
          )}
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}
          showsVerticalScrollIndicator={false}
        />
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
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  newChatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    marginBottom: 8,
  },
  chatList: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  chatListContent: {
    paddingBottom: 100, // Space for tab bar
  },
});