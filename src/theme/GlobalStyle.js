import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700&display=swap');

    *, *::before, *::after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
    }

    html {
        font-size: 62.5%; /* 1rem = 10px; */
    }

    body {
        font-size: 1.6rem;
        font-family: 'Montserrat', sans-serif;
    }
`;

export default GlobalStyle;
