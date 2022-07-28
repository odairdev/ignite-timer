import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
  @media (max-width: 768px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 400px) {
    html {
      font-size: 87.50%;
    }
  }

  @media (max-width: 360px) {
    html {
      font-size: 81.25%;
    }
  }
}

:focus {
  outline: 0;
  box-shadow: 0 0 0 2px ${(props) => props.theme["green-500"]}
}

  body {
    background-color: ${(props) => props.theme["gray-900"]};
    color: ${(props) => props.theme["gray-300"]};
    -webkit-font-smoothing: antialiased;
  }

  body,  input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
`;
