import { createGlobalStyle, DefaultTheme } from 'styled-components';
import backgroundImage from './assets/background.png';

export const GlobalStyle = createGlobalStyle<DefaultTheme>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Gudea', sans-serif;
  }

  body {
    overflow: hidden;
    margin: 0;
  }

  #root {
    height: 100vh;
    background-color: #262626;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
  }
`; 