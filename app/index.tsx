// app/_index.tsx
import React, { useEffect } from 'react';
import { View,StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/screens/HomeScreen');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="#fff" />
        <Image source={require('../assets/images/linote.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
