import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Note } from '../models/Note';
import { Ionicons } from '@expo/vector-icons';

interface NoteCardProps {
  note: Note;
  onPress: (note: Note) => void;
  onDelete: (note: Note) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPress, onDelete }) => {

  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(note)}>
      <Ionicons name="trash" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onPress(note)}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.content} numberOfLines={2}>
          {note.content}
        </Text>
      </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      elevation: 1
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    content: {
      fontSize: 14,
      color: '#666',
    },
    deleteButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: 80,
      padding: 16,
      marginBottom: 16,
      borderRadius: 8,
    }
  });
  
