import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FaRegMoon, FaRegSun, FaLanguage } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import NoteList from './Components/NoteList';
import NotePage from './Components/NotePage';

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
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  transition: background-color 0.3s, color 0.3s;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-end;
  }
`;

const ToggleButton = styled.button`
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
  margin: 5px;

  svg {
    margin-right: 8px;
    font-size: 1.3em;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
  margin-top: 80px;
  padding-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  margin: 0 0 20px 0;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 1.1em;
  text-align: center;
  margin: 0 0 20px 0;
`;

const FooterButton = styled.a`
  position: fixed;
  bottom: 10px;
  left: 10px;
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
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 2em;
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

function Logo({ darkMode }) {
  return (
    <LogoWrapper darkMode={darkMode}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        notedz
      </Link>
    </LogoWrapper>
  );
}

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

  const getLanguageText = (key) => {
    const texts = {
      pt: {
        languageToggle: 'en-us',
        header: 'anote o que quiser',
        newNotePrompt: 'nova anotação...',
        backButton: 'voltar',
        paragraph: 'crie histórias, anote receitas de sobremesa, ideias mirabolantes ou qualquer coisa que você quiser.',
      },
      en: {
        languageToggle: 'pt-br',
        header: 'your notes',
        newNotePrompt: 'new note...',
        backButton: 'back',
        paragraph: 'create stories, jot down dessert recipes, wild ideas, or anything else you want.',
      },
    };
    return texts[language][key];
  };

  const addNote = (title) => {
    setNotes([...notes, { title, content: '' }]);
  };

  const updateNote = (index, newTitle, newContent) => {
    const newNotes = [...notes];
    newNotes[index] = { title: newTitle, content: newContent };
    setNotes(newNotes);
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <Router>
      <GlobalStyle />
      <Container darkMode={isDarkMode}>
        <Logo darkMode={isDarkMode} />
        <ButtonGroup>
          <ToggleButton darkMode={isDarkMode} onClick={toggleMode}>
            {isDarkMode ? (
              <>
                <FaRegSun /> light mode
              </>
            ) : (
              <>
                <FaRegMoon /> dark mode
              </>
            )}
          </ToggleButton>
          <ToggleButton darkMode={isDarkMode} onClick={toggleLanguage}>
            <FaLanguage /> {getLanguageText('languageToggle')}
          </ToggleButton>
        </ButtonGroup>
        <ContentWrapper>
          <Title>{getLanguageText('header')}</Title>
          <Paragraph>{getLanguageText('paragraph')}</Paragraph>
          <Routes>
            <Route
              path="/"
              element={
                <NoteList
                  notes={notes}
                  darkMode={isDarkMode}
                  addNote={addNote}
                  updateNote={updateNote}
                  deleteNote={deleteNote}
                  getLanguageText={getLanguageText}
                />
              }
            />
            <Route
              path="/note/:id"
              element={
                <NotePage
                  notes={notes}
                  darkMode={isDarkMode}
                  updateNote={updateNote}
                  getLanguageText={getLanguageText}
                />
              }
            />
          </Routes>
        </ContentWrapper>
        <FooterButton darkMode={isDarkMode} href="https://twitter.com/leozinnjs" target="_blank" rel="noopener noreferrer">
          <FaXTwitter /> Made by Leo
        </FooterButton>
      </Container>
    </Router>
  );
}

export default App;
