import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function TaskManager({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([...tasks, { id: Date.now().toString(), title: taskInput }]);
    setTaskInput("");
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task"
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text style={styles.taskText}>{item.title}</Text>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F3FF" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#2D3436" },
  inputContainer: { flexDirection: "row", marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: "#A29BFE", borderRadius: 8, padding: 10, backgroundColor: "#fff" },
  addButton: { backgroundColor: "#6C5CE7", marginLeft: 10, borderRadius: 8, justifyContent: "center", paddingHorizontal: 15 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  task: { flexDirection: "row", justifyContent: "space-between", padding: 15, backgroundColor: "#fff", marginBottom: 10, borderRadius: 8 },
  taskText: { color: "#2D3436" },
  deleteText: { color: "#d63031", fontWeight: "bold" },
  logoutButton: { backgroundColor: "#d63031", padding: 14, borderRadius: 25, alignItems: "center", marginTop: 20 },
  logoutText: { color: "#fff", fontWeight: "bold" },
});