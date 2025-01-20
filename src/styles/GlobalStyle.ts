'use client';

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    color: unset;
    background-color: unset;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: unset;
    border: 0 none;
    vertical-align: baseline;
    font-size: unset;
  }
  
  html, body, #root {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  
  img, video {
    height: auto;
    max-width: 100%;
  }
  
  ol, ul {
    list-style: none;
  }
  
  a {
    text-decoration: none;
    font-style: normal;
  }
  
  h1, h2, h3, h4, h5, h6, p, span, a {
    font-size: 100%;
    font-weight: normal;
  }
`;

export default GlobalStyle;