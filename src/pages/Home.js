import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NoteList from '../components/NoteList';
import NotePage from './NotePage';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  width: 100%;
  margin-top: 100px;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    margin-top: 70px;
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
  font-size: 1em;
  text-align: center;
  margin: 0 0 50px 0;

  @media (max-width: 768px) {
    font-size: 1em;
    margin: 0 0 30px 0;
  }
`;

const Home = ({ notes, darkMode, addNote, updateNote, deleteNote, getLanguageText }) => {
  const location = useLocation();

  return (
    <ContentWrapper>
      { !location.pathname.startsWith('/note/') && (
        <>
          <Title>{getLanguageText('header')}</Title>
          <Paragraph>{getLanguageText('paragraph')}</Paragraph>
        </>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notes={notes}
              darkMode={darkMode}
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
              darkMode={darkMode}
              updateNote={updateNote}
              getLanguageText={getLanguageText}
            />
          }
        />
      </Routes>
    </ContentWrapper>
  );
};

export default Home;
