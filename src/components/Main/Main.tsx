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
  width: 500px;
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
    color: red;

  
  }


  @media (max-width: 512px){
    & {
      width: 100%;

    }
  }

`;
const Input = styled.input`
  width: 460px;
  border: 1px white;
  font-size: 1.2rem;
  height: 100%;
  padding-left: 1.9rem;
`;

const SearhAndFilterContainer = styled.div`
  width: 89vw;
  height: 100px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .dropdown-list {
    background-color: ${({theme}) => theme.header.background};
    color: ${({theme}) => theme.header.text};
    padding: .3rem;
    font-size: 1.3rem;
  }


  @media (max-width: 888px){
    & {
      flex-flow: column;
      margin-bottom: 2rem;
      align-items: start;

    }
  }
`;

function Main() {
  const [inputValue, setInputValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState('');


  

  useEffect(() => {

    (async () => {
      let url = "https://restcountries.com/v3.1/all"
  
  
      inputValue.trim() ? url = "https://restcountries.com/v3.1/name/" + inputValue : url = "https://restcountries.com/v3.1/all"
  
      try {
        const { data } = await axios(url);
        setCountries(data);
      } catch (err: any) {
        setError(err);
      }
  
    })()
  }, [inputValue]);



  const filterOptions = [
    { value: "Africa", label: "Africa" },
    { value: "Asia", label: "Asia" },
    { value: "Oceania", label: "Oceania" },
    { value: "Europe", label: "Europe" },
    { value: "America", label: "America" },
  ];



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
            <BsX onClick={() => setInputValue("")} size={40} className="x" />
          )}
        </InputContainer >
          <select  className="dropdown-list" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          <option>Filter using Continents</option>
          {  filterOptions.map(option => {
            return(
               <option value={option.value} key={option.value}>{option.label}</option>
            )})}
          </select>
      </SearhAndFilterContainer>
      <CountryWrapper countries={countries} />
    </Container>
  );
}

export default Main;
