// src/pages/Home.js

import React from 'react';
import styled from 'styled-components';
import SocialLinks from '../components/SocialLinks'; // Importando os Links sociais
import CVButton from '../components/CVButton'; // Importando o botão de CV
import { Link } from 'react-router-dom'; // Usando Link para navegação interna

const MainContent = styled.main`
  text-align: left;
  max-width: 800px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.25rem;
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-weight: normal;
  color: ${(props) => props.theme.accent};
`;

const LinksSection = styled.div`
  margin-top: 2rem;
`;

const LinkRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const StyledLink = styled(Link)`  /* Usando Link do react-router-dom */
  color: ${(props) => props.theme.text};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Home = () => {
  return (
    <MainContent>
      {/* Título e subtítulo principal */}
      <Title>Leonardo Oliveira</Title>
      <Subtitle>Engenheiro de Software</Subtitle>

      {/* Seção de links sociais */}
      <SocialLinks />

      {/* Seção de links com navegação para projetos e mais */}
      <LinksSection>
        <LinkRow>
          <StyledLink to="/projects">Conheça meus projetos →</StyledLink> {/* Navegação para /projects */}
        </LinkRow>
        <LinkRow>
          <StyledLink to="/about">Conheça-me →</StyledLink> {/* Navegação para /about */}
        </LinkRow>
      </LinksSection>

      {/* Botão para baixar o CV */}
      <CVButton href="https://docs.google.com/document/d/16GosgHP_JSRZFp5Er8e4mkm9hVqYy5i-Yg4Y5_vkBMQ/edit?usp=sharing" />
    </MainContent>
  );
};

export default Home;
