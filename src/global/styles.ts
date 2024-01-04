import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Exo', sans-serif;
  }

  html, body, #app, #app>div, #root {
  height: 100%
}
`;

export default Global;
