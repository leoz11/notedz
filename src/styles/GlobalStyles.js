import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Fira Code', monospace;
    line-height: 1.6;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
  }
`;

export default GlobalStyles;