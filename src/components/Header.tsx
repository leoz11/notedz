import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FaRegMoon,
  FaRegSun,
  FaLanguage,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

interface StyledProps {
  darkMode: boolean;
}

interface ButtonGroupProps extends StyledProps {
  isOpen: boolean;
}

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
  z-index: 1000;
`;

const LogoWrapper = styled.div<StyledProps>`
  font-family: "Fira Code", monospace;
  font-size: 2.5em;
  color: ${(props) => (props.darkMode ? "#fff" : "#333")};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const ButtonGroup = styled.div<ButtonGroupProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background-color: ${(props) => (props.darkMode ? "#1a1a1a" : "#fff")};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 12px;
    width: 200px;
    gap: 8px;
    animation: slideIn 0.3s ease-in-out;

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const ToggleButton = styled.button<StyledProps>`
  background: none;
  border: 2px solid ${(props) => (props.darkMode ? "#fff" : "#000")};
  border-radius: 20px;
  padding: clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px);
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${(props) => (props.darkMode ? "#fff" : "#000")};
  transition: color 0.3s, border-color 0.3s;
  font-family: "Roboto", sans-serif;
  font-size: clamp(0.9em, 1.5vw, 1.1em);
  white-space: nowrap;

  svg {
    margin-right: 8px;
    font-size: clamp(1em, 1.5vw, 1.3em);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const HamburgerButton = styled.button<StyledProps>`
  display: none;
  background: none;
  border: none;
  color: ${(props) => (props.darkMode ? "#fff" : "#000")};
  font-size: 1.5em;
  cursor: pointer;
  padding: 5px;

  @media (max-width: 768px) {
    display: block;
  }
`;

interface HeaderProps {
  darkMode: boolean;
  toggleMode: () => void;
  toggleLanguage: () => void;
  getLanguageText: (key: string) => string;
}

function Header({
  darkMode,
  toggleMode,
  toggleLanguage,
  getLanguageText,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleButtonClick = (action: () => void) => {
    action();
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <LogoWrapper darkMode={darkMode}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          notedz
        </Link>
      </LogoWrapper>

      <HamburgerButton darkMode={darkMode} onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </HamburgerButton>

      <ButtonGroup isOpen={menuOpen} darkMode={darkMode}>
        <ToggleButton
          darkMode={darkMode}
          onClick={() => handleButtonClick(toggleMode)}
        >
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
        <ToggleButton
          darkMode={darkMode}
          onClick={() => handleButtonClick(toggleLanguage)}
        >
          <FaLanguage /> {getLanguageText("languageToggle")}
        </ToggleButton>
        <ToggleButton darkMode={darkMode} onClick={handleLogout}>
          <FaSignOutAlt /> sair
        </ToggleButton>
      </ButtonGroup>
    </HeaderContainer>
  );
}

export default Header;
