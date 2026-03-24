import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./static/styles";

export default function Index() {
  const nav = useRouter();

  return (
    <View style={styles.body}>
      <Text style={styles.heading}>
        welcome!
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => nav.push("/screens/Login")}>
        <Text style={styles.Text}>
          LOGIN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => nav.push("/screens/SignUp")}>
        <Text style={styles.Text}>
          SignUp
        </Text>
      </TouchableOpacity>
    </View>
  );
}
