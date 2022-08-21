import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiOutlineSearch } from "react-icons/hi";
import { BsX } from "react-icons/bs";
import axios from "axios";
import CountryWrapper from "./Countries/CountryWrapper";

const Container = styled.main`
  width: 100vw;
  min-height: 70vh;
`;

const InputContainer = styled.div`
  width: 453px;
  display: flex;
  height: 50px;
  align-items: center;
  background-color: ${({ theme }) => theme.header.background};
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding-left: 0.2rem;
  position: relative;



  .search-icon {
    position: absolute;
    left: 0.4rem;
  }

  .x {
    padding-right: 0.4rem;
    cursor: pointer;
    color: red;
  }


  @media (max-width: 600px) {
    & {
      width: 95vw;
      margin: auto;
    }
  }
`;
const Input = styled.input`
  width: 400px;
  border: 1px white;
  font-size: 1.2rem;
  height: 100%;
  padding-left: 1.9rem;
`;

const SearhAndFilterContainer = styled.div`
  width: 97vw;
  height: 100px;
  margin: auto;
  display: flex;
  align-items: center;
`;

function Main() {
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState<number | null>(null);

  useEffect(() => {
    const reqAllCountries =  async () => {
      try {
        const { data } = await axios("https://restcountries.com/v3.1/all");
        setCountries(data);
        console.log(data);
      } catch (err: any) {
        setError(err);
      }
    }


    const countryReq = async () => {
      try {
        const { data } = await axios(
          "https://restcountries.com/v3.1/name/" + inputValue
        );
        setCountries(data);
        console.log(countries);
      } catch (error: any) {
        setError(error);
      }
    };

    if (inputValue.trim()) {
      countryReq();
    }

   else if(!inputValue.trim()){
      reqAllCountries();
    }
    
    console.log(countries)
  }, [inputValue]);



  return (
    <Container>
      <SearhAndFilterContainer>
        <InputContainer>
          <HiOutlineSearch size={21} className="search-icon" />
          <Input
            type="text"
            placeholder="Search for a country..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {inputValue.trim() && (
            <BsX onClick={() => setInputValue("")} size={33} className="x" />
          )}
        </InputContainer>
      </SearhAndFilterContainer>
      <CountryWrapper countries={countries} />
    </Container>
  );
}

export default Main;
