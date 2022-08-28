import React, { Fragment, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import SelectedCountry from "./components/SelectedCountry/SelectedCountry";
import { lightTheme, darkTheme } from "./utils/theme";
import { GlobalStyles } from "./utils/GlobalStyles";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const Body = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.body.background};
  color: ${({ theme }) => theme.body.text};
`;

function App() {
  const [themeToUse, setThemeToUse] = useState<string | null | undefined>();

  return (
    <ThemeProvider theme={themeToUse === "dark" ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Body>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <NavBar themeToUse={themeToUse} setThemeToUse={setThemeToUse} />
              }
            >
              <Route index element={<Main />} />
              <Route path="/:id" element={<SelectedCountry />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Body>
    </ThemeProvider>
  );
}

export default App;
