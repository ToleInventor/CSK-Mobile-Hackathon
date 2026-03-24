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

export default function SignupScreen({ setScreen }) {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupHidden, setSignupHidden] = useState(true);
  const [confirmHidden, setConfirmHidden] = useState(true);
  const [signupFocused, setSignupFocused] = useState("");

  const handleSignup = async () => {
    if (signupPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    const user = { email: signupEmail, password: signupPassword };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setScreen("login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Text style={styles.label}>E-Mail:</Text>
      <View style={[styles.InputCont, signupFocused === "email" && styles.activeInput]}>
        <TextInput
          style={styles.input}
          value={signupEmail}
          onChangeText={setSignupEmail}
          onFocus={() => setSignupFocused("email")}
          onBlur={() => setSignupFocused("")}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Enter your email"
          placeholderTextColor="#999"
          cursorColor="#6C5CE7"
          selectionColor="#A29BFE"
        />
      </View>

      <Text style={styles.label}>Password:</Text>
      <View style={[styles.InputCont, signupFocused === "password" && styles.activeInput]}>
        <TextInput
          style={styles.input}
          value={signupPassword}
          onChangeText={setSignupPassword}
          secureTextEntry={signupHidden}
          onFocus={() => setSignupFocused("password")}
          onBlur={() => setSignupFocused("")}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          cursorColor="#6C5CE7"
          selectionColor="#A29BFE"
        />
        <TouchableOpacity onPress={() => setSignupHidden(!signupHidden)} style={styles.icon}>
          <Ionicons name={signupHidden ? "eye" : "eye-off"} size={22} color="#6C5CE7" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirm Password:</Text>
      <View style={[styles.InputCont, signupFocused === "confirm" && styles.activeInput]}>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={confirmHidden}
          onFocus={() => setSignupFocused("confirm")}
          onBlur={() => setSignupFocused("")}
          placeholder="Confirm your password"
          placeholderTextColor="#999"
          cursorColor="#6C5CE7"
          selectionColor="#A29BFE"
        />
        <TouchableOpacity onPress={() => setConfirmHidden(!confirmHidden)} style={styles.icon}>
          <Ionicons name={confirmHidden ? "eye" : "eye-off"} size={22} color="#6C5CE7" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.Button} onPress={handleSignup}>
        <Text style={styles.ButtonText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen("login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
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