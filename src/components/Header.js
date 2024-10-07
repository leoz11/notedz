import React from 'react';
import styled from 'styled-components';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: ${(props) => props.theme.text};
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
  transition: transform 0.2s ease, color 0.3s ease;

  &:hover {
    text-decoration: underline;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const Header = ({ toggleTheme, theme }) => {
  return (
    <HeaderWrapper>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projetos</NavLink>
        <NavLink to="/about">Sobre</NavLink>
      </Nav>
      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
    </HeaderWrapper>
  );
};

export default Header;
