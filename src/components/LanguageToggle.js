import React from 'react';
import styled from 'styled-components';

const ToggleButton = styled.button`
  background: none;
  border: 2px solid #000;
  margin: 0 5px;
  cursor: pointer;
  padding: 5px;
`;

const LanguageToggle = ({ onLanguageChange }) => {
  return (
    <div>
      <ToggleButton onClick={() => onLanguageChange('pt')}>PT</ToggleButton>
      <ToggleButton onClick={() => onLanguageChange('en')}>EN</ToggleButton>
    </div>
  );
};

export default LanguageToggle;
