import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Platform, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio, AudioMode, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const STORAGE_KEY = '@is_following_tole';
const INITIAL_FOLLOWERS = 1200;

export default function App() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(INITIAL_FOLLOWERS);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        shouldDuckAndroid: true,
      });
    };
    setupAudio();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedState = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedState !== null) {
          const following = JSON.parse(savedState);
          setIsFollowing(following);
          setFollowerCount(following ? INITIAL_FOLLOWERS + 1 : INITIAL_FOLLOWERS);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('../assets/sounds/follow.mp3')
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error("Error playing sound", error);
    }
  };

  const toggleFollow = async () => {
    const newState = !isFollowing;
    
    if (newState) {
      await playSound();
    }

    setIsFollowing(newState);
    setFollowerCount(prev => newState ? prev + 1 : prev - 1);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      setIsFollowing(!newState);
      setFollowerCount(prev => !newState ? prev + 1 : prev - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#6366F1" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.imageBorder}>
            <Image
              source={require('../assets/images/tole.jpg')}
              style={styles.avatar}
            />
          </View>

          <Text style={styles.name}>We zombie haujui!</Text>
          <Text style={styles.role}>Mobile Architect</Text>
          
          <Text style={styles.bio}>
            Crafting seamless digital experiences with React Native and modern UI patterns.
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>84</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
            <View style={[styles.statBox, styles.statDivider]}>
              <Text style={styles.statNumber}>
                {followerCount.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={[styles.statBox, styles.statDivider]}>
              <Text style={styles.statNumber}>412</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>

          <Pressable 
            onPress={toggleFollow}
            style={({ pressed }) => [
              styles.button,
              isFollowing ? styles.buttonUnfollow : styles.buttonFollow,
              pressed && styles.buttonPressed
            ]}
          >
            <Text style={[styles.buttonText, isFollowing && styles.buttonTextUnfollow]}>
              {isFollowing ? "Unfollow" : "Follow Profile"}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F172A",
  },
  card: {
    width: "90%",
    maxWidth: 360,
    padding: 24,
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.15, shadowRadius: 30 },
      android: { elevation: 10 },
    }),
  },
  imageBorder: {
    padding: 4,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#F1F5F9",
    marginBottom: 16,
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 24, fontWeight: "800", color: "#1E293B" },
  role: { fontSize: 13, fontWeight: "700", color: "#6366F1", textTransform: "uppercase", letterSpacing: 1.2, marginTop: 4 },
  bio: { fontSize: 14, lineHeight: 20, color: "#64748B", textAlign: "center", marginTop: 12, borderBottomColor: '#E2E8F0', borderBottomWidth: 0.5, paddingBottom: 20 },
  statsContainer: {
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    width: "100%",
  },
  statBox: { flex: 1, alignItems: "center" },
  statDivider: { borderLeftWidth: 2, borderLeftColor: "#EDF2F7" },
  statNumber: { fontSize: 17, fontWeight: "700", color: "#1E293B" },
  statLabel: { fontSize: 11, color: "#94A3B8", textTransform: 'uppercase', marginTop: 2 },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1.5,
  },
  buttonFollow: {
    backgroundColor: "#1E293B",
    borderColor: "#1E293B",
  },
  buttonUnfollow: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
  },
  buttonPressed: { transform: [{ scale: 0.97 }] },
  buttonText: { fontSize: 16, fontWeight: "700", color: "#FFFFFF" },
  buttonTextUnfollow: { color: "#64748B" },
});
