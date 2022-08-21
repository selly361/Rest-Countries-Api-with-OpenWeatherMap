import React from "react";
import styled from "styled-components";

function numFormatter(number: number) {
  let numbers: string[] | string = ("" + number)
    .split("")
    .reverse()
    .map((number, index) => ((index + 3) % 3 === 0 ? number + "," : number))
    .reverse()
    .join("");

  return numbers
    .split("")
    .slice(0, numbers.length - 1)
    .join("");
}

interface PropTypes {
  officialName: any;
  flag: string;
  population: number;
  region: string;
  capital: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 350px;
  min-height: 350px;
  background-color: ${({ theme }) => theme.element.background};
  color: ${({ theme }) => theme.element.text};
  justify-content: space-between;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3);
`;

const FlagContainer = styled.div`
  width: 100%;
  height: 45%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Description = styled.div`
  padding: 1rem;
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;

  span {
    display: flex;
    font-weight: 900;
    gap: 0.3rem;
    p {
      font-weight: initial;
    }
  }



  @media (max-width: ) {
  }
`;

const Country = ({
  flag,
  officialName,
  population,
  region,
  capital,
}: PropTypes) => {
  return (
    <Container>
      <FlagContainer>
        <img src={flag} />
      </FlagContainer>
      <Description>
        <h2>{officialName}</h2>
        <span>
          Population:
          <p>{numFormatter(population)}</p>
        </span>
        <span>
          Region:
          <p>{region}</p>
        </span>
        <span>
          Capital:
          <p>{capital}</p>
        </span>
      </Description>
    </Container>
  );
};

export default Country;
