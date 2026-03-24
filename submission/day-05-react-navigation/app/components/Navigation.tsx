import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "../static/styles";
import React from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";


export default function HoverAround({ isDark }) {
  const navigation = useNavigation();
  
  const currentRouteName = useNavigationState((state) => 
    state?.routes[state.index]?.name
  );

  const iconColor = isDark ? "#ffffff" : "#f0f0f0"; 
  const textColor = isDark ? "#ffffff" : "#e0e0e0";
  const activeColor = "#FFD700";

  const renderNavButton = (name, iconName, label) => {
    const isActive = currentRouteName === name;
    const color = isActive ? activeColor : (isDark ? "#ffffff" : "#f0f0f0");

    return (
      <TouchableOpacity 
        style={styles.navButton} 
        onPress={() => navigation.navigate(name)}
      >
        <Ionicons 
          name={iconName} 
          size={18} 
          color={color} 
        />
        <Text style={{ 
          color: color, 
          fontSize: 10, 
          marginTop: 4,
          fontWeight: isActive ? 'bold' : 'normal' 
        }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={isDark ? styles.navSectionDark : styles.navSection}>
      {renderNavButton('HOME', 'home-outline', 'HOME')}
      {renderNavButton('CONTACT', 'people-outline', 'CONTACT')}
      {renderNavButton('PROFILE', 'person-outline', 'PROFILE')}
    </View>
  );
}
