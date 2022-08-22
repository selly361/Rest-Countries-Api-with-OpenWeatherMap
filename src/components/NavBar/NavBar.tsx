import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { BsMoonFill, BsSun } from "react-icons/bs";
import { Outlet, Link } from "react-router-dom";


const Header = styled.header`
  background-color: ${({ theme }) => theme.header.background};
  width: 100vw;
  height: 80px;
  position: fixed;
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.header.text};
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
  z-index: 4;
  cursor: pointer;

  h2 {
    font-size: 2rem;
  }

  @media (max-width: 508px) {
    h2 {
      font-size: 5vmin;
    }
  }
`;

const ThemeButton = styled.button`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 1.1rem;
  cursor: pointer;

  .dark-icon,
  .light-icon {
    font-size: 1.2rem;
  }

  @media (max-width: 508px) {
    & {
      font-size: 1rem;
      gap: 0.2rem;
    }
  }
`;

const Navigator = styled.nav`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface PropTypes {
  themeToUse: null | string | undefined;
  setThemeToUse: Function;
}

const NavBar = ({ themeToUse, setThemeToUse }: PropTypes) => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setThemeToUse(localStorage.getItem("theme"));
    } else {
      const theme = prefersDark ? "dark" : "light";
      localStorage.setItem("theme", theme);
      setThemeToUse(theme);
    }
  }, [themeToUse]);

  const gap = (
    <>
      <br /> <br /> <br /> <br /> <br /> <br /> <br />
    </>
  );

  return (
    <Fragment>
      <Header>
        <Navigator>
          <Link to='/'><h2>Where in the world?</h2></Link>
          {themeToUse === "dark" ? (
            <ThemeButton
              onClick={() => {
                localStorage.setItem("theme", "light");
                setThemeToUse("light");
              }}
            >
              <BsSun className="light-icon" />
              Light Mode
            </ThemeButton>
          ) : (
            <ThemeButton
              onClick={() => {
                localStorage.setItem("theme", "dark");
                setThemeToUse("dark");
              }}
            >
              <BsMoonFill className="dark-icon" />
              Dark Mode
            </ThemeButton>
          )}
        </Navigator>
      </Header>
      {gap}
      <Outlet />
    </Fragment>
  );
};

export default NavBar;
