import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FaRegMoon, FaRegSun, FaLanguage, FaQuestionCircle } from 'react-icons/fa';
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
  overflow-x: hidden;
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
  margin-top: 150px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    margin-top: 100px;
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2em;
  margin: 0 0 20px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const Paragraph = styled.p`
  font-size: 1.1em;
  text-align: center;
  margin: 0 0 50px 0;

  @media (max-width: 768px) {
    font-size: 1em;
    margin: 0 0 30px 0;
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

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const HelpButton = styled(ToggleButton)`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;

  @media (max-width: 768px) {
    position: static;
    margin-top: 20px;
    align-self: flex-end;
  }
`;

const HelpBox = styled.div`
  position: fixed;
  bottom: 60px;
  right: 10px;
  width: 300px;
  background-color: ${(props) => (props.darkMode ? '#333' : '#f0f0f0')};
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  border: 2px solid ${(props) => (props.darkMode ? '#fff' : '#000')};
  border-radius: 10px;
  padding: 20px;
  font-size: 0.9em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow-y: auto;
  max-height: 80vh;
  
  @media (max-width: 768px) {
    position: static;
    width: 90%;
    max-width: 300px;
    margin: 20px auto;
    max-height: none;
  }
`;

const HelpContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HelpRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NotedzHighlight = styled.span`
  text-decoration: underline;
  text-decoration-color: #40E0D0;
  color: inherit;
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
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 1000;

  @media (max-width: 768px) {
    position: static;
    margin-top: 20px;
    align-self: flex-start;
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
    const texts = {
      pt: {
        languageToggle: 'en-us',
        header: 'escreva o que quiser',
        newNotePrompt: 'dê um título à sua nota...',
        backButton: 'voltar',
        paragraph: 'crie histórias, anote receitas, ideias mirabolantes ou qualquer coisa que você quiser.',
        help: 'Ajuda',
        helpDescription: 'Aqui você pode criar notas, organizar suas ideias, criar histórias e escrever tudo o que quiser!',
        helpInstructions: [
          'Use o campo no centro da tela para dar um título à nota que deseja criar;',
          'Clique no botão + para criar a nota;',
          'A nota será adicionada a uma lista, clique sobre a nota para acessá-la e escrever.',
        ],
        helpTheme: 'Use esse botão para alterar o tema do site.',
        helpLanguage: 'Use esse botão para alterar o idioma do site.',
        contactCreator: 'Qualquer dúvida que tiver pode ser tirada com o criador do',
        contactLink: 'entre em contato clicando no botão abaixo.',
        madeByLeo: 'Feito por Léo',
      },
      en: {
        languageToggle: 'pt-br',
        header: 'write whatever you want',
        newNotePrompt: 'give your note a title...',
        backButton: 'back',
        paragraph: 'create stories, jot down recipes, wild ideas, or anything else you want.',
        help: 'Help',
        helpDescription: 'Here you can create notes, organize your ideas, write stories, and jot down anything you want!',
        helpInstructions: [
          'Use the field in the center of the screen to give a title to the note you want to create;',
          'Click the + button to create the note;',
          'The note will be added to a list, click on the note to access and write in it.',
        ],
        helpTheme: 'Use this button to change the site\'s theme.',
        helpLanguage: 'Use this button to change the site\'s language.',
        contactCreator: 'Any questions can be directed to the creator of',
        contactLink: 'contact him by clicking the button below.',
        madeByLeo: 'Made by Leo',
      }
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

          <HelpButton darkMode={isDarkMode} onClick={toggleHelp}>
            <FaQuestionCircle /> {getLanguageText('help')}
          </HelpButton>

          {showHelp && (
            <HelpBox darkMode={isDarkMode}>
              <HelpContent>
                <p>{getLanguageText('helpDescription')}</p>
                <ol>
                  {getLanguageText('helpInstructions').map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
                <HelpRow>
                  <ToggleButton darkMode={isDarkMode} disabled>
                    {isDarkMode ? <FaRegSun /> : <FaRegMoon />} {isDarkMode ? 'light mode' : 'dark mode'}
                  </ToggleButton>
                  <span>{getLanguageText('helpTheme')}</span>
                </HelpRow>
                <HelpRow>
                  <ToggleButton darkMode={isDarkMode} disabled>
                    <FaLanguage /> {getLanguageText('languageToggle')}
                  </ToggleButton>
                  <span>{getLanguageText('helpLanguage')}</span>
                </HelpRow>
                <p>
                  {getLanguageText('contactCreator')} <NotedzHighlight>notedz</NotedzHighlight>, {getLanguageText('contactLink')}
                </p>
                <HelpRow>
                  <FooterButton darkMode={isDarkMode} as="button" disabled>
                    <FaXTwitter /> Leo
                  </FooterButton>
                </HelpRow>
              </HelpContent>
            </HelpBox>
          )}

          <MadeByLeoButton darkMode={isDarkMode} href="https://x.com/leozinnjs" target="_blank" rel="noopener noreferrer">
            <FaXTwitter /> {getLanguageText('madeByLeo')}
          </MadeByLeoButton>
        </ContentWrapper>
      </Container>
    </Router>
  );
}

export default App;