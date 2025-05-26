import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  StyleProp, 
  ViewStyle, 
  TextStyle,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon
}: ButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  // Determine button styles based on variant and size
  const getContainerStyle = () => {
    const sizeStyles = {
      small: { height: 36, paddingHorizontal: 12 },
      medium: { height: 44, paddingHorizontal: 16 },
      large: { height: 54, paddingHorizontal: 20 },
    };
    
    return [
      styles.button,
      sizeStyles[size],
      variant === 'outline' && { 
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.button
      },
      variant === 'ghost' && { 
        backgroundColor: 'transparent',
      },
      disabled && { opacity: 0.6 },
      style
    ];
  };
  
  const getTextStyle = () => {
    const sizeStyles = {
      small: { fontSize: 14 },
      medium: { fontSize: 16 },
      large: { fontSize: 18 },
    };
    
    return [
      styles.text,
      sizeStyles[size],
      variant === 'outline' && { color: colors.button },
      variant === 'ghost' && { color: colors.button },
      variant === 'secondary' && { color: colors.text },
      textStyle
    ];
  };
  
  // Render different button backgrounds based on variant
  const renderButtonContent = () => {
    if (variant === 'primary') {
      return (
        <LinearGradient
          colors={['#4361EE', '#3A57E8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {renderInnerContent()}
        </LinearGradient>
      );
    }
    
    if (variant === 'secondary') {
      return (
        <BlurView
          intensity={30}
          tint={colorScheme}
          style={styles.secondaryBg}
        >
          {renderInnerContent()}
        </BlurView>
      );
    }
    
    return renderInnerContent();
  };
  
  const renderInnerContent = () => {
    return (
      <>
        {loading ? (
          <ActivityIndicator 
            color={variant === 'primary' ? 'white' : colors.button} 
            size="small" 
          />
        ) : (
          <>
            {icon && <span style={styles.iconContainer}>{icon}</span>}
            <Text style={getTextStyle()}>{title}</Text>
          </>
        )}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={getContainerStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderButtonContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  secondaryBg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  text: {
    fontWeight: '600',
    color: 'white',
  },
  iconContainer: {
    marginRight: 8,
  },
});