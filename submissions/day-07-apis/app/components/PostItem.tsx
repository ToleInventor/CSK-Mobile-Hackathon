import { TouchableOpacity, View, Text } from "react-native";
import { useState } from "react";
import styles from "../static/styles";

export default function PostItem({ title, body, theme }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {expanded && <Text style={[styles.body, { color: theme.subtext }]}>{body}</Text>}
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={[styles.seeMore, { color: theme.primary }]}>{expanded ? "See less" : "See more"}</Text>
      </TouchableOpacity>
    </View>
  );
}