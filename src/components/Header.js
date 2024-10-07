import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegMoon, FaRegSun, FaLanguage } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
`;

const LogoWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 2em;
  color: ${(props) => (props.darkMode ? '#fff' : '#333')};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
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

function Header({ darkMode, toggleMode, toggleLanguage, getLanguageText }) {
  return (
    <HeaderContainer>
      <LogoWrapper darkMode={darkMode}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          notedz
        </Link>
      </LogoWrapper>
      <ButtonGroup>
        <ToggleButton darkMode={darkMode} onClick={toggleMode}>
          {darkMode ? (
            <>
              <FaRegSun /> light mode
            </>
          ) : (
            <>
              <FaRegMoon /> dark mode
            </>
          )}
        </ToggleButton>
        <ToggleButton darkMode={darkMode} onClick={toggleLanguage}>
          <FaLanguage /> {getLanguageText('languageToggle')}
        </ToggleButton>
      </ButtonGroup>
    </HeaderContainer>
  );
}

export default Header;