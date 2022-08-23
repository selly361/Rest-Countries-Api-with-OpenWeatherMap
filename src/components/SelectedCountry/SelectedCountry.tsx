import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { motion } from "framer-motion";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  /* justify-content: space-around; */
  gap: 3rem;
`;

const TopSection = styled.section`
  padding-left: 3rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 2rem;
  gap: 1rem;
  padding: 0 0.4rem;
  border: 1px solid black;
  background-color: ${({ theme }) => theme.header.background};
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;
const MiddleSection = styled.section`
  width: 90vw;
  min-height: 70vh;
  height: 60vh;
  display: flex;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  gap: 3rem;
`;

const Flag = styled.div`
  width: 50%;
  height: 100%;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const CountryInformation = styled.div`
  display: flex;
  width: 50%;
  height: max-content;
  flex-flow: column;
  min-height: 80%;
  justify-content: space-evenly;
`;

const SelectedCountry = () => {
  const { id } = useParams();

  const [country, setCountry] = useState<any>([]);

  useEffect(() => {
    (async () => {
      let { data } = await axios(
        "https://restcountries.com/v3.1/alpha?codes=" + id
      );
      setCountry(data);
    })();
  }, []);

  return (
    <Container>
      <TopSection>
        <Link to="/">
          <BackButton>
            <BiArrowBack /> Back
          </BackButton>
        </Link>
      </TopSection>
      <MiddleSection>
        {country.length &&
          country.map((country: any) => {
            return (
              <Fragment>
                <Flag>
                  <img
                    src={country.flags.svg}
                    alt={"Flag for" + country.name.common}
                  />
                </Flag>
                <CountryInformation>
                  <h1>{country.name.official}</h1>
                  <div>
                    <div>
                      <span>
                        <strong>Native Name:</strong>{" "}
                          {
                            Object.values<any>(country.name.nativeName)[0]
                              .official
                          }
                      </span>
                      <br />
                      <span>
                        <strong>Population: </strong>
                        {country.population.toLocaleString()}
                      </span>
                    </div>
                    <div></div>
                  </div>
                </CountryInformation>
              </Fragment>
            );
          })}
      </MiddleSection>
    </Container>
  );
};

export default SelectedCountry;
