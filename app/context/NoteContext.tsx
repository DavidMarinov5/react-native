import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../models/Note';

const STORAGE_KEY = '@notes';

interface NotesContextProps {
  notes: Note[];
  saveNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  getNoteById: (id: string) => Note | undefined;
  deleteNote: (id: string) => void;
}

interface NotesProviderProps {
  children: ReactNode;
}
const NotesContext = createContext<NotesContextProps | undefined>(undefined);

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Failed to load notes', error);
    }
  };

  const saveNote = async (note: Note) => {
    try {
      const updatedNotes = [...notes, note];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Failed to save note', error);
    }
  };

  const updateNote = async (updatedNote: Note) => {
    try {
      const updatedNotes = notes.map(note => 
        note.id === updatedNote.id ? updatedNote : note
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Failed to update note', error);
    }
  };

  const getNoteById = (id: string): Note | undefined => {
    return notes.find(note => note.id === id);
  };

  const deleteNote = async (id: string) => {
    try {
      const updatedNotes = notes.filter(note => note.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Failed to delete note', error);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, saveNote, updateNote, getNoteById, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextProps => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
