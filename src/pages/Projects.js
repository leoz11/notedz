// src/pages/Projects.js

import React from 'react';
import styled from 'styled-components';
import projectImage from '../assets/notedzv2.jpg'; // Importe a imagem de capa do projeto
import { FiExternalLink } from 'react-icons/fi'; // Importe o ícone para abrir em outra aba

const ProjectsWrapper = styled.div`
  text-align: left;
  max-width: 800px;
  width: 100%;
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem; /* Ajuste para dispositivos móveis */
  }
`;

const Title = styled.h1`
  font-size: 0.9rem;
  color: ${(props) => props.theme.text};

  @media (max-width: 768px) {
    font-size: 0.7rem; /* Ajuste para telas menores */
  }
`;

const ProjectItem = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  padding-top: 1.5rem;
  border-radius: 5px;
  margin-bottom: 2rem;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Ajuste para dispositivos móveis */
  }
`;

const TechList = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap; /* Para adaptar em telas menores */
`;

const TechItem = styled.span`
  background-color: transparent; /* Fundo transparente */
  color: ${(props) => props.theme.text}; /* Texto se adapta ao tema */
  padding: 0.3rem 0.6rem;
  border: 1px solid ${(props) => props.theme.text}; /* Borda adaptada ao tema (branca no dark mode e preta no light mode) */
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.4rem; /* Ajuste para dispositivos móveis */
  }
`;

const VisitButton = styled.a`
  display: inline-flex; /* Flex para alinhar o ícone e o texto */
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.text};
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid ${(props) => props.theme.text}; /* Borda preta ou branca dependendo do tema */
  transition: background-color 0.3s, color 0.3s; /* Transições suaves para hover */
  margin-right: 1rem; /* Espaço entre os botões */

  &:hover {
    background-color: ${(props) => props.theme.text}; /* Inverta a cor no hover */
    color: ${(props) => props.theme.background};
  }

  @media (max-width: 768px) {
    padding: 0.2rem 0.8rem; /* Ajuste para dispositivos móveis */
    font-size: 0.9rem;
  }
`;

const VisitButtonText = styled.span`
  margin-right: 0.5rem; /* Espaço entre o texto e o ícone */
`;

const ProjectUnderline = styled.u`
  text-decoration-color: purple;
  text-decoration-thickness: 2px;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex; 
  gap: 1rem; 
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Projects = () => {
  return (
    <ProjectsWrapper>
      <Title>Meus Projetos</Title>

      <ProjectItem>
        {/* Imagem de capa do projeto */}
        <ProjectImage src={projectImage} alt="Notedz Cover" />

        {/* Descrição do projeto */}
        <h2>Notedz</h2>
        <ProjectDescription>
          O <ProjectUnderline>Notedz</ProjectUnderline> é um lugar para as pessoas escreverem qualquer coisa que quiserem. O objetivo do <ProjectUnderline>Notedz</ProjectUnderline> é permitir que qualquer pessoa possa criar anotações de forma rápida e prática. Sem coletar informação nenhuma do usuário, permitindo que o mesmo tenha o máximo de privacidade e possa utilizar a aplicação com segurança e extraíndo 100% do potencial dela.
        </ProjectDescription>

        {/* Lista de tecnologias */}
        <TechList>
          <TechItem>React.js</TechItem>
          <TechItem>Styled-Components</TechItem>
          <TechItem>LocalStorage</TechItem>
        </TechList>

        {/* Botões para visitar o projeto e repositório */}
        <ButtonGroup>
          <VisitButton href="https://notedz.vercel.app" target="_blank" rel="noopener noreferrer">
            <VisitButtonText>Visitar projeto</VisitButtonText>
            <FiExternalLink size={16} /> {/* Ícone para abrir em nova aba */}
          </VisitButton>

          <VisitButton href="https://github.com/seu-usuario/notedz" target="_blank" rel="noopener noreferrer">
            <VisitButtonText>Ver código</VisitButtonText>
            <FiExternalLink size={16} /> {/* Ícone para abrir em nova aba */}
          </VisitButton>
        </ButtonGroup>
      </ProjectItem>

      {/* Adicione mais projetos aqui, se necessário */}
    </ProjectsWrapper>
  );
};

export default Projects;
