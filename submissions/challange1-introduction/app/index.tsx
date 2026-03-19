import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ImageBackground 
          source={require("../assets/images/kyu.jpg")} 
          style={styles.background}
          blurRadius={10}
        >
          <View style={styles.overlay}>
            <SafeAreaView style={styles.safeArea}>
              
              <View style={styles.content}>
                <Text style={styles.header}>CSK Mobile Hackathon</Text>
                
                <View style={styles.imageContainer}>
                  <Image 
                    source={require("../assets/images/kyu.jpg")} 
                    style={styles.logo} 
                  />
                </View>

                <View style={styles.card}>
                  <Text style={styles.name}>Tole Caxtone Kirigha</Text>
                  <Text style={styles.university}>Kirinyaga University</Text>
                </View>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>Welcome to Day 01</Text>
                </View>
              </View>

              <StatusBar style="light" />
            </SafeAreaView>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 40,
    textAlign: "center",
  },
  imageContainer: {
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  logo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: "#FFD700",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingVertical: 25,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: "center",
    width: '90%',
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
  },
  university: {
    fontSize: 18,
    color: "#444",
    marginTop: 8,
    textAlign: "center",
  },
  footer: {
    marginTop: 40,
  },
  footerText: {
    fontSize: 16,
    color: "#FFD700",
    fontWeight: "600",
    letterSpacing: 1,
  },
});
