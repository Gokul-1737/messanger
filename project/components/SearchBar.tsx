import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleProp, 
  ViewStyle 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Search, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

type SearchBarProps = {
  placeholder?: string;
  onSearch?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
};

export default function SearchBar({
  placeholder = 'Search...',
  onSearch,
  style
}: SearchBarProps) {
  const [text, setText] = useState('');
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleClear = () => {
    setText('');
    onSearch?.('');
  };

  const handleChangeText = (value: string) => {
    setText(value);
    onSearch?.(value);
  };

  return (
    <View style={[styles.container, style]}>
      <BlurView
        intensity={20}
        tint={colorScheme}
        style={styles.blurContainer}
      >
        <View style={[styles.searchContainer, { borderColor: colors.border }]}>
          <Search size={18} color={colors.textSecondary} style={styles.icon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            value={text}
            onChangeText={handleChangeText}
          />
          {text.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <X size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  blurContainer: {
    flex: 1,
    borderRadius: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 0.5,
    borderRadius: 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
});