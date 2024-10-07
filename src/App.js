import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FaQuestionCircle } from 'react-icons/fa';
import { FaBluesky } from "react-icons/fa6";
import Header from './components/Header';
import Home from './pages/Home';
import HelpBox from './components/HelpBox';
import texts from './texts.json';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Fira Code', monospace;
    font-size: 16px;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => (props.darkMode ? '#000000' : '#fff')};
  color: ${(props) => (props.darkMode ? '#blue' : '#000')};
  transition: background-color 0.3s, color 0.3s;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
  padding-bottom: 60px;
  position: relative;
`;

const HelpButton = styled.button`
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
  position: absolute;
  bottom: 10px;
  right: 10px;

  svg {
    margin-right: 8px;
    font-size: 1.3em;
  }
`;

const FooterButton = styled.a`
  background: none;
  border: 2px solid ${(props) => (props.darkMode ? '#fff' : '#000')};
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  transition: color 0.3s, border-color 0.3s;
  font-family: 'Fira Code', monospace;
  font-size: 0.9em;
  text-decoration: none;

  svg {
    margin-right: 8px;
    font-size: 1.3em;
  }

  @media (max-width: 768px) {
    font-size: 0.8em;
    padding: 6px 12px;

    svg {
      font-size: 1.2em;
    }
  }
`;

const MadeByLeoButton = styled(FooterButton)`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'pt';
  });
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const getLanguageText = (key) => {
    return texts[language][key];
  };

  const addNote = (title) => {
    if (title.length <= 50) {
      setNotes([...notes, { title, content: '' }]);
    } else {
      alert("O título da nota não pode ter mais de 50 caracteres.");
    }
  };

  const updateNote = (index, newTitle, newContent) => {
    if (newTitle.length <= 50) {
      const newNotes = [...notes];
      newNotes[index] = { title: newTitle, content: newContent };
      setNotes(newNotes);
    } else {
      alert("O título da nota não pode ter mais de 50 caracteres.");
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <Router>
      <GlobalStyle />
      <Container darkMode={isDarkMode}>
        <Header
          darkMode={isDarkMode}
          toggleMode={toggleMode}
          toggleLanguage={toggleLanguage}
          getLanguageText={getLanguageText}
        />
        
        <Home 
          notes={notes} 
          darkMode={isDarkMode} 
          addNote={addNote} 
          updateNote={updateNote} 
          deleteNote={deleteNote} 
          getLanguageText={getLanguageText} 
        />

        <HelpButton darkMode={isDarkMode} onClick={toggleHelp}>
          <FaQuestionCircle /> {getLanguageText('help')}
        </HelpButton>

        {showHelp && (
          <HelpBox 
            darkMode={isDarkMode} 
            isDarkMode={isDarkMode} 
            getLanguageText={getLanguageText} 
          />
        )}

        <MadeByLeoButton
          darkMode={isDarkMode}
          href="https://bsky.app/profile/leozvlr.bsky.social"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaBluesky /> {getLanguageText('madeByLeo')}
        </MadeByLeoButton>
      </Container>
    </Router>
  );
}

export default App;