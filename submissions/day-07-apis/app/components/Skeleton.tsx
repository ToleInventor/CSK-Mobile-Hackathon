import { Animated } from 'react-native'
import styles from '../static/styles';

export default function Skeleton({ width = "100%", height = 20, style }) {
  const opacity = new Animated.Value(0.3);
  Animated.loop(
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0.3, duration: 1000, useNativeDriver: true })
    ])
  ).start();
  return <Animated.View style={[{ width, height, borderRadius: 5, marginBottom: 10, opacity }, style]} />;
}