import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    font-family: Nunito, Poppins, Verdana, Geneva, Tahoma, sans-serif;
    color: #011529;
  }

  html {
    /* this defines what 1rem is
    1 rem = 10px; 10px/16px = 62.5%
    */
    font-size: 62.5%;
  }

  body {
    box-sizing: border-box;
    padding: 3rem;
    font-weight: 400;
    line-height: 1.7;
    padding-bottom: 0;
  }
  @media screen and (max-width: 415px) {
    body {
      padding: 1rem;
    }
  }

  h2 {
    text-align: center;
    padding: 3rem 0;
    font-size: 3rem;
    text-transform: uppercase;
    font-weight: 500;
    background-image: linear-gradient(
      to right,
      rgb(2, 33, 64),
      rgba(2, 33, 64)
    );
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    letter-spacing: 0.3rem;
  }

  p {
    font-size: 1.5rem;
    letter-spacing: 0.15rem;
  }

  h3 {
    font-size: 2rem;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    padding: 1rem 0;
  }

  @media screen and (max-width: 500px) {
    h2 {
      letter-spacing: 0;
      font-size: 2.5rem;
    }
  }
`;
