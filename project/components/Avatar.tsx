import React from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  StyleProp, 
  ViewStyle, 
  TouchableOpacity 
} from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

type AvatarProps = {
  source: string | null;
  size?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  showBorder?: boolean;
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
};

export default function Avatar({
  source,
  size = 40,
  style,
  onPress,
  showBorder = false,
  status = 'none'
}: AvatarProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return colors.success;
      case 'offline':
        return colors.tabIconDefault;
      case 'away':
        return colors.warning;
      case 'busy':
        return colors.error;
      default:
        return 'transparent';
    }
  };
  
  const AvatarComponent = (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: showBorder ? 2 : 0,
          borderColor: colors.background,
        },
        style
      ]}
    >
      {source ? (
        <Image
          source={{ uri: source }}
          style={[
            styles.image,
            { width: size, height: size, borderRadius: size / 2 }
          ]}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: colors.shimmer,
            }
          ]}
        />
      )}
      
      {status !== 'none' && (
        <View
          style={[
            styles.statusIndicator,
            {
              backgroundColor: getStatusColor(),
              width: size / 4,
              height: size / 4,
              borderWidth: size / 16,
            }
          ]}
        />
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {AvatarComponent}
      </TouchableOpacity>
    );
  }

  return AvatarComponent;
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 100,
    borderColor: 'white',
  },
});