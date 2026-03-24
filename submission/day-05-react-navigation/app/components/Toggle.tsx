import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../static/styles';

export default function TopBar({ pageName, isDark, setIsDark }) {
  const toggleTheme = async () => {
    const newValue = !isDark;
    setIsDark(newValue);
    await AsyncStorage.setItem('user-theme', JSON.stringify(newValue));
  };
  const barStyle = isDark ? styles.ToggleBarDark : styles.ToggleBar;
  const textStyle = isDark ? styles.ToggleTextDark : styles.ToggleText;
  const iconColor = isDark ? 'orange' : '#ffffff';
  return (
    <View style={barStyle}>
      <Text style={textStyle}>{pageName}</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Ionicons name={isDark ? 'sunny' : 'moon'} size={24} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}
