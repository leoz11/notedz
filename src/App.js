// src/App.js

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/themes'; // Importando temas
import GlobalStyles from './styles/GlobalStyles'; // Importando estilos globais
import Header from './components/Header'; // Importando Header
import Home from './pages/Home'; // Importando Home
import Projects from './pages/Projects'; // Importando Projects

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
  transition: all 0.3s ease;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;

function App() {
  const [theme, setTheme] = useState('light'); // Estado do tema

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <AppWrapper>
          <Header toggleTheme={toggleTheme} theme={theme} />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/projects" element={<Projects/>} />
          </Routes>
        </AppWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
