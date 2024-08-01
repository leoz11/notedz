import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 1.5em;
  color: ${(props) => (props.darkMode ? '#fff' : '#000')};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

function Logo({ darkMode }) {
  return (
    <LogoWrapper darkMode={darkMode}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        notedz
      </Link>
    </LogoWrapper>
  );
}

export default Logo;
