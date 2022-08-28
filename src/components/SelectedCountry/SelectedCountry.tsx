import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import Weather from "./Weather/Weather";


const Container = styled.div`
  width: 90vw;
  min-height: 90vh;
  margin: auto;
  display: flex;
  flex-flow: column;

`;

const TopSection = styled.section`


`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 2rem;
  gap: 1rem;
  padding: .2rem .7rem;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 0.3rem rgba(0,0,0,0.3);
  background-color: ${({ theme }) => theme.header.background};
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }

  @media (max-width: 1000px){
    & {
      font-size: 1.5rem;
      gap: .5rem;
    }
    
  }
`;
const MiddleSection = styled.section`
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1000px) {
    & {
      flex-flow: column;
      justify-content: center;

    }
  }

  @media (max-width: 1296px) and (min-width: 1004px) {
    & {
      gap: 2rem;
    }
  }
`;

const Flag = styled.div`
  height: 400px;
  width: 600px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media (max-width: 1000px) {
    & {
      width: 100%;
      height: 50%;
    }
  }


  @media (max-width: 644px){
    img {
      object-fit: contain;
    }
  }
`;

const CountryInformation = styled.div`
  display: flex;
  width: 550px;
  height: max-content;
  flex-flow: column;
  min-height: 80%;
  justify-content: space-evenly;

  @media (max-width: 1000px) {
    & {
      min-height: 40vh;
      width: 100%;
    }
  }

  @media (max-width: 644px) {
    .country-title {
      
    }
  }

  .borders-container {
    display: flex;
    width: 100%;
    gap: 1.3rem;
    align-items: center;
    padding-bottom: 1rem;

    .borders {
      display: flex;
      gap: 1rem;
      flex-flow: wrap;

      div {
        background-color: ${({theme}) => theme.element.background};
        color: ${({theme}) => theme.element.text};
        padding: .3rem 1rem;
        box-shadow: 0 0 0.3rem rgba(0,0,0,0.3);
        cursor: pointer;
      }

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

    @media (max-width: 644px) {
      & {
        flex-direction: column;
        gap: 1rem;
        
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
  }, [id]);

  const Navigate = useNavigate()

  return (
    <Container>
      <TopSection>
          <BackButton onClick={() => Navigate(-1)}>
            <BiArrowBack /> Back
          </BackButton>
      </TopSection>
      <br />
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
                        {Object.values<any>(country.currencies)[0].name}
                      </span>
                      <span>
                        <strong>Languages: </strong>{" "}
                        {Object.values(country.languages).join(", ")}
                      </span>
                    </div>
                  </div>
                  <br />
                  <div className="borders-container">
                    <h3>Border Countries: </h3>
                    <div className="borders">
                      {country.borders ? country.borders.map((border: string) => (
                        <Link to={`/${border}`} key={border}>
                        <div>
                          {border[0] +
                            border.toLowerCase().slice(1, border.length)}
                        </div>
                        </Link>
                      )) : 'No Countries'}
                    </div>
                  </div>
                </CountryInformation>
              </Fragment>
            );
          })}
      </MiddleSection>
      {country.length && <Weather lat={country[0].latlng[0]} long={country[0].latlng[1]}  />}
    </Container>
  );
};

export default SelectedCountry;
