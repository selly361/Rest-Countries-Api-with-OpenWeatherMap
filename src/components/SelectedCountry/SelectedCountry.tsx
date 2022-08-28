import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { motion } from "framer-motion";

const Container = styled.div`
  width: 100vw;
  min-height:90vh;
  display: flex;
  flex-flow: column;
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
  height: max-content;
  display: flex;
  justify-content: space-between;
  margin: auto;
  align-items: center;

  @media (max-width: 1000px){
    & {
      flex-flow: column;
      justify-content: center;
    }

  }

  @media (max-width: 1296px) and (min-width: 1004px){
    & {
      gap: 2rem;
    }
  }
`;

const Flag = styled.div`
  height: 400px;
  width: 600px;

  @media (max-width: 1000px){
    & {
      margin-top: 4rem;
      width: 100%;
      height: 50%
    }
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }


`;

const CountryInformation = styled.div`
  display: flex;
  width: 550px;
  height: max-content;
  flex-flow: column;
  min-height: 80%;
  justify-content: space-evenly;

  
  @media (max-width: 1000px){
    & {
      min-height: 40vh;
      width: 100%;
    }


  }

  @media (max-width: 644px){
    .country-title {
      text-align: center;
  

    }
  }
  



  .information-content {
    width: 100%;
    display: flex;
    justify-content: space-between;



    & > div:first-child {
      display: flex;
      flex-flow: column;
      gap: 0.4rem;
    }

    & > div:nth-child(2) {
      display: flex;
      flex-flow: column;
      gap: 0.4rem;
    }





    @media (max-width: 644px){
    & {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }


    & > div {
      gap: 1rem;
    }
  }

  }
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
              <Fragment key={country.name.common}>
                <Flag>
                  <img
                    src={country.flags.svg}
                    alt={"Flag for" + country.name.common}
                  />
                </Flag>
                <CountryInformation>
                  <h1 className="country-title">{country.name.official}</h1>
                  <br />
                  <div className="information-content">
                    <div>
                      <span>
                        <strong>Native Name: </strong>
                        {
                          Object.values<any>(country.name.nativeName)[0]
                            .official
                        }
                      </span>
                      <span>
                        <strong>Population: </strong>
                        {country.population.toLocaleString()}
                      </span>
                      <span>
                        <strong>Region: </strong> {country.region}
                      </span>
                      <span>
                        <strong>Sub Region: </strong> {country.subregion}
                      </span>
                      <span>
                        <strong>Capital: </strong> {country.capital}
                      </span>
                    </div>
                    <div>
                      <span>
                        <strong>Top Level Domain: </strong> {country.tld}
                      </span>
                      <span>
                        <strong>Currency: </strong>
                        {
                          Object.values<any>(country.currencies)[0]
                            .name
                        }
                      </span>
                      <span>
                        <strong>Languages: </strong> {Object.values(country.languages).join(", ")}
                      </span>
                    </div>
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
