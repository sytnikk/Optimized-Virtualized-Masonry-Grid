import { createGlobalStyle } from 'styled-components'

export const AppStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --primary-color: #C209C1;
    --secondary-color: #920792;
    --background-color: #F8F8F8;
    --text-color: #333333;
    --border-color: #E0E0E0;
    --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    --font-family: "Red Hat Display", sans-serif;

    font-family: var(--font-family);
    font-optical-sizing: auto;
    font-weight: normal;
    font-style: normal;
  }
`