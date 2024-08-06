import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Note } from '../models/Note';
import { router, useLocalSearchParams } from 'expo-router';
import { FAB } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotes } from '../context/NoteContext';
import { StatusBar } from 'expo-status-bar';


const NoteScreen: React.FC = () => {

    const { saveNote, updateNote,getNoteById } = useNotes();
    const { id } = useLocalSearchParams<{ id?: string }>();
    const [initialNote] = useState<Note | undefined>(id ? getNoteById(id) : undefined);
    const [title, setTitle] = useState(initialNote?.title || '');
    const [content, setContent] = useState(initialNote?.content || '');

    const handleSave = async () => {
        if (!title.trim()) {
            alert('Title cannot be empty');
            return;
        }
    
        if (!content.trim()) {
            alert('Content cannot be empty');
            return;
        }

        const newNote: Note = {
            id: initialNote?.id || Date.now().toString(),
            title: title.trim(),
            content: content.trim(),
            createdAt: initialNote?.createdAt || new Date(),
            updatedAt: new Date(),
        };
        if (!initialNote) {
            saveNote(newNote);
        } else {
            updateNote(newNote);
        }
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.titleInput}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter Title"
            />
            <TextInput
                style={styles.contentInput}
                value={content}
                onChangeText={setContent}
                placeholder="Enter content"
                multiline
            />
            <FAB
                visible={true}
                title='Save'
                onPress={handleSave}
                placement='right'
            />
          <StatusBar style="dark" backgroundColor="transparent" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    contentInput: {
        flex: 1,
        fontSize: 16,
        textAlignVertical: 'top',
    },
    saveButton: {
        color: '#007AFF',
        fontSize: 18,
        marginRight: 16,
    },
});

export default NoteScreen;