import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopBar from '../components/Toggle';
import HoverAround from '../components/Navigation';
import styles from '../static/styles';

export default function HomeScreen() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('user-theme');
      if (savedTheme !== null) setIsDark(JSON.parse(savedTheme));
    };
    loadTheme();
  }, []);

  return (
    <View style={isDark ? styles.containerDark : styles.container}>
      <TopBar pageName='HOME' isDark={isDark} setIsDark={setIsDark} />
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text style={isDark ? styles.bodyTextDark : styles.bodyText}>
          Welcome User!{'\n'}CSK mobile hackathon day 5 react navigation using stack
        </Text>
      </View>
      <HoverAround isDark={isDark} />
    </View>
  );
}
