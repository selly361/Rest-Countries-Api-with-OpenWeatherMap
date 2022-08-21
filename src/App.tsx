import React, { Fragment, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import { lightTheme, darkTheme } from "./utils/theme";
import { GlobalStyles } from "./utils/GlobalStyles";

const Body = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.body.background};
  color: ${({ theme }) => theme.body.text};
`;

function App() {
  const [themeToUse, setThemeToUse] = useState<string | null | undefined>();


  return (
    <Fragment>
      <ThemeProvider theme={themeToUse === "dark" ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Body>
          <NavBar themeToUse={themeToUse} setThemeToUse={setThemeToUse} />
          <Main />
        </Body>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
