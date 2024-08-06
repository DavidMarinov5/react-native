import React from 'react';
import { View, FlatList, StyleSheet, ListRenderItem, Alert } from 'react-native';
import { FAB, Text } from '@rneui/base';
import { NoteCard } from '../components/NoteCard';
import { Note } from '../models/Note';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotes } from '../context/NoteContext';
import { StatusBar } from 'expo-status-bar';


const HomeScreen: React.FC = () => {
  const { notes, deleteNote } = useNotes();
  const router = useRouter();

  const navigateToNoteScreen = (id?: string) => {
    if (id) {
      router.push(`/screens/NoteScreen?id=${id}`);
    } else {
      router.push('/screens/NoteScreen');
    }
  };

  const showDeleteConfirmation = (id: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
           deleteNote(id)
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  const onSwipeToDelete = (id: string) => {
      showDeleteConfirmation(id)
  };


  const EmptyState: React.FC = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}> No notes yet</Text>
      <Text style={styles.emptyStateSubText}>Tap the + button to create a new note</Text>
    </View>
  );

  const renderItem: ListRenderItem<Note> = ({ item }) => (
    <NoteCard note={item} onPress={() => navigateToNoteScreen(item.id)} onDelete={() => onSwipeToDelete(item.id)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList<Note>
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={EmptyState}
      />

      <FAB
        visible={true}
        icon={{ name: 'add', color: 'white' }}
        placement='right'
        onPress={() => navigateToNoteScreen()}
      />
      <StatusBar style="dark" backgroundColor="transparent" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default HomeScreen;