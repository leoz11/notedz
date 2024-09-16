import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus, FaTimes, FaEdit, FaCheck } from 'react-icons/fa';
import ConfirmationModal from './ConfirmationModal'; // Ajuste o caminho conforme necessário

const NotesList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
`;

const NoteItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => (props.darkMode ? '#333' : '#ddd')};
  padding-bottom: 10px;
`;

const NoteTitle = styled(Link)`
  flex-grow: 1;
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  text-decoration: none;
  font-size: 1em;
  padding: 5px;
`;

const NoteInput = styled.input`
  flex-grow: 1;
  background: none;
  border: none;
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  font-size: 1em;
  padding: 5px;
  outline: 1px solid #333;
  border-radius: 4px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  cursor: pointer;
  font-size: 1em;
  padding: 5px;
  margin-left: 5px;
`;

const AddNoteButton = styled(IconButton)`
  margin-top: 10px;
`;

const NewNoteWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const NoteList = ({ notes, darkMode, addNote, updateNote, deleteNote, getLanguageText }) => {
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleAddNote = () => {
    if (newNoteTitle.trim()) {
      addNote(newNoteTitle);
      setNewNoteTitle('');
    }
  };

  const handleDeleteNote = (index) => {
    setNoteToDelete(index);
    setIsModalOpen(true);
  };

  const confirmDeleteNote = () => {
    if (noteToDelete !== null) {
      deleteNote(noteToDelete);
    }
    setIsModalOpen(false);
    setNoteToDelete(null);
  };

  const cancelDeleteNote = () => {
    setIsModalOpen(false);
    setNoteToDelete(null);
  };

  return (
    <>
      <NewNoteWrapper>
        <NoteInput
          type="text"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          placeholder={getLanguageText('newNotePrompt')}
          darkMode={darkMode}
        />
        <AddNoteButton onClick={handleAddNote} darkMode={darkMode}>
          <FaPlus />
        </AddNoteButton>
      </NewNoteWrapper>
      <NotesList>
        {notes.map((note, index) => (
          <NoteItem key={index} darkMode={darkMode}>
            {editingIndex === index ? (
              <>
                <NoteInput
                  type="text"
                  value={note.title}
                  onChange={(e) => updateNote(index, e.target.value, note.content)}
                  darkMode={darkMode}
                  autoFocus
                />
                <IconButton onClick={() => setEditingIndex(null)} darkMode={darkMode}>
                  <FaCheck />
                </IconButton>
              </>
            ) : (
              <>
                <NoteTitle to={`/note/${index}`} darkMode={darkMode}>
                  {note.title}
                </NoteTitle>
                <IconButton onClick={() => setEditingIndex(index)} darkMode={darkMode}>
                  <FaEdit />
                </IconButton>
                <IconButton onClick={() => handleDeleteNote(index)} darkMode={darkMode}>
                  <FaTimes />
                </IconButton>
              </>
            )}
          </NoteItem>
        ))}
      </NotesList>
      <ConfirmationModal
        isOpen={isModalOpen}
        darkMode={darkMode}
        onConfirm={confirmDeleteNote}
        onCancel={cancelDeleteNote}
      />
    </>
  );
};

export default NoteList;
