import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBar from '../components/Toggle';
import HoverAround from '../components/Navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../static/styles';

export default function ContactScreen() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('user-theme');
      if (savedTheme !== null) setIsDark(JSON.parse(savedTheme));
    };
    loadTheme();
  }, []);

  const iconColor = isDark ? '#FFA500' : '#000';

  return (
    <View style={isDark ? styles.containerDark : styles.container}>
      <TopBar pageName='CONTACT' isDark={isDark} setIsDark={setIsDark} />
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text style={isDark ? styles.bodyTextDark : styles.bodyText}>Connect with me:</Text>

        <View style={styles.contactItem}>
          <Ionicons name="logo-github" size={24} color={iconColor} style={{ marginRight: 10 }} />
          <Text style={isDark ? styles.contactTextDark : styles.contactText}>github.com/ToleInventor</Text>
        </View>

        <View style={styles.contactItem}>
          <Ionicons name="logo-youtube" size={24} color={iconColor} style={{ marginRight: 10 }} />
          <Text style={isDark ? styles.contactTextDark : styles.contactText}>youtube.com/@caxtonetechkenya</Text>
        </View>

        <View style={styles.contactItem}>
          <Ionicons name="logo-tiktok" size={24} color={iconColor} style={{ marginRight: 10 }} />
          <Text style={isDark ? styles.contactTextDark : styles.contactText}>tiktok.com/@caxtonetechkenya</Text>
        </View>

        <View style={styles.contactItem}>
          <Ionicons name="logo-instagram" size={24} color={iconColor} style={{ marginRight: 10 }} />
          <Text style={isDark ? styles.contactTextDark : styles.contactText}>instagram.com/@caxtonetechkenya</Text>
        </View>

      </View>
      <HoverAround isDark={isDark} />
    </View>
  );
}
