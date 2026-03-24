import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ setScreen, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [focusedInput, setFocusedInput] = useState("");

  const handleLogin = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (!storedUser) return;
    const parsed = JSON.parse(storedUser);
    if (email === parsed.email && password === parsed.password) {
      setIsLoggedIn(true);
    } else {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>E-Mail:</Text>
      <View
        style={[
          styles.InputCont,
          focusedInput === "email" && styles.activeInput,
        ]}
      >
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedInput("email")}
          onBlur={() => setFocusedInput("")}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Enter your email"
          placeholderTextColor="#999"
          cursorColor="#6C5CE7"
          selectionColor="#A29BFE"
        />
      </View>

      <Text style={styles.label}>Password:</Text>
      <View
        style={[
          styles.InputCont,
          focusedInput === "password" && styles.activeInput,
        ]}
      >
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isHidden}
          onFocus={() => setFocusedInput("password")}
          onBlur={() => setFocusedInput("")}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          cursorColor="#6C5CE7"
          selectionColor="#A29BFE"
        />
        <TouchableOpacity
          onPress={() => setIsHidden(!isHidden)}
          style={styles.icon}
        >
          <Ionicons
            name={isHidden ? "eye" : "eye-off"}
            size={22}
            color="#6C5CE7"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.Button} onPress={handleLogin}>
        <Text style={styles.ButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("signup")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#F5F3FF" },
  title: { fontSize: 26, marginBottom: 25, textAlign: "center", fontWeight: "bold", color: "#2D3436" },
  label: { marginBottom: 5, color: "#555" },
  InputCont: { flexDirection: "row", alignItems: "center", borderBottomColor: "#DCDDE1", borderBottomWidth: 1, marginBottom: 20 },
  activeInput: { borderBottomColor: "#6C5CE7", borderBottomWidth: 2 },
  input: { flex: 1, paddingVertical: 10, color: "#2D3436" },
  icon: { padding: 5 },
  Button: { backgroundColor: "#6C5CE7", padding: 14, width: 220, alignSelf: "center", borderRadius: 25, marginTop: 10, elevation: 3 },
  ButtonText: { color: "white", fontWeight: "bold", alignSelf: "center", fontSize: 16 },
  link: { marginTop: 15, textAlign: "center", color: "#6C5CE7", fontWeight: "600" },
});
