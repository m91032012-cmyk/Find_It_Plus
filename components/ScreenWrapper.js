import { Animated } from 'react-native';
import { useRef, useEffect } from 'react';

export default function ScreenWrapper({ children }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ flex: 1, opacity }}>
      {children}
    </Animated.View>
  );
}
