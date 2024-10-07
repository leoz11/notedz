import React from 'react';
import { FaMoon } from "react-icons/fa6"; // Ícone da lua
import { MdOutlineWbSunny } from 'react-icons/md'; // Ícone do sol
import styled from 'styled-components';

const ToggleButton = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme === 'light' ? 'black' : 'gray'}; /* Borda preta no modo claro, cinza no modo escuro */
  border-radius: 50px;
  padding: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme === 'light' ? 'black' : 'purple'}; /* Ajusta a cor da borda com base no tema */
`;

const ThemeToggle = ({ toggleTheme, theme }) => {
  console.log('Tema atual:', theme); // Verificar o valor do tema

  return (
    <ToggleButton onClick={toggleTheme} aria-label="Alternar tema">
      {theme === 'light' 
        ? <FaMoon style={{ color: 'purple' }} />  // Ícone da lua roxo no modo claro
        : <MdOutlineWbSunny style={{ color: 'yellow' }} />  // Ícone do sol amarelo no modo escuro
      }
    </ToggleButton>
  );
};

export default ThemeToggle;
