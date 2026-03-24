import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./static/styles";
import Skeleton from "./components/Skeleton";
import PostItem from "./components/PostItem";

export default function PostsScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const colors = {
    light: {
      background: "#FAF9F6",
      primary: "#FF6B35",
      card: "#FFFFFF",
      text: "#333333",
      subtext: "#555555",
      border: "#E0E0E0",
      skeleton: "#DDDDDD"
    },
    dark: {
      background: "#121212",
      primary: "#FF9800",
      card: "#1E1E1E",
      text: "#E0E0E0",
      subtext: "#BBBBBB",
      border: "#333333",
      skeleton: "#2A2A2A"
    }
  };

  const theme = darkMode ? colors.dark : colors.light;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: theme.primary }]}>Posts</Text>
        <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
          <Ionicons
            name={darkMode ? "moon" : "sunny"}
            size={28}
            color={theme.primary}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} width="100%" height={20} style={{ backgroundColor: theme.skeleton }} />
          ))}
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PostItem title={item.title} body={item.body} theme={theme} />}
        />
      )}
    </View>
  );
}