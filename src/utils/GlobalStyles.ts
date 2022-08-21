import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`


    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        transition: 1s color background linear;
    }

    input, button, a {
        all: unset;
}

body {
    font-family: 'Nunito Sans', sans-serif;
}
`;
