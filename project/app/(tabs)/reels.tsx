import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Dimensions, 
  TouchableOpacity 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Plus } from 'lucide-react-native';
import VideoCard from '@/components/VideoCard';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

// Mock data for reels
const REELS = [
  {
    id: '1',
    username: 'sarah_j',
    userAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    videoUrl: 'https://images.pexels.com/photos/1671643/pexels-photo-1671643.jpeg',
    caption: '🌊 Beach day vibes! #summer #beach #vacation',
    likes: 1243,
    comments: 89,
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    username: 'mike_travels',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    videoUrl: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg',
    caption: 'Exploring the mountains today 🏔️ #adventure #hiking',
    likes: 2567,
    comments: 134,
    isLiked: true,
    isSaved: true,
  },
  {
    id: '3',
    username: 'emma_eats',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    videoUrl: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    caption: 'Homemade pasta tonight! 🍝 #foodie #cooking #homemade',
    likes: 956,
    comments: 42,
    isLiked: false,
    isSaved: false,
  },
];

export default function ReelsScreen() {
  const [reels, setReels] = useState(REELS);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleLike = (id: string) => {
    setReels(prevReels => 
      prevReels.map(reel => 
        reel.id === id 
          ? { 
              ...reel, 
              isLiked: !reel.isLiked,
              likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1
            } 
          : reel
      )
    );
  };

  const handleSave = (id: string) => {
    setReels(prevReels => 
      prevReels.map(reel => 
        reel.id === id 
          ? { ...reel, isSaved: !reel.isSaved } 
          : reel
      )
    );
  };

  const handleComment = (id: string) => {
    console.log(`Comment on reel ${id}`);
  };

  const handleShare = (id: string) => {
    console.log(`Share reel ${id}`);
  };

  const handleUserPress = (username: string) => {
    console.log(`View profile of ${username}`);
  };

  const handleNewReel = () => {
    console.log('Create new reel');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            id={item.id}
            username={item.username}
            userAvatar={item.userAvatar}
            videoUrl={item.videoUrl}
            caption={item.caption}
            likes={item.likes}
            comments={item.comments}
            isLiked={item.isLiked}
            isSaved={item.isSaved}
            onLikePress={handleLike}
            onCommentPress={handleComment}
            onSharePress={handleShare}
            onSavePress={handleSave}
            onUserPress={handleUserPress}
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={WINDOW_HEIGHT - 120}
        snapToAlignment="start"
        decelerationRate="fast"
      />
      
      {/* New reel button */}
      <View style={styles.newReelButtonContainer}>
        <BlurView
          intensity={40}
          tint={colorScheme}
          style={styles.newReelButtonBlur}
        >
          <TouchableOpacity
            style={[styles.newReelButton, { backgroundColor: colors.accent }]}
            onPress={handleNewReel}
          >
            <Plus size={24} color="white" />
          </TouchableOpacity>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  newReelButtonContainer: {
    position: 'absolute',
    bottom: 90,
    right: 16,
    borderRadius: 30,
    overflow: 'hidden',
  },
  newReelButtonBlur: {
    padding: 8,
    borderRadius: 30,
  },
  newReelButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});