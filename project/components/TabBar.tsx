import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { 
  useAnimatedStyle, 
  withTiming,
  interpolateColor 
} from 'react-native-reanimated';
import { Chrome as Home, Film, SquarePlus as PlusSquare, User, Settings } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const getTabIcon = (routeName: string, isFocused: boolean) => {
    const color = isFocused ? colors.tabIconSelected : colors.tabIconDefault;
    const size = 24;

    switch (routeName) {
      case 'chat':
        return <Home size={size} color={color} />;
      case 'reels':
        return <Film size={size} color={color} />;
      case 'post':
        return <PlusSquare size={size} color={color} />;
      case 'profile':
        return <User size={size} color={color} />;
      case 'settings':
        return <Settings size={size} color={color} />;
      default:
        return <Home size={size} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <BlurView
        intensity={50}
        tint={colorScheme}
        style={styles.blurContainer}
      >
        <View style={[styles.tabBar, { borderTopColor: colors.border }]}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel || options.title || route.name;
            const isFocused = state.index === index;

            const animatedDotStyle = useAnimatedStyle(() => {
              return {
                opacity: withTiming(isFocused ? 1 : 0, { duration: 200 }),
                backgroundColor: colors.tabIconSelected,
              };
            });

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.tabItem}
              >
                {getTabIcon(route.name, isFocused)}
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isFocused ? colors.tabIconSelected : colors.tabIconDefault,
                      marginTop: 4,
                    },
                  ]}
                >
                  {label.toString()}
                </Text>
                <Animated.View style={[styles.tabDot, animatedDotStyle]} />
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  blurContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tabBar: {
    flexDirection: 'row',
    height: '100%',
    borderTopWidth: 0.5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabDot: {
    position: 'absolute',
    top: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});