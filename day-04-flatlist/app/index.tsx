import React, { useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const contacts = [
  { id: '1', name: 'Caxtone Tole', role: 'Developer', avatar: 'https://i.postimg.cc/xCPtjxkD/tole.jpg' },
  { id: '2', name: 'Mary Smith', role: 'Designer', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Alex Johnson', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Jet Lee', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Esther Daniels', role: 'UX Researcher', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '6', name: 'Michael Davis', role: 'Marketing Specialist', avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: '7', name: 'Michael Brown', role: 'Data Analyst', avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: '8', name: 'Thompson Wilson', role: 'Developer', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: '9', name: 'Karen Nyamu', role: 'Designer', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: '10', name: 'Esther Mati', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=10' },
  { id: '11', name: 'William Anderson', role: 'Developer', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '12', name: 'John Thomas', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: '13', name: 'Ethan Jackson', role: 'QA Engineer', avatar: 'https://i.pravatar.cc/150?img=13' },
  { id: '14', name: 'Johnson White', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=14' },
  { id: '15', name: 'Alexander Harris', role: 'Developer', avatar: 'https://i.pravatar.cc/150?img=15' },
  { id: '16', name: 'Charlotte Lewis', role: 'Designer', avatar: 'https://i.pravatar.cc/150?img=16' },
  { id: '17', name: 'Benjamin Clark', role: 'Student', avatar: 'https://i.pravatar.cc/150?img=17' },
];

export default function App() {
  const [isNight, setIsNight] = useState(true);

  return (
    <View style={!isNight ? styles.container : styles.containerDark}>
      {/* Status bar color */}
      <StatusBar barStyle={!isNight ? 'dark-content' : 'light-content'} />

      {/* Header with mode label + toggle */}
      <View style={styles.header}>
        <Text style={isNight ? styles.modeTextDark : styles.modeTextLight}>
          {isNight ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <TouchableOpacity onPress={() => setIsNight(!isNight)}>
          <Ionicons
            name={!isNight ? 'moon' : 'sunny'}
            size={28}
            color={!isNight ? 'purple' : 'orange'}
            style={{ marginTop: 25, marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>

      {/* FlatList of contacts */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={!isNight ? styles.item : styles.itemDark}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View>
              <Text style={isNight ? styles.nameDark : styles.name}>{item.name}</Text>
              <Text style={isNight ? styles.roleDark : styles.role}>{item.role}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
    paddingTop: 25, // top padding instead of SafeAreaView
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#0d1b2a',
    paddingTop: 25,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#9b8d8d',
    alignItems: 'center',
  },

  modeTextLight: {
    alignSelf: 'flex-start',
    padding: 10,
    marginTop: 25,
    fontSize: 24,
    color: '#011642',
  },
  modeTextDark: {
    alignSelf: 'flex-start',
    padding: 10,
    marginTop: 25,
    fontSize: 24,
    color: '#90caf9',
  },

  item: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dbeafe',
  },
  itemDark: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1b263b',
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderColor: '#3b82f6',
    borderWidth: 1.5,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  nameDark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#90caf9',
  },

  role: {
    color: '#64748b',
  },
  roleDark: {
    color: '#94a3b8',
  },
});