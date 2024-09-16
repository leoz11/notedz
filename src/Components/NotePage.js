import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaEdit, FaCheck, FaUndo, FaRedo } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import './Quill.css'

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 20px 0;
  width: 100%;
  display: flex;
  align-items: center;
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


const EditorWrapper = styled.div`
  width: 100%; // Use 100% da largura disponível
  max-width: 600px; // Limite máximo de largura
  height: auto; // Altura automática
  min-height: 400px; // Altura mínima
  margin: 20px auto; // Centralizar e adicionar margem
  border: 1px solid ${(props) => (props.darkMode ? '#444' : '#ccc')};
  border-radius: 4px;
  overflow: hidden; // Garantir que nenhum conteúdo transborde
  
  @media (max-width: 768px) {
    width: 95%; // Usar 95% da largura em telas menores
    margin: 10px auto; // Reduzir margens em telas menores
  }
`;

const StyledReactQuill = styled(ReactQuill)`
  height: 100%; // Ocupar toda a altura do wrapper

  .ql-container {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    height: calc(100% - 42px); // Subtrair altura da barra de ferramentas
  }

  .ql-editor {
    min-height: 350px; // Altura mínima para o editor
    overflow-y: auto;
    padding: 20px;
  }

  .ql-toolbar {
    border-bottom: 1px solid ${(props) => (props.darkMode ? '#444' : '#ccc')};
    background-color: ${(props) => (props.darkMode ? '#2a2a2a' : '#f8f8f8')};
  }

  ${(props) =>
    props.darkMode &&
    `
    .ql-toolbar {
      background-color: #2a2a2a;
      border-color: #444;
    }
    .ql-toolbar .ql-stroke {
      stroke: #ccc;
    }
    .ql-toolbar .ql-fill {
      fill: #ccc;
    }
    .ql-container {
      background-color: #1a1a1a;
      color: #fff;
      border-color: #444;
    }
  `}

  @media (max-width: 768px) {
    .ql-container {
      font-size: 14px; // Reduzir tamanho da fonte em telas menores
    }
    
    .ql-editor {
      padding: 10px; // Reduzir padding em telas menores
    }
  }
`;

const NotePage = ({ notes, darkMode, updateNote, getLanguageText }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes[id];
  const [isEditing, setIsEditing] = useState(false);
  const [editorState, setEditorState] = useState(note.content);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  useEffect(() => {
    setEditorState(note.content);
  }, [note.content]);

  const handleContentChange = (content) => {
    setUndoStack([...undoStack, editorState]);
    setEditorState(content);
    setRedoStack([]);
    updateNote(id, note.title, content);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const prevState = undoStack.pop();
      setRedoStack([editorState, ...redoStack]);
      setEditorState(prevState);
      updateNote(id, note.title, prevState);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.shift();
      setUndoStack([...undoStack, editorState]);
      setEditorState(nextState);
      updateNote(id, note.title, nextState);
    }
  };

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
        <IconButton onClick={handleUndo} darkMode={darkMode}>
          <FaUndo />
        </IconButton>
        <IconButton onClick={handleRedo} darkMode={darkMode}>
          <FaRedo />
        </IconButton>
      </HeaderWrapper>
      <EditorWrapper darkMode={darkMode}>
        <StyledReactQuill
          theme="snow"
          value={editorState}
          onChange={handleContentChange}
          darkMode={darkMode}
        />
      </EditorWrapper>
    </>
  );
};  

export default NotePage;