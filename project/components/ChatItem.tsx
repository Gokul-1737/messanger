import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react-native';
import Avatar from './Avatar';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

type ChatItemProps = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  status: 'online' | 'offline' | 'away' | 'busy';
  isRead: boolean;
  onPress: (id: string) => void;
};

export default function ChatItem({
  id,
  name,
  avatar,
  lastMessage,
  timestamp,
  unreadCount,
  status,
  isRead,
  onPress,
}: ChatItemProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const formatTime = (date: Date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return format(date, 'HH:mm');
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return format(date, 'dd/MM/yyyy');
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { borderBottomColor: colors.border }]}
      onPress={() => onPress(id)}
      activeOpacity={0.7}
    >
      <Avatar 
        source={avatar} 
        size={50} 
        showBorder={true} 
        status={status} 
      />
      
      <View style={styles.contentContainer}>
        <View style={styles.nameRow}>
          <Text 
            style={[styles.name, { color: colors.text }]} 
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text style={[styles.time, { color: colors.textSecondary }]}>
            {formatTime(timestamp)}
          </Text>
        </View>
        
        <View style={styles.messageRow}>
          <View style={styles.messageContainer}>
            {isRead ? (
              <CheckCheck size={14} color={colors.success} style={styles.readIcon} />
            ) : (
              <Check size={14} color={colors.textSecondary} style={styles.readIcon} />
            )}
            <Text 
              style={[
                styles.message, 
                { color: colors.textSecondary },
                unreadCount > 0 && { fontWeight: '600', color: colors.text }
              ]} 
              numberOfLines={1}
            >
              {lastMessage}
            </Text>
          </View>
          
          {unreadCount > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.notification }]}>
              <Text style={styles.badgeText}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 0.5,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  readIcon: {
    marginRight: 4,
  },
  message: {
    fontSize: 14,
    flex: 1,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});