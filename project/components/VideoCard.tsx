import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Dimensions 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark 
} from 'lucide-react-native';
import Avatar from './Avatar';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

type VideoCardProps = {
  id: string;
  username: string;
  userAvatar: string;
  videoUrl: string;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
  onLikePress: (id: string) => void;
  onCommentPress: (id: string) => void;
  onSharePress: (id: string) => void;
  onSavePress: (id: string) => void;
  onUserPress: (username: string) => void;
};

export default function VideoCard({
  id,
  username,
  userAvatar,
  videoUrl,
  caption,
  likes,
  comments,
  isLiked,
  isSaved,
  onLikePress,
  onCommentPress,
  onSharePress,
  onSavePress,
  onUserPress,
}: VideoCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  // For demo purposes, we're using an image instead of a video
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: videoUrl }}
        style={styles.video}
        onLoad={() => setImageLoaded(true)}
      />
      
      {/* User info and caption with blurred background */}
      <View style={styles.captionContainer}>
        <BlurView
          intensity={30}
          tint={colorScheme}
          style={styles.captionBlur}
        >
          <TouchableOpacity 
            style={styles.userContainer}
            onPress={() => onUserPress(username)}
            activeOpacity={0.8}
          >
            <Avatar source={userAvatar} size={32} />
            <Text style={[styles.username, { color: colors.text }]}>
              {username}
            </Text>
          </TouchableOpacity>
          
          <Text 
            style={[styles.caption, { color: colors.text }]}
            numberOfLines={2}
          >
            {caption}
          </Text>
        </BlurView>
      </View>
      
      {/* Interactive buttons */}
      <View style={styles.actionContainer}>
        <BlurView
          intensity={40}
          tint={colorScheme}
          style={styles.actionsBlur}
        >
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onLikePress(id)}
          >
            <Heart 
              size={24} 
              color={isLiked ? colors.notification : colors.text}
              fill={isLiked ? colors.notification : 'transparent'}
            />
            <Text style={[styles.actionText, { color: colors.text }]}>
              {likes > 999 ? `${(likes / 1000).toFixed(1)}K` : likes}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onCommentPress(id)}
          >
            <MessageCircle size={24} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>
              {comments > 999 ? `${(comments / 1000).toFixed(1)}K` : comments}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onSharePress(id)}
          >
            <Share2 size={24} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onSavePress(id)}
          >
            <Bookmark 
              size={24} 
              color={colors.text}
              fill={isSaved ? colors.text : 'transparent'}
            />
          </TouchableOpacity>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT - 120, // Account for tab bar and status bar
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    right: 70, // Leave space for action buttons
    borderRadius: 16,
    overflow: 'hidden',
  },
  captionBlur: {
    padding: 12,
    borderRadius: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  username: {
    marginLeft: 8,
    fontWeight: '700',
    fontSize: 16,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionContainer: {
    position: 'absolute',
    right: 10,
    bottom: 80,
    borderRadius: 20,
    overflow: 'hidden',
  },
  actionsBlur: {
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 16,
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
});