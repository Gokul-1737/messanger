import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ImageBackground
} from 'react-native';
import { BlurView } from 'expo-blur';
import { 
  Camera, 
  Image as ImageIcon, 
  MapPin, 
  Tag, 
  X,
  Send
} from 'lucide-react-native';
import Button from '@/components/Button';
import GlassCard from '@/components/GlassCard';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function PostScreen() {
  const [caption, setCaption] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([
    'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg',
  ]);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleAddImage = () => {
    // In a real app, integrate with image picker
    console.log('Add image');
    
    // For demo purposes, add a placeholder image
    setSelectedImages([
      ...selectedImages,
      'https://images.pexels.com/photos/1671643/pexels-photo-1671643.jpeg'
    ]);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleTakePhoto = () => {
    // In a real app, integrate with camera
    console.log('Take photo');
  };

  const handleAddLocation = () => {
    console.log('Add location');
  };

  const handleAddTags = () => {
    console.log('Add tags');
  };

  const handlePost = () => {
    console.log('Posting with caption:', caption);
    console.log('Selected images:', selectedImages);
    
    // Reset form
    setCaption('');
    setSelectedImages([]);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg' }}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
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
              Create Post
            </Text>
          </BlurView>
          
          <ScrollView 
            style={styles.content}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <GlassCard style={styles.card}>
              {/* Caption input */}
              <TextInput
                style={[styles.captionInput, { color: colors.text }]}
                placeholder="What's on your mind?"
                placeholderTextColor={colors.textSecondary}
                multiline
                value={caption}
                onChangeText={setCaption}
              />
              
              {/* Image preview */}
              {selectedImages.length > 0 && (
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.imagePreviewScroll}
                  contentContainerStyle={styles.imagePreviewContent}
                >
                  {selectedImages.map((image, index) => (
                    <View key={index} style={styles.imagePreviewContainer}>
                      <Image
                        source={{ uri: image }}
                        style={styles.imagePreview}
                      />
                      <TouchableOpacity
                        style={[styles.removeButton, { backgroundColor: colors.error }]}
                        onPress={() => handleRemoveImage(index)}
                      >
                        <X size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              )}
              
              {/* Action buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: colors.shimmer }]}
                  onPress={handleAddImage}
                >
                  <ImageIcon size={20} color={colors.text} />
                  <Text style={[styles.actionButtonText, { color: colors.text }]}>
                    Photo
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: colors.shimmer }]}
                  onPress={handleTakePhoto}
                >
                  <Camera size={20} color={colors.text} />
                  <Text style={[styles.actionButtonText, { color: colors.text }]}>
                    Camera
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: colors.shimmer }]}
                  onPress={handleAddLocation}
                >
                  <MapPin size={20} color={colors.text} />
                  <Text style={[styles.actionButtonText, { color: colors.text }]}>
                    Location
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: colors.shimmer }]}
                  onPress={handleAddTags}
                >
                  <Tag size={20} color={colors.text} />
                  <Text style={[styles.actionButtonText, { color: colors.text }]}>
                    Tag
                  </Text>
                </TouchableOpacity>
              </View>
              
              <Button
                title="Post"
                icon={<Send size={18} color="white" />}
                onPress={handlePost}
                disabled={caption.trim() === '' && selectedImages.length === 0}
                style={styles.postButton}
              />
            </GlassCard>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 100, // Space for tab bar
  },
  card: {
    marginBottom: 16,
  },
  captionInput: {
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  imagePreviewScroll: {
    marginBottom: 16,
  },
  imagePreviewContent: {
    paddingRight: 8,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginRight: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionButtonText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  postButton: {
    height: 50,
  },
});