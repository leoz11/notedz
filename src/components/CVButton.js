import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.text};
  color: ${props => props.theme.background};
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  margin-top: 1rem;

  &:hover {
    opacity: 0.8;
  }
`;

const CVButton = ({ href }) => {
  return (
    <StyledButton href={href} target="_blank" rel="noopener noreferrer">
      Baixar meu CV ↓
    </StyledButton>
  );
};

export default CVButton;