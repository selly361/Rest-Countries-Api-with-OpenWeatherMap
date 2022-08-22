import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`


    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    input, button, a {
        all: unset;
}

body {
    font-family: 'Nunito Sans', sans-serif;
    overflow-x: hidden;
}
`;
