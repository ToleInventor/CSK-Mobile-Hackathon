import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from './screens/LoginScreen'
import SignupScreen from "./screens/SignUp";
import TaskManager from "./screens/TaskManager";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    setIsLoggedIn(false);
    setScreen("login");
  };

  if (isLoggedIn) {
    return <TaskManager onLogout={handleLogout} />;
  }

  if (screen === "signup") {
    return <SignupScreen setScreen={setScreen} />;
  }

  return <LoginScreen setScreen={setScreen} setIsLoggedIn={setIsLoggedIn} />;
}