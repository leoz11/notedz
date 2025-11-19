import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { FaQuestionCircle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import HelpBox from "./components/HelpBox";
import texts from "./texts.json";

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

interface ContainerProps {
  darkMode: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => (props.darkMode ? "#000000" : "#fff")};
  color: ${(props) => (props.darkMode ? "#fff" : "#000")};
  transition: background-color 0.3s, color 0.3s;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden;
  padding-bottom: 60px;
  position: relative;
`;

const HelpButton = styled.button<ContainerProps>`
  background: none;
  border: 2px solid ${(props) => (props.darkMode ? "#fff" : "#000")};
  border-radius: 20px;
  padding: 12px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${(props) => (props.darkMode ? "#fff" : "#000")};
  transition: color 0.3s, border-color 0.3s;
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  position: absolute;
  bottom: 10px;
  right: 10px;

  svg {
    margin-right: 8px;
    font-size: 1.3em;
  }

  span {
    display: inline;
  }

  @media (max-width: 768px) {
    padding: 12px;

    span {
      display: none;
    }

    svg {
      margin-right: 0;
    }
  }
`;

const FooterButton = styled.a<ContainerProps>`
  background: none;
  border: 2px solid ${(props) => (props.darkMode ? "#fff" : "#000")};
  border-radius: 20px;
  padding: 12px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${(props) => (props.darkMode ? "#fff" : "#000")};
  transition: color 0.3s, border-color 0.3s;
  font-family: "Fira Code", monospace;
  font-size: 1.2em;
  text-decoration: none;

  svg {
    margin-right: 8px;
    font-size: 1.3em;
  }

  span {
    display: inline;
  }

  @media (max-width: 768px) {
    padding: 12px;

    span {
      display: none;
    }

    svg {
      margin-right: 0;
    }
  }
`;

const MadeByLeoButton = styled(FooterButton)`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

interface Note {
  title: string;
  content: string;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [language, setLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "pt";
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [showHelp, setShowHelp] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === "pt" ? "en" : "pt");
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const getLanguageText = (key: string): string => {
    return (texts as any)[language][key];
  };

  const addNote = (title: string) => {
    if (title.length <= 50) {
      setNotes([...notes, { title, content: "" }]);
    } else {
      alert("O título da nota não pode ter mais de 50 caracteres.");
    }
  };

  const updateNote = (index: number, newTitle: string, newContent: string) => {
    if (newTitle.length <= 50) {
      const newNotes = [...notes];
      newNotes[index] = { title: newTitle, content: newContent };
      setNotes(newNotes);
    } else {
      alert("O título da nota não pode ter mais de 50 caracteres.");
    }
  };

  const deleteNote = (index: number) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/login" element={<Login darkMode={isDarkMode} />} />
          <Route path="/signup" element={<SignUp darkMode={isDarkMode} />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword darkMode={isDarkMode} />}
          />

          <Route
            path="/*"
            element={
              <PrivateRoute>
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
                    <FaQuestionCircle /> <span>{getLanguageText("help")}</span>
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
                    href="https://x.com/leleojs_"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter /> <span>{getLanguageText("madeByLeo")}</span>
                  </MadeByLeoButton>
                </Container>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
