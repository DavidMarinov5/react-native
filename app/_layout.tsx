// app/_layout.tsx
import { Stack } from 'expo-router';
import { NotesProvider } from './context/NoteContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NotesProvider>
      <Stack>
      <Stack.Screen 
          name="index" 
          options={{
            headerShown: false,
          }} 
        />
        <Stack.Screen
          name="screens/HomeScreen"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="screens/NoteScreen"
          options={{
            title: 'Notes',
            headerShown: false,
          }}
        />
      </Stack>
    </NotesProvider>
    </GestureHandlerRootView>
  );
}
