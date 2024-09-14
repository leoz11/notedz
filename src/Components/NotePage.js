import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

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
  margin-bottom: 80px; /* Ajuste a margem inferior para acomodar os botões fixos */
`;

const BackButton = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  font-size: 1.5em;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

function NotePage({ notes, setNotes }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState('');

  const darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

  React.useEffect(() => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setNote(noteToEdit.content);
    }
  }, [id, notes]);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    const updatedNotes = notes.map((n) =>
      n.id === id ? { ...n, content: note } : n
    );
    setNotes(updatedNotes);
    navigate('/');
  };

  return (
    <div>
      <BackButton darkMode={darkMode} onClick={() => navigate('/')}>
        <FaArrowLeft /> Back
      </BackButton>
      <NoteContent
        darkMode={darkMode}
        value={note}
        onChange={handleChange}
        onBlur={handleSave}
      />
    </div>
  );
}

export default NotePage;
