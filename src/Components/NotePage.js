import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaEdit, FaCheck } from 'react-icons/fa';

const HeaderWrapper = styled.div`
  position: sticky;
  z-index: 1;
  padding: 20px 0;
  width: 100%;
  display: flex;
  align-items: center;
  background: ${(props) => (props.darkMode ? '#000' : '#fff')};
`;


const BackButton = styled.button`
  background: none;
  border: 2px solid ${(props) => (props.darkMode ? '#fff' : '#000')};
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  transition: color 0.3s, border-color 0.3s;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9em;
  margin-right: 10px;

  svg {
    margin-right: 8px;
    font-size: 1.3em;
  }
`;

const NoteTitle = styled.h2`
  flex-grow: 1;
  margin: 0;
  padding: 5px;
  font-size: 1.2em;
`;

const NoteInput = styled.input`
  flex-grow: 1;
  background: none;
  border: none;
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  font-size: 1.2em;
  padding: 5px;
  outline: none;
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

const NoteContent = styled.textarea`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  font-size: 1em;
  background-color: ${(props) => (props.darkMode ? '#1a1a1a' : '#f5f5f5')};
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  border: 1px solid ${(props) => (props.darkMode ? '#333' : '#ddd')};
  border-radius: 5px;
  box-sizing: border-box;
  resize: none;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
`;

const NotePage = ({ notes, darkMode, updateNote, getLanguageText }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes[id];
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [note.content]);

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <>
      <HeaderWrapper darkMode={darkMode}>
        <BackButton darkMode={darkMode} onClick={() => navigate('/')}>
          <FaArrowLeft /> {getLanguageText('backButton')}
        </BackButton>
        {isEditing ? (
          <>
            <NoteInput
              type="text"
              value={note.title}
              onChange={(e) => updateNote(id, e.target.value, note.content)}
              darkMode={darkMode}
              autoFocus
            />
            <IconButton onClick={() => setIsEditing(false)} darkMode={darkMode}>
              <FaCheck />
            </IconButton>
          </>
        ) : (
          <>
            <NoteTitle>{note.title}</NoteTitle>
            <IconButton onClick={() => setIsEditing(true)} darkMode={darkMode}>
              <FaEdit />
            </IconButton>
          </>
        )}
      </HeaderWrapper>
      <NoteContent
        ref={textareaRef}
        value={note.content}
        onChange={(e) => updateNote(id, note.title, e.target.value)}
        darkMode={darkMode}
      />
    </>
  );
};

export default NotePage;
