import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  header: {
    fontSize: 24,
    fontWeight: "bold"
  },
  card: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  body: {
    marginTop: 5,
    fontSize: 14
  },
  seeMore: {
    marginTop: 5,
    fontWeight: "bold"
  },
  center: {
    flex: 1,
    justifyContent: "center"
  }
});

export default styles;