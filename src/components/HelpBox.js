import React from 'react';
import styled from 'styled-components';
import { FaRegSun, FaRegMoon, FaLanguage } from 'react-icons/fa';
import { FaBluesky } from "react-icons/fa6";

const HelpBoxContainer = styled.div`
  position: absolute;
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

  @media (max-width: 768px) {
    width: 90%;
    max-width: 300px;
    padding: 10px;
    bottom: 70px;
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
  text-decoration-thickness: 2.5px;
  text-decoration-color: #7F00FF;
  color: inherit;
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

const HelpBox = ({ darkMode, isDarkMode, getLanguageText }) => {
  return (
    <HelpBoxContainer darkMode={darkMode}>
      <HelpContent>
        <p>{getLanguageText('helpDescription')}</p>
        <ol>
          {getLanguageText('helpInstructions').map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
        <HelpRow>
          <ToggleButton darkMode={darkMode} disabled>
            {isDarkMode ? <FaRegSun /> : <FaRegMoon />} {isDarkMode ? 'light mode' : 'dark mode'}
          </ToggleButton>
          <span>{getLanguageText('helpTheme')}</span>
        </HelpRow>
        <HelpRow>
          <ToggleButton darkMode={darkMode} disabled>
            <FaLanguage /> {getLanguageText('languageToggle')}
          </ToggleButton>
          <span>{getLanguageText('helpLanguage')}</span>
        </HelpRow>
        <p>
          {getLanguageText('contactCreator')} <NotedzHighlight>notedz</NotedzHighlight>, {getLanguageText('contactLink')}
        </p>
        <HelpRow>
          <FooterButton darkMode={darkMode} href="https://bsky.app/profile/leozvlr.bsky.social" target="_blank" rel="noopener noreferrer">
            <FaBluesky /> Leo
          </FooterButton>
        </HelpRow>
      </HelpContent>
    </HelpBoxContainer>
  );
};

export default HelpBox;