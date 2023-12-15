import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
  }

  body {
    font-weight: 400;
  }

  body div#root {
    display: grid;
    min-height: 100vh;
    grid-template-rows: min-content 1fr min-content;
  }
`;
